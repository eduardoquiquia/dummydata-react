# DummyData Dashboard

> Explorador de productos en tiempo real consumiendo la API pública de [DummyJSON](https://dummyjson.com/products).

---

## Descripción

**DummyData Dashboard** es una aplicación React que consume la API de DummyJSON para mostrar un catálogo de productos con filtros, búsqueda y visualización en tabla. Diseñada con estética oscura e industrial con acento naranja.

## Tecnologías

| Tecnología | Uso |
|---|---|
| React 19 | UI framework |
| Vite | Build tool |
| React Router v7 | Navegación SPA |
| Tailwind CSS v3 | Estilos utilitarios |
| Shadcn/UI (componentes manuales) | Badge, Button, Card |
| Lucide React | Íconos |
| DummyJSON API | Datos de productos |

## Estructura del proyecto

```
dummydata-react/
├── src/
│   ├── components/
│   │   ├── ui/          # Componentes Shadcn
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── Skeleton.jsx
│   ├── hooks/
│   │   └── useProducts.js
│   ├── lib/
│   │   └── utils.js
│   ├── pages/
│   │   ├── Home.jsx     # Ruta "/"
│   │   └── Entities.jsx # Ruta "/entities"
│   └── App.jsx
└── index.html
```

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Hero + listado de productos con búsqueda y filtros |
| `/entities` | Tabla con 10 propiedades, ordenamiento y paginación |

## Pasos para ejecutar

### Requisitos previos
- Node.js 18+

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/dummydata-react.git
cd dummydata-react

# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev
```

La app estará en `http://localhost:5173`

```bash
# Build de producción
npm run build
npm run preview
```

## Deploy

🌐 **Deploy:** https://dummydata-react.vercel.app *(actualizar con tu URL)*

## Video Demo

📺 **YouTube:** https://youtu.be/XXXXXXX *(actualizar con tu link)*

## Funcionalidades implementadas

- ✅ Consumo de API pública (dummyjson.com/products)
- ✅ Ruta `/` con Hero animado, estadísticas y grilla de productos
- ✅ Búsqueda en tiempo real + filtros por categoría
- ✅ Ruta `/entities` con tabla paginada y ordenamiento por columna
- ✅ Navegación con React Router
- ✅ Componentes estilo Shadcn (Badge, Button, Card)
- ✅ Loading skeletons
- ✅ Diseño responsive
