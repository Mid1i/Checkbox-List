<script setup lang="ts">
	import { ref, computed, watch } from "vue";
	import type { TypeItem } from "@/types/Item";
	import { generateChildId } from "@/helpers/id";


	const { item } = defineProps<{ 
		focusedId: string;
		tabindex: number;
		item: TypeItem; 
		id: string;
	}>();

	const emit = defineEmits<{
		handleKeydown: [event: KeyboardEvent, item: TypeItem];
		toggleCheckbox: [item: TypeItem];
		setInputRef: [el: HTMLElement];
	}>();

	const inputRef = ref<HTMLElement | null>(null);
	
	const controlledId = computed<string | undefined>(() => item.children?.reduce((acc, child) => `${acc} ${generateChildId(item.id, child.id)}`, ''));


	watch(inputRef, () => inputRef.value && emit("setInputRef", inputRef.value));
</script>


<template>
	<label :class="['checkbox-group__control', { focused: (id || `${item.id}`) === focusedId }]">
		<input 
			@keydown="$emit('handleKeydown', $event, item)"
			@change="$emit('toggleCheckbox', item)"
			:aria-checked="item.children && 'mixed'"
			:indeterminate="item.indeterminate"
			:aria-controls="controlledId"
			:checked="item.checked"
			:tabindex
			:id
			ref="inputRef"
			type="checkbox"
			class="checkbox-group__control-input"
		>
		{{ item.label }}
	</label>
	<ul v-if="item.children" class="checkbox-group__list">
		<li v-for="child in item.children">
			<CheckboxGroup
				@toggle-checkbox="$emit('toggleCheckbox', $event)"
				@handle-keydown="$emit('handleKeydown', $event, child)"
				@set-input-ref="$emit('setInputRef', $event)"
				:id="generateChildId(item.id, child.id)"
				:item="child"
				:focused-id
				:tabindex
			/>
		</li>
	</ul>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;

	
	$gap: 10px;
	$checkboxSize: 18px;

	.checkbox-group__control {
		align-items: center;
		display: flex;
		gap: $gap;

		color: $text;
		cursor: pointer;
		font-size: 18px;

		margin-bottom: 15px;

		&.focused,
		&:hover {
			color: $accent;
			font-weight: 500;
		}

		&.focused {
			text-decoration: underline;
		}

		&-input {
			appearance: none;

			align-items: center;
			display: flex;
			justify-content: center;

			background: $text;
			border-radius: 3px;

			height: $checkboxSize;
			width: $checkboxSize;

			&::before {
				background-position: center center;
				background-repeat: no-repeat;
				background-size: contain;

				content: "";
				
				height: 80%;
				width: 80%;
			}

			&:checked,
			&:indeterminate {
				background: $accent;
			}

			&:checked::before {
				background-image: url('@/assets/icons/check.svg#');
				margin-top: 2px;
			}

			&:indeterminate::before {
				background-image: url('@/assets/icons/dash.svg');
				width: 70%;
			}
		}
	}

	.checkbox-group__list {
		display: flex;
		flex-direction: column;
		gap: 10px;

		padding-left: calc($gap + $checkboxSize);

		& .checkbox-group__control {
			margin-bottom: 0px;
		}
	}
</style>