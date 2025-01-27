export default {server: {proxy: {
  "/api": {
    target: "https://melody-check.vercel.app",
    changeOrigin: true,

    rewrite(path) {
      return path.replace(/^\/api/m, "/api")
    }
  }
}}}