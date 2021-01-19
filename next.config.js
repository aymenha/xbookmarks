const isProd = process.env.NODE_ENV === "production";

module.exports = {
  assetPrefix: isProd ? "/bookmarks" : "",
  basePath: isProd ? "/bookmarks" : "",
};
