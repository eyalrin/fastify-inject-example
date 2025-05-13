import { FastifySchema } from "fastify";

// Schemas for the API endpoints
export const agentGetAllSchema: FastifySchema = {
  response: {
    200: {
      type: "object",
    },
  },
};

export const agentCreateSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      description: { type: "string" },
    },
    required: ["name", "description"],
  },
  response: {
    200: {
      type: "object",
    },
  },
};
