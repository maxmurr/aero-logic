"use server";

import { recordAttempt } from "@/lib/session";
import { getAnswerFor } from "@/packages/riddle-exam";

export const checkAnswer = async (
	riddleId: string,
	answerId: string,
	sessionId?: string,
): Promise<{ correct: boolean }> => {
	const correctAnswerId = await getAnswerFor(riddleId);
	const correct = answerId === correctAnswerId;

	if (sessionId && !correct) {
		recordAttempt(sessionId, riddleId);
	}

	return { correct };
};
