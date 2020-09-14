<template>
	<view class="content">
		<view class="book_info">
			<image :src="book.coverPicAbsUrl" mode="aspectFill"></image>
			<view class="book_summary">
				<text class="book_name">{{book.name}}</text>
				<view class="book_author">
					<image style="width: 40rpx; height: 40rpx;" src="../../static/icons/ic_author.png" mode="aspectFill"></image>
					<text>{{authors}}</text>
				</view>
				<view class="read_process">
					<view class="lable">
						<text>阅读进度</text>
						<text>{{process}}%</text>
					</view>
					<progress :percent="process" active stroke-width="5" backgroundColor="#F5F5F5" class="process" activeColor="#399f51" :border-radius="30"/>
				</view>
			</view>
		</view>
		<view class="detail_body">
			<view class="body_item">
				<text>章节</text>
				<text>{{chapterTotal}}</text>
			</view>
			<view class="item_line"></view>
			<view class="body_item">
				<text>出版社</text>
				<text>{{book.published === null ? '未知' : book.published}}</text>
			</view>
			<view class="item_line"></view>
			<view class="body_item">
				<text>收藏</text>
				<text>{{chapterTotal}}</text>
			</view>
		</view>
		<view class="book_intro">
			{{book.summary}}
		</view>
		<view class="book_chapters">
			<text>章节</text>
			<view class="chapter_line"></view>
			<view class="chapter_wrapper">
				<view class="item" v-for="(chapter, index) in chapters" :key="index">
					<text class="item_title" @click="chapterItemClick(chapter)">{{chapter.title}}</text>
					<text class="item_sub_title" v-for="(subChapter, index) in chapter.childChapters" :key="index" @click="chapterItemClick(subChapter)">{{subChapter.title}}</text>
				</view>
			</view>
		</view>
		<view class="book_footer">
			<view class="book_chapters_menu" @click="showChapters">
				<image style="width: 50rpx; height: 50rpx;" src="../../static/icons/ic_chapters.png" mode="aspectFill"></image>
				<text>章节</text>
			</view>
			<view class="center_reader" @click="readBook">
				<image style="width: 50rpx; height: 50rpx;" src="../../static/icons/ic_reader.png" mode="aspectFill"></image>
				<text>阅读</text>
			</view>
			<view class="book_fav" @click="addBookFav">
				<image style="width: 50rpx; height: 50rpx;" :src="favIcons[isFav ? 1 : 0]" mode="aspectFill"></image>
				<text>收藏</text>
			</view>
		</view>
		<bookDrawer ref="bookDrawer" v-on:drawerChange="drawerChange" :book="book" :chapters="chapters" v-on:chapterClick="chapterClick"></bookDrawer>
	</view>
</template>

