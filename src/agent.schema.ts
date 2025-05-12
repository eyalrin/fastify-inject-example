import { FastifySchema } from "fastify";
import {
  AgentDtoSchema,
  AgentCreateDtoSchema,
  AgentUpdateDtoSchema,
} from "../dtos/agent.dto.js";
import { ErrorResponseDtoSchema } from "../../../common/schemas/error.dto.js";

// Schemas for the API endpoints
export const agentGetAllSchema: FastifySchema = {
  response: {
    200: {
      type: "array",
      items: AgentDtoSchema,
    },
  },
};

export const agentGetByIdSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: AgentDtoSchema,
    404: ErrorResponseDtoSchema,
  },
};

export const agentCreateSchema: FastifySchema = {
  // body: AgentCreateDtoSchema,
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      description: { type: "string" },
    },
    required: ["name", "description"],
  },
  response: {
    201: AgentDtoSchema,
    400: ErrorResponseDtoSchema,
  },
};

export const agentUpdateSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  body: AgentUpdateDtoSchema,
  response: {
    200: AgentDtoSchema,
    404: ErrorResponseDtoSchema,
    400: ErrorResponseDtoSchema,
  },
};

export const agentDeleteSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    204: {
      type: "null",
    },
    404: ErrorResponseDtoSchema,
  },
};
