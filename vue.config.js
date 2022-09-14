module.exports = {
  publicPath: "/",
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass"),
      },
    },
  },
  configureWebpack: {
    devtool: "source-map",
  },
};
