import { FinishView } from "../../app/finish/finish-view";

const mockResults = [
	{ riddleId: "1", contents: "I have wings but carry no feathers, I fly through the sky but am not a bird. I drink fuel instead of water, and my voice is a deafening roar. What am I?", attempts: 2 },
	{ riddleId: "2", contents: "Pilots check me before every flight, I tell them how high they are above the sea. I spin when the pressure changes, and without me, landings would be a guess. What am I?", attempts: 1 },
	{ riddleId: "3", contents: "I am the invisible highway in the sky. Controllers guide planes along my path, and without me, the airspace would be chaos. I have no pavement, but every pilot follows my rules. What am I?", attempts: 3 },
	{ riddleId: "4", contents: "I sit in the cockpit but never touch the controls. I record everything that happens on a flight. What am I?", attempts: 1 },
];

describe("Finish Page", () => {
	it("renders per-riddle attempt stats", () => {
		cy.mount(<FinishView results={mockResults} />);

		cy.get('[data-test="attempts-1"]').should("contain", "2 attempts");
		cy.get('[data-test="attempts-2"]').should("contain", "1 attempt");
		cy.get('[data-test="attempts-3"]').should("contain", "3 attempts");
		cy.get('[data-test="attempts-4"]').should("contain", "1 attempt");
	});

	it("renders Back to Home button linking to /", () => {
		cy.mount(<FinishView results={mockResults} />);

		cy.get('[data-test="back-to-home"]')
			.should("be.visible")
			.and("have.attr", "href", "/");
	});

	it("renders riddle text alongside attempt count", () => {
		cy.mount(<FinishView results={mockResults} />);

		cy.get('[data-test="result-1"]').should(
			"contain",
			"I have wings but carry no feathers",
		);
		cy.get('[data-test="result-2"]').should(
			"contain",
			"Pilots check me before every flight",
		);
	});
});
