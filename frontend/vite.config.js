import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/",
    plugins: [react()],
    preview: {
        port: 3000,
        strictPort: true,
    },
    server: {
        watch: {
            usePolling: true
        },
        port: 3001,
        strictPort: true,
        host: true,
        origin: "http://localhost:3001",
    },
});

// Teste
