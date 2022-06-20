// vite.config.js
const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                g94: resolve(__dirname, './src/pages/avanzamento_fresa_G94.html'),
                g95: resolve(__dirname, './src/pages/avanzamento_tornio_G95.html'),
                g96: resolve(__dirname, './src/pages/formula_velocita_di_taglio_CNC.html'),
                g97: resolve(__dirname, './src/pages/formula_numero_giri_CNC.html'),
                spianaturaGcode: resolve(__dirname, './src/pages/spianatura_gcode.html'),
                hTolleranza: resolve(__dirname, './src/pages/tolleranze_albero_h.html')
            }
        }
    }
})