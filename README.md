# Calculadora de Unidades

Este proyecto es una **calculadora de conversión de unidades de medida** desarrollada con **Next.js** y **Tailwind CSS**. Permite convertir entre diferentes unidades de medida como masa, volumen, distancia, densidad, presión, tiempo, fuerza y energía.

## Características

- Conversión entre múltiples unidades de medida.
- Interfaz de usuario moderna y responsiva.
- Soporte para temas claro y oscuro.
- Tabla de conversiones con valores en notación decimal y científica.

## Tecnologías utilizadas

- **Next.js**: Framework de React para aplicaciones web.
- **Tailwind CSS**: Framework de utilidades CSS para estilos rápidos y consistentes.
- **Radix UI**: Componentes accesibles y personalizables.
- **Lucide Icons**: Iconos SVG modernos y personalizables.
- **v0.dev**: Generación de la interfaz grafica.

## Instalación

1. Si no tienes `pnpm` instalado, instálalo globalmente con:

   ```bash
   npm install -g pnpm
   ```

2. Clona este repositorio:

   ```bash
   git clone https://github.com/bastianmarin/Next-Calculadora-Quimica.git
   cd Next-Calculadora-Quimica
   ```

3. Instala las dependencias usando `pnpm`:

   ```bash
   pnpm install
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   pnpm dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Uso

1. Selecciona el tipo de medida (masa, volumen, distancia, etc.) desde la barra lateral.
2. Ingresa un valor en el campo de entrada.
3. Selecciona las unidades de origen y destino.
4. Visualiza el resultado de la conversión y la tabla de conversiones.

## Personalización

- **Temas**: Puedes personalizar los colores y estilos en el archivo `tailwind.config.ts`.
- **Unidades de medida**: Las unidades y factores de conversión están definidos en `app/page.tsx`.

## Contribución

¡Las contribuciones son bienvenidas! Si encuentras un problema o tienes una idea para mejorar el proyecto, abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.