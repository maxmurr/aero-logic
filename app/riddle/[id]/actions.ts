"use server";

import { getAnswerFor } from "@/packages/riddle-exam";

export const checkAnswer = async (
	riddleId: string,
	answerId: string,
): Promise<{ correct: boolean }> => {
	const correctAnswerId = await getAnswerFor(riddleId);
	return { correct: answerId === correctAnswerId };
};
