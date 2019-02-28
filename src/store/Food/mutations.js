export default {
  //推荐商家
  initRecommendMerchants(state,data){
    state.RecommendMerchants=data;
  },
  RecommendMerchantsObj(state,data){
    state.initRecommendMerchants=data;
  },
  initRecommendMerchantsShopList(state,data){
    state.RecommendMerchantsShopList = data;
  },
  initFoodDetailStoreFront(state,obj){
    state.foodDetailStoreFrontList  = obj;
  },
  initInFoodList(state,data){
    state.inFoodList = data;
  },
  initTopTurnLlist(state,data){
    state.topTurnLlist = data;

  },
  initFoodOrderChoseDateList(state,data){
    state.foodOrderChoseDateList = data;
  },
  initFoodOrderChoseTimeList(state,data){
    state.foodOrderChoseTimeList = data;
  },
  initFoodOrderChoseRoomList(state,data){
    state.foodOrderChoseRoomList = data;
  },
  initFoodOrderStopCarList(state,num){
    state.foodOrderStopCarList = num;
  },
  initFoodOrderList(state,data){
    state.foodOrderList = data;
  },
  updateFoodOrderChoseRoomList(state,data){
    // var  arr = [];
    // arr =  state.foodOrderChoseRoomList.forEach(item=>{
    //   for(var i=0;i<data.length;i++){
    //     if(item.fd_sfr_ID==data[i].fd_sfr_ID){
    //       item.freeCount = data[i].freeCount
    //     }
    //   }
    // })
    for(var i=0;i<state.foodOrderChoseRoomList.length;i++){
        for(var j=0;j<data.length;j++){
          if(state.foodOrderChoseRoomList[i].fd_sfr_ID==data[j].fd_sfr_ID){
            state.foodOrderChoseRoomList[i].freeCount = data[j].freeCount
          }
        }
    }
    // console.log(state.foodOrderChoseRoomList)
  },
  initFoodOrderDetail(state,obj){
    state.foodOrderDetail = obj;
  },
  initFoodTypeList(state,data){
    state.foodTypeList = data;
  },
  initUsePersontList(state,data){
    state.usePersontList = data;
  },
  initFoodDataList(state,data){
    state.foodDataList = data;
  },
  initSearchFilter(state,obj){
    state.searchHomeFilter = obj
  },
  initFoodSearchTypeList(state,obj){
    state.foodSearchTypeList = obj
  },
  initFoodCaiList(state,data){
    state.foodCaiList = data;
  }
}
