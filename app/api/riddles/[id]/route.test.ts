import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/riddles/[id]", () => {
	it("returns riddle JSON for valid ID", async () => {
		const request = new Request("http://localhost:3000/api/riddles/1");
		const response = await GET(request, { params: Promise.resolve({ id: "1" }) });
		const body = await response.json();

		expect(response.status).toBe(200);
		expect(body).toHaveProperty("id", "1");
		expect(body).toHaveProperty("contents");
		expect(body).toHaveProperty("answers");
		expect(Array.isArray(body.answers)).toBe(true);
	});

	it("returns 404 for non-existent ID", async () => {
		const request = new Request("http://localhost:3000/api/riddles/999");
		const response = await GET(request, { params: Promise.resolve({ id: "999" }) });

		expect(response.status).toBe(404);
	});
});
