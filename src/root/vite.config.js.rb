export default = {
  server: {
    proxy: {
      '/api': {
        target: 'https://melody-check.vercel.app',  # http://localhost:3000, https://melody-check.vercel.app
        change_origin: true,
        rewrite: lambda {|path| path.replace(/^\/api/, '/api') },
      },
    },
  },
}
