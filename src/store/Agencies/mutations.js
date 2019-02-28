export default {
  setText(state, str) {
    state.text = str;
  },
  //初始化动画
  setTranstionFalse(state) {
    state.transtionActive = {
      isActive: false,
      isRotateInDownRight: false
    }
  },
  setIsLoginShow(state, name) {
    state.user.isLoginShow = true;
    state.user.name = name;
  },
  showQuitButton(state) {
    state.showQuit = true;
  },
  hideQuitButton(state) {
    state.showQuit = false;
  },
  //loading设置
  showLoading(state) {
    state.isLoading = true;
  },
  hideLoading(state) {
    state.isLoading = false;
  },
  initPackMoney(state, data) {
    state.packMoneyObj = data[0];
  },
  //---------首页--------
  //国内跟团游数据
  initDomesticData(state, data) {
    state.domesticDataList = data;
  },

  initAroundList(state, data) {
    state.aroundList = data;
  },


  initShortLineList(state, data) {
    state.shortLineList = data;
  },
  initLongLineList(state, data) {
    state.longLineList = data;
  },
  initMyTourOrder(state, data) {
    state.myTourOrderList = data;
  },

  initProductDetails(state, data) {
    state.productDetailsObj = data
  },
  initLineSchedule(state, obj) {
    state.lineScheduleObj = obj;
  },
  updateLineScheduleObj(state,index){
    state.lineScheduleObj.prepareList.forEach((item,i)=>{
      if(i==index){
        item.showTour = true;
      }else{
        item.showTour = false;
      }
    })
  },
  initIncludeList(state, data) {
    state.IncludeList = data
  },
  noWrapMoney(state, data) {
    state.noWrapMoneyList = data;
  },
  initLineMenu(state, data) {
    state.lineMenuList = data;
  },
  initTimesPrice(state, data) {
    state.timesPriceList = data;
  },
  initObj(state, obj) {
    state.priceObj = obj
  },
  initNewPriceDetail(state, date) {
    state.newPriceDetail = state.timesPriceList.filter(item => {
      if (item.ts_pp_Date == date) {
        return true
      }
      return false
    })[0]
  },
  // 导航套子导航
  initNavList(state, data) {
    state.navList = data;
  },
//获取省
  initGetProvince(state, data) {
    state.getProvinceList = data;
  },
  //获取市
  initGetCity(state, data) {
    state.getCityList = data;
  },
  //获取县
  initGetCounty(state, data) {
    state.getCountyList = data;
  },

  //--------------商户注册----------
  //获取省
  initProvinceData(state, data) {
    state.provinceDataList = data;
  },
  initCityData(state, data) {
    state.cityDataList = data;
  },
  initCountyData(state, data) {
    state.countyDataList = data;
  },
  //获取币种
  initChangeMineyType(state, data) {
    state.changeMineyTypeList = data;
  },
  //根据id查币种名
  initChangeValue(state, id) {
    state.changeValueName = state.changeMineyTypeList.filter(item => {
      if (Number(item.sm_bc_ID) == id) {
        return true;
      }
      return false;
    })[0].sm_bc_Name;
  },
  //根据币种名查id
  initChangeNameID(state, id) {
    state.changeNameID = state.changeMineyTypeList.filter(item => {
      if (Number(item.sm_bc_ID) == id) {
        return true;
      }
      return false;
    })[0].sm_bc_ID;
  },
  initChangeCompanyType(state, data) {
    state.changeCompanyTypeList = data;
  },
  initChangeCompanyTypeValue(state, id) {
    state.changeCompanyTypeValue = state.changeCompanyTypeList.filter(item => {
      if (Number(item.sm_cs_ID) == id) {
        return true;
      }
      return false;
    })[0].sm_cs_Persons
  },
  initChangeCompanyID(state, id) {
    state.changeCompanyID = state.changeCompanyTypeList.filter(item => {
      if (Number(item.sm_cs_ID) == id) {
        return true;
      }
      return false;
    })[0].sm_cs_ID
  },
  initChangeCooperationType(state, data) {
    state.changeCooperationTypeList = data;
  },
  initChangeScopeOfOperation(state, data) {
    state.changeScopeOfOperationList = data;
  },
  initPayStr(state, str) {
    state.payStr = str
  },
  initOrderDetail(state, obj) {
    state.orderDetail = obj
  },
  initCollection(state, data) {
    state.collectionList = data;
  },
  initCommentMX(state, obj) {
    state.commentMXObj = obj;
  },
  initCommentData(state, data) {
    state.commentData = data;
    state.newCommentData = data;
  },
  updateCommentData(state, name) {
    state.newCommentData = state.commentData.filter(item => {
      if (name == '全部') {
        return true;
      } else {
        if (item.allComment == name) {
          return true
        }
      }
      return false;
    })
  },
  initJob(state, data) {
    state.jobList = data;
  },
  initEducation(state, data) {
    state.educationList = data;
  },
  getAreaInfo(state, data) {
    state.getAreaInfoList = data;
  },
  showShowFixedComment(state) {
    state.showFixedComment = true
  },
  hideShowFixedComment(state) {
    state.showFixedComment = false
  },
  SelectUseScoreDetailInfo(state, data) {
    state.useScoreDetailInfo = data;
  },
  selectUserAllScore(state, data) {
    state.userAllScoreList = data;
  },
  initTopPageList(state, data) {
    state.topPageList = data;
  },
  initHotAgenciesCityList(state, data) {
    state.hotAgenciesCityList = data;
  },
  initOutLongAreaList(state, data) {
    state.outLongAreaList = data;
  },
  initOutShortAreaList(state, data) {
    state.outShortAreaList = data;
  },
  initContryAreaList(state, data) {
    state.contryAreaList = data;
  },
  initNearAreaList(state, data) {
    state.nearAreaList = data;
  },
  initDomesticGoodList(state, data) {
    state.domesticGoodList = data;
  },
  setDomesticGoodList(state, data) {
    state.domesticGoodList = data;
  },
  initAroundGoodList(state, data) {
    state.nearAreaGoodList = data;
  },
  setNearAreaList(state, data) {
    state.nearAreaGoodList = data;
  },
  initShortLineGoodList(state, data) {
    state.shortLineGoodList = data;
  },
  setShortLineGoodList(state, data) {
    state.shortLineGoodList = data;
  },
  initLongLineGoodList(state, data) {
    state.longLineGoodList = data;
  },
  setLongLineGoodList(state, data) {
    state.longLineGoodList = data;
  },
  initAgenciesSearchCityList(state, data) {
    state.agenciesSearchCityList = data;
  },
  initAgenciesSearchTourSiteList(state, data) {
    state.agenciesSearchTourSiteList = data;
  },
  initAgenciesSearchGroupCityList(state, data) {
    state.agenciesSearchGroupCityList = data;
  },
  initHeelTourSearchMoreList(state, data) {
    state.heelTourSearchMoreList = data;
  },
  initReasonList(state, data) {
    state.reasonList = data;
  },
  initIntroList(state, data) {
    state.introList = data;
  },

//常用游客信息
  initTouristInfo(state, data) {
    state.touristInfoList = data;
  },
  initOutCity(state, obj) {
    state.outCityObj = obj;
  },
  initOutCityName(state, str) {
    state.outCityName = str
  },
  initTravelCommend(state, data) {
    state.travelCommendList = data;
  },
  searchTravelData(state, obj) {
    state.searchTravelObj = obj;
  },
  setOutName(state,name){
    state.outCityName = name;
  },
  initReceivingAddress(state,data){
    state.receivingAddressList = data;
  }
}

