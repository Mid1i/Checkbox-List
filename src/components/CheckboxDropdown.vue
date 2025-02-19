<script setup lang="ts">
	import { ref, useId, watch } from "vue";
	import type { TypeItem } from "@/types/Item";
	import CheckboxGroup from "@/components/CheckboxGroup.vue";
	import { ITEMS } from "@/constants";


	defineProps<{ title: string }>();


	const id = useId();
	const isOpen = ref<boolean>(false);

	const inputElements = ref<HTMLElement[]>([]);
	const dropdownList = ref<HTMLElement | null>(null);
	const dropdownToggleButton = ref<HTMLElement | null>(null);

	const items = ref<TypeItem[]>(ITEMS);
	const focusedId = ref<string>("");

	const toggleDropdown = (): void => {
		isOpen.value = !isOpen.value;

		if (isOpen.value) {
			changeFocus(inputElements.value[0].id);
			inputElements.value[0]?.focus()
		} else {
			changeFocus("");
			dropdownToggleButton.value?.focus()
		}
	};

	const changeFocus = (newFocus: string): void => {
		focusedId.value = newFocus;
	};
	
	const setInputRef = (el: HTMLElement): void => {
		if (el && !inputElements.value.includes(el)) inputElements.value.push(el);
	};

	const isAllChecked = (parent: TypeItem): boolean => !!parent.children?.every(item => item.checked);

	const isSomeChecked = (parent: TypeItem): boolean => !!parent.children?.some(item => item.checked);

	const toggleCheckbox = (item: TypeItem, id: string): void => {
		item.checked = !item.checked;
		
		if (item.children) item.children.forEach(child => child.checked = item.checked);

		updateParentState();
		changeFocus(id);
	};

	const updateParentState = (): void => {
		items.value.forEach(parent => {
			if (parent.children) {
				parent.checked = isAllChecked(parent);
				parent.indeterminate = !isAllChecked(parent) && isSomeChecked(parent);
			}
		});
	};

	const keyHandlers: Record<string, (event: KeyboardEvent) => void> = {
		ArrowDown: event => { event.preventDefault(); moveFocus("down") },
		ArrowUp: event => { event.preventDefault(); moveFocus("up") },
		Escape: event => { event.preventDefault(); toggleDropdown() },
		Tab: toggleDropdown
	};
	
	const moveFocus = (direction: "up" | "down"): void => {
		const currentIndex = inputElements.value.findIndex(el => el.id === focusedId.value);
		const newIndex = direction === "down" ? Math.min(currentIndex + 1, inputElements.value.length - 1) : Math.max(currentIndex - 1, 0);

		changeFocus(inputElements.value[newIndex].id);
		inputElements.value[newIndex]?.focus();
	};

	const handleKeydown = (event: KeyboardEvent): void => {
		keyHandlers[event.key]?.(event);
	};


	watch(items, updateParentState, { deep: true });
</script>


<template>
	<div class="dropdown">
		<button 
			@click="toggleDropdown"
			:class="['dropdown__button', { active: isOpen }]"
			:aria-controls="`${id}-dropdown`"
			:aria-expanded="isOpen"
			aria-haspopup="listbox"
			role="combobox"
			ref="dropdownToggleButton"
		>
			{{ title }}
			<svg class="dropdown__button-icon" height="20" width="20">
				<use href="@/assets/icons/sprite.svg#arrow-down"/>
			</svg>
		</button>
		<ul 
			:class="['dropdown__list', { opened: isOpen }]"
			:id="`${id}-dropdown`"
			ref="dropdownList"
			role="listbox"
			tabindex="-1"
		>
			<li
				v-for="item in items"
				:key="item.id"
				role="option"
				class="dropdown__list-el"
			>
				<CheckboxGroup
					@toggle-checkbox="toggleCheckbox"
					@handle-keydown="handleKeydown"
					@set-input-ref="setInputRef"
					:id="`checkbox-${item.id}`"
					:tabindex="isOpen ? 0 : -1"
					:focused-id
					:item
				/>
			</li>
		</ul>
	</div>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;


	.dropdown {
		$borderRadius: 10px;

		$paddingBlock: 15px; 
		$paddingInline: 15px;

		position: relative;

		&__button {
			$self: "dropdown__button";

			align-items: center;
			display: flex;
			gap: 25px;
			justify-content: space-between;

			border: 1px solid transparent;
			border-radius: $borderRadius;

			color: $text;
			font-size: 20px;
			font-weight: 500;

			padding: 8px $paddingInline;

			&-icon {
				color: $text;
				transition: all 0s;
			}

			&:not(.active, :focus):hover,
			&:not(.active, :focus):hover .#{$self}-icon {
				color: $accent;
			}

			&.active,
			&:focus {
				background: $accent;
			}

			&.active {
				border-radius: $borderRadius $borderRadius 0px 0px;
			}
		}

		&__list {
			background: $background;
			box-shadow: 0px 32px 48px 0px $boxShadow;
			border-radius: 0px 0px $borderRadius;

			display: flex;
			flex-direction: column;
			gap: 15px;

			padding: $paddingBlock $paddingInline;

			overflow: overlay;

			position: absolute;
			top: 100%;
			left: 0px;

			pointer-events: none;
			opacity: 0;

			max-height: 300px;
			width: 100%;

			z-index: 2;

			&::-webkit-scrollbar {
				width: calc($paddingInline + 2px);
				
				&-track {
					background: transparent;
				}

				&-thumb {
					background: $accent;
					border-top: $paddingBlock solid $background;
					border-bottom: $paddingBlock solid $background;
					border-right: $paddingInline solid $background;
				}
			}

			&.opened {
				pointer-events: auto;
				opacity: 1;
			}
		}
	}
</style>