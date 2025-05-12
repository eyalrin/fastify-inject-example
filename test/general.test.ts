import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FastifyInstance } from "fastify/types/instance.js";
import { startServer } from "../src/bootstrap.js";

let server: FastifyInstance;

describe("API auth endpoint tests", async () => {
  beforeEach(async () => {
    vi.useFakeTimers();
  });

  afterEach(async () => {
    vi.useRealTimers();
    await server.close();
  });

  it("should perform register successfully", async () => {
    // Arrange
    server = await startServer();
    await server.ready();

    const response = await server.inject({
      method: "POST",
      url: "/agents",
      headers: {
        "Content-Type": "application/json",
      },
      payload: {
        name: "Bla",
        description: "Bol",
      },
    });

    // Assert
    expect(response.statusCode).toBe(200);
  });
});
