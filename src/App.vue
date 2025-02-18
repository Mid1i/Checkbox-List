<script setup lang="ts">
	import CheckboxDropdown from "@/components/CheckboxDropdown.vue";
</script>


<template>
	<div class="container">
		<a href="#" class="link">Ссылка</a>
		<CheckboxDropdown title="Ваши любимые продукты"/>
		<button class="button">Нажми на меня</button>
	</div>
</template>


<style scoped lang="scss">
	.container {
		align-items: flex-start;
		display: flex;
		flex-direction: column;
		padding: 40px 100px;
	}

	.link {
		color: #FFFFFF;

		&:focus {
			color: red;
		}
	}

	.button {
		color: #FFFFFF;

		&:focus {
			color: red;
		}
	}
</style>
