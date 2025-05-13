import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import agentsRoutes from "./agent.route.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export async function buildServer() {
  // Create a Fastify instance
  const server = Fastify({}).withTypeProvider<TypeBoxTypeProvider>();

  // Listen for termination signals and perform graceful shutdown function
  const closeGracefully = async (signal: NodeJS.Signals) => {
    console.log(`Received signal to terminate: ${signal}`);

    // Close the server
    await server.close();
    console.log("HTTP server closed");

    // Exit the process
    process.exit(0);
  };

  const listeners = ["SIGINT", "SIGTERM"];
  listeners.forEach((signal) => {
    process.on(signal, closeGracefully);
  });

  // Register Swagger
  await server.register(swagger, {
    openapi: {
      info: {
        title: "Parlant Studio API",
        description: "API for managing parlant servers",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:" + process.env.API_PORT,
        },
      ],
    },
  });

  await server.register(swaggerUi, {
    routePrefix: "/documentation",
  });

  // Register top level routes
  await server.register(agentsRoutes, { prefix: "/agents" });

  // Set up error handler
  server.setErrorHandler((error, _request, reply) => {
    server.log.error(error);
    reply.status(error.statusCode || 500).send({
      statusCode: error.statusCode || 500,
      error: error.name,
      message: error.message || "Internal Server Error",
    });
  });

  try {
    const host = process.env.API_HOST || "0.0.0.0";
    const port = Number(process.env.API_PORT) || 3000;

    if (process.env.NODE_ENV !== "test") {
      const host = process.env.API_HOST || "0.0.0.0";
      const port = Number(process.env.API_PORT) || 3000;
      await server.listen({ port, host });
      server.swagger();
      console.log(`Server is running at http://${host}:${port}`);
      console.log(
        `API documentation is available at http://${host}:${port}/documentation`,
      );
    }

    console.log(`Server is running at http://${host}:${port}`);
    console.log(
      `API documentation is available at http://${host}:${port}/documentation`,
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  return server;
}
