import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { componentTagger } from "lovable-tagger"

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8081,
    allowedHosts: [
      "8081-rrsartneoai-amsterdambi-54r7s798nyk.ws-eu120.gitpod.io",
      "8080-rrsartneoai-amsterdambi-54r7s798nyk.ws-eu120.gitpod.io",
    ],
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))