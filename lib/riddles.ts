export type Answer = {
	id: string;
	text: string;
};

export type Riddle = {
	id: string;
	contents: string;
	answers: Answer[];
};

const RIDDLES: Riddle[] = [
	{
		id: "1",
		contents:
			"I have wings but carry no feathers, I fly through the sky but am not a bird. I drink fuel instead of water, and my voice is a deafening roar. What am I?",
		answers: [
			{ id: "1", text: "A helicopter" },
			{ id: "2", text: "A jet airplane" },
			{ id: "3", text: "A hot air balloon" },
			{ id: "4", text: "A hang glider" },
		],
	},
	{
		id: "2",
		contents:
			"Pilots check me before every flight, I tell them how high they are above the sea. I spin when the pressure changes, and without me, landings would be a guess. What am I?",
		answers: [
			{ id: "1", text: "A compass" },
			{ id: "2", text: "A speedometer" },
			{ id: "3", text: "An altimeter" },
			{ id: "4", text: "A fuel gauge" },
		],
	},
	{
		id: "3",
		contents:
			"I am the invisible highway in the sky. Controllers guide planes along my path, and without me, the airspace would be chaos. I have no pavement, but every pilot follows my rules. What am I?",
		answers: [
			{ id: "1", text: "An airway" },
			{ id: "2", text: "A runway" },
			{ id: "3", text: "A flight plan" },
			{ id: "4", text: "A contrail" },
		],
	},
	{
		id: "4",
		contents:
			"I sit in the cockpit but never touch the controls. I record everything that happens on a flight — every word, every warning, every silence. After an accident, I am the first one everyone wants to hear from. What am I?",
		answers: [
			{ id: "1", text: "The autopilot" },
			{ id: "2", text: "The black box" },
			{ id: "3", text: "The co-pilot" },
			{ id: "4", text: "The flight manual" },
		],
	},
];

export const getRiddleById = (id: string): Riddle | undefined => {
	return RIDDLES.find((riddle) => riddle.id === id);
};
