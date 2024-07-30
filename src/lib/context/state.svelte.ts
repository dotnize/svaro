import { getContext, setContext } from "svelte";
import type { SerializableComponent } from "../types/config.js";

class PageState {
	tree = $state<SerializableComponent[]>([]);
	selectedId = $state<string | null>(null);

	constructor() {}

	setSelectedId(id: string) {
		this.selectedId = id;
	}

	getSelectedComponent() {
		return this.tree.find((c) => c.id === this.selectedId);
	}

	removeSelectedComponent() {
		const index = this.tree.findIndex((c) => c.id === this.selectedId);
		this.selectedId = null;
		if (index !== -1) {
			this.tree.splice(index, 1);
		}
	}

	updateSelectedComponentProp(key: string, value: unknown) {
		const component = this.getSelectedComponent();
		if (component) {
			component.props[key] = value;
		}
	}

	getSelectedComponentProp(key: string) {
		const component = this.getSelectedComponent();
		return component?.props[key];
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
