import { getAllRiddles } from "./riddles";

export type Session = {
	id: string;
	remainingRiddleIds: string[];
	completedRiddleIds: string[];
	attempts: Record<string, number>;
	currentRiddleId: string | null;
};

const sessions = new Map<string, Session>();

const shuffle = <T>(array: T[]): T[] => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

export const createSession = (): Session => {
	const id = crypto.randomUUID();
	const riddleIds = shuffle(getAllRiddles().map((r) => r.id));

	const session: Session = {
		id,
		remainingRiddleIds: riddleIds,
		completedRiddleIds: [],
		attempts: {},
		currentRiddleId: riddleIds[0],
	};

	sessions.set(id, session);
	return session;
};

export const getSession = (id: string): Session | undefined => {
	return sessions.get(id);
};

export const recordAttempt = (sessionId: string, riddleId: string): void => {
	const session = sessions.get(sessionId);
	if (!session) return;
	session.attempts[riddleId] = (session.attempts[riddleId] ?? 0) + 1;
};

export const completeRiddle = (sessionId: string, riddleId: string): void => {
	const session = sessions.get(sessionId);
	if (!session) return;

	session.remainingRiddleIds = session.remainingRiddleIds.filter(
		(id) => id !== riddleId,
	);
	session.completedRiddleIds.push(riddleId);

	if (session.remainingRiddleIds.length > 0) {
		const randomIndex = Math.floor(
			Math.random() * session.remainingRiddleIds.length,
		);
		session.currentRiddleId = session.remainingRiddleIds[randomIndex];
	} else {
		session.currentRiddleId = null;
	}
};

export const isSessionComplete = (sessionId: string): boolean => {
	const session = sessions.get(sessionId);
	if (!session) return false;
	return session.remainingRiddleIds.length === 0;
};
