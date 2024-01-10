// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.65',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};
