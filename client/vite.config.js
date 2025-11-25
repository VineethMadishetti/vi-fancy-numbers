import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Increase the limit to suppress the warning (e.g., 1000kB = 1MB)
    chunkSizeWarningLimit: 1000, 
    
    // Optional: Force manual chunk splitting if you want granular control
    rollupOptions: {
        output: {
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return 'vendor';
                }
            }
        }
    }
  },
});