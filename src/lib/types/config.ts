import type { Component } from "svelte";
import type { Fields } from "./fields.js";

export interface ComponentConfig<T extends Fields = Fields> {
	id: string;
	name: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	render: Component<any>;
	fields?: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RenderFunctions = Map<string, Component<any>>;

export interface SerializableComponent {
	id: string;
	props: Record<string, unknown>;
}
