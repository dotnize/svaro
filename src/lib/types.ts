import type { Component } from "svelte";

export interface ComponentConfig {
	id: string;
	name: string;
	render: Component;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	props?: any; // TODO
}

export type ComponentData = Omit<ComponentConfig, "render">;
export type RenderFunctions = Map<string, Component>;
