<template>
	<view class="content">
		<view class="html_wrapper" v-if="!showChapters">
			<htmlParser v-if="content !== ''" :htmlContent="content"></htmlParser>
		</view>
		<view class="chapter_wrapper" v-if="showChapters">
			<view class="title">
				Overview
			</view>
			<view class="chapter_item" v-for="(chapter, index) in chapters" :key="index">
				<text class="chapter_title">· {{chapter.title}}</text>
				<view class="sub_chapter" v-for="(subChapter, index) in chapter.childChapters" :key="index">
					· {{subChapter.title}}
				</view>
			</view>
		</view>
		<view class="footer">
			<image :src="bottomBarIcons[preChapterIconIndex]" mode="aspectFill" @click="preChapterClick"></image>
			<image src="../../static/icons/ic_chapter_list.png" mode="aspectFill" @click="openCloseChapterDrawer"></image>
			<image :src="bottomBarIcons[nextChapterIconIndex]" mode="aspectFill" @click="nextChapterClick"></image>
		</view>
		<bookDrawer ref="bookDrawer" v-on:drawerChange="drawerChange" :book="currentBook" :chapters="chapters" v-on:chapterClick="chapterClick"></bookDrawer>
	</view>
</template>

<script>
	import bookApi from '@/service/api/BookApi.js'
	import chapterApi from '@/service/api/ChapterApi.js'
	import arrayUtil from '@/utils/ArrayUtil.js'
	import readProcess from '@/utils/ReadProcessUtil.js'
	export default {
		data() {
			return {
				content: '',
				showChapters: false,
				chapters: [],
				preChapterIconIndex: 1,
				nextChapterIconIndex: 2,
				bottomBarIcons: [
					'../../static/icons/ic_pre_chapter_disable.png',
					'../../static/icons/ic_pre_chapter_enable.png',
					'../../static/icons/ic_next_chapter_disable.png',
					'../../static/icons/ic_next_chapter_enable.png'
				],
				currentChapterIndex: 0,
				currentChapterIds: [],
				currentChapterId: -1,
				openDrawer: false,
				currentBook: {}
			};
		},
		onLoad(options) {
			if (options.type === '1') {
				this.showChapters = true
				this.reqChapters(options.bookId)
				this.reqBook(options.bookId)
				
			}else {
				this.chapterId = options.chapterId
				this.reqChapters(options.bookId)
				this.reqChapterDetail(this.chapterId)
				this.reqBook(options.bookId)
			}
		},
		onBackPress() {
			const process = (this.currentChapterIndex + 1) / this.currentChapterIds.length * 100
			readProcess.set(this.currentBook.id, process)
		},
		methods: {
			async reqChapterDetail(chapterId) {
				const _this = this
				this.content = ''
				bookApi.chapterDetail(chapterId).then(res => {
					_this.content = res.content
					uni.setNavigationBarTitle({
						title: res.title
					})
				})
				
			},
			async reqChapters(bookId) {
				const pageChapters = await chapterApi.list(bookId)
				this.chapters = pageChapters.records
			},
			reqBook(bookId, chapterId) {
				const _this = this;
				bookApi.detail(bookId).then(res => {
					_this.currentBook = res
					_this.currentChapterIds = res.chapterIds
					console.info('chgapterid s ->', _this.currentChapterIds)
					_this.changePreNextChapterState(true)
				})
			},
			drawerChange(e) {
				this.openDrawer = e
			},
			chapterClick(chapter) {
				console.info('chapter --->', chapter)
				this.chapterId = chapter.id
				changePreNextChapterState(isFirst = false)
				this.reqChapterDetail(this.currentChapterId)
			},
			openCloseChapterDrawer() {
				if (!this.openDrawer) {
					this.$refs.bookDrawer.open()
					this.openDrawer = true
				}else {
					this.$refs.bookDrawer.close()
					this.openDrawer = false
				}
			},
			// 上一章
			preChapterClick() {
				if (this.currentChapterIndex === -1 || this.preChapterIconIndex === 0) {
					this.nextChapterIconIndex = 3
					return
				}
				this.currentChapterIndex = this.currentChapterIndex - 1
				console.info('index -->', this.currentChapterIndex)
				this.currentChapterId = this.currentChapterIds[this.currentChapterIndex]
				this.changePreNextChapterState()
				if (this.preChapterIconIndex === 1 && this.currentChapterId !== undefined) {
					if (this.currentChapterIndex === 0) {
						this.preChapterIconIndex = 0
						this.nextChapterIconIndex = 3
					}
					this.reqChapterDetail(this.currentChapterId)
				}
			},
			// 下一章
			nextChapterClick() {
				if (this.currentChapterIndex === this.currentChapterIds.length || this.nextChapterIconIndex === 2) {
					this.nextChapterIconIndex = 2
					return
				}
				this.currentChapterIndex = this.currentChapterIndex + 1
				console.info('index -->', this.currentChapterIndex)
				this.currentChapterId = this.currentChapterIds[this.currentChapterIndex]
				console.info('id -->', this.currentChapterId)
				this.changePreNextChapterState()
				if (this.nextChapterIconIndex === 3 && this.currentChapterId !== undefined) {
					if (this.currentChapterIndex === this.currentChapterIds.length -1) {
						this.nextChapterIconIndex = 2
						
					}
					this.reqChapterDetail(this.currentChapterId)
				}
			},
			changePreNextChapterState(isFirst = false) {
				const chapterIndex = arrayUtil.findIndex(this.currentChapterIds, Number(this.chapterId))
				if (isFirst) {
					this.currentChapterIndex = chapterIndex
				}
				if (this.currentChapterIndex == null) {
					this.preChapterIconIndex = 0
					this.nextChapterIconIndex = 2
				}else {
					if (this.currentChapterIndex === -1) {
						this.preChapterIconIndex = 0
						this.nextChapterIconIndex = 2
					}else if(this.currentChapterIndex === this.currentChapterIds.length - 1){
						if (isFirst) {
							this.preChapterIconIndex = 1
							this.nextChapterIconIndex = 2
						}else {
							this.preChapterIconIndex = 1
						}
						
					}else {
						this.nextChapterIconIndex = 3
						this.preChapterIconIndex = 1
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		.html_wrapper {
			margin: 30rpx;
		}
		.chapter_wrapper {
			display: flex;
			flex-direction: column;
			margin: 30rpx;
			.title {
				height: 100rpx;
				line-height: 100rpx;
				font-size: 36rpx;
				font-weight: 200;
				border-bottom: 1px solid #F1F1F1;
				text-align: center;
				margin-bottom: 20rpx;
			}
			.chapter_item {
				display: flex;
				justify-content: center;
				color: #2daeff;
				display: flex;
				flex-direction: column;
				.chapter_title {
					height: 80rpx;
					line-height: 80rpx;
				}
				.sub_chapter {
					margin-left: 30rpx;
					height: 60rpx;
					line-height: 60rpx;
				}
			}
		}
		.footer {
			position: absolute;
			bottom: 0;
			height: 110rpx;
			width: 100%;
			border-top: 1px solid #F1F1F1;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			image {
				width: 50rpx;
				height: 50rpx;
			}
			image:nth-child(2) {
				margin-left: 90rpx;
				margin-right: 90rpx;
			}
		}
	}
</style>
