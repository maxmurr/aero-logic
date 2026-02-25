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

	describe("try again flow", () => {
		it("shows Try Again button after wrong answer", () => {
			const riddle = getRiddleById("1")!;
			const mockCheckAnswer = cy.stub().resolves({ correct: false });

			cy.mount(
				<RiddleView riddle={riddle} checkAnswer={mockCheckAnswer} />,
			);

			cy.get('[data-test="answer-1"]').click();
			cy.get('[data-test="try-again-button"]').should("be.visible");
		});

		it("resets answer selection when Try Again is clicked", () => {
			const riddle = getRiddleById("1")!;
			const mockCheckAnswer = cy.stub().resolves({ correct: false });

			cy.mount(
				<RiddleView riddle={riddle} checkAnswer={mockCheckAnswer} />,
			);

			cy.get('[data-test="answer-1"]').click();
			cy.get('[data-test="try-again-button"]').click();

			cy.get('[data-test="answer-1"]').should("not.be.disabled");
			cy.get('[data-test="answer-2"]').should("not.be.disabled");
			cy.get('[data-test="answer-3"]').should("not.be.disabled");
			cy.get('[data-test="answer-4"]').should("not.be.disabled");

			cy.get('[data-test="answer-1"]').should("not.have.attr", "data-status");
			cy.get('[data-test="result-message"]').should("not.exist");
		});

		it("calls onRetry callback when Try Again is clicked", () => {
			const riddle = getRiddleById("1")!;
			const mockCheckAnswer = cy.stub().resolves({ correct: false });
			const onRetry = cy.stub();

			cy.mount(
				<RiddleView
					riddle={riddle}
					checkAnswer={mockCheckAnswer}
					onRetry={onRetry}
				/>,
			);

			cy.get('[data-test="answer-1"]').click();
			cy.get('[data-test="try-again-button"]')
				.click()
				.then(() => {
					cy.wrap(onRetry).should("have.been.calledOnce");
				});
		});
	});

	describe("next question flow", () => {
		it("shows Next Question button after correct answer", () => {
			const riddle = getRiddleById("1")!;
			const mockCheckAnswer = cy.stub().resolves({ correct: true });

			cy.mount(
				<RiddleView riddle={riddle} checkAnswer={mockCheckAnswer} />,
			);

			cy.get('[data-test="answer-2"]').click();
			cy.get('[data-test="next-question-button"]').should("be.visible");
		});

		it("calls onNextQuestion callback when Next Question is clicked", () => {
			const riddle = getRiddleById("1")!;
			const mockCheckAnswer = cy.stub().resolves({ correct: true });
			const onNextQuestion = cy.stub();

			cy.mount(
				<RiddleView
					riddle={riddle}
					checkAnswer={mockCheckAnswer}
					onNextQuestion={onNextQuestion}
				/>,
			);

			cy.get('[data-test="answer-2"]').click();
			cy.get('[data-test="next-question-button"]')
				.click()
				.then(() => {
					cy.wrap(onNextQuestion).should("have.been.calledOnce");
				});
		});

		it("does not show Try Again on correct, or Next Question on wrong", () => {
			const riddle = getRiddleById("1")!;

			const correctCheck = cy.stub().resolves({ correct: true });
			cy.mount(
				<RiddleView riddle={riddle} checkAnswer={correctCheck} />,
			);
			cy.get('[data-test="answer-2"]').click();
			cy.get('[data-test="next-question-button"]').should("exist");
			cy.get('[data-test="try-again-button"]').should("not.exist");
		});
	});

	describe("progress indicator", () => {
		it("shows 'Question X of Y' when progress prop is provided", () => {
			const riddle = getRiddleById("1")!;

			cy.mount(
				<RiddleView
					riddle={riddle}
					progress={{ current: 2, total: 4 }}
				/>,
			);

			cy.get('[data-test="progress-indicator"]')
				.should("be.visible")
				.and("contain", "Question 2 of 4");
		});

		it("does not show progress indicator when prop is absent", () => {
			const riddle = getRiddleById("1")!;

			cy.mount(<RiddleView riddle={riddle} />);

			cy.get('[data-test="progress-indicator"]').should("not.exist");
		});
	});
});
