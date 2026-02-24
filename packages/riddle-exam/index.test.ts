import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getAnswerFor } from "./index";

describe("getAnswerFor", () => {
	let fetchSpy: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		fetchSpy = vi.fn().mockResolvedValue(new Response(JSON.stringify({})));
		vi.stubGlobal("fetch", fetchSpy);
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("returns '2' for riddle 1", async () => {
		const answerId = await getAnswerFor("1");
		expect(answerId).toBe("2");
	});

	it.each([
		["1", "2"],
		["2", "3"],
		["3", "1"],
		["4", "2"],
	])("returns '%s' for riddle %s", async (riddleId, expectedAnswerId) => {
		const answerId = await getAnswerFor(riddleId);
		expect(answerId).toBe(expectedAnswerId);
	});

	it("throws for unknown riddle ID", async () => {
		await expect(getAnswerFor("999")).rejects.toThrow();
	});
});
