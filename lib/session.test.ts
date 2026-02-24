import { describe, expect, it } from "vitest";
import {
	completeRiddle,
	createSession,
	getSession,
	isSessionComplete,
	recordAttempt,
} from "./session";

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

describe("completeRiddle", () => {
	it("moves riddle from remaining to completed and picks next", () => {
		const session = createSession();
		const firstRiddle = session.currentRiddleId!;

		completeRiddle(session.id, firstRiddle);
		const updated = getSession(session.id)!;

		expect(updated.completedRiddleIds).toContain(firstRiddle);
		expect(updated.remainingRiddleIds).not.toContain(firstRiddle);
		expect(updated.remainingRiddleIds).toHaveLength(3);
		expect(updated.currentRiddleId).not.toBe(firstRiddle);
		expect(updated.currentRiddleId).not.toBeNull();
		expect(updated.remainingRiddleIds).toContain(updated.currentRiddleId);
	});

	it("sets currentRiddleId to null after all riddles completed", () => {
		const session = createSession();

		for (let i = 0; i < 4; i++) {
			const current = getSession(session.id)!.currentRiddleId!;
			completeRiddle(session.id, current);
		}

		const final = getSession(session.id)!;
		expect(final.currentRiddleId).toBeNull();
		expect(final.remainingRiddleIds).toHaveLength(0);
		expect(final.completedRiddleIds).toHaveLength(4);
	});
});

describe("isSessionComplete", () => {
	it("returns false for a new session", () => {
		const session = createSession();
		expect(isSessionComplete(session.id)).toBe(false);
	});

	it("returns true after all riddles are completed", () => {
		const session = createSession();

		for (let i = 0; i < 4; i++) {
			const current = getSession(session.id)!.currentRiddleId!;
			completeRiddle(session.id, current);
		}

		expect(isSessionComplete(session.id)).toBe(true);
	});
});
