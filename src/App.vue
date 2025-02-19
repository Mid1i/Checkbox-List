<script setup lang="ts">
	import CheckboxDropdown from "@/components/CheckboxDropdown.vue";
</script>


<template>
	<div class="container">
		<a class="container__link" href="#">Элемент, имеющий фокус</a>
		<CheckboxDropdown title="Ваши любимые продукты"/>
		<button class="container__button">Элемент, имеющий фокус</button>
	</div>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;


	.container {
		align-items: flex-start;
		display: flex;
		flex-direction: column;
		padding: 40px 100px;

		&__link {
			color: $text;
			font-size: 20px;
			font-weight: 500;

			margin-bottom: 50px;
	
			&:focus {
				color: $accent;
			}
		}
	
		&__button {
			color: $text;
			font-size: 20px;
			font-weight: 500;

			margin-top: 50px;
	
			&:focus {
				color: $accent;
			}
		}
	}
</style>
