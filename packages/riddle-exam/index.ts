const ANSWER_KEY: Record<string, string> = {
	"1": "2",
	"2": "3",
	"3": "1",
	"4": "2",
};

export const getAnswerFor = async (riddleId: string): Promise<string> => {
	// Side effects: fetch riddle data and xeno-canto recording
	await fetch(`http://localhost:3000/api/riddle/${riddleId}`);
	await fetch("https://xeno-canto.org/api/2/recordings?query=bird");

	const answerId = ANSWER_KEY[riddleId];
	if (!answerId) {
		throw new Error(`No answer for riddle ${riddleId}`);
	}
	return answerId;
};
