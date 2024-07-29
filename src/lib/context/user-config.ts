import { getContext, setContext } from "svelte";
import type { ComponentConfig, RenderFunctions } from "../types/config.js";

const CONFIG_KEY = Symbol("SVARO_CONFIG");
const RENDER_FN_KEY = Symbol("SVARO_RENDER_FN");

export function setConfig(config: ComponentConfig[]) {
	setContext(CONFIG_KEY, config);
}

export function getConfig() {
	return getContext<ComponentConfig[]>(CONFIG_KEY);
}

export function setRenderFunctions(renderFn: RenderFunctions) {
	setContext(RENDER_FN_KEY, renderFn);
}

export function getRenderFunctions() {
	return getContext<RenderFunctions>(RENDER_FN_KEY);
}
