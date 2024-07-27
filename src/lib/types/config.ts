import type { Component } from "svelte";
import type { Fields } from "./fields.js";

export interface ComponentConfig<T extends Fields = Fields> {
	id: string;
	name: string;
	render: Component;
	fields?: T;
	defaultProps?: Partial<{ [K in keyof T]: T[K]["defaultValue"] }>; // TODO should depend on fields
}

export type RenderFunctions = Map<string, Component>;

export interface SerializableComponent {
	id: string;
	props: Record<string, unknown>;
}
