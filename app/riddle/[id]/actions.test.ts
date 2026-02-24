import { describe, expect, it, vi } from "vitest";
import { createSession, getSession } from "@/lib/session";

vi.mock("@/packages/riddle-exam", () => ({
	getAnswerFor: vi.fn().mockResolvedValue("2"),
}));

import { checkAnswer, getNextRiddle } from "./actions";

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

	it("completes riddle on correct answer when session provided", async () => {
		const session = createSession();

		await checkAnswer("1", "2", session.id);

		const updated = getSession(session.id)!;
		expect(updated.completedRiddleIds).toContain("1");
	});

	it("works without session (backward compat)", async () => {
		const result = await checkAnswer("1", "2");
		expect(result).toEqual({ correct: true });
	});
});

describe("getNextRiddle", () => {
	it("returns next riddle ID and isComplete false when riddles remain", async () => {
		const session = createSession();
		const result = await getNextRiddle(session.id);

		expect(result.nextRiddleId).toBeDefined();
		expect(["1", "2", "3", "4"]).toContain(result.nextRiddleId);
		expect(result.isComplete).toBe(false);
	});

	it("returns null nextRiddleId and isComplete true when all done", async () => {
		const session = createSession();

		for (let i = 0; i < 4; i++) {
			const current = getSession(session.id)!.currentRiddleId!;
			await checkAnswer(current, "2", session.id);
		}

		const result = await getNextRiddle(session.id);
		expect(result.nextRiddleId).toBeNull();
		expect(result.isComplete).toBe(true);
	});
});
