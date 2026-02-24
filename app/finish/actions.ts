"use server";

import { getSession } from "@/lib/session";

export type RiddleResult = {
	riddleId: string;
	attempts: number;
};

export const getSessionResults = async (
	sessionId: string,
): Promise<RiddleResult[] | null> => {
	const session = getSession(sessionId);
	if (!session) return null;

	return Object.entries(session.attempts)
		.map(([riddleId, attempts]) => ({ riddleId, attempts }))
		.sort((a, b) => a.riddleId.localeCompare(b.riddleId));
};
