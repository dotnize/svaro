import { getContext, setContext } from "svelte";
import type { SerializableComponent } from "../types/config.js";

class PageState {
	_tree = $state<SerializableComponent[]>([]);
	_selectedId = $state<string | null>(null);

	constructor() {}

	getSelectedComponent() {
		return this._tree.find((c) => c.id === this._selectedId);
	}

	removeSelectedComponent() {
		const index = this._tree.findIndex((c) => c.id === this._selectedId);
		this._selectedId = null;
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

	get tree() {
		return this._tree;
	}

	get selectedId() {
		return this._selectedId;
	}

	setTree(newTree: SerializableComponent[]) {
		this._tree = $state.snapshot(newTree);
	}

	setSelectedId(id: string | null) {
		this._selectedId = id;
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
