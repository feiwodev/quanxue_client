<template>
	<view class="content">
		<topTab :tab-list="newsCateList" :tabCur.sync="tabCur" :tabClass="'tab_class'"></topTab>
		<view class="news_item" v-for="(news, index) in newsList" :key="index" @click="newsClick(news)">
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
</template>

<script>
	import newsApi from '@/service/api/PostApi.js'
	import newsCateApi from '@/service/api/PostCateApi.js'
	import topTab from '../../components/wuc-tab/wuc-tab.vue'
	export default {
		components: {
			topTab
		},
		data() {
			return {
				newsCateList: [],
				newsList: [],
				tabCur: 0
			}
		},
		onLoad() {
			this.reqNewsCateList()
		},
		methods: {
			async reqNewsCateList() {
				const cateList = await newsCateApi.list()
				if (cateList) {
					cateList.forEach(cate => {
						this.newsCateList.push({
							name: cate.name,
							id: cate.id
						})
					})
					const postList = await newsApi.listByCateId(this.newsCateList[0].id)
					this.newsList = postList.records
				}
			},
			async reqNewsList(cateId) {

			},
			newsClick(news) {
				uni.navigateTo({
					url: '../postDetail/postDetail?postId=' + news.id
				})
			},
			tabChange(e) {
				console.info(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		background-color: #F8F8F8;
		position: absolute;
		align-items: center;

		.tab_class {
			background-color: #FFFFFF;
		}

		.news_item {
			display: flex;
			align-items: center;
			margin-top: 10rpx;
			padding: 20rpx;
			background-color: #FFFFFF;
			border-radius: 6rpx;
			height: 180rpx;
			width: 90%;

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
</style>
