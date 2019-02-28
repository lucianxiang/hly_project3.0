// import axios from 'axios';
import {postPromise,getNewStr, getSortList} from '@/assets/public'
import qs from 'qs'

export default {
  //图片上传
  uploadAdminImgs(store, data) {
    return new Promise((relove, reject) => {
      axios.post('http://image.1000da.com.cn/PostImage/PostToService', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          relove(data.data)
        })
    })
  },

  //-------------------首页-----------------
  //首页内容
  initAllHomeData({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/TradeGood/GetTravelPageL', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let resulte = data.data;
            // //国内
            // let DomesticDataList = resulte.chinaGroupList;
            // for (var i = 0; i < DomesticDataList.length; i++) {
            //   let goodList = DomesticDataList[i].goodList
            //   for (var j = 0; j < goodList.length; j++) {
            //     if (goodList[j].ta_tg_ShowImage) {
            //       goodList[j].oneImg = goodList[j].ta_tg_ShowImage.split(',')[0]
            //     } else {
            //       goodList[j].oneImg = []
            //     }
            //   }
            // }
            // //周边
            // let AroundList = resulte.nearGroupList;
            // for (var i = 0; i < AroundList.length; i++) {
            //   let AroundListGoodList = AroundList[i].goodList
            //   for (var j = 0; j < AroundListGoodList.length; j++) {
            //     if (AroundListGoodList[j].ta_tg_ShowImage) {
            //       AroundListGoodList[j].oneImg = AroundListGoodList[j].ta_tg_ShowImage.split(',')[0]
            //     } else {
            //       AroundListGoodList[j].oneImg = []
            //     }
            //   }
            // }
            //轮播图
            let topPageList = resulte.topPageList;
            for (var i = 0; i < topPageList.length; i++) {
              for (var j = 0; j < topPageList[i].length; j++) {
                if (topPageList[i][j].ts_tsi_Image) {
                  topPageList[i][j].ts_tsi_Image = topPageList[i][j].ts_tsi_Image.split(',')
                } else {
                  topPageList[i][j].ts_tsi_Image = []
                }
              }
            }
            //热门城市
            commit('initHotAgenciesCityList', resulte.hotCityList)
            //出境长线
            commit('initOutLongAreaList', resulte.outLongAreaList)
            //出境短线
            commit('initOutShortAreaList', resulte.outShortAreaList)
            //国内跟团
            commit('initContryAreaList', resulte.contryAreaList)
            //周边跟团
            commit('initNearAreaList', resulte.nearAreaList)

            commit('initTopPageList', topPageList)
            // commit('initDomesticData', DomesticDataList)
            // commit('initDomesticGoodList', DomesticDataList[0].goodList)
            // commit('initAroundGoodList', AroundList[0].goodList)
            // commit('initAroundList', AroundList)
            // commit('initShortLineList', ShortLineList)
            // commit('initShortLineGoodList', ShortLineList[0].goodList)
            // commit('initLongLineList', LongLineList)
            // commit('initLongLineGoodList', LongLineList[0].goodList)
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  initCenterHomeData({commit}, data){
    return new Promise(function (relove, reject){
      postPromise(getNewStr+'/TradeGood/GetTravelPageL', data)
      .then(data=>{
        var data = JSON.parse(data)
        if (Number(data.resultcode) == 200) {
          let resulte = data.data;
          //国内
          let DomesticDataList = resulte.chinaGroupList;
          for (var i = 0; i < DomesticDataList.length; i++) {
            let goodList = DomesticDataList[i].goodList
            for (var j = 0; j < goodList.length; j++) {
              if (goodList[j].ta_tg_ShowImage) {
                goodList[j].oneImg = goodList[j].ta_tg_ShowImage.split(',')[0]
              } else {
                goodList[j].oneImg = []
              }
            }
          }
          //周边
          let AroundList = resulte.nearGroupList;
          for (var i = 0; i < AroundList.length; i++) {
            let AroundListGoodList = AroundList[i].goodList
            for (var j = 0; j < AroundListGoodList.length; j++) {
              if (AroundListGoodList[j].ta_tg_ShowImage) {
                AroundListGoodList[j].oneImg = AroundListGoodList[j].ta_tg_ShowImage.split(',')[0]
              } else {
                AroundListGoodList[j].oneImg = []
              }
            }
          }
          commit('initDomesticData', DomesticDataList)
          commit('initDomesticGoodList', DomesticDataList[0].goodList)
          commit('initAroundGoodList', AroundList[0].goodList)
          commit('initAroundList', AroundList)
          relove(data.resultcontent)
        }else {
          reject(data.resultcontent)
        }
      })
    })
  },
  initNextHomeData({commit}, data){
    return new Promise(function (relove, reject){
      postPromise(getNewStr+'/TradeGood/GetTravelPageL', data)
        .then(data=>{
          var data = JSON.parse(data)
          if (Number(data.resultcode) == 200) {
            let resulte = data.data;
            //短线
            let ShortLineList = resulte.outshortGroupList;
            for (var i = 0; i < ShortLineList.length; i++) {
              let ShortLineListGoodList = ShortLineList[i].goodList;
              for (var j = 0; j < ShortLineListGoodList.length; j++) {
                if (ShortLineListGoodList[j].ta_tg_ShowImage) {
                  ShortLineListGoodList[j].oneImg = ShortLineListGoodList[j].ta_tg_ShowImage.split(',')[0]
                } else {
                  ShortLineListGoodList[j].oneImg = []
                }
              }
            }
            //长线
            let LongLineList = resulte.longshortGroupList;
            for (var i = 0; i < LongLineList.length; i++) {
              let LongLineListGoodList = LongLineList[i].goodList;
              for (var j = 0; j < LongLineListGoodList.length; j++) {
                if (LongLineListGoodList[j].ta_tg_ShowImage) {
                  LongLineListGoodList[j].oneImg = LongLineListGoodList[j].ta_tg_ShowImage.split(',')[0]
                } else {
                  LongLineListGoodList[j].oneImg = []
                }
              }
            }

            commit('initShortLineList', ShortLineList)
            commit('initShortLineGoodList', ShortLineList[0].goodList)
            commit('initLongLineList', LongLineList)
            commit('initLongLineGoodList', LongLineList[0].goodList)
            relove()
          }else{
            reject(data.resultcontent)
          }
        })
    })
  },



  //产品详情
  initProductDetails({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/LinePrepare/GetTradeLineByGood', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            let resulte = data.data;
            if (resulte) {
              for (var i = 0; i < resulte.length; i++) {
                if (!resulte[i].ts_tg_IntroduceReason) {
                  resulte[i].ts_tg_IntroduceReason = '<span></span>'
                }
              }
              let prepareList = resulte.prepareList;
              if(prepareList.length){
                for(var i=0;i<prepareList.length;i++){
                  prepareList[i].showTour = false;
                  prepareList[i].getSortList =  getSortList(prepareList[i].foodList,prepareList[i].hotelList,prepareList[i].tourList)
                  let newArr = prepareList[i].getSortList
                  for(var j=newArr.length;j>0;j--){
                    if(newArr[j]){
                      if(newArr[j].ts_ts_ID){
                        prepareList[i].num=j
                        break
                      }
                    }

                  }
                  if(prepareList[i].ts_pt_FreeImage){
                    prepareList[i].ts_pt_FreeImage = JSON.parse(prepareList[i].ts_pt_FreeImage)
                  }else{
                    prepareList[i].ts_pt_FreeImage = []
                  }
                }
                resulte.prepareList = prepareList.sort(function(a,b){
                  if (a.ts_pt_Day < b.ts_pt_Day ) {
                    return -1;
                  } else if (a.ts_pt_Day > b.ts_pt_Day ) {
                    return 1;
                  } else {
                    if (a.ts_pt_Day < b.ts_pt_Day ) {
                      return 1;
                    } else if (a.ts_pt_Day > b.ts_pt_Day ) {
                      return -1;
                    }
                    return 0;
                  }
                })
                resulte.prepareList[0].showTour = true;
              }
              resulte.money = data.datastring;

              // let resulte2 = resulte.prepareList
              // for (let i = 0; i < resulte2.length; i++) {
              //   if (resulte2[i].ts_pt_ShowImage) {
              //     resulte2[i].ts_pt_ShowImageList = resulte2[i].ts_pt_ShowImage.split(',')
              //   } else {
              //     resulte2[i].ts_pt_ShowImageList = [];
              //   }
              // }
              commit('initLineSchedule', resulte);
              let arr = data.data.feeInfoList
              commit('initIncludeList', arr);

              let arr2 = data.data.notFeeList
              commit('noWrapMoney', arr2);

              //推荐理由
              commit('initReasonList', resulte.reasonList)
              //产品介绍
              commit('initIntroList', resulte.introList)
              // resulte.outCityName = resulte.prepareList[0]
              // let arr = resulte.prepareList;
              // for(var i=0;i<arr.length;i++){
              //   if(arr[i].ts_pt_ShowImage){
              //     arr[i].ts_pt_ShowImage = arr[i].ts_pt_ShowImage.split(',')
              //   }else{
              //     arr[i].ts_pt_ShowImage = []
              //   }
              // }
              // console.log(resulte)
              commit('initProductDetails', resulte)
              relove(resulte.ts_pt_ID)
            } else {
              relove()
            }
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

  //线路菜单
  initLineMenu({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/LineMenu/GetLineMenuInfo', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            for (var i = 0; i < data.data.length; i++) {
              if (data.data[i].menuName == '行程线路') {
                data.data[i].isOff = true
              } else {
                data.data[i].isOff = false
              }
            }
            commit('initLineMenu', data.data)
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //
  initTimesPrice({commit}, data) {
    return new Promise(function (relove, reject) {
      // axios.post(getNewStr+'/ProductPrice/GetProductPrice', JSON.stringify(data), {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // })
      postPromise(getNewStr+'/ProductPrice/GetProductPrice', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            let resulte = data.data;
            commit('initTimesPrice', resulte)
            relove(data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //导航套子导航
  initNavList({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/System/GetSystemMenuInfo',data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            let navList = data.data;
            for (var i = 0; i < navList.length; i++) {
              switch (navList[i].sm_si_Name) {
                case '跟团游':
                  navList[i].name = '跟团游';
                  navList[i].to = '/Comment/AgenciesHome';
                  break;
                case '酒店':
                  navList[i].name = '酒店';
                  navList[i].to = '/Comment/HotelHomePage';
                  navList[i].isOff = true;
                  break;
                case '门票':
                  navList[i].name = '门票';
                  navList[i].to = '/Comment/AdmissionTicketHomePage'
                  break;
                case '美食':
                  navList[i].name = '美食';
                  navList[i].to = '/Comment/foodHomePage'
                  break;
                case '用车':
                  navList[i].name = '用车';
                  navList[i].to = '/Comment/rentalCar'
                  break;
              }
            }
            commit('initNavList', navList)
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  // //轮播图
  // initPictureList({commit}, data) {
  //   return new Promise(function (relove, reject) {
  //     axios.post(getNewStr+'/TradeGood/GetTopShow', JSON.stringify(data), {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     })
  //       .then(data => {
  //         var data = data.data;
  //         console.log(data)
  //         if (Number(data.resultcode) == 200) {
  //           commit('initPictureList', data.data);
  //           relove()
  //         }
  //       })
  //   })
  // },


//---------------------商户注册---------------
  //获取省
  initProvinceData({commit}, data) {
    return new Promise(function (relove, reject) {
      // axios.post(getNewStr+'/AreaFull/SelectProvice', JSON.stringify(data), {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // })
      postPromise(getNewStr+'/AreaFull/SelectProvice', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            commit('initProvinceData', data.data)
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //获取市
  initCityData({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/AreaFull/SelectProvice', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            commit('initCityData', data.data)
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //获取县
  initCountyData({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/AreaFull/SelectProvice', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            commit('initCountyData', data.data)
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  // //查询结算币种
  // initChangeMineyType({commit}, data) {
  //   return new Promise(function (relove, reject) {
  //     axios.post(getNewStr+'/BalanceCurrency/Select', JSON.stringify(data), {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     })
  //       .then(data => {
  //         var data = data.data;
  //         if (Number(data.resultcode) == 200) {
  //           commit('initChangeMineyType', data.data)
  //           relove(data.data)
  //         } else {
  //           reject(data.resultcontent)
  //         }
  //       })
  //   })
  // },
  //公司规模
  // initChangeCompanyType({commit}, data) {
  //   return new Promise(function (relove, reject) {
  //     axios.post(getNewStr+'/CompanySize/Select', JSON.stringify(data), {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     })
  //       .then(data => {
  //         var data = data.data;
  //         if (Number(data.resultcode) == 200) {
  //           commit('initChangeCompanyType', data.data)
  //           relove()
  //         } else {
  //           reject(data.resultcontent)
  //         }
  //       })
  //   })
  // },
  //类型
  initChangeCooperationType({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/CooperationType/Select', data)
      // axios.post(getNewStr+'/CooperationType/Select', JSON.stringify(data), {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // })
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            commit('initChangeCooperationType', data.data)
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  // //经营范围
  // initChangeScopeOfOperation({commit}, data) {
  //   return new Promise(function (relove, reject) {
  //     axios.post(getNewStr+'/TradeScope/Select', JSON.stringify(data), {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     })
  //       .then(data => {
  //         var data = data.data;
  //         if (Number(data.resultcode) == 200) {
  //           commit('initChangeScopeOfOperation', data.data)
  //           relove()
  //         } else {
  //           reject(data.resultcontent)
  //         }
  //       })
  //   })
  // },
  //添加供应商提交
  initSubmitInformtionObj({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr+'/AgentInfo/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //提交订单
  submitOrder(store, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr+'/TravelOrder/MakeOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //微信支付生成二维码字符串
  payWechat({commit}, data) {
    return new Promise(function (relove, reject) {
      // $.post('http://wechat.1000da.com.cn/Order/MakeWechatQRCode', JSON.stringify(data),(data)=>{
      //   var data = JSON.parse(data);
      //   if (Number(data.resultcode) == 200) {
      //     relove(data)
      //   } else {
      //     reject(data.resultcontent)
      //   }
      // })

      axios.post('http://wechat.1000da.com.cn/Order/MakeWechatQRCode', JSON.stringify(data))
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //获取微信支付状态
  getOrderStatus(store, data) {
    return new Promise(function (relove, reject) {
      postPromise('http://wechat.1000da.com.cn/Order/QueryOrderStatus', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            relove(data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化用户订单
  initMyTourOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr+'/UserOrder/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initMyTourOrder', data.data)
            relove(Number(data.totalrows))
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改用户信息
  saveUserInfo(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/UserInfo/Update', JSON.stringify(data), {
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
  //支付订单
  wechatPayWay(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/TravelOrder/PayOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          console.log(data)
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //获取余票
  GetFreeSeat(store, data) {
    return new Promise((relove, reject) => {
      // axios.post(getNewStr+'/ProductPrice/GetFreeSeat', JSON.stringify(data), {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // })
      postPromise(getNewStr+'/ProductPrice/GetFreeSeat',data)
        .then(data => {
          var data = JSON.parse(data);
          console.log(data)
          if (Number(data.resultcode) == 200) {
            relove(data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除订单
  DeleteOrder(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/UserOrder/DeleteStatus', JSON.stringify(data), {
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
  //订单详情
  initOrderDetail({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/TravelOrder/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initOrderDetail', data.data[0])
            relove(data.data[0])
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //取消订单
  CancelOrder(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/UserOrder/Delete', JSON.stringify(data), {
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
  //回去进度状态
  getSearchStatus(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/AgentInfo/ProgressStatus', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加收藏
  addCollection({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/MyCollect/Insert', JSON.stringify(data), {
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
  //查询用户收藏
  initCollection({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/MyCollect/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initCollection', data.data);
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除收藏
  deleteMyCollection(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/MyCollect/Delete', JSON.stringify(data), {
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
  //获取评分类型
  initRatingType(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/ScoreType/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //发表评论
  addComment(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/Comment/Insert', JSON.stringify(data), {
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
  //获取评论信息
  initCommentMX({commit}, data) {
    return new Promise((relove, reject) => {
      // axios.post(getNewStr+'/Comment/SelectMX', JSON.stringify(data), {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // })
      postPromise(getNewStr+'/Comment/SelectMX', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            commit('initCommentMX', data.data)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //获取用户评论list
  initCommentData({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/Comment/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let resulte = data.data;
            for (var i = 0; i < resulte.length; i++) {
              if (resulte[i].commentInfo.ts_ct_Image) {
                resulte[i].commentInfo.ts_ct_Image = resulte[i].commentInfo.ts_ct_Image.split(',')
              } else {
                resulte[i].commentInfo.ts_ct_Image = []
              }
              let arr = resulte[i].satisfyList
              if (arr.length) {
                for (var j = 0; j < arr.length; j++) {
                  if (arr[j].satistyState.includes('不满意')) {
                    resulte[i].allComment = '不满意';
                    break
                  } else if (arr[j].satistyState.includes('一般')) {
                    resulte[i].allComment = '一般'
                    break
                  } else {
                    resulte[i].allComment = '满意'
                  }
                }
              }
            }
            commit('initCommentData', resulte)
            relove(Number(data.totalrows))
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化个人资料职业
  initJob({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/Job/SelectGroupJob', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initJob', data.data)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化
  initEducation({commit}, item) {
    return new Promise((relove, reject) => {
      // axios.post(getNewStr+'/Job/Select', JSON.stringify(item), {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // })
      postPromise(getNewStr+'/Job/Select', item)
        .then(data => {
          var resulte = JSON.parse(data);
          if (Number(resulte.resultcode) == 200) {
            switch (item.ui_jb_ParentID) {
              case '39':
                //个人资料学历
                commit('initEducation', resulte.data)
                relove(resulte.resultcontent);
                break;
              case '45':
                //个人资料学历
                commit('initChangeMineyType', resulte.data)
                relove(resulte.data)
                break;
              case '46':
                //公司规模
                commit('initChangeCompanyType', resulte.data)
                relove(resulte.data)
                break;
              case '70':
                //经营范围
                commit('initChangeScopeOfOperation', resulte.data)
                relove(resulte.data)
                break;
              case '82':
                //评分类型
                relove(resulte.data)
                break;
            }
          } else {
            reject(resulte.resultcontent)
          }
        })
    })
  },
  //代理商注册
  initInsertProxyInfo(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/ProxyInfo/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //获取区域
  getAreaInfo({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/ChinaArea/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('getAreaInfo', data.data)
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //查询供应商协议
  initAgreementContent(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/CooperationType/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data[0].sm_cp_Agreement)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //消费积分
  InsertUseScoreDetailInfo(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/UseScoreDetail/Insert', JSON.stringify(data), {
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
  //用户积分
  SelectUseScoreDetailInfo({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/UseScoreDetail/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('SelectUseScoreDetailInfo', data.data)
            relove(Number(data.totalrows))
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //用户总积分
  selectUserAllScore({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/UseScoreDetail/SelectTotal', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('selectUserAllScore', data.data)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //代理商注册获取协议
  initSelectProxy(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/CooperationType/SelectProxy', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //找回密码
  nwePassword(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/UserInfo/ForgetPassword', JSON.stringify(data), {
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
  //修改用户密码
  UpdateUserPassword(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/UserInfo/UpdatePassword', JSON.stringify(data), {
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
  //动态密码登录
  activePasswordLogin(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/UserInfo/AutoPasswordLogin', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //游客充值余额
  userRechargeMoney({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/UserPot/Charge', data)
        .then(data => {
          var data = JSON.parse(data)
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //查询余额
  initPackMoney({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/UserPot/Select', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            commit('initPackMoney', data.data)
            relove(data.resultcontent);
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //余额支付
  payBalanceSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/UserPot/MinusMoney', data)
        .then(data => {
          var data = JSON.parse(data)
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //修改余额宝信息
  updateUserPot({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/UserPot/Update', data)
        .then(data => {
          var data = JSON.parse(data)
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //初始化跟团游列表搜索条件
  initAgenciesSearchList({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/TourWebPage/SearchFilter', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            //出发城市
            commit('initAgenciesSearchCityList', data.data.cityList)
            //推荐景点
            commit('initAgenciesSearchTourSiteList', data.data.tourSiteList)
            //成团地点
            commit('initAgenciesSearchGroupCityList', data.data.groupCityList)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化跟团游列表数据
  initHeelTourSearchMoreList({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/TourWebPage/SearchInfo', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let resulte = data.data;
            for (var i = 0; i < resulte.length; i++) {
              if (resulte[i].ta_tg_ShowImage) {
                resulte[i].oneImage = resulte[i].ta_tg_ShowImage.split(',')[0]
              } else {
                resulte[i].ta_tg_ShowImage = []
              }
            }
            //出发城市
            commit('initHeelTourSearchMoreList', resulte)
            relove(Number(data.totalRows))
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

  //初始化常用游客信息
  initTouristInfo({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/UsualConnect/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initTouristInfo', data.data.reverse())
            relove(Number(data.totalrows))
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //添加
  AddTouristInfo(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/UsualConnect/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //更新
  UpdateTouristInfo({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/UsualConnect/Update', data)
        .then(data => {
          var data = JSON.parse(data)
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },

  //删除常用游客信息
  DeleteTouristInfo(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/UsualConnect/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //初始化当前登录用户信息
  initUserInfo({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr+'/UserInfo/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if( Number(data.resultcode) == 200 ){
           relove(data.data[0]);
          }else{
            reject(data.resultcontent)
          }

        })
    })
  },
  //出发城市
  initOutCity({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr+'/LineCity/FirstSelect', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if( Number(data.resultcode) == 200 ){
            commit('initOutCity',data.data);
            let resulte = data.data

            for(let attr in resulte){
              let arr = resulte[attr].GroupCityList;
              if(arr.length>0){
                commit('initOutCityName',resulte[attr].GroupCityList[0].ts_cc_Name)
              }
            }
            relove(Number(data.totalrows));
          }else{
            reject(data.resultcontent)
          }

        })
    })
  },
  //初始化旅行社评论
  initTravelCommend({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/Comment/SelectAllComment',data)
        .then(data => {
          var data = JSON.parse(data);
          if( Number(data.resultcode) == 200 ){
            let arr = data.data
            for (let i = 0; i < arr.length; i++) {
              arr[i].imgData = [];
              if (arr[i].ts_ct_Image) {
                arr[i].imgData = arr[i].ts_ct_Image.split(',')
              }
              if (arr[i].Totalscore >= 4) {
                arr[i].satisfaction = '满意'
              }
              if (2 < arr[i].Totalscore && arr[i].Totalscore < 4) {
                arr[i].satisfaction = '一般'
              }
              if (arr[i].Totalscore <= 2) {
                arr[i].satisfaction = '不满意'
              }
            }
            commit('initTravelCommend',arr);
            relove(Number(data.totalRows));
          }else{
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化旅行社评论统计
  searchTravelData({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/Comment/SelectAllCommentFixed',data)
        .then(data => {
          var data = JSON.parse(data);
          if( Number(data.resultcode) == 200 ){
            commit('searchTravelData',data);
            relove();
          }else{
            reject(data.resultcontent)
          }
        })
    })
  },
  agenciesOrderInfo({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/TravelOrder/Select',data)
        .then(data => {
          var data = JSON.parse(data);
          if( Number(data.resultcode) == 200 ){
            relove(Number(data.totalrows));
          }else{
            reject(data.resultcontent)
          }
        })
    })
  },
  //收货地址
  initReceivingAddress({commit},data){
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/GetGoodAdress/Select',data)
      .then(data => {
        var data = JSON.parse(data);
        if( Number(data.resultcode) == 200 ){
          let arr = data.data;
          arr.forEach((item,index)=>{
            item.located = item.sm_gga_ProviceName+' '+item.sm_gga_CityName+' '+item.sm_gga_ContryName
          })
          commit('initReceivingAddress',data.data)
          relove(Number(data.totalrows));
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //添加收货地址
  AddressPreservation(store,data){
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/GetGoodAdress/Insert',data)
      .then(data => {
        var data = JSON.parse(data);
        if( Number(data.resultcode) == 200 ){
          relove(data.resultcontent);
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //修改收货地址
  UpdateressPreservation(store,data){
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/GetGoodAdress/Update',data)
      .then(data => {
        var data = JSON.parse(data);
        if( Number(data.resultcode) == 200 ){
          relove(data.resultcontent);
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //删除收货地址
  DeleteeressPreservation(store,data){
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/GetGoodAdress/Delete',data)
      .then(data => {
        var data = JSON.parse(data);
        if( Number(data.resultcode) == 200 ){
          relove(data.resultcontent);
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //申请开票
  PrintTheInvoiceSubmit(store,data){
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/BillInfo/Insert',data)
      .then(data => {
        var data = JSON.parse(data);
        if( Number(data.resultcode) == 200 ){
          relove(data.resultcontent);
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //获取二维码支字符串
  getLoginQRcode({commit},data){
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/QRCode/GenerateUniqueness',data)
        .then(data => {
          var data = JSON.parse(data);
          if( Number(data.resultcode) == 200 ){
            relove(data.code);
          }else{
            reject(data.resultcontent)
          }
        })
    })
  },
  //获取二维码扫描状态
  getQRcodeState({commit},data){
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/QRCode/LogonStatus',data)
        .then(data => {
          var data = JSON.parse(data);
          if( Number(data.resultcode) == 305 ){
            //已扫码
            relove(data);
          } if( Number(data.resultcode) == 200 ){
            //允许登录
            relove( data);
          }if( Number(data.resultcode) == 304 ){
            //未扫码
            relove( data);
          }else{
            reject(data.resultcontent)
          }
        })
    })
  },
}
