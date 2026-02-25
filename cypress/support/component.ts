import { mount } from "cypress/react";

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace -- Cypress type augmentation requires this
	namespace Cypress {
		interface Chainable {
			mount: typeof mount;
		}
	}
}

Cypress.Commands.add("mount", mount);
