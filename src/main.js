// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import router from './router'
import '@/assets/css/reset.css'
// import 'element-ui/lib/theme-chalk/index.css'
// import ElementUI from 'element-ui'
//vue 轮播插件
import store from './store/index'
// import axios from 'axios'
import * as filters from './filters'
import App from './App'

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
})




import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  error:'http://hly.1000da.com.cn/assets/img/error.jpg',
  dispatchEvent:true,
  loading:'http://hly.1000da.com.cn/assets/img/loading.gif',
});

// Vue.use(ElementUI)
Vue.config.productionTip = false;

Vue.directive('scroll', {
  // 当绑定元素插入到 DOM 中
  inserted: function (el,binding) {
    var cb = binding.value
    el.addEventListener('mousewheel',function(e){
      var direction = e.deltaY>0?'down':'up'
      cb(direction)
    })
  }
})

//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
//
// axios.defaults.headers.post['Cache-Control']= "no-cache, max-age=" + 31313131131
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(function (config) {  //配置发送请求的信息
  store.commit('showLoading')
  return config;
}, function (error) {
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) { //配置请求回来的信息
  store.commit('hideLoading')
  return response;
}, function (error) {

  return Promise.reject(error);
});

Vue.prototype.$http = axios;

//滑动验证指令
Vue.directive('move', {
  inserted: function (el) {
    el.onmousedown = function(e) {
      var X = e.clientX - el.offsetLeft
      document.onmousemove = function(e) {
        var endx = e.clientX - X;
        el.className = 'move moveBefore';
        el.style.left = endx + 'px';
        // console.log(el.parentNode.children[0])
        var width = $('.movebox').width() - $('.move').width();
        el.parentNode.children[0].style.width = endx + 'px';
        el.parentNode.children[1].innerHTML = '拖动滑块验证';
        //临界值小于
        if (endx <= 0) {
          el.style.left = 0 + 'px';
          el.parentNode.children[0].style.width = 0 + 'px'
          //$('.movego').width(0)
        }
        //临界值大于
        // console.log(el.style.left)
        if (parseInt(el.style.left) >= width) {
          el.style.left = width + 'px'
          el.parentNode.children[0].style.width = width + 'px'
          el.parentNode.children[1].innerHTML = '验证通过'
          el.className = 'move moveSuccess';
          el.onmousedown = null
        }
      }
    }
    document.onmouseup = function() {
      document.onmousemove = null
    }
  }
})
/* eslint-disable no-new */
let newVue = new Vue({
  el: '#app',
  router,
  filters,
  store,
  template: '<App/>',
  // mounted () {
  //   document.dispatchEvent(new Event('render-event'))
  // },
  components: { App },
  render: h => h(App)
})
