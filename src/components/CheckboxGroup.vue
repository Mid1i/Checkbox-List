<script setup lang="ts">
	import { ref, watch } from "vue";
	import type { TypeItem } from "@/types/Item";
	import CheckboxGroupItem from "@/components/CheckboxGroupItem.vue";


	const { items } = defineProps<{
		title: string;
		items: TypeItem[];
	}>();


	const currentItems = ref<TypeItem[]>(items);

	const isAllChecked = (parent: TypeItem): boolean => !!parent.children?.every(item => item.checked);

	const isSomeChecked = (parent: TypeItem): boolean => !!parent.children?.some(item => item.checked);

	const toggleCheckbox = (item: TypeItem): void => {
		item.checked = !item.checked;
		item.children && item.children.forEach(child => child.checked = item.checked);
	};

	const updateParentState = (parent: TypeItem): void => {
		parent.indeterminate = !isAllChecked(parent) && isSomeChecked(parent);
		parent.checked = isAllChecked(parent);
	};


	watch(currentItems, () => currentItems.value.forEach(updateParentState), { deep: true });
</script>


<template>
	<div class="container">
		<fieldset class="checkbox-group">
			<legend class="checkbox-group__title">{{ title }}</legend>
			<CheckboxGroupItem 
				@toggleCheckbox="toggleCheckbox"
				v-for="item in currentItems"
				:key="item.id"
				:item
			/>
		</fieldset>
	</div>
</template>


<style scoped lang="scss"></style>
