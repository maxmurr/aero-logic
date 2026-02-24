import { describe, expect, it, vi } from "vitest";
import { createSession, getSession } from "@/lib/session";

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

	it("records attempt on wrong answer when session provided", async () => {
		const session = createSession();

		await checkAnswer("1", "3", session.id);

		const updated = getSession(session.id)!;
		expect(updated.attempts["1"]).toBe(1);
	});

	it("works without session (backward compat)", async () => {
		const result = await checkAnswer("1", "2");
		expect(result).toEqual({ correct: true });
	});
});
