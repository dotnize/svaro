import { getContext, setContext } from "svelte";
import type { SerializableComponent } from "../types/config.js";

class PageState {
	tree = $state<SerializableComponent[]>([]);
	selectedId = $state<string | null>(null);

	constructor() {}

	setSelectedId(id: string) {
		this.selectedId = id;
	}
}

const PAGE_STATE_KEY = Symbol("SVARO_PAGE_STATE");

export function createPageState() {
	const pageState = new PageState();
	setContext(PAGE_STATE_KEY, pageState);
	return pageState;
}

export function getPageState() {
	return getContext<PageState>(PAGE_STATE_KEY);
}
