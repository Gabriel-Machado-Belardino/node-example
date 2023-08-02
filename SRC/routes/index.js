let routes = [];

const routesController = (app) => {
  const userRoutes = require("./user.route");

  app.use(userRoutes.alias, userRoutes.router);

  registerRoutes(app, "./SRC/routes");
};

const registerRoutes = (app, dir) => {
  const fs = require("fs");

  fs.readdirSync(dir).forEach((file) => {
    let filePath = `${dir}/${file}`;
    if (fs.lstatSync(filePath).isDirectory()) {
      registerRoutes(app, filePath);
    } else if (file.endsWith(".routes.js")) {
      const { alias, router } = require(`./${file}`);
      if (!router) return;

      for (let route of router.stack) {
        if (route.route) {
          routes.push({
            method: route.route.stack[0].method,
            path: `${alias}${route.route.path}`,
          });
        }
      }
    }
  });
};

module.exports = { routesController, routes };
