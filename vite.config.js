export default {
    server: {
      proxy: {
        '/api': {
          target: 'https://deepseek-chat-backend.onrender.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };