<template>
	<view class="content">
		<view class="header">
			<view class="title">
				{{news.title}}
			</view>
			<view class="post_info">
				<view class="cate_author">
					<text>分类：资讯</text>
					<text>作者：非我</text>
				</view>
				<view class="news_source">
					来源： 中华国学网
				</view>
			</view>
		</view>

		<view class="html_wrapper">
			<luch-audio v-if="news.audioUrl" :src="news.audioUrl" :play.sync="audioPlay" :name="news.title"
			 :author="news.author"></luch-audio>
			<video v-if="news.videoUrl" id="newsVideo" :src="news.videoUrl"
			 controls class="news_video" @error="videoErrorCallback"></video>
			<htmlParser :htmlContent="news.content" class="parser_content"></htmlParser>
		</view>
	</view>
</template>

<script>
	import postApi from '@/service/api/PostApi.js'
	export default {
		data() {
			return {
				news: {},
				audioPlay: true
			};
		},
		onLoad(options) {
			console.info('post detial id --> ', options)
			this.reqPostDetail(options.postId)
		},
		onReady() {
			this.videoContext = uni.createVideoContext('newsVideo')
		},
		videoErrorCallback: function(e) {
			uni.showModal({
				content: e.target.errMsg,
				showCancel: false
			})
		},
		methods: {
			async reqPostDetail(postId) {
				this.news = await postApi.detail(postId)
				uni.setNavigationBarTitle({
					title: this.news.title
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 30rpx;
		height: 100%;
		width: 100%;
		position: absolute;
		background-color: #FFFFFF;

		.header {
			.title {
				font-size: 40rpx;
				font-weight: bold;
			}

			.post_info {
				display: flex;
				flex-direction: column;
				margin-top: 20rpx;
				font-size: 26rpx;
				color: #808080;

				.cate_author {
					display: flex;
					flex-direction: row;

					text:nth-child(2) {
						margin-left: 20rpx;
					}
				}

				.news_source {
					margin-top: 10rpx;

				}
			}
		}

		.html_wrapper {
			margin-top: 40rpx;
			width: 93%;

			.parser_content {
				margin-top: 30rpx;
			}

			.news_video {
				margin-top: 30rpx;
				width: 100%;
			}
		}
	}
</style>
