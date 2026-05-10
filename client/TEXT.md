# Frontend
## ReactJS

### Estructura
- `api/`: Archivos con las funciones que se conectan con los endpoints.
- `components/`: Archivos componentes de la visual. Pueden efectuar alguna funcion cuando se reenderizan, con la funcion useEffect. Devuelven un HTML. Tambien tienen funciones que se ejecutan cuando pasan cosas en el HTML, como que hacer cuando se toca un boton. En general, tiene llamadas a funciones de la API.
- `pages/`: Archivos con las paginas definidas por cada URL. En cada pagina hay componentes llamados.

### Crear el proyecto

nvm install 18

nvm use 18

npx create-react-app .

npm install react-router-dom

npm install mongodb

#### El siguiente comando isntala todo lo del package json.
npm install

### Correr el proyecto

npm start

o

npm run dev

# Tailwind

nvm use 20

npm install tailwindcss @tailwindcss/postcss postcss



# TAILWIND FUNCIONANDO

## Crear proyecto
npm create vite@latest frontend
cd frontend
npm install

## Instalar Tailwind v4
npm install tailwindcss @tailwindcss/postcss postcss

## Configurar PostCSS
touch postcss.config.mjs

con contenido

export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}

editar src/index.css

@import "tailwindcss";

// src/main.jsx
import "./index.css";

## Correr todo

nvm use 20
npm run dev
