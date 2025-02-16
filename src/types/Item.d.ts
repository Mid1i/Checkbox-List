export type TypeItem = {
	id: number | string;
	label: string;
	checked: boolean;
	indeterminate?: boolean;
	children?: TypeItem[];
};