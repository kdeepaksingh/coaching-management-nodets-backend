import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { type Express } from "express";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Coaching Management API",
      version: "1.0.0",
      description: "Coaching Management System Backend APIs",
    },

    servers: [
      {
        url: "http://localhost:5000/api/auth",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/docs/*.ts", "./src/docs/**/*.ts", "./src/routes/*.ts"],
  //   apis: ["./src/routes/**.ts", "./src/docs/**/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
