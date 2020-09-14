<template>
	<view class="content">
		<view class="top_book_wrapper">
			<view class="book_item" v-for="(book, index) in books" :key="index" @click="bookClick(book)">
				<image :src="book.coverPicAbsUrl" mode="aspectFill"></image>
				<view class="book_info">
					<text>{{book.name}}</text>
					<text>{{book.summary}}</text>
					<text>{{book.authorNames.join(' ')}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import bookApi from '@/service/api/BookApi.js'
	export default {
		data() {
			return {
					books: []
			}
		},
		onLoad(options) {
			console.info('books options -->', options)
			if (options.authorId === undefined) {
				this.reqRecommendBook()
			}else {
				this.reqBooksByAuthorId(options.authorId)
				uni.setNavigationBarTitle({
					title: options.authorName + '的书籍'
				})
			}
			
		},
		methods: {
			async reqRecommendBook() {
				const res = await bookApi.recommend()
				console.info('books --> ', res)
				this.books = res.records
			},
			async reqBooksByAuthorId(authorId) {
				this.books = await bookApi.findByAuthorId(authorId)
			},
			bookClick(book) {
				uni.navigateTo({
					url: '../bookDetail/bookDetail?bookId='+ book.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		.top_book_wrapper {
			display: flex;
			flex-direction: column;
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
