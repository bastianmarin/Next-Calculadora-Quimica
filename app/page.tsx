"use client"

import { useState, useEffect } from "react"
import { ArrowLeftRight, Circle, Weight, Ruler, FlaskConical, Gauge, Timer, Bolt, Move3D, BicepsFlexed, Lightbulb, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

// Definición de las unidades de medida
const unidadesMedida = {
  masa: {
    nombre: "Masa",
    unidades: ["Ton", "Kg", "g", "mg", "ug"],
    factores: {
      Ton: 1000000,
      Kg: 1000,
      g: 1,
      mg: 0.001,
      ug: 0.000001,
    },
  },
  volumen: {
    nombre: "Volumen",
    unidades: ["Gal", "m3", "L", "mL", "uL"],
    factores: {
      Gal: 3.78541,
      m3: 1000,
      L: 1,
      mL: 0.001,
      uL: 0.000001,
    },
  },
  distancia: {
    nombre: "Distancia",
    unidades: ["Yarda", "pulgada", "m", "cm", "km", "mm"],
    factores: {
      Yarda: 0.9144,
      pulgada: 0.0254,
      m: 1,
      cm: 0.01,
      km: 1000,
      mm: 0.001,
    },
  },
  densidad: {
    nombre: "Densidad",
    unidades: ["Kg/m3", "g/mL", "Kg/L", "g/L"],
    factores: {
      "Kg/m3": 1,
      "g/mL": 1000,
      "Kg/L": 1000,
      "g/L": 1,
    },
  },
  presion: {
    nombre: "Presión",
    unidades: ["mmHg", "Atm", "Pa", "psi", "Torr"],
    factores: {
      mmHg: 133.322,
      Atm: 101325,
      Pa: 1,
      psi: 6894.76,
      Torr: 133.322,
    },
  },
  tiempo: {
    nombre: "Tiempo",
    unidades: ["s", "min", "hora"],
    factores: {
      s: 1,
      min: 60,
      hora: 3600,
    },
  },
  fuerza: {
    nombre: "Fuerza",
    unidades: ["Newton", "Kilonewton", "Micronewton", "Dina", "Kilogramofuerza"],
    factores: {
      Newton: 1,
      Kilonewton: 1000,
      Micronewton: 0.000001,
      Dina: 0.00001,
      Kilogramofuerza: 9.80665,
    },
  },
  energia: {
    nombre: "Energía",
    unidades: ["KJ", "Kcal"],
    factores: {
      KJ: 1,
      Kcal: 4.184,
    },
  },
}

// Diccionario de nombres formales para las unidades
const nombresFormales: Record<string, string> = {
  Ton: "Tonelada",
  Kg: "Kilogramo",
  g: "Gramo",
  mg: "Miligramo",
  ug: "Microgramo",
  Gal: "Galón",
  m3: "Metro cúbico",
  L: "Litro",
  mL: "Mililitro",
  uL: "Microlitro",
  Yarda: "Yarda",
  pulgada: "Pulgada",
  m: "Metro",
  cm: "Centímetro",
  km: "Kilómetro",
  mm: "Milímetro",
  "Kg/m3": "Kilogramo por metro cúbico",
  "g/mL": "Gramo por mililitro",
  "Kg/L": "Kilogramo por litro",
  "g/L": "Gramo por litro",
  mmHg: "Milímetro de mercurio",
  Atm: "Atmósfera",
  Pa: "Pascal",
  psi: "Libra por pulgada cuadrada",
  Torr: "Torr",
  s: "Segundo",
  min: "Minuto",
  hora: "Hora",
  Newton: "Newton",
  Kilonewton: "Kilonewton",
  Micronewton: "Micronewton",
  Dina: "Dina",
  Kilogramofuerza: "Kilogramo-fuerza",
  KJ: "Kilojulio",
  Kcal: "Kilocaloría",
}

// Iconos sugerentes para cada tipo de conversión
const iconosTipo: { [key: string]: React.ReactNode } = {
  masa: <Weight className="w-4 h-4 mr-2 text-gray-500" />, // weight
  volumen: <FlaskConical className="w-4 h-4 mr-2 text-gray-500" />, // flask-conical
  distancia: <Ruler className="w-4 h-4 mr-2 text-gray-500" />, // ruler
  densidad: <Move3D className="w-4 h-4 mr-2 text-gray-500" />, // move-3d
  presion: <Gauge className="w-4 h-4 mr-2 text-gray-500" />, // gauge
  tiempo: <Timer className="w-4 h-4 mr-2 text-gray-500" />, // timer
  fuerza: <BicepsFlexed className="w-4 h-4 mr-2 text-gray-500" />, // biceps-flexed
  energia: <Lightbulb className="w-4 h-4 mr-2 text-gray-500" />, // lightbulb
}

export default function Home() {
  const [tipoMedida, setTipoMedida] = useState("masa")
  const [unidadDesde, setUnidadDesde] = useState("")
  const [unidadHacia, setUnidadHacia] = useState("")
  const [valorDesde, setValorDesde] = useState("")
  const [valorHacia, setValorHacia] = useState("")
  const [conversiones, setConversiones] = useState<{ unidad: string; valor: number }[]>([])

  // Inicializar las unidades por defecto al cambiar el tipo de medida
  useEffect(() => {
    const unidades = unidadesMedida[tipoMedida as keyof typeof unidadesMedida].unidades
    setUnidadDesde(unidades[0])
    setUnidadHacia(unidades[1])
    setValorDesde("1") // Valor inicial en 1
    setValorHacia("")
  }, [tipoMedida])

  // Realizar la conversión cuando cambian los valores o unidades
  useEffect(() => {
    if (valorDesde && unidadDesde && unidadHacia) {
      const factores = unidadesMedida[tipoMedida as keyof typeof unidadesMedida].factores
      const factorDesde = factores[unidadDesde as keyof typeof factores]
      const factorHacia = factores[unidadHacia as keyof typeof factores]

      const valorBase = Number.parseFloat(valorDesde) * factorDesde
      const resultado = valorBase / factorHacia

      setValorHacia(resultado.toFixed(3))

      // Calcular todas las conversiones para la tabla
      const todasConversiones = unidadesMedida[tipoMedida as keyof typeof unidadesMedida].unidades.map((unidad) => {
        const factorUnidad = factores[unidad as keyof typeof factores]
        return {
          unidad,
          valor: valorBase / factorUnidad,
        }
      })

      setConversiones(todasConversiones)
    } else {
      setValorHacia("")
      setConversiones([])
    }
  }, [valorDesde, unidadDesde, unidadHacia, tipoMedida])

  // Intercambiar unidades y valores
  const intercambiar = () => {
    const tempUnidad = unidadDesde
    const tempValor = valorDesde

    setUnidadDesde(unidadHacia)
    setValorDesde(valorHacia)

    setUnidadHacia(tempUnidad)
    setValorHacia(tempValor)
  }

  return (
    <div className="flex min-h-screen">
      {/* Barra lateral */}
      <div className="w-64 bg-gray-100 border-r flex flex-col justify-between h-screen">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Tipos de Medición</h2>
          <ul className="space-y-2">
            {Object.keys(unidadesMedida).map((tipo) => (
              <li key={tipo}>
                <Button
                  variant={tipoMedida === tipo ? "default" : "ghost"}
                  className="w-full justify-start flex items-center gap-2"
                  onClick={() => setTipoMedida(tipo)}
                >
                  {iconosTipo[tipo] || <Circle className="w-4 h-4 mr-2 text-gray-500" />}
                  {unidadesMedida[tipo as keyof typeof unidadesMedida].nombre}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4">
          <a href="https://github.com/bastianmarin/Next-Calculadora-Quimica" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="w-full justify-start flex items-center gap-2">
              <Github className="w-4 h-4 mr-2" />
              Ir a GitHub
            </Button>
          </a>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-6">
        
        <h1 className="text-2xl font-bold mb-6">
          Conversión de {unidadesMedida[tipoMedida as keyof typeof unidadesMedida].nombre}
        </h1>

        {/* Instructivo para usuarios nuevos (ahora en acordeón) */}
        <div className="mb-8">
          <Accordion type="single" collapsible>
            <AccordionItem value="instrucciones">
              <AccordionTrigger className="text-lg font-bold">¿Cómo usar la calculadora de unidades?</AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal list-inside space-y-1 text-base mt-2">
                  <li>Elija el tipo de medición que desea convertir (por ejemplo: Masa, Volumen, Distancia, etc.) usando los botones de la izquierda.</li>
                  <li>En la calculadora, escriba el número que desea convertir en el primer cuadro que dice "Valor".</li>
                  <li>Seleccione la unidad de la que parte (por ejemplo: Kg, L, m, etc.) en el primer menú desplegable.</li>
                  <li>Seleccione la unidad a la que quiere convertir en el segundo menú desplegable.</li>
                  <li>El resultado aparecerá automáticamente en el cuadro de la derecha.</li>
                  <li>Debajo, verá una tabla con el valor convertido a todas las unidades disponibles para ese tipo de medición.</li>
                  <li>Si quiere intercambiar las unidades, puede usar el botón con las flechas en el centro.</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Convertidor */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-1">Calculadora de Conversión</h2>
            <p className="text-gray-600 mb-2 mt-0">Las conversiones mostradas a continuación son equivalentes entre sí.</p>
            <div className="flex items-center gap-4">
              <div className="flex-1 flex items-center gap-2">
                <Input
                  type="number"
                  value={valorDesde}
                  onChange={(e) => setValorDesde(e.target.value)}
                  placeholder="Valor"
                  className="mb-0"
                />
                <Select value={unidadDesde} onValueChange={setUnidadDesde}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {unidadesMedida[tipoMedida as keyof typeof unidadesMedida].unidades.map((unidad) => (
                      <SelectItem key={unidad} value={unidad}>
                        {unidad}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" size="icon" onClick={intercambiar} className="mx-4">
                <ArrowLeftRight className="h-4 w-4" />
              </Button>

              <div className="flex-1 flex items-center gap-2">
                <Input
                  type="number"
                  value={valorHacia}
                  onChange={(e) => setValorHacia(e.target.value)}
                  placeholder="Resultado"
                  className="mb-0"
                  readOnly
                />
                <Select value={unidadHacia} onValueChange={setUnidadHacia}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {unidadesMedida[tipoMedida as keyof typeof unidadesMedida].unidades.map((unidad) => (
                      <SelectItem key={unidad} value={unidad}>
                        {unidad}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de conversiones */}
        {valorDesde && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Tabla de Conversiones</h2>
              <p className="text-gray-600 mb-4 mt-[-12px]">Estos valores muestran la conversión del número ingresado a todas las unidades disponibles, para que puedas visualizar y comparar fácilmente los resultados.</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unidad</TableHead>
                    <TableHead>Nombre Formal</TableHead>
                    <TableHead>Valor Decimal</TableHead>
                    <TableHead>Notación Científica</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conversiones.map((conversion) => (
                    <TableRow key={conversion.unidad}>
                      <TableCell>{conversion.unidad}</TableCell>
                      <TableCell>{nombresFormales[conversion.unidad] || ""}</TableCell>
                      <TableCell>{conversion.valor.toFixed(3)}</TableCell>
                      <TableCell>{conversion.valor.toExponential(3)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
