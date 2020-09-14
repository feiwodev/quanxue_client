<template>
	<view>
		<banner :banner-list="slides" :swiper-config="swiperConfig" v-on:itemClick="slideItemClick"></banner>
	</view>
</template>

<script>
	import banner from '../EtherealWheat-banner/specialBanner.vue'
	export default {
		components: {
			banner
		},
		props: ['slides'],
		data() {
			return {
				swiperConfig: {
					indicatorDots: true,
					indicatorColor: 'rgba(255, 255, 255, .4)',
					indicatorActiveColor: 'rgba(255, 255, 255, 1)',
					autoplay: true,
					interval: 3000,
					duration: 300,
					circular: true,
					previousMargin: '60rpx',
					nextMargin: '60rpx'
				}
			};
		},
		methods: {
			slideItemClick(slide) {
				console.info('slide --->', slide)
				if (slide.targetType.val === 2) { // 书籍
					uni.navigateTo({
						url: '../../bookDetail/bookDetail?bookId='+ slide.targetId,
						fail(e) {
							console.error(e)
						}
					})
				}else if (slide.targetType.val === 1) { // 资讯
					uni.navigateTo({
						url: '../../postDetail/postDetail?postId=' + slide.targetId
					})
				}else if (slide.targetType.val === 3) {
					
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
