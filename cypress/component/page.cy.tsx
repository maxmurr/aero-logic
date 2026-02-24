import { LandingView } from "../../app/landing-view";

const startButton = <button type="button">Start</button>;

describe("Landing Page", () => {
	it("renders work interval label", () => {
		cy.mount(
			<LandingView interval="Easy jets" iso="2026-02-24T14:30:00.000Z" hhmm="1430" action={startButton} />,
		);

		cy.contains("Easy jets").should("be.visible");
	});

	it("renders timestamp in ISO 8601 and HHMM aviation format", () => {
		cy.mount(
			<LandingView interval="Easy jets" iso="2026-02-24T14:30:00.000Z" hhmm="1430" action={startButton} />,
		);

		cy.contains("2026-02-24T14:30:00.000Z").should("be.visible");
		cy.contains("1430Z").should("be.visible");
	});

	it("renders welcome message", () => {
		cy.mount(
			<LandingView interval="Busy times" iso="2026-02-24T08:00:00.000Z" hhmm="0800" action={startButton} />,
		);

		cy.contains("Welcome to Aero Logic").should("be.visible");
	});

	it("renders the Start entry point", () => {
		cy.mount(
			<LandingView interval="Sleepies" iso="2026-02-24T02:00:00.000Z" hhmm="0200" action={startButton} />,
		);

		cy.contains("Start").should("be.visible");
	});
});
