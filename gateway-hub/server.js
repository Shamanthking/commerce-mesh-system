const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const verifyToken = require("./middleware/verifyToken");
const checkAdmin = require("./middleware/checkAdmin");

const app = express();

/* -------- REQUEST LOGGER -------- */
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.url}`);
  next();
});

/* -------- PROXY FACTORY -------- */
function proxy(target, rewrite = null) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    ws: true,
    pathRewrite: rewrite || {},
    timeout: 5000,
    proxyTimeout: 5000,

    onError(err, req, res) {
      console.error(`Proxy error (${target})`, err.message);

      if (!res.headersSent) {
        res.status(502).json({
          message: "Service unavailable",
          service: target
        });
      }
    }
  });
}

/* -------- AUTH SERVICE -------- */

app.use(
  "/auth",
  proxy("http://localhost:5000", {
    "^/auth": ""
  })
);

/* -------- PRODUCT SERVICE -------- */

app.post(
  "/products",
  verifyToken,
  checkAdmin,
  proxy("http://localhost:4001")
);

app.use(
  "/products",
  verifyToken,
  proxy("http://localhost:4001")
);

/* -------- CATEGORY SERVICE -------- */

app.post(
  "/categories",
  verifyToken,
  checkAdmin,
  proxy("http://localhost:4002")
);

app.use(
  "/categories",
  verifyToken,
  proxy("http://localhost:4002")
);

/* -------- ORDER SERVICE -------- */

app.use(
  "/orders",
  verifyToken,
  proxy("http://localhost:4003")
);

/* -------- HEALTH CHECK -------- */

app.get("/", (req, res) => {
  res.json({
    gateway: "running"
  });
});

/* -------- START SERVER -------- */

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});