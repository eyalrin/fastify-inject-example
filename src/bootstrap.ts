import { FastifyInstance } from "fastify";
import { buildServer } from "./server.js";

export async function startServer(): Promise<FastifyInstance> {
  try {
    return await buildServer();
  } catch (err) {
    console.error("Failed to startApp server:", err);
    process.exit(1);
  }
}