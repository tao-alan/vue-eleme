import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/header/Header'
import Goods from '@/components/goods/Goods'
import Comments from '@/components/comments/Comments'
import Seller from '@/components/seller/Seller'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
		path: '/',
		redirect: '/goods'
	}, {
		path: '/goods',
		component: Goods
	}, {
		path: '/comments',
		component: Comments
	}, {
		path: '/seller',
		component: Seller
	}]
})
