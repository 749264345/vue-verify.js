(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
			(global.Verify = factory());
}(this, (function () {

	var Verify = {};
	Verify.install = function (Vue, options) {
		let def = {
			mode:'position',
			area: [
				{ key: 1, value: 'rgb(255, 237, 237)', label: '红色' },
				{ key: 2, value: 'rgb(208, 252, 223)', label: '绿色' },
				{ key: 3, value: 'rgb(255, 240, 199)', label: '橘黄色' }
			],
			position: [
				{ key: 1, label: '左上方位置' },
				{ key: 2, label: '正上方位置' },
				{ key: 3, label: '右上方位置' },
				{ key: 4, label: '左边位置' },
				{ key: 5, label: '中间位置' },
				{ key: 6, label: '右边位置' },
				{ key: 7, label: '左下方位置' },
				{ key: 8, label: '正下方位置' },
				{ key: 9, label: '右下方位置' }
			],
			success: 'Success!',
			successSub: 'Good job,dude!',
			error: 'Error...',
			errorSub: 'Try again'
		}
		if (options) {
			for (let property in options) {
				if (options[property]) {
					def[property] = options[property];
				}
			}
		}
		Vue.prototype.$verify = function ($el, cb) {
			let toastTpl = Vue.extend({
				data() {
					return {
						opt: def,
						area: null,
						position: null,
						showSuccess: false,
						showError: false
					};
				},
				template: '<div class="verify">\
							<div class="verify-success" :class="{\'show\':showSuccess}"><p>{{opt.success}}</p><span>{{opt.successSub}}</span></div>\
							<div class="verify-error" :class="{\'show\':showError}"><p>{{opt.error}}</p><span @click="again" class="verify-btn">{{opt.errorSub}}</span></div>\
							<div class="verify-title">请点击{{area.label}}区域的{{position.label}}</div>\
							<div class="verify-area">\
								<div class="verify-item" v-for="(item,index) in opt.area" :key="index" :style=" \'background:\'+item.value ">\
									<div class="verify-item-wrap">\
										<span v-for="(pos,idx) in opt.position" @click="userClick(item.key,pos.key)" :key="pos.key">\
										{{ opt.mode === \'shape\' ? pos.label : \'\' }}\
										</span>\
									</div>\
								</div>\
							</div>\
						</div>',
				created: function () {
					// 初始化验证
					this.setNewVerify();
					if (!cb) console.error('Could not find a callback that is passed as an argument for <this.$verify>');
				},
				methods: {
					setNewVerify: function () {
						if( this.opt.mode === 'shape' ){
							let t, j,arr = this.opt.position,_LEN_ = arr.length;
							while (_LEN_) { 
								j = Math.floor(Math.random() * _LEN_--);
								t = arr[_LEN_]; 
								arr[_LEN_] = arr[j]; 
								arr[j] = t; 
							}
						}

						const AREA = this.opt.area, POSITION = this.opt.position;
						//随机选取一个区域与位置
						this.area = AREA[Math.floor(Math.random() * AREA.length)];
						this.position = POSITION[Math.floor(Math.random() * POSITION.length)];
						//console.log(111)
					},
					userClick: function (a, b) {
						let result = this.area.key === a && this.position.key === b;
						this.showSuccess = result;
						this.showError = !result;
						//返回验证结果
						if (cb) cb(result);
					},
					again: function () {
						//重新初始验证
						this.setNewVerify();
						this.showError = false;
					}
				}
			});
			new toastTpl().$mount($el);
		}
	}

	return Verify;

})));
