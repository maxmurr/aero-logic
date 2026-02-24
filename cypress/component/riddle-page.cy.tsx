import RiddlePage from "../../app/riddle/[id]/page";

describe("Riddle Page", () => {
	it("renders riddle contents and all answer options", () => {
		cy.mount(<RiddlePage params={Promise.resolve({ id: "1" })} />);

		cy.contains(
			"I have wings but carry no feathers",
		).should("be.visible");

		cy.contains("A helicopter").should("be.visible");
		cy.contains("A jet airplane").should("be.visible");
		cy.contains("A hot air balloon").should("be.visible");
		cy.contains("A hang glider").should("be.visible");
	});

	it("renders a different riddle for ID 2", () => {
		cy.mount(<RiddlePage params={Promise.resolve({ id: "2" })} />);

		cy.contains(
			"Pilots check me before every flight",
		).should("be.visible");

		cy.contains("An altimeter").should("be.visible");
	});
});
