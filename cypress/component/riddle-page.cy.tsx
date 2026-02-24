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

	describe("answer verification", () => {
		it("highlights correct answer in green with success message", () => {
			const riddle = getRiddleById("1")!;
			const mockCheckAnswer = cy.stub().resolves({ correct: true });

			cy.mount(
				<RiddleView riddle={riddle} checkAnswer={mockCheckAnswer} />,
			);

			cy.get('[data-test="answer-2"]').click();

			cy.get('[data-test="answer-2"]').should(
				"have.attr",
				"data-status",
				"correct",
			);
			cy.contains("Great job! Your answer is correct").should("be.visible");
		});

		it("highlights wrong answer in red with error message", () => {
			const riddle = getRiddleById("1")!;
			const mockCheckAnswer = cy.stub().resolves({ correct: false });

			cy.mount(
				<RiddleView riddle={riddle} checkAnswer={mockCheckAnswer} />,
			);

			cy.get('[data-test="answer-1"]').click();

			cy.get('[data-test="answer-1"]').should(
				"have.attr",
				"data-status",
				"wrong",
			);
			cy.contains("Your answer is wrong").should("be.visible");
		});

		it("disables all answers after one is selected", () => {
			const riddle = getRiddleById("1")!;
			const mockCheckAnswer = cy.stub().resolves({ correct: true });

			cy.mount(
				<RiddleView riddle={riddle} checkAnswer={mockCheckAnswer} />,
			);

			cy.get('[data-test="answer-2"]').click();

			cy.get('[data-test="answer-1"]').should("be.disabled");
			cy.get('[data-test="answer-2"]').should("be.disabled");
			cy.get('[data-test="answer-3"]').should("be.disabled");
			cy.get('[data-test="answer-4"]').should("be.disabled");
		});
	});
});
