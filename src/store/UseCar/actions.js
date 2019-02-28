/**
 * Created by leibo on 18/4/17.
 */
// import axios from 'axios'
import {postPromise,getNewStr} from '@/assets/public'

export default {
  //用车首页
  initCarRentalIndexInfo({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/CarRentalWebPage/Index', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initCarRentalIndexInfo', data.data.CarInfoList);
            commit('initCarRentalIndexInfoObj', data.data.CarInfoList[0])
            commit('initCarHertzList', data.data.HertzList)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //租车城市
  initRentalCarCity({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/CarRentalWebPage/GetCarRentCity', data)
        .then(data => {
          var data = JSON.parse(data)
          if (Number(data.resultcode) == 200) {
            var data = data.data;
            let arr = [
              {
                letter: 'ABCD',
                city: [
                  {
                    cityLetter: 'A',
                    cityName: data.ABCD.filter(item => {
                      if (item.CityFirst == 'A') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'B',
                    cityName: data.ABCD.filter(item => {
                      if (item.CityFirst == 'B') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'C',
                    cityName: data.ABCD.filter(item => {
                      if (item.CityFirst == 'C') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'D',
                    cityName: data.ABCD.filter(item => {
                      if (item.CityFirst == 'D') {
                        return true
                      }
                      return false
                    })
                  }
                ]
              },
              {
                letter: 'EFGHI',
                city: [
                  {
                    cityLetter: 'E',
                    cityName: data.EFGHI.filter(item => {
                      if (item.CityFirst == 'E') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'F',
                    cityName: data.EFGHI.filter(item => {
                      if (item.CityFirst == 'F') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'G',
                    cityName: data.EFGHI.filter(item => {
                      if (item.CityFirst == 'G') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'H',
                    cityName: data.EFGHI.filter(item => {
                      if (item.CityFirst == 'H') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'I',
                    cityName: data.EFGHI.filter(item => {
                      if (item.CityFirst == 'I') {
                        return true
                      }
                      return false
                    })
                  }
                ]
              },
              {
                letter: 'JKLM',
                city: [
                  {
                    cityLetter: 'J',
                    cityName: data.JKLM.filter(item => {
                      if (item.CityFirst == 'J') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'K',
                    cityName: data.JKLM.filter(item => {
                      if (item.CityFirst == 'K') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'L',
                    cityName: data.JKLM.filter(item => {
                      if (item.CityFirst == 'L') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'M',
                    cityName: data.JKLM.filter(item => {
                      if (item.CityFirst == 'M') {
                        return true
                      }
                      return false
                    })
                  }
                ]
              },
              {
                letter: 'NOPQRS',
                city: [
                  {
                    cityLetter: 'N',
                    cityName: data.NOPQRS.filter(item => {
                      if (item.CityFirst == 'N') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'O',
                    cityName: data.NOPQRS.filter(item => {
                      if (item.CityFirst == 'O') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'P',
                    cityName: data.NOPQRS.filter(item => {
                      if (item.CityFirst == 'P') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'Q',
                    cityName: data.NOPQRS.filter(item => {
                      if (item.CityFirst == 'Q') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'R',
                    cityName: data.NOPQRS.filter(item => {
                      if (item.CityFirst == 'R') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'S',
                    cityName: data.NOPQRS.filter(item => {
                      if (item.CityFirst == 'S') {
                        return true
                      }
                      return false
                    })
                  }
                ]
              },
              {
                letter: 'TUVWX',
                city: [
                  {
                    cityLetter: 'T',
                    cityName: data.TUVWX.filter(item => {
                      if (item.CityFirst == 'T') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'U',
                    cityName: data.TUVWX.filter(item => {
                      if (item.CityFirst == 'U') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'V',
                    cityName: data.TUVWX.filter(item => {
                      if (item.CityFirst == 'V') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'W',
                    cityName: data.TUVWX.filter(item => {
                      if (item.CityFirst == 'W') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'X',
                    cityName: data.TUVWX.filter(item => {
                      if (item.CityFirst == 'X') {
                        return true
                      }
                      return false
                    })
                  },
                ]
              },
              {
                letter: 'YZ',
                city: [
                  {
                    cityLetter: 'Y',
                    cityName: data.YZ.filter(item => {
                      if (item.CityFirst == 'Y') {
                        return true
                      }
                      return false
                    })
                  },
                  {
                    cityLetter: 'Z',
                    cityName: data.YZ.filter(item => {
                      if (item.CityFirst == 'Z') {
                        return true
                      }
                      return false
                    })
                  }
                ]
              },
            ];
            commit('initRentalCarCity', arr)
            commit('initCarCityList', arr[0].city)
            relove();
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //租车地点
  initCityPlace({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/CarRentalWebPage/GetCityLandmark', data)
        .then(data => {
          var data = JSON.parse(data)
          if (Number(data.resultcode) == 200) {
            var data = data.data;
            commit('initCityPlace', data)
            commit('initCityPlaceHome',data[0].MarkArry)
            relove(data);
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //还车地点
  initReturnCityPlace({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/CarRentalWebPage/GetCityLandmark', data)
        .then(data => {
          var data = JSON.parse(data)
          if (Number(data.resultcode) == 200) {
            var data = data.data;
            let arr = [];
            for (let i = 0; i < data.length; i++) {
              for (let j = 0; j < data[i].MarkArry.length; j++) {
                data[i].MarkArry[j].label = data[i].MarkArry[j].MarkName
                data[i].MarkArry[j].value = data[i].MarkArry[j].MarkId
                delete data[i].MarkArry[j].MarkName
                delete data[i].MarkArry[j].MarkId
              }
              arr.push({
                label: data[i].AttrName,
                value: data[i].AttrId,
                children: data[i].MarkArry
              })
            }
            ;
            commit('initReturnCityPlace', arr)
            relove();
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //初始化搜索条件
  initSearchCondition({commit}, data) {
    return new Promise((relove, reject) => {
      postPromise(getNewStr+'/CarRentalWebPage/SearchFilter', data)
        .then(data => {
          var data = JSON.parse(data)
          if (Number(data.resultcode) == 200) {
            var data = data.data;
            commit('carBlockTypeList', data.VariableSpeed);
            data.CarModelArry.unshift({
              "cr_cra_Id": 0,
              "cr_cra_Name": "不限",
              "cr_car_PId": 2,
              "cr_cra_PName": "汽车车型组"
            })
            commit('carModelList', data.CarModelArry);
            data.CarBrandArry.unshift({
              "cr_cra_Id": 0,
              "cr_cra_Name": "不限",
              "cr_car_PId": 1,
              "cr_cra_PName": "汽车品牌"
            })
            commit('carBrandList', data.CarBrandArry);
            data.CompanyArry.unshift({
              "cr_h_Id": 0,
              "cr_h_Name": "不限"
            })
            commit('carCompanyList', data.CompanyArry);
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化汽车数据
  initCarInformation({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/CarRentalWebPage/Search', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            // for (let i = 0; i < data.data.CarArray.length; i++) {
            //   data.data.CarArray[i].carInfoArray = data.data.CarArray[i].StoreArry;
            // }
            relove(data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //预定信息
  carReserveInformation({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/CarRentalWebPage/GenerateOrder', data)
        .then(data => {
          var data = JSON.parse(data)
          if (Number(data.resultcode) == 200) {
            var data = data.data;
            commit('GiveBackStore', data.GiveBackStore)
            commit('TakeStore', data.GiveBackStore)
            commit('ProductModel', data.ProductModel)
            commit('HertzModel', data.HertzModel)
            commit('IncentivesList', data.IncentivesList)
            relove(data);
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //租车提交订单
  submitCarOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/CROrder/MakeOrder', data)
        .then(data => {
          var data = JSON.parse(data)
          if (Number(data.resultcode) == 200) {
            var data = data.data;
            relove(data);
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //支付订单
  carWechatPayWay({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/CROrder/PayOrder', JSON.stringify(data), {
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
  //查询订单详情
  initCarOrderDetail({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr+'/CROrder/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initCarOrderDetail', data.data[0])
            relove(data.data[0])
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //取消订单
  carCancelOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr+'/CROrder/CancelOrder', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })

  }
}
