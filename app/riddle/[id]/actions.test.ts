import { describe, expect, it, vi } from "vitest";

vi.mock("@/packages/riddle-exam", () => ({
	getAnswerFor: vi.fn().mockResolvedValue("2"),
}));

import { checkAnswer } from "./actions";

describe("checkAnswer", () => {
	it("returns correct when answer matches", async () => {
		const result = await checkAnswer("1", "2");
		expect(result).toEqual({ correct: true });
	});

	it("returns wrong when answer does not match", async () => {
		const result = await checkAnswer("1", "3");
		expect(result).toEqual({ correct: false });
	});
});
