<template>
	<view class="content">
		<view class="author_ship_wrapper" v-for="(author, index) in authorShip" :key="index" @click="toBookList(author)">
			<view class="author_item">
				<image :src="author.avatarAbsUrl === null ? '../../static/icons/ic_default_avatar.png' : author.avatarAbsUrl" mode="aspectFill"
				 :style="author.avatarAbsUrl === null ? 'border: 2px solid #F5F5F5;' : ''"></image>
				<view class="author_info">
					<text>{{author.name}}</text>
					<text>{{author.summary}}</text>
				</view>
			</view>
			<view class="item_line">

			</view>
		</view>
	</view>
</template>

<script>
	import authorApi from '@/service/api/AuthorApi.js'
	export default {
		data() {
			return {
				authorShip: []
			};
		},
		onLoad() {
			this.reqBookShip()
		},
		methods: {
			async reqBookShip() {
				const res = await authorApi.ship()
				this.authorShip = res.records
				console.info('author ship -->', this.authorShip)
			},
			toBookList(author) {
				uni.navigateTo({
					url: '../bookRecommend/bookRecommend?authorId=' + author.id+'&authorName='+author.name
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		position: absolute;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		align-items: center;

		.author_ship_wrapper {
			display: flex;
			flex-direction: column;
			width: 94%;
			margin-top: 10rpx;

			.author_item {
				width: 100%;
				display: flex;
				flex-direction: row;
				padding-top: 10rpx;
				padding-bottom: 10rpx;

				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}

				.author_info {
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;

					text:nth-child(1) {
						color: $uni-text-color;
						font-weight: bold;
					}

					text:nth-child(2) {
						font-size: 26rpx;
						font-weight: 300;
						margin-top: 10rpx;
					}
				}
			}

			.item_line {
				width: calc(100% - 80rpx);
				background-color: #F8F8F8;
				margin-left: 80rpx;
				height: 2rpx;
			}
		}
	}
</style>
