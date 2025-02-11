const express = require("express");
const cors = require("cors");
const app = express();
// const swaggerJSDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
// const client = require("prom-client");

app.use(cors());
app.use(express.json()); //why??
require("dotenv").config();

// const register = new client.Registry();
// client.collectDefaultMetrics({ register });

// const httpRequestDurationMicroseconds = new client.Histogram({
//   name: "http_request_duration_seconds",
//   help: "Duration of HTTP requests in seconds",
//   labelNames: ["method", "route", "status"],
//   buckets: [0.1, 0.5, 1, 2, 5], // Buckets for response time
// });

// register.registerMetric(httpRequestDurationMicroseconds);
// app.use((req, res, next) => {
//   const end = httpRequestDurationMicroseconds.startTimer();
//   res.on("finish", () => {
//     end({ method: req.method, route: req.path, status: res.statusCode });
//   });
//   next();
// });

// Expose metrics endpoint for Prometheus
// app.get("/metrics", async (req, res) => {
//   res.set("Content-Type", register.contentType);
//   res.end(await register.metrics());
// });

// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Insurance API",
//       version: "1.0.0",
//       description: "API for managing policies, policyholders, and claims",
//     },
//     servers: [{ url: "http://localhost:3000" }],
//     components: {
//       schemas: {
//         Policy: {
//           /* ... */
//         },
//         PolicyHolder: {
//           /* ... */
//         },
//         Claim: {
//           /* ... */
//         },
//       },
//       securitySchemes: {
//         bearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT",
//         },
//       },
//     },
//     security: [{ bearerAuth: [] }],
//   },
//   apis: ["./src/routes/*.js", "./app.js"],
// };

// const swaggerSpec = swaggerJSDoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// ----------------------------------------
// const jwt = require("jsonwebtoken");
// const { authenticateJWT } = require("./middleware/jwt");

const policyroute = require("./src/routes/policyroute");
const policyholderroute = require("./src/routes/policyholderroute");
const claimroute = require("./src/routes/claimroute");

// app.get("/generate-token", (req, res) => {
//   const token = jwt.sign(
//     { user: "admin" },
//     process.env.JWT_SECRET || "your_secret_key",
//     { expiresIn: "1h" }
//   );
//   res.json({ token });
// });

// app.use(authenticateJWT);

app.get("/", (req, res) => {
  console.log("Welcome to the server");
  res.send("Welcome to the server");
});

app.use("/policy", policyroute);
app.use("/policyholder", policyholderroute);
app.use("/claim", claimroute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
