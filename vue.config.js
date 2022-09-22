module.exports = {
  publicPath: "/",
  lintOnSave: true,
  chainWebpack: (config) => {
    config.plugin("define").tap((args) => {
      const v = JSON.stringify(
        /* eslint-disable-next-line */
        require("./package.json").version
      );
      args[0]["process.env"]["VUE_APP_VERSION"] = v;
      return args;
    });
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass"),
        prependData: `@import "@/../node_modules/bootstrap/scss/functions"; @import "@/assets/variables.scss";`,
      },
    },
  },
  configureWebpack: {
    devtool: "source-map",
  },
};
