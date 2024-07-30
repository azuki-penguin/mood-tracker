// See https://kit.svelte.dev/docs/types#app

import type { Session } from "$lib/server/session";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			currentUser: Session|null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
