<template>
	<view>
		<uniDrawer ref="bookDrawer" @change="drawerChange">
			<view class="book_title">{{book.name}}</view>
			<view class="chapter_item" v-for="(chapter, index) in chapters" :key="index">
				<text class="chapter_title" @click="chapterClick(chapter)">{{chapter.title}}</text>
				<view class="sub_chapter" v-for="(c, index) in chapter.childChapters" :key="index" @click="chapterClick(c)">
					{{c.title}}
				</view>
			</view>
		</uniDrawer>
	</view>
</template>

<script>
	import uniDrawer from '../uni-drawer/uni-drawer.vue'
	export default {
		components: {
			uniDrawer
		},
		props: ['book', 'chapters'],
		mounted() {
			
		},
		data() {
			return {
			};
		},
		methods: {
			open() {
				this.$refs.bookDrawer.open()
			},
			close() {
				this.$refs.bookDrawer.close()
			},
			drawerChange(e) {
				this.$emit('drawerChange', e)
			},
			chapterClick(chapter) {
				this.$emit('chapterClick', chapter)
				this.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.book_title {
		font-size: 28rpx;
		width: 100%;
		text-align: center;
		height: 70rpx;
		line-height: 70rpx;
		border-bottom: 1px solid #F1F1F1;
	}
	.chapter_item {
		color: #555555;
		padding-left: 30rpx;
		.chapter_title {
			height: 60rpx;
			line-height: 60rpx;
		}
		.sub_chapter {
			height: 60rpx;
			line-height: 60rpx;
			padding-left: 30rpx;
		}
	}
</style>
