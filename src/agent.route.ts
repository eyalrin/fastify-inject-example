import { FastifyPluginAsync } from "fastify";
import { agentCreateSchema, agentGetAllSchema } from "./agent.schema.js";

const agentsRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /agents - Get all agents
  fastify.get("/", { schema: agentGetAllSchema }, async (_request, reply) => {
    console.log("Getting all agents");
    return reply.code(200).send();
  });

  // POST /agents - Create a new agent
  fastify.post("/", { schema: agentCreateSchema }, async (_request, reply) => {
    console.log("Creating a new agent");
    return reply.code(200).send();
  });
};

export default agentsRoutes;
