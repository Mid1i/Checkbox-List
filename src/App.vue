<script setup lang="ts">
	import CheckboxGroup from "@/components/CheckboxGroup.vue";
	import { ITEMS } from "@/constants";
</script>


<template>
	<div class="container">
		<CheckboxGroup
			title="Ваши любимые фрукты"
			:items="ITEMS"
		/>
	</div>
</template>


<style scoped lang="scss"></style>
