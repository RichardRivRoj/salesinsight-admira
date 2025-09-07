# SalesInsight Pro

## Estructura del Proyecto
El proyecto está organizado en carpetas clave:
- `src/app/api/sales/` — Endpoints de la API para ventas, margen por categoría, ventas por canal y top productos.
- `src/app/(dashboard)/components/` — Componentes visuales para gráficos y filtros.
- `src/components/ui/` — Componentes reutilizables de interfaz (botón, select, calendario, etc.) basados en Shadcn UI.
- `src/hooks/` — Hooks personalizados para consumir y transformar datos de la API.
- `data/mockData.json` — Datos simulados para desarrollo y pruebas.
- `src/lib/` — Utilidades, constantes y lógica para envío de logs a webhook.

## Fuente/API utilizada
Se emplean endpoints propios bajo `/api/sales` y subrutas:
- `/api/sales` — Datos generales de ventas.
- `/api/sales/margin-by-category` — Margen por categoría.
- `/api/sales/sales-by-channel` — Ventas por canal.
- `/api/sales/top-products` — Productos más vendidos.
Todos los endpoints consumen datos simulados desde `data/mockData.json`.

## Cómo correr el proyecto
Instala dependencias y ejecuta el servidor de desarrollo:
```bash
npm i && npm run dev
```
Accede a la app en [http://localhost:3000](http://localhost:3000) o desplegada [https://salesinsight-admira-ei47ec7wx-richard-riveras-projects.vercel.app/](https://salesinsight-admira-ei47ec7wx-richard-riveras-projects.vercel.app/).

## Variables de entorno utilizadas
- `WEBHOOK_URL`: URL para el envío de logs de actividad mediante el archivo.

## Transformaciones implementadas
Las transformaciones principales en los endpoints y hooks incluyen:
- **Agregación temporal**: Agrupación de ventas por mes para mostrar tendencias.
- **Agrupación y suma**: Suma de ventas por canal y por categoría.
- **Cálculo de margen**: Margen = (Ventas - Costo) / Ventas, calculado por categoría.
- **Ranking de productos**: Ordenación de productos por cantidad vendida para mostrar el top.
Estas transformaciones se realizan en los endpoints y se consumen mediante hooks en los componentes de gráficos.

## Decisiones de diseño y trade-offs
- **Next.js App Router**: Estructura modular y escalable para el dashboard y la API.
- **Componentes desacoplados y reutilizables**: Facilitan la extensión y el mantenimiento.
- **Mocks de datos**: Permiten desarrollo con backend ligero, acelerando pruebas y prototipado.
- **Shadcn UI**: Implementación rápida de componentes visuales y estilos modernos.
- **Uso de Webhook**: Permite registrar actividad relevante del sistema.
- **Trade-off**: Acelera el desarrollo y pruebas.

## Declaración de uso de IA
Se utilizó IA (GitHub Copilot) para la generación rápida de estilos (con Tailwind), componentes visuales (Ej. Los componentes del directorio `src/components/shared/`) y la estructura de datos mock, optimizando el tiempo de desarrollo en la interfaz de usuario.
