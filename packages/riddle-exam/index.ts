const ANSWER_KEY: Record<string, string> = {
	"1": "2",
	"2": "3",
	"3": "1",
	"4": "2",
};

export const getAnswerFor = async (riddleId: string): Promise<string> => {
	const answerId = ANSWER_KEY[riddleId];
	if (!answerId) {
		throw new Error(`No answer for riddle ${riddleId}`);
	}
	return answerId;
};
