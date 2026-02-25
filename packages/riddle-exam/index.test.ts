import { describe, expect, it } from "vitest";
import { getAnswerFor } from "./index";

describe("getAnswerFor", () => {
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
