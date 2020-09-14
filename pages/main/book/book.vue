<template>
	<view class="content">
		<scroll-view class="left_cate">
			<view class="cate_item" v-for="(cate, index) in cates" :key="index">
				<view class="item_selected">
					
				</view>
				<view class="title">
					{{cate.name}}
				</view>
			</view>
		</scroll-view>
		<view class="right_books_wrapper">
			<view class="book_top_info">
				共{{books.length}}本
			</view>
			<scroll-view class="right_books" @scrolltolower="upDonwRefresh">
				<view class="book_item" v-for="(book, index) in books" :key="index">
					<image :src="book.coverPicAbsUrl" mode="aspectFill"></image>
					<view class="book_info">
						<text>{{book.name}}</text>
						<text>{{book.summary}}</text>
						<text>{{book.authorNames.join(' / ')}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import bookCateApi from '@/service/api/BookCateApi.js'
	import bookApi from '@/service/api/BookApi.js'
	export default {
		data() {
			return {
				cates: [],
				books: []
			}
		},
		onLoad() {
			this.reqBookCates()
		},
		methods: {
			async reqBookCates() {
				this.cates = await bookCateApi.list()
				this.reqBooksByCate(this.cates[0].id)
			},
			async reqBooksByCate(cateId) {
				const res = await bookApi.listByCateId(cateId)
				this.books = res.records
			},
			upDonwRefresh(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: row;
		height: 100%;
		position: absolute;
		.left_cate {
			display: flex;
			flex-direction: column;
			width: 200rpx;
			height: 100%;
			background-color: #F5F5F5;
			.cate_item {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				background-color: #FFFFFF;
				.item_selected {
					width: 6rpx;
					height: 50rpx;
					background-color: #F0AD4E;
				}
				.title {
					margin-left: 10rpx;
					text-align: center;
					height: 80rpx;
					line-height: 80rpx;
					width: 100%;
				}
			}
		}
		.right_books_wrapper {
			.book_top_info {
				width: 100%;
				color: #999999;
				text-align: center;
				position: absolute;
				line-height: 50rpx;
				height: 50rpx;
			}
			.right_books {
				display: flex;
				flex-direction: column;
				flex: 1;
				width: 100%;
				padding: 20rpx;
				margin-top: 50rpx;
				.book_top_info {
					position: absolute;
					z-index: 999;
				}
				.book_item {
					display: flex;
					flex-direction: row;
					image {
						width: 160rpx;
						height: 200rpx;
					}
					.book_info {
						flex: 1;
						margin-left: 20rpx;
						display: flex;
						flex-direction: column;
						text:nth-child(1) {
							font-size: 30rpx;
							font-weight: normal;
						}
						text:nth-child(2) {
							flex: 1;
							font-size: 26rpx;
							color: #808080;
							margin-top: 20rpx;
						}
						text:nth-child(3) {
							font-size: 26rpx;
							color: #808080;
							margin-top: 20rpx;
						}
					}
				}
			}
		}
	}
</style>
