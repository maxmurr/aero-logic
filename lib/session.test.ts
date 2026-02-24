import { describe, expect, it } from "vitest";
import { createSession, getSession, recordAttempt } from "./session";

describe("createSession", () => {
	it("returns a session with all 4 riddle IDs and empty progress", () => {
		const session = createSession();

		expect(session.id).toBeDefined();
		expect(typeof session.id).toBe("string");
		expect(session.id.length).toBeGreaterThan(0);

		expect(session.remainingRiddleIds).toHaveLength(4);
		expect(session.remainingRiddleIds.sort()).toEqual(["1", "2", "3", "4"]);

		expect(session.completedRiddleIds).toEqual([]);
		expect(session.attempts).toEqual({});

		expect(session.currentRiddleId).toBeDefined();
		expect(session.remainingRiddleIds).toContain(session.currentRiddleId);
	});
});

describe("getSession", () => {
	it("returns a previously created session by ID", () => {
		const created = createSession();
		const retrieved = getSession(created.id);

		expect(retrieved).toBeDefined();
		expect(retrieved!.id).toBe(created.id);
	});

	it("returns undefined for unknown ID", () => {
		expect(getSession("nonexistent")).toBeUndefined();
	});
});

describe("recordAttempt", () => {
	it("increments attempt counter for a riddle", () => {
		const session = createSession();
		const riddleId = session.currentRiddleId!;

		recordAttempt(session.id, riddleId);
		expect(getSession(session.id)!.attempts[riddleId]).toBe(1);

		recordAttempt(session.id, riddleId);
		expect(getSession(session.id)!.attempts[riddleId]).toBe(2);
	});
});
