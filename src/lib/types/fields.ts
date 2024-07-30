interface BaseField {
	label: string;
}

export interface TextField extends BaseField {
	type: "text";
	defaultValue?: string;
}

export interface TextareaField extends BaseField {
	type: "textarea";
	defaultValue?: string;
}

export interface ColorField extends BaseField {
	type: "color";
	defaultValue?: string;
}

export interface NumberField extends BaseField {
	type: "number";
	min?: number;
	max?: number;
	step?: number;
	defaultValue?: number;
}

export interface BooleanField extends BaseField {
	type: "boolean";
	defaultValue?: boolean;
}

export interface RadioField extends BaseField {
	type: "radio";
	options: string[];
	defaultValue?: string;
}

export interface SelectField extends BaseField {
	type: "select";
	mode?: "single" | "multiple"; // Default is "single"
	options: string[];
	defaultValue?: string;
}

export interface ArrayField extends BaseField {
	type: "array";
	defaultValue?: string[];
}

export type Field =
	| TextField
	| TextareaField
	| ColorField
	| NumberField
	| BooleanField
	| RadioField
	| SelectField
	| ArrayField;

export type Fields = Record<string, Field>;
