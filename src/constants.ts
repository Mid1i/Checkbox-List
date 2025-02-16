import type { TypeItem } from "@/types/Item";


export const ITEMS: TypeItem[] = [
	{
		id: 1,
		label: "Все фрукты",
		checked: false,
		children: [
			{
				id: 1,
				label: "Яблоко",
				checked: false
			},
			{
				id: 2,
				label: "Банан",
				checked: false
			},
			{
				id: 3,
				label: "Груша",
				checked: false
			}
		]
	}
];