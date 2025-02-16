<script setup lang="ts">
	import { computed } from "vue";
	import type { TypeItem } from "@/types/Item";


	const { item } = defineProps<{ item: TypeItem, id?: string }>();

	defineEmits<{
		toggleCheckbox: [item: TypeItem]
	}>();
	
	const controlledId = computed<string | undefined>(() => item.children?.reduce((val, _, index) => `${val} ${item.id}-${index}`, ''));
</script>


<template>
	<label class="checkbox-group__control">
		<input 
			@change="$emit('toggleCheckbox', item)"
			:aria-checked="item.children && 'mixed'"
			:indeterminate="item.indeterminate"
			:aria-controls="controlledId"
			:checked="item.checked"
			:id
			type="checkbox"
			class="checkbox-group__input"
		>
		{{ item.label }}
	</label>
	<ul v-if="item.children" class="checkbox-group__list">
		<li v-for="(child, index) in item.children">
			<CheckboxGroupItem
				@toggleCheckbox="$emit('toggleCheckbox', $event)"
				:item="child"
				:id="`${item.id}-${index}`"
			/>
		</li>
	</ul>
</template>


<style scoped lang="scss"></style>