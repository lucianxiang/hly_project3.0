// import axios from 'axios';
import {
  postPromise,
  getNewStr,
  deepClone
} from '@/assets/public'

export default {
  //酒店首页数据
  initHotelHomePageData({
    commit
  }, data) {
    return new Promise(function(relove, reject) {
      axios.post(getNewStr + '/HotelWebPage/Index', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('HotPlayData', data.data.gameplay.SubArray);
            commit('initHotPlayList', data.data.gameplay.SubArray[0].CityList);
            commit('characteristicRecommendList', data.data.special.SubArray);
            if( data.data.thehot ){
              commit('hotDestination', data.data.thehot.HotelList); //当季热门
            }
            relove();
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //酒店搜索详情
  initHotelSearchFilterInfo({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/SearchFilter', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let arr = data.data.ThemeType;
            arr.unshift({
              ht_tt_ThemeID: '',
              ht_tt_Name: '不限'
            });
            //主题
            commit('initThemeTypeList', arr)
            let arr1 = data.data.RoomHard;
            arr1.unshift({
              ht_rh_ID: '',
              ht_rh_Name: '不限'
            })
            commit('initRoomHardList', arr1)
            // //推荐类型
            let arr2 = data.data.Introduce;
            for (var i = 0; i < arr2.length; i++) {
              arr2[i]['isIntroduceList'] = true;
              arr2[i].index = i + 1;
              if (arr2[i].SubArray.length) {
                arr2[i].SubArray.unshift({
                  ht_it_ID: '',
                  ht_it_Name: '不限'
                })
              }
            }
            // arr2.unshift({
            //   ht_it_ID:'',
            //   ht_it_Name:'不限',
            //   SubArray:[]
            // })
            commit('initIntroduceList', arr2)
            relove();
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //搜索酒店详情数据
  initSearchData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let arr = data.data.dataArray;
            let arr1 = [];

            for (var i = 0; i < arr.length; i++) {
              if (arr[i].ht_ht_ImageUrl.length) {
                if (arr[i].ht_ht_ImageUrl[0].SubArray[0].ht_hi_ImageURL) {
                  arr[i].ht_ht_OneImageUrl = arr[i].ht_ht_ImageUrl[0].SubArray[0].ht_hi_ImageURL.split(',')[0]
                }
              }
              arr[i].ht_ht_newIcoArry = [];
              let icons = arr[i].ht_ht_IcoArry
              for (var j = 0; j < icons.length; j++) {
                switch (Number(icons[j].ht_hi_ImageID)) {
                  case 1:
                    arr[i].ht_ht_newIcoArry.push({
                      title: '餐厅',
                      className: 'Restaurant'
                    })
                    break;
                  case 2:
                    arr[i].ht_ht_newIcoArry.push({
                      title: '停车场',
                      className: 'ParkingLot'
                    })
                    break;
                  case 3:
                    arr[i].ht_ht_newIcoArry.push({
                      title: '接机服务',
                      className: 'meetPlaneService '
                    })
                    break;
                  case 4:
                    arr[i].ht_ht_newIcoArry.push({
                      title: '游泳池',
                      className: 'swimmingPool'
                    })
                    break;
                  case 5:
                    arr[i].ht_ht_newIcoArry.push({
                      title: '健身房',
                      className: 'Gym'
                    })
                    break;
                  case 6:
                    arr[i].ht_ht_newIcoArry.push({
                      title: '会议室',
                      className: 'ConferenceRoom'
                    })
                    break;
                  case 7:
                    arr[i].ht_ht_newIcoArry.push({
                      title: '24小时热水',
                      className: 'hotWater'
                    })
                    break;
                  case 8:
                    arr[i].ht_ht_newIcoArry.push({
                      title: '公共区域免费wafi',
                      className: 'WiFi'
                    })
                    break;
                  case 9:
                    arr[i].ht_ht_newIcoArry.push({
                      title: '公交',
                      className: 'transit'
                    })
                    break;
                  case 11:
                    arr1.push({
                      title: '免费洗漱用品',
                      className: 'laundryService'
                    })
                    break;
                  case 12:
                    arr1.push({
                      title: '宠物',
                      className: 'pet'
                    })
                    break;
                }
              }
            }
            commit('initHotelSearchMoreIcon', arr1)
            //主题
            commit('initSearchData', arr)
            relove(Number(data.totalrows));
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //酒店详情
  initHotelDetalis({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Detail', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            //主题
            commit('initHotelDetalis', data.data);
            //酒店详情基础信息
            commit('initHotelModel', data.data.HotelModel)
            //酒店政策
            commit('initHotelPolicy', data.data.HotelPolicy)
            //图标
            let icons = data.data.HotelIco;
            let arr = []
            for (var i = 0; i < icons.length; i++) {
              switch (Number(icons[i].ht_hi_ImageID)) {
                case 1:
                  arr.push({
                    title: '餐厅',
                    className: 'Restaurant'
                  })
                  break;
                case 2:
                  arr.push({
                    title: '停车场',
                    className: 'ParkingLot'
                  })
                  break;
                case 3:
                  arr.push({
                    title: '接机服务',
                    className: 'meetPlaneService '
                  })
                  break;
                case 4:
                  arr.push({
                    title: '游泳池',
                    className: 'swimmingPool'
                  })
                  break;
                case 5:
                  arr.push({
                    title: '健身房',
                    className: 'Gym'
                  })
                  break;
                case 6:
                  arr.push({
                    title: '会议室',
                    className: 'ConferenceRoom'
                  })
                  break;
                case 7:
                  arr.push({
                    title: '24小时热水',
                    className: 'hotWater'
                  })
                  break;
                case 8:
                  arr.push({
                    title: '公共区域免费wafi',
                    className: 'WiFi'
                  })
                  break;
                case 9:
                  arr.push({
                    title: '公交',
                    className: 'transit'
                  })
                  break;
                case 11:
                  arr.push({
                    title: '免费洗漱用品',
                    className: 'laundryService'
                  })
                  break;
                case 12:
                  arr.push({
                    title: '宠物',
                    className: 'pet'
                  })
                  break;
                case 13:
                  arr.push({
                    title: 'spa',
                    className: 'spa'
                  })
                  break;
                case 15:
                  arr.push({
                    title: '穿梭机场巴士',
                    className: 'shuttleBus'
                  })
                  break;
              }
            }

            commit('initHotelIcon', arr)
            //酒店图片外观
            if (data.data.HotelImage[0]) {
              let str1 = data.data.HotelImage[0].SubArray[0].ht_hi_ImageURL;
              let arr1 = []
              if (str1) {
                arr1 = str1.split(',')
              }
              commit('initExterior', arr1)
            } else {
              commit('initExterior', [])
            }
            if (data.data.HotelImage[1]) {
              let str = data.data.HotelImage[1].SubArray[0].ht_hi_ImageURL;
              let arr2 = []
              if (str) {
                arr2 = str.split(',')
              }
              //酒店图片大堂
              commit('initTheLobby', arr2)
            } else {
              commit('initTheLobby', [])
            }
            if (data.data.HotelImage[2]) {

              let str3 = data.data.HotelImage[2].SubArray[0].ht_hi_ImageURL;
              let arr3 = []
              if (str3) {
                arr3 = str3.split(',')
              }

              //酒店图片餐厅
              commit('initRestaurant', arr3);
            } else {
              commit('initRestaurant', []);
            }
            if (data.data.HotelImage[3]) {

              let str4 = data.data.HotelImage[3].SubArray[0].ht_hi_ImageURL;
              let arr4 = []
              if (str4) {
                arr4 = str4.split(',')
              }

              //酒店图片餐厅
              commit('initPublicAreas', arr4);
            } else {
              commit('initPublicAreas', []);
            }

            //酒店设施服务基本信息等
            commit('initHardServiceObj', data.data.HardService)

            let resulte = data.data.HotelImage.slice();
            for (var i = 0; i < resulte.length; i++) {
              if (resulte[i].SubArray.length) {
                resulte[i].newSubArray = resulte[i].SubArray[0].ht_hi_ImageURL.split(',')
              }
            }
            let obj = {
              ht_hi_ImageTypeName: '所有',
              newSubArray: []
            }
            for (var i = 0; i < resulte.length; i++) {
              if (resulte[i].newSubArray.length) {
                let newArr = resulte[i].SubArray[0].ht_hi_ImageURL.split(',')
                obj.newSubArray.push(...newArr)
              }
            }
            resulte.unshift(obj)

            // console.log(resulte)
            //酒店图片
            commit('initHotelImage', resulte)
            commit('initAddNum', obj.newSubArray.length)
            //酒店图片餐厅 functionTypeMoreIsTrue
            // data.data.HardServiceHard.map((item)=>{
            //   item.functionTypeMoreIsTrue=true;
            //   item.functionTypeListIsTrue=false;
            //   return item;
            // });
            // console.log(data.data.HardServiceHard)
            //酒店图片餐厅

            //酒店房间列表
            // commit('initHotelRoom',data.data.HotelRoom)

            relove(Number(data.totalrows));
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //房间搜索条件
  SearchHotelRoomFilter({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/SearchHotelRoomFilter', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            // console.log(111,data.data.BedType)
            /*            data.data.BedType.filter((item)=>{
                          if(item.ht_rpp_BedType==0){
                            return false;
                          }else {
                            return true;
                          }
                        })
                        console.log(222,data.data.BedType)*/
            commit('SearchHotelRoomFilter', data.data)
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //房间列表搜索
  initSearchRoomInfo({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/SearchHotelRoom', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let arr = data.data;
            for (var i = 0; i < arr.length; i++) {
              arr[i].RoomInfo.ImagePathList = []
              if (arr[i].RoomInfo.ht_bt_ImagePath) {
                arr[i].RoomInfo.ImagePathList = arr[i].RoomInfo.ht_bt_ImagePath.split(',')
              }
            }
            commit('setSearchHotelRoomFilter', arr)
            relove(Number(data.totalrows));
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //获取预订剩余房间数
  initRoomNumber(store, data) {
    return new Promise((relove, reject) => {
      // axios.post(getNewStr+'/RoomProductPrice/GetRoomNumber',JSON.stringify(data),{
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // })
      postPromise(getNewStr + '/RoomProductPrice/GetRoomNumber', data)
        .then(data => {

          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            let arr = data.data;
            for (var i = 0; i < arr.length; i++) {
              arr[i].HouseNumber = arr[i].HouseNumber.replace(/-/g, '')
            }
            relove(arr);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //酒店提交订单
  initHotelMakeOrder({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelOrder/MakeOrder', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data);
          } else {
            reject(data)
          }
        })
    })
  },
  hotelWechatPayWay({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelOrder/PayOrder', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //酒店订单详情
  initHotelOrderDetail({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelOrder/Select', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initHotelOrderDetail', data.data[0])
            relove(data.data[0])
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //酒店取消订单
  hotelCancelOrder(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelOrder/CancelOrder', JSON.stringify(data), {
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
  //青旅酒店南京
  initQLCityData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initQLCityData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //青旅酒店苏州
  initSzCityData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initSzCityData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //青旅厦门酒店数据
  initXMCityData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initXMCityData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //青旅北京数据
  initBGCityData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initBGCityData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //青旅成都
  initCDCityData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initCDCityData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //乌镇
  initWZCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initWZCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //周庄
  initJZCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initJZCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //香格里拉
  initCHCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initCHCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //阳朔
  initYXCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initYXCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //玩海滩
  initWHTCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initWHTCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //游乐园
  initYLYCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initYLYCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //探历史
  initTLSCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initTLSCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //尝美食
  initCMSCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initCMSCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //安徽黄山
  initAHHSCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAHHSCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //泰安泰山
  initTATSCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initTATSCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //青岛崂山
  initQDLSCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initQDLSCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //南京紫金山
  initZJSCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initZJSCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //迪庆香格里拉
  initDQXGCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initDQXGCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //三亚凤凰岭
  initSYFHLCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initSYFHLCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //厦门五老峰
  initWLFCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initWLFCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //舟山普陀山
  initPTSCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initPTSCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //丽江客栈
  initLJKZCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let arr = data.data.dataArray;
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].ht_ht_ImageUrl) {
                arr[i].ht_ht_ImageUrl = arr[i].ht_ht_ImageUrl.split(',')
              }
            }
            commit('initLJKZCityHotelData', arr)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //大理客栈
  initDLKZCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let arr = data.data.dataArray;
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].ht_ht_ImageUrl) {
                arr[i].ht_ht_ImageUrl = arr[i].ht_ht_ImageUrl.split(',')
              }
            }
            commit('initDLKZCityHotelData', arr)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //厦门客栈
  initXMKZCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let arr = data.data.dataArray;
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].ht_ht_ImageUrl) {
                arr[i].ht_ht_ImageUrl = arr[i].ht_ht_ImageUrl.split(',')
              }
            }
            commit('initXMKZCityHotelData', arr)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //杭州客栈
  initHZKZCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let arr = data.data.dataArray;
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].ht_ht_ImageUrl) {
                arr[i].ht_ht_ImageUrl = arr[i].ht_ht_ImageUrl.split(',')
              }
            }
            commit('initHZKZCityHotelData', arr)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //三亚客栈
  initSYKZCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let arr = data.data.dataArray;
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].ht_ht_ImageUrl) {
                arr[i].ht_ht_ImageUrl = arr[i].ht_ht_ImageUrl.split(',')
              }
            }
            commit('initSYKZCityHotelData', arr)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //主题酒店
  initZTJDCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initZTJDCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //圆床体验
  initYCTYCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initYCTYCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //冒险体验
  initMXTYCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initMXTYCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //高档享受
  initGDXCCityHotelData({
    commit
  }, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initGDXCCityHotelData', data.data.dataArray)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  initHomeImage({
    commit
  }, data) {
    return new Promise(function(relove, reject) {
      axios.post(getNewStr + '/HotelIndexImage/Select', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
            commit('initHomeImage', data.data);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },

  initHotelOrder({
    commit
  }, data) {
    return new Promise(function(relove, reject) {
      axios.post(getNewStr + '/HotelOrder/Select', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalrows));
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
}
