import { describe, expect, it } from "vitest";
import { getRiddleById } from "./riddles";

describe("getRiddleById", () => {
	it("returns a riddle with correct shape for valid ID", () => {
		const riddle = getRiddleById("1");

		expect(riddle).toBeDefined();
		expect(riddle).toHaveProperty("id", "1");
		expect(riddle).toHaveProperty("contents");
		expect(typeof riddle!.contents).toBe("string");
		expect(riddle!.contents.length).toBeGreaterThan(0);
		expect(riddle).toHaveProperty("answers");
		expect(Array.isArray(riddle!.answers)).toBe(true);
		expect(riddle!.answers.length).toBeGreaterThanOrEqual(2);

		for (const answer of riddle!.answers) {
			expect(answer).toHaveProperty("id");
			expect(answer).toHaveProperty("text");
			expect(typeof answer.text).toBe("string");
		}
	});

	it("returns all 4 riddles for IDs 1 through 4", () => {
		for (const id of ["1", "2", "3", "4"]) {
			const riddle = getRiddleById(id);
			expect(riddle).toBeDefined();
			expect(riddle!.id).toBe(id);
		}
	});

	it("returns undefined for non-existent ID", () => {
		expect(getRiddleById("999")).toBeUndefined();
	});
});
