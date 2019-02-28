// import axios from 'axios'
import {getNewStr,postPromise} from '@/assets/public'
export default {
  //首页数据接口
  //推荐商家
  initRecommendMerchants({commit},data){
    return new Promise(function (relove, reject) {
        // axios.post(getNewStr+'/StoreFront/FoodIndexPage',JSON.stringify(data),{
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   }
        // })
      postPromise(getNewStr+'/StoreFront/FoodIndexPage',data)
          .then(data=>{
            var data = JSON.parse(data);
            if( Number(data.resultcode) == 200 ){
              commit('initRecommendMerchants',data.data.foodList);
              commit('initRecommendMerchantsShopList',data.data.shopList);
              //广告
              commit('initTopTurnLlist',data.data.topTurnLlist)
              relove(Number(data.totalrows));
            }else{
              reject(data.resultcontent)
            }
          })
    })
  },
  //初始化美食详情
  initFoodDetailStoreFront({commit},data){
    return new Promise(function (relove, reject) {
      axios.post(getNewStr+'/StoreFront/FoodDetaile',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data=>{
        var data = data.data;
        if( Number(data.resultcode) == 200 ){
          //店面信息
          commit('initFoodDetailStoreFront',data.data.storeFront);
          commit('initInFoodList',data.data.inFoodList)
          relove(data.data.storeFront);
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //酒店预定显示数据
  initFoodOrder({commit},data){
    return new Promise(function (relove, reject) {
      axios.post(getNewStr+'/StoreFront/BookPage',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data=>{
        var data = data.data;
        if( Number(data.resultcode) == 200 ){
          let arr = data.data.choseDateList;
          // if(arr.length){
          //   let num = arr[0].date.indexOf('T');
          //   for(var i=0;i<arr.length;i++){
          //     arr[i].date = arr[i].date.substring(0,num)
          //   }
          // }else{
          //   arr = []
          // }
          //用餐时间
          commit('initFoodOrderChoseDateList',arr);
          //提醒出发时间
          commit('initFoodOrderChoseTimeList',data.data.choseTimeList);
          // //位置选择
          // commit('initFoodOrderChoseRoomList',data.data.choseList);
          //停车位
          commit('initFoodOrderStopCarList',data.data.stopFreeCount);
          let foodList =data.data.foodList;

          for(var i=0;i<foodList.length;i++){
            foodList[i].num = 0;
          }
          //菜品选择
          // commit('initFoodOrderList',foodList);
          relove(foodList);
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //提交订单
  foodSubmitOrder(store,data){
    return new Promise(function (relove, reject) {
      axios.post(getNewStr+'/Order/MakeFoodOrder',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data=>{
        var data = data.data;
        if( Number(data.resultcode) == 200 ){
          relove(data.data);
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //查询可售餐桌数
  GetCanSellTableCount({commit},data){
    return new Promise(function (relove, reject) {
      axios.post(getNewStr+'/StoreFront/CanSellTableCount',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data=>{
        var data = data.data;
        if( Number(data.resultcode) == 200 ){
          commit('initFoodOrderChoseRoomList',data.data);
          // commit('updateFoodOrderChoseRoomList',data.data)
          relove(data.data);
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //支付订单
  foodWechatPayWay(store,data){
    return new Promise(function (relove, reject) {
      axios.post(getNewStr+'/Order/PayFoodOrder',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data=>{
        var data = data.data;
        if( Number(data.resultcode) == 200 ){
          relove(data.resultcontent);
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //订单详情
  initFoodOrderDetail({commit},data){
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/Order/AllSelect', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          commit('initFoodOrderDetail',data.data[0])
          relove(data.data[0])
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //取消订单
  foodCancelOrder(store,data){
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/Order/CancelFoodOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //列表页类型数据
  initSearchFoodType({commit},data){
    return new Promise((relove,reject)=>{
      postPromise(getNewStr+'/StoreFront/WebHotSearch',data)
        .then(data=>{
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            //类型
            commit('initFoodTypeList',data.data.foodTypeList)
            //就餐人数
            commit('initUsePersontList',data.data.usePersontList)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  initFoodDataList({commit},data){
    return new Promise((relove,reject)=>{
      postPromise(getNewStr+'/StoreFront/Select',data)
      .then(data=>{
        var data = JSON.parse(data);
        if (Number(data.resultcode) == 200) {
          //美食列表
          commit('initFoodDataList',data.data)
          relove(Number(data.totalrows))
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //首页搜索条件
  initSearchFilter({commit},data){
    return new Promise((relove,reject)=>{
      postPromise(getNewStr+'/StoreFront/WebHotSearch',data)
      .then(data=>{
        var data = JSON.parse(data);
        if (Number(data.resultcode) == 200) {
          let obj =data.data;
          obj.catagoryList.unshift({fd_py_ID:'',fd_py_Name:'所有'})
          obj.foodTypeList.unshift({fd_py_ID:'',fd_py_Name:'所有'})
          obj.usePersontList.unshift({fd_py_ID:'',fd_py_Name:'所有'})
          //美食列表
          commit('initSearchFilter',data.data)
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //立即预订搜索条件
  initFoodSearchTypeList({commit},data){
    return new Promise((relove,reject)=>{
      postPromise(getNewStr+'/StoreFront/WebHotSearch',data)
      .then(data=>{
        var data = JSON.parse(data);
        if (Number(data.resultcode) == 200) {
          let obj =data.data;
          obj.foodTypeList.unshift({fd_py_ID:'',fd_py_Name:'所有'})
          obj.foodMeatVeList.unshift({fd_py_ID:'',fd_py_Name:'所有'})
          let newObj ={
            foodTypeList:obj.foodTypeList,
            foodMeatVeList:obj.foodMeatVeList
          }
          //美食列表
          commit('initFoodSearchTypeList',newObj)
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //立即预订初始化菜
  initFoodCaiList({commit},data){
    return new Promise((relove,reject)=>{
      postPromise(getNewStr+'/StoreFront/FoodSearChPage',data)
      .then(data=>{
        var data = JSON.parse(data);
        if (Number(data.resultcode) == 200) {
          //美食列表
          let arr = data.data;
          for(var i=0;i<arr.length;i++){
            arr[i]['num'] = ''
          }
          commit('initFoodCaiList',arr)
          relove(Number(data.totalrows))
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //下订单
  foodOrderDown(store,data){
    return new Promise((relove, reject) => {
      postPromise(getNewStr+'/Order/MakeFoodOrder',data)
      .then(data=>{
        var data = JSON.parse(data);
        if (Number(data.resultcode) == 200) {
          relove(data.data.data.tm_or_OrderID)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //查询订单
  foodOrderDetails(store,data){
    return new Promise((relove, reject) => {
      postPromise(getNewStr+'/Order/Select',data)
        .then(data=>{
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalrows))
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

  initFoodUserCommend(store,data){
    return new Promise((relove, reject) => {
      postPromise(getNewStr+'/Comment/SelectAllComment',data)
        .then(data=>{
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalRows))
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //获取剩余停车位个数
  getWaitCarCount(store,data){
    return new Promise((relove, reject) => {
      postPromise(getNewStr+'/StoreFront/GetFreeStop',data)
      .then(data=>{
        var data = JSON.parse(data);
        if (Number(data.resultcode) == 200) {
          relove(data.data)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  }
}
