<template>
	<view>
		<parser :html="htmlContent"></parser>
	</view>
</template>

<script>
	import parser from '../jyf-parser/jyf-parser.vue'
	export default {
		components: {
			parser
		},
		props: ['htmlContent'],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
