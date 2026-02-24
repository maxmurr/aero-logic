import { describe, expect, it } from "vitest";
import {
	completeRiddle,
	createSession,
	getSession,
	recordAttempt,
} from "@/lib/session";
import { getSessionResults } from "./actions";

describe("getSessionResults", () => {
	it("returns per-riddle attempt stats sorted by riddle ID", async () => {
		const session = createSession();

		// Complete all 4 riddles with varying attempts
		for (let i = 0; i < 4; i++) {
			const current = getSession(session.id)!.currentRiddleId!;
			// Record some extra attempts for variety
			if (i % 2 === 0) {
				recordAttempt(session.id, current);
			}
			recordAttempt(session.id, current);
			completeRiddle(session.id, current);
		}

		const results = await getSessionResults(session.id);

		expect(results).not.toBeNull();
		expect(results!).toHaveLength(4);

		// Should be sorted by riddle ID
		const ids = results!.map((r) => r.riddleId);
		expect(ids).toEqual([...ids].sort());

		// Each result should have a positive attempt count
		for (const result of results!) {
			expect(result.attempts).toBeGreaterThanOrEqual(1);
		}
	});

	it("returns null for invalid session", async () => {
		const results = await getSessionResults("nonexistent");
		expect(results).toBeNull();
	});
});
