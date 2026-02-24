import { RiddleView } from "../../app/riddle/[id]/riddle-view";
import { getRiddleById } from "../../lib/riddles";

describe("Riddle Page", () => {
	it("renders riddle contents and all answer options", () => {
		const riddle = getRiddleById("1")!;
		cy.mount(<RiddleView riddle={riddle} />);

		cy.contains(
			"I have wings but carry no feathers",
		).should("be.visible");

		cy.contains("A helicopter").should("be.visible");
		cy.contains("A jet airplane").should("be.visible");
		cy.contains("A hot air balloon").should("be.visible");
		cy.contains("A hang glider").should("be.visible");
	});

	it("renders a different riddle for ID 2", () => {
		const riddle = getRiddleById("2")!;
		cy.mount(<RiddleView riddle={riddle} />);

		cy.contains(
			"Pilots check me before every flight",
		).should("be.visible");

		cy.contains("An altimeter").should("be.visible");
	});
});
