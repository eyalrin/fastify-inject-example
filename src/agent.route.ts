import { FastifyPluginAsync } from "fastify";
import {
  agentCreateSchema,
  agentDeleteSchema,
  agentGetAllSchema,
  agentGetByIdSchema,
  agentUpdateSchema,
} from "../schemas/agent.schema.js";
import { AgentCreateDto, AgentUpdateDto } from "../dtos/agent.dto.js";

const agentsRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /agents - Get all agents
  fastify.get("/", { schema: agentGetAllSchema }, async (request) => {
    return await request.agentController.list();
  });

  // GET /agents/:id - Get a agent by id
  fastify.get(
    "/:id",
    { schema: agentGetByIdSchema },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const agent = await request.agentController.getById(id);

      if (!agent) {
        return reply.notFound(`Agent with ID ${id} not found`);
      }

      return agent;
    },
  );

  // POST /agents - Create a new agent
  fastify.post("/", { schema: agentCreateSchema }, async (request, reply) => {
    const agentData = request.body as AgentCreateDto;
    const newAgent = await request.agentController.create(agentData);
    return reply.code(201).send(newAgent);
  });

  // PATCH /agents/:id - Update a agent
  fastify.patch(
    "/:id",
    { schema: agentUpdateSchema },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const agentData = request.body as AgentUpdateDto;

      const updatedAgent = await request.agentController.update(id, agentData);

      if (!updatedAgent) {
        return reply.notFound(`Agent with ID ${id} not found`);
      }

      return updatedAgent;
    },
  );

  // DELETE /agents/:id - Delete a agent
  fastify.delete(
    "/:id",
    { schema: agentDeleteSchema },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      await request.agentController.delete(id);

      return reply.code(204).send();
    },
  );
};

export default agentsRoutes;
