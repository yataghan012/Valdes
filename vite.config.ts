import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Cambia 'nombre-de-tu-repo' por el nombre real de tu repositorio en GitHub
  base: '/valdes/', 
});
