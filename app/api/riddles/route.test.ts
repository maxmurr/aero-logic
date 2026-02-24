import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/riddles", () => {
	it("returns all riddles in { riddles: [...] } shape", async () => {
		const request = new Request("http://localhost:3000/api/riddles");
		const response = await GET(request);
		const body = await response.json();

		expect(response.status).toBe(200);
		expect(body).toHaveProperty("riddles");
		expect(Array.isArray(body.riddles)).toBe(true);
		expect(body.riddles).toHaveLength(4);
	});

	it("each riddle has id, contents, and answers", async () => {
		const request = new Request("http://localhost:3000/api/riddles");
		const response = await GET(request);
		const body = await response.json();

		for (const riddle of body.riddles) {
			expect(riddle).toHaveProperty("id");
			expect(riddle).toHaveProperty("contents");
			expect(riddle).toHaveProperty("answers");
		}
	});
});
