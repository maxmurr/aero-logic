import { describe, expect, it } from "vitest";
import { startSession } from "./landing-actions";

describe("startSession", () => {
	it("returns a sessionId and firstRiddleId", async () => {
		const result = await startSession();

		expect(result.sessionId).toBeDefined();
		expect(typeof result.sessionId).toBe("string");
		expect(result.firstRiddleId).toBeDefined();
		expect(["1", "2", "3", "4"]).toContain(result.firstRiddleId);
	});
});
