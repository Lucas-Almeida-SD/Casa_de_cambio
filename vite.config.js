import {defineConfig} from 'vite';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

export default defineConfig({
  define: {
    'process.env': process.env,
  },
});
