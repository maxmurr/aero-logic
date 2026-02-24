import { FinishView } from "../../app/finish/finish-view";

const mockResults = [
	{ riddleId: "1", attempts: 2 },
	{ riddleId: "2", attempts: 1 },
	{ riddleId: "3", attempts: 3 },
	{ riddleId: "4", attempts: 1 },
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
