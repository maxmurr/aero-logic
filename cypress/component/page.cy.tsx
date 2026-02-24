import Page from "../../app/page";

describe("<Page />", () => {
	it("renders the home heading", () => {
		cy.mount(<Page />);
		cy.get("h1").should("have.text", "Home");
	});
});