<script>
	import bookApi from '@/service/api/BookApi.js'
	import chapterApi from '@/service/api/ChapterApi.js'
	import localBookCase from '@/utils/LocalBookCase.js'
	import toast from '@/utils/Toast.js'
	import readProcess from '@/utils/ReadProcessUtil.js'
	export default {
		data() {
			return {
				book: {},
				authors: '',
				openDrawer: false,
				chapterTotal: 0,
				chapters: [],
				isFav: false,
				favIcons: [
					'../../static/icons/ic_fav_normal.png',
					'../../static/icons/ic_fav_active.png'
				],
				process: 0
			};
		},
		onLoad(options) {
			this.reqBook(options.bookId)
		},
		onShow() {
			if (this.book != {} || this.book !== undefined) {
				readProcess.get(this.book.id).then(res => {
					if (res != null) {
						this.process = res.process
					}else {
						this.process = 0
					}
				})
			}
		},
		methods: {
			getBookLocalData(){
				readProcess.get(this.book.id).then(res => {
					if (res != null) {
						this.process = res.process
					}else {
						this.process = 0
					}
				})
				localBookCase.isExists(this.book.id).then(res => {
					this.isFav = res
				})
			},
			async reqBook(bookId) {
				this.book = await bookApi.detail(bookId)
				this.joinAuthors(this.book)
				uni.setNavigationBarTitle({
					title: this.book.name
				})
				this.reqChapters(this.book.id)
				this.getBookLocalData()
			},
			joinAuthors(book) {
				this.authors = book.authorNames.join(' / ')
			},
			showChapters() {
				if (!this.openDrawer) {
					this.$refs.bookDrawer.open()
					this.openDrawer = true
				}else {
					this.$refs.bookDrawer.close()
					this.openDrawer = false
				}
			},
			drawerChange(e) {
				this.openDrawer = e
			},
			async reqChapters(bookId) {
				const res = await chapterApi.list(bookId)
				console.info('res -->', res)
				this.chapters = res.records
				this.chapterTotal = res.total
			},
			chapterItemClick(chapter) {
				uni.navigateTo({
					url: '../bookReader/bookReader?chapterId='+ chapter.id+'&type=0&bookId='+this.book.id
				})
			},
			// 侧边栏
			chapterClick(chapter) {
				uni.navigateTo({
					url: '../bookReader/bookReader?chapterId='+ chapter.id+'&type=0&bookId='+this.book.id
				})
			},
			readBook() {
				uni.navigateTo({
					url: '../bookReader/bookReader?bookId='+this.book.id+'&type=1'
				})
			},
			async addBookFav() {
				if (this.isFav) {
					const res = await localBookCase.remove(this.book.id)
					this.isFav = false
				}else {
					const res = await localBookCase.add(this.book.id)
					this.isFav = true
				}
			},
			async reqBooks(bookIds) {
				const res = await bookApi.findAllByBookIds(bookIds)
				console.info('books --> ', res)
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		.book_info {
			display: flex;
			flex-direction: row;
			image {
				width: 220rpx;
				height: 220rpx;
			}
			.book_summary {
				display: flex;
				flex-direction: column;
				margin-left: 30rpx;
				width: 100%;
				.book_name {
					font-size: 36rpx;
					color: $uni-text-color;
				}
				.book_author {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-top: 30rpx;
					color: #555555;
					text {
						margin-left: 10rpx;
					}
				}
				.read_process {
					display: flex;
					flex-direction: column;
					margin-top: 30rpx;
					width: 100%;
					color: #C8C7CC;
					.lable {
						display: flex;
						flex-direction: row;
						width: 100%;
						justify-content: space-between
					}
					.process {
						margin-top: 10rpx;
						border-radius: 30rpx;
					}
				}
			}
		}
		.detail_body {
			display: flex;
			flex-direction: row;
			width: 100%;
			height: 120rpx;
			margin-top: 30rpx;
			border-bottom: 1px solid #F1F1F1;
			justify-content: space-around;
			align-items: center;
			.body_item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				text:nth-child(1) {
					color: #999999;
				}
				text:nth-child(2) {
					color: $uni-text-color;
				}
			}
			.item_line {
				height: 60rpx;
				width: 3rpx;
				background-color: #F1F1F1;
			}
		}
		.book_intro {
			width: 100%;
			margin-top: 30rpx;
			color: #808080;
		}
		.book_chapters {
			display: flex;
			flex-direction: column;
			margin-top: 60rpx;
			text:nth-child(1) {
				font-size: 28rpx;
			}
			.chapter_line {
				width: 100%;
				height: 2rpx;
				background-color: #F1F1F1;
				margin-top: 20rpx;
			}
			.chapter_wrapper {
				display: flex;
				flex-direction: column;
				margin-top: 30rpx;
				.item {
					width: 100%;
					height: 100%;
					color: #2daeff;
					display: flex;
					flex-direction: column;
					.item_title {
						height: 80rpx;
						line-height: 80rpx;
					}
					.item_sub_title {
						height: 80rpx;
						line-height: 80rpx;
						margin-left: 30rpx;
					}
				}
			}
		}
		.book_footer {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #FFFFFF;
			height: 110rpx;
			border-top: 1px solid #F5F5F5;
			width: 100%;
			display: flex;
			flex-direction: row;
			.book_chapters_menu {
				display: flex;
				flex-direction: column;
				height: 100%;
				width: 120rpx;
				align-items: center;
				justify-content: center;
				margin-left: 13%;
				color: #999999;
			}
			.center_reader {
				display: flex;
				flex-direction: column;
				position: absolute;
				top: -40%;
				background-color: #539e88;
				border-radius: 50%;
				width: 110rpx;
				height: 110rpx;
				left: 42%;
				justify-content: center;
				align-items: center;
				color: #FFFFFF;
				font-size: 20rpx;
			}
			.book_fav {
				display: flex;
				flex-direction: column;
				height: 100%;
				width: 100rpx;
				align-items: center;
				justify-content: center;
				margin-left: 42%;
				color: #999999;
			}
		}
	}
</style>
