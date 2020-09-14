<template>
	<view class="content">
		<homeSlide :slides="slides" v-if="slides.length > 0"></homeSlide>
		<!-- top menu start -->
		<view class="home_top_menu">
			<view class="menu_item" v-for="(menu, index) in topMenus" :key="index" :style="'background-color:'+menu.bgColor"
			 @click="topMenuClick(menu)">
				{{menu.title}}
			</view>
		</view>
		<!-- top menu end -->
		<!-- top news start -->
		<view class="news_wrapper">
			<view class="title">
				最新资讯
			</view>
			<view class="news_item" v-for="(news, index) in topNews" :key="index" @click="newsClick(news)">
				<image :src="news.coverPicPath" mode="aspectFill"></image>
				<view class="post_summary">
					<view class="title">
						{{news.title}}
					</view>
					<view class="publish_info">
						<text>{{news.cateName}}</text>
						<text>{{news.publishTimeName}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- top news end -->
		<!-- top book start -->
		<view class="top_book_wrapper">
			<view class="title">
				最新书籍
			</view>
			<view class="book_item" v-for="(book, index) in topBooks" :key="index" @click="bookClick(book)">
				<image :src="book.coverPicAbsUrl" mode="aspectFill"></image>
				<view class="book_info">
					<text>{{book.name}}</text>
					<text>{{book.summary}}</text>
					<text>{{book.authorNames.join(' ')}}</text>
				</view>
			</view>
		</view>
		<!-- top book end -->
	</view>
</template>

<script>
	import slideApi from '@/service/api/SlideApi.js'
	import topMenus from '@/utils/data/HomeTopMenu.js'
	import postApi from '@/service/api/PostApi.js'
	import bookApi from '@/service/api/BookApi.js'
	export default {
		data() {
			return {
				slides: [],
				topNews: [],
				topBooks: [],
				topMenus: topMenus.HomeTopMenus
			}
		},
		onLoad() {
			this.reqSlides()
			this.reqTopNews()
			this.reqTopBooks()
		},
		methods: {
			async reqSlides() {
				const res = await slideApi.list()
				res.forEach(item => {
					this.slides.push({
						picture: item.picPath,
						title: item.targetName === '' ? '' : item.targetName,
						description: item.summary,
						path: item.targetUrl == null ? '' : item.targetUrl,
						targetType: item.targetType,
						targetId: item.targetId
					})
				})
			},
			async reqTopNews() {
				this.topNews = await postApi.top()
			},
			async reqTopBooks() {
				this.topBooks = await bookApi.top()
			},
			// menu click
			topMenuClick(menu) {
				console.info('menu --> ', menu)
				uni.navigateTo({
					url: menu.path,
					fail(e) {
						console.error(e)
					}
				})
			},
			// 跳转到资讯详情
			newsClick(news) {
				uni.navigateTo({
					url: '../../postDetail/postDetail?postId=' + news.id
				})
			},
			// 跳转到书籍详情
			bookClick(book) {
				uni.navigateTo({ 
					url: '../../bookDetail/bookDetail?bookId='+ book.id
				})
			}
		},
		onPullDownRefresh() {
			this.reqSlides()
			this.reqTopNews()
			this.reqTopBooks()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 2000)
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.home_top_menu {
			display: flex;
			width: 100%;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
			margin-top: 20rpx;

			.menu_item {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 200rpx;
				border-radius: 10rpx;
				padding: 20rpx 10rpx 20rpx 10rpx;
				color: #FFFFFF;
				font-size: 13px;
			}
		}

		.news_wrapper {
			display: flex;
			flex-direction: column;
			padding: 30rpx;
			width: 94%;
			margin-top: 30rpx;

			.title {
				font-size: 30rpx;
				font-weight: bold;
			}

			.news_item {
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				padding: 20rpx;
				background-color: #FFFFFF;
				border-radius: 6rpx;
				height: 180rpx;

				image {
					width: 260rpx;
					height: 180rpx;
				}

				.post_summary {
					display: flex;
					flex: 1;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 20rpx;
					height: 100%;
					width: 10%;
					align-items: flex-start;

					.title {
						font-size: 35rpx;
						color: $uni-text-color;
						font-weight: normal;
						max-lines: 2;
						width: 100%;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}

					.publish_info {
						color: #999999;
						font-size: 24rpx;

						text:nth-child(2) {
							margin-left: 20rpx;
						}
					}
				}
			}
		}

		.top_book_wrapper {
			display: flex;
			flex-direction: column;
			padding: 30rpx;
			width: 94%;

			.title {
				font-size: 30rpx;
				font-weight: bold;
			}

			.book_item {
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				padding: 20rpx;
				background-color: #FFFFFF;
				border-radius: 6rpx;

				image {
					width: 160rpx;
					height: 200rpx;
				}

				.book_info {
					display: flex;
					flex-direction: column;
					height: 100%;
					width: 100%;
					margin-left: 20rpx;
					flex: 1;
					text {
						color: #8F8F94;
					}
					text:nth-child(1) {
						color: $uni-text-color;
						font-size: 32rpx;
						max-lines: 1;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
					text:nth-child(2) {
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						margin-top: 20rpx;
					}
					text:nth-child(3) {
						margin-top: 20rpx;
					}
				}
			}
		}
	}
</style>
