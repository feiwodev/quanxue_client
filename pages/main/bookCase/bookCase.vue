<template>
	<view class="content">
		<uni-grid :column="3" :show-border="false" :highlight="false" @change="gridClick">
			<uni-grid-item class="book_case_wrapper" v-for="(book, index) in bookCases" :key="index">
				<view class="book_info">
					<image :src="book.coverPicAbsUrl" mode="aspectFill"></image>
					<text>{{book.name}}</text>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
	import bookApi from '@/service/api/BookApi.js'
	import localBookCase from '@/utils/LocalBookCase.js'
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	export default {
		components: {uniGrid,uniGridItem},
		data() {
			return {
				bookCases: []
			};
		},
		onShow() {
			this.reqBookCaseInfos()
		},
		methods: {
			async reqBookCaseInfos() {
				const bookIds = await localBookCase.list()
				console.info('book ids -->', bookIds)
				if (bookIds.length > 0) {
					this.bookCases = await bookApi.findAllByBookIds(bookIds)
					console.info('book case list -->', this.bookCases)
				}
			},
			gridClick(e) {
				const book = this.bookCases[e.detail.index]
				console.info('click book -->', book)
				uni.navigateTo({
					url: '../../bookDetail/bookDetail?bookId='+book.id
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		.book_case_wrapper {
			padding: 30rpx;
			.book_info {
				display: flex;
				flex-direction: column;
				
				image {
					width: 160rpx;
					height: 200rpx;
				}
				
				text {
					margin-top: 20rpx;
					color: $uni-text-color;
					max-lines: 2;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			}
		}
	}
</style>
