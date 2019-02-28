<template>
  <div>
    <!--顶部-->

    <div class="bgPicture">
      <div class="DomesticRentalCarBox">
        <div class="DomesticRentalCar">
          <h3>国内租车</h3>
          <!--取车-->
          <div class="pickCar">
            <strong>取车</strong>
            <div class="cityListWrap">
              <i></i>
              <div class="inputDiv" @click.stop="showChangeCity">{{pickCarCity.CityName ? pickCarCity.CityName : '请选择城市'}}</div>
              <div class="cityList" v-show="showPickCarCity" @click.stop="clickWhite">
                <ul class="cityLetterList clearfix">
                  <li
                    v-for="item,index in rentalCarCityList"
                    :class="{active:activeNum == index}"
                    @click.stop="changeLetter(item,index)"
                  >{{item.letter}}
                  </li>
                </ul>
                <ul class="cityListContent">
                  <li
                    v-for="item,index in carCityList" class="clearfix"
                    v-show="item.cityName[0]"
                  >
                    <strong>{{item.cityLetter}}</strong>
                    <div class="cityListDetails">
                      <span
                        v-for="item,index in item.cityName"
                        @click.stop="changeCity(item)"
                      >{{item.CityName}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <el-date-picker
              style="width:140px;"
              v-model="pickCarData"
              @change="changePickDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
            <el-time-select
              v-model="pickCarTime"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '23:59'
              }"
              style="width: 120px;"
              placeholder="选择时间">
            </el-time-select>
            <div class="cityListWrap">
              <i></i>
              <div class="inputDiv2" @click.stop="showChangePlace">
                {{pickCarPlace.MarkName ? pickCarPlace.MarkName : '请选择地点'}}
              </div>
              <div class="cityList" v-show="showPickCarPlace" @click.stop="clickWhite">
                <ul class="placeList clearfix">
                  <li
                    v-for="item,index in cityPlaceList"
                    :class="{active:placeNum == index}"
                    @click.stop="changePlaceType(item,index)"
                  >{{item.AttrName}}
                  </li>
                </ul>
                <div class="placeListContent clearfix">
                    <span
                      v-for="item,index in cityPlaceHomeList"
                      @click.stop="changePlace(item)"
                    >{{item.MarkName}}</span>
                </div>
              </div>
            </div>
          </div>
          <!--还车-->
          <div class="pickCar">
            <strong>还车</strong>
            <div class="cityListWrap">
              <i></i>
              <div class="inputDiv" @click.stop="showChangeReturnCity">
                {{returnCarCity.CityName ? returnCarCity.CityName : '请选择城市'}}
              </div>
              <div class="cityList" v-show="showReturnCarCity" @click.stop="clickWhite">
                <ul class="cityLetterList clearfix">
                  <li
                    v-for="item,index in rentalCarCityList"
                    :class="{active:activeNum == index}"
                    @click.stop="changeReturnLetter(item,index)"
                  >{{item.letter}}
                  </li>
                </ul>
                <ul class="cityListContent">
                  <li
                    v-for="item,index in carCityList" class="clearfix"
                    v-show="item.cityName[0]"
                  >
                    <strong>{{item.cityLetter}}</strong>
                    <div class="cityListDetails">
                      <span
                        v-for="item,index in item.cityName"
                        @click.stop="changeReturnCity(item)"
                      >{{item.CityName}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <el-date-picker
              style="width:140px;"
              v-model="returnCarData"
              type="date"
              value-format="yyyy-MM-dd"
              @change="changeReturnDate"
              placeholder="选择日期">
            </el-date-picker>

            <el-time-select
              v-model="returnCarTime"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '23:59'
              }"
              style="width: 120px;"
              @change="changeReturnTime"
              placeholder="选择时间">
            </el-time-select>
            <div class="cityListWrap">
              <i></i>
              <div class="inputDiv2" @click.stop="showChangeReturnPlace">
                {{returnCarPlace.MarkName ? returnCarPlace.MarkName : '请选择地点'}}
              </div>
              <div class="cityList" v-show="showReturnCarPlace" @click.stop="clickWhite">
                <ul class="placeList clearfix">
                  <li
                    v-for="item,index in cityPlaceList"
                    :class="{active:placeNum == index}"
                    @click.stop="changeReturnPlaceType(item,index)"
                  >{{item.AttrName}}
                  </li>
                </ul>
                <div class="placeListContent clearfix">
                    <span
                      v-for="item,index in cityPlaceHomeList"
                      @click.stop="changeReturnPlace(item)"
                    >{{item.MarkName}}</span>
                </div>
              </div>
            </div>
          </div>
          <!--去选车-->
          <div class="submit">
            <span>共{{dayLong ? dayLong : 0}}天</span>
            <button @click.stop="goSeleteCar">去选车</button>
          </div>
        </div>
      </div>
    </div>
    <!--describe描述-->
    <ul class="describe">
      <li><span>350</span>
        <p>个城市<br/>全国2000家门店</p></li>
      <li><span>3000</span>
        <p>种车型<br/>满足旅行需求</p></li>
      <li><span>100%</span>
        <p>预留车辆<br/>到店免费升级</p></li>
      <li><span>安心</span>
        <p>一线租车公司<br/>服务有保障，保险安心选</p></li>
    </ul>
    <!--租车精选-->
    <div class="RentalCar">
      <div class="RentalCont">
        <div style="font-size:20pt " align="center">全国租车精选</div>
        <div class="CarShow">
          <ul>
            <!--城市地点-->
            <strong>限时优惠</strong>
            <li v-for="item,index in carRentalIndexInfo" :class="{active:index==n}"
                @click.stop="clickCarRental(index,item)">
              {{item.AreaName}}
            </li>
          </ul>
          <!--车子种类-->
          <div class="CarClass">
            <div class="Car" v-for="item,index in carRentalIndexInfoObj.CarList"
                 @click.stop="golCarDiscount(item.cr_crc_BrandId)">
              <img v-lazy="item.cr_crc_ImagePath">
              <div class="CarDes">
                <span><strong>{{item.cr_crc_BrandName}}</strong><br/>自动挡</span>
                <p><span>￥{{item.Price}}元/天</span>起</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--车轮下的中国-->
    <div class="modwhite">
      <div class="PathCont">
        <br/><br/><br/><br/><br/>
        <div style="font-size:20pt " align="center">车轮下的中国</div>

        <ul>
          <li v-for="pa in PathCar">
            <img v-for="md in pa" v-lazy="md.image">
            <div class="textCont" v-for="md in pa">
              <span class="posLeft">“</span>
              <p style="font-size: 15px" overflow="auto">{{md.des}}</p>
              <span class="posRight">”</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--一线租车公司-->
    <div class="RentalCompany">
      <div class="companyCont">
        <h1>一线租车公司</h1>
        <div class="CarCompany" v-for="item in carHertzList">
          <img v-lazy="item.cr_h_Logo" style="width: 200px;height: 100px">
          <span>{{item.cr_h_Name}}</span>
        </div>
      </div>
    </div>
    <!--预定-->
    <div class="reserve">
      <div class="content">
        <h1>预定只需3分钟</h1>
        <div class="step" v-for="cont in RentalCarBtn"><strong v-for="ns in cont">{{ns.tit}}</strong>
          <p v-for="ns in cont">{{ns.text}}</p></div>
        <button @click.stop="goTop">立即租车</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        pickCarCity: {
          CityFirst: "C",
          CityId: 269,
          CityName: "成都市"
        },
        activeNum: 0,
        showPickCarCity: false,
        pickCarPlace: {
          MarkId: 306,
          MarkName: "双流机场T2航站楼"
        },
        placeNum: 0,
        showPickCarPlace: false,
        returnCarCity: {
          CityFirst: "C",
          CityId: 269,
          CityName: "成都市"
        },
        showReturnCarCity: false,
        returnCarPlace: {
          MarkId: 306,
          MarkName: "双流机场T2航站楼"
        },
        showReturnCarPlace: false,
        pickCarData: '',
        returnCarData: '',
        pickCarTime: '00:00:00',
        returnCarTime: '00:00:00',
        dayLong: 0,
        carCityObj: '',
        carPlaceObj: '',
        d: '',
        t: '',


        n: 0,
        /*地区*/
        PathCar: [
          [{
            image: require('@/assets/img/theme1.png'),
            des: '总是羡慕别人的生活方式，总是幻想自己何时能来一场说走就走的旅行，我们总是找各种理由为自己找借口,可是你不出发，你永远不知道自己能走多远。'
          }],
          [{image: require('@/assets/img/theme2.png'), des: '田园民俗在日升日落中即使破旧，但仍然是过去那副生动的样子，在时间的长河里相对静止。'}],
          [{
            image: require('@/assets/img/theme3.png'),
            des: '你也许去过云南很多次，你曾漫步于丽江大理香格里拉的大街小巷，你也曾留恋着那里的蓝天白云和悠闲的生活，但你却从未注意过云南边陲上一个名叫沧源的小城。'
          }],
          [{
            image: require('@/assets/img/theme4.png'),
            des: '与其去人潮汹涌的海南岛，不如避开人潮，来到这座具有历史岁月的海滨小城。花上几天时间，细细品味着古朴自然与千年文化的精髓。。'
          }],
        ],
        //一线租车公司
        RentalCarBtn: [
          [{tit: '搜索', text: '选取还车时间和地点'}],
          [{tit: '选车', text: '选择合适的车型'}],
          [{tit: '填写订单', text: '填写联系人及驾驶员信息'}],
          [{tit: '提交订单', text: '确认租车信息'}],
          [{tit: '预订成功', text: '轻松开启旅程'}]
        ]
      }
    },
    computed: mapGetters([
      'carRentalIndexInfo',
      'carRentalIndexInfoObj',
      'carHertzList',
      'rentalCarCityList',
      'cityPlaceList',
      'carCityList',
      'cityPlaceHomeList'
    ]),
    created() {
      this.t = new Date();
      this.pickCarData = this.t.getFullYear() + '-' + (this.t.getMonth() + 1) + '-' + (this.t.getDate() + 1);
      this.pickCarTime = this.returnCarTime = '10:00';
      this.d = new Date();
      this.d.setDate(this.t.getDate() + 3);
      this.returnCarData = this.d.getFullYear() + '-' + (this.d.getMonth() + 1) + '-' + (this.d.getDate() + 1);

      this.initData().then(() => {
      })
      this.initCity();
      this.initCityPlace(this.pickCarCity.CityId);
      this.initCityPlace(this.returnCarCity.CityId);
      this.initDayLong();
    },
    methods: {
      //点击空白
      clickWhite(){},
      //选择首字母导航
      changeLetter(item, index) {
        this.activeNum = index;
        this.$store.commit('initCarCityList', item.city);
      },
      //初始化城市数据
      initCity() {
        let GetCarRentCityInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
        };
        this.$store.dispatch('initRentalCarCity', GetCarRentCityInfo)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: "error"
            })
          })
      },
      //显示城市列表
      showChangeCity() {
        this.showPickCarCity = true;
        this.showPickCarPlace = false;
        this.showReturnCarCity = false;
        this.showReturnCarPlace = false;
      },
      //选择城市
      changeCity(item) {
        this.pickCarCity = item;//CityName
        this.pickCarPlace = '';
        this.showPickCarCity = false;
        this.activeNum = 0;
        this.initCityPlace(item.CityId);
      },
      //初始化地点名称
      initCityPlace(id) {
        let GetCityLandmarkInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "CityId": id,
        };
        this.$store.dispatch('initCityPlace', GetCityLandmarkInfo)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: "error"
            })
          })
      },
      //显示城市地点列表
      showChangePlace() {
        this.showPickCarPlace = true;
        this.showPickCarCity = false;
        this.showReturnCarCity = false;
        this.showReturnCarPlace = false;
      },
      //选择城市地点
      changePlaceType(item, index) {
        this.placeNum = index;
        this.$store.commit('initCityPlaceHome', item.MarkArry)
      },
      //选择地点
      changePlace(item) {
        this.placeNum = 0;
        this.pickCarPlace = item;
        this.showPickCarPlace = false;
      },
      //显示还车城市
      showChangeReturnCity() {
        this.showReturnCarCity = true;
        this.showPickCarCity = false;
        this.showPickCarPlace = false;
        this.showReturnCarPlace = false;
      },
      //选择首字母导航
      changeReturnLetter(item, index) {
        this.activeNum = index;
        this.$store.commit('initCarCityList', item.city);
      },
      //选择还车城市
      changeReturnCity(item) {
        this.returnCarCity = item;//CityName
        this.returnCarPlace = '';
        this.showReturnCarCity = false;
        this.activeNum = 0;
        this.initCityPlace(item.CityId);
      },
      //显示还车地点
      showChangeReturnPlace() {
        this.showReturnCarPlace = true;
        this.showPickCarCity = false;
        this.showPickCarPlace = false;
        this.showReturnCarCity = false;
      },
      //选择城市地点
      changeReturnPlaceType(item, index) {
        this.placeNum = index;
        this.$store.commit('initCityPlaceHome', item.MarkArry);
      },
      //选择还车地点
      changeReturnPlace(item) {
        this.placeNum = 0;
        this.returnCarPlace = item;
        this.showReturnCarPlace = false;
      },
      //城市点击
      clickCarRental(index, item) {
        this.carCityObj = {
          CityFirst: "",
          CityId: item.AreaID,
          CityName: item.AreaName
        }
        let GetCityLandmarkInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "CityId": item.AreaID,
        };
        this.$store.dispatch('initCityPlace', GetCityLandmarkInfo)
          .then(data => {
            this.carPlaceObj = data[0].MarkArry[0];
          })
        this.n = index;
        this.$store.commit('updateCarRentalIndexInfoObj', item)
      },
      //初始化
      async initData() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
        };
        await this.$store.dispatch('initCarRentalIndexInfo', options)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: "error"
            })
          })
      },
      //跳转到详情页
      golCarDiscount(id) {
        if (!this.carCityObj) {
          this.carCityObj = {
            CityFirst: "",
            CityId: this.carRentalIndexInfo[0].AreaID,
            CityName: this.carRentalIndexInfo[0].AreaName
          }
          let GetCityLandmarkInfo = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "CityId": this.carRentalIndexInfo[0].AreaID,
          };
          this.$store.dispatch('initCityPlace', GetCityLandmarkInfo)
            .then(data => {
              this.carPlaceObj = data[0].MarkArry[0];
              let carInformationObj = {
                selectedCity: this.carCityObj,
                selectedPlace: this.carPlaceObj,
                selectedReturnCity: this.carCityObj,
                selectedReturnPlace: this.carPlaceObj,
                pickCarData: this.pickCarData,
                pickCarTime: this.pickCarTime,
                returnCarData: this.returnCarData,
                returnCarTime: this.returnCarTime
              };
              for (let attr in carInformationObj) {
                if (carInformationObj[attr] == '') {
                  this.$notify({
                    message: '请先完善筛选信息!!',
                    type: 'error'
                  })
                  return
                }
              }
              sessionStorage.setItem('carInformation', JSON.stringify(carInformationObj))
              const {href} = this.$router.resolve({
                name: 'RentalCarDiscount',
                params: {id: id}
              });
              window.open(href, '_blank')
//              this.$router.push({name: 'RentalCarDiscount', params: {id: id}})
            })
        } else {
          let carInformationObj = {
            selectedCity: this.carCityObj,
            selectedPlace: this.carPlaceObj,
            selectedReturnCity: this.carCityObj,
            selectedReturnPlace: this.carPlaceObj,
            pickCarData: this.pickCarData,
            pickCarTime: this.pickCarTime,
            returnCarData: this.returnCarData,
            returnCarTime: this.returnCarTime
          };
          for (let attr in carInformationObj) {
            if (carInformationObj[attr] == '') {
              this.$notify({
                message: '请先完善筛选信息!!',
                type: 'error'
              })
              return
            }
          }
          sessionStorage.setItem('carInformation', JSON.stringify(carInformationObj))
          const {href} = this.$router.resolve({
            name: 'RentalCarDiscount',
            params: {id: id}
          });
          window.open(href, '_blank')
//          this.$router.push({name: 'RentalCarDiscount', params: {id: id}})
        }
      },
      //去选车
      goSeleteCar() {
        this.initDayLong();
        sessionStorage.setItem('Cartitle', '租车_去选车')
        let carInformationObj = {
          selectedCity: this.pickCarCity,
          selectedPlace: this.pickCarPlace,
          selectedReturnCity: this.returnCarCity,
          selectedReturnPlace: this.returnCarPlace,
          pickCarData: this.pickCarData,
          pickCarTime: this.pickCarTime,
          returnCarData: this.returnCarData,
          returnCarTime: this.returnCarTime
        };
        for (let attr in carInformationObj) {
          if (carInformationObj[attr] == '') {
            this.$notify({
              message: '请先完善筛选信息!!',
              type: 'error'
            })
            return
          }
        }
        sessionStorage.setItem('carInformation', JSON.stringify(carInformationObj))
        const {href} = this.$router.resolve({
          name: 'RentalCarDiscount',
          params: {id: '0'}
        });
        window.open(href, '_blank')
//        this.$router.push({name: 'RentalCarDiscount', params: {id: '0'}})
      },
      //初始化租车时间长度
      initDayLong() {
        let returnDate = new Date(this.returnCarData + ' ' + this.returnCarTime);
        let pickDate = new Date(this.pickCarData + ' ' + this.pickCarTime);
        this.dayLong = Math.ceil((returnDate.getTime() - pickDate.getTime()) / 86400000);
        if (Math.ceil((returnDate.getTime() - pickDate.getTime()) / 86400000) <= 0) {
          this.$notify({
            message: '请选择有效日期!!',
            type: 'error'
          })
          this.pickCarData = this.t.getFullYear() + '-' + (this.t.getMonth() + 1) + '-' + (this.t.getDate() + 1);
          this.returnCarData = this.d.getFullYear() + '-' + (this.d.getMonth() + 1) + '-' + (this.d.getDate() + 1);
          returnDate = new Date(this.returnCarData + ' ' + this.returnCarTime);
          pickDate = new Date(this.pickCarData + ' ' + this.pickCarTime);
          this.dayLong = Math.ceil((returnDate.getTime() - pickDate.getTime()) / 86400000);
        }
        return this.dayLong;

      },
      //选择取车日期
      changePickDate() {
        if (new Date().getDate() < new Date(this.pickCarData)) {
          console.log(1)
        }
      },
      //选择日期计算天数
      changeReturnDate() {
        if (!this.pickCarData) {
          this.$notify({
            message: '请先选择取车日期!!',
            type: 'error'
          })
          this.returnCarData = '';
          return
        }
        this.initDayLong();
      },
      //选择时间计算天数
      changeReturnTime() {
        this.initDayLong();
      },
      //返回顶部
      goTop() {
        $(document).scrollTop(0)
      },
    },
    mounted() {
      document.addEventListener('click', () => {
        this.showPickCarCity = false;
        this.showPickCarPlace = false;
        this.showReturnCarCity = false;
        this.showReturnCarPlace = false;
      })
    }
  }
</script>


<style lang="scss" scoped type="text/scss">

  .placeListContent > span {
    float: left;
    margin: 0 10px;
    font: 14px/2 "微软雅黑";
    color: #999;
  }

  .placeListContent > span:hover {
    cursor: pointer;
    color: #f80;
  }

  .cityListWrap {
    display: inline-block;
    position: relative;
  }

  .cityListWrap i {
    position: absolute;
    right: 10px;
    top: 20px;
    content: '';
    width: 8px;
    height: 8px;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    z-index: 60;
    transform: rotateZ(-135deg);
  }

  .cityList {
    width: 540px;
    padding: 12px;
    background-color: #fff;
    border: 1px solid #ccc;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    position: absolute;
    top: 40px;
    left: 0;
    z-index: 80;
  }

  .cityLetterList > li {
    float: left;
    width: 16.5%;
    text-align: center;
    font: 14px/2 "微软雅黑";
    border-bottom: 1px solid #ccc;
  }

  .cityLetterList > li:hover {
    cursor: pointer;
  }

  .cityLetterList > li.active {
    border-color: #f80;
    color: #f80;
  }

  .cityListContent {
    font: 14px/2 "微软雅黑";
    margin-top: 10px;
  }

  .cityListContent > li > strong {
    float: left;
    margin-top: 10px;
    color: #f80;
  }

  .cityListContent > li > div {
    width: 470px;
    float: right;
  }

  .cityListContent > li span {
    float: left;
    white-space: nowrap;
    color: #999;
    margin: 0 20px;
  }

  .cityListContent > li span:hover {
    color: #f80;
    cursor: pointer;
  }

  .placeList {
    border-bottom: 1px solid #ccc;
  }

  .placeList > li {
    font: 14px/2 "微软雅黑";
    float: left;
    padding: 0 10px;
    margin-bottom: -1px;
    border-bottom: 1px solid #ccc;
  }

  .placeList > li.active {
    border-color: #f80;
    color: #f80;
  }

  .placeList > li:hover {
    cursor: pointer;
  }

  .pickCar > strong {
    display: block;
  }

  .bgPicture {
    background-image: url("../../assets/img/header.png");
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 420px;
    position: relative;
    .DomesticRentalCarBox {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      position: relative;
      //国内租车
      .DomesticRentalCar {
        float: left;
        width: 440px;
        height: 370px;
        background-color: white;
        position: absolute;
        top: 25px;
        left: 0;
        border: 4px solid rgb(35, 204, 119);
        padding: 20px;

        h3 {
          text-align: center;
          font: 20px/1 "微软雅黑";
          color: #22c223;
        }
        div {
          margin-top: 5px;
          strong {
            font: 18px/1 "微软雅黑";
          }
        }
        .submit {
          margin-top: 20px;
          text-align: right;
          span {
            font: 16px/1.5 "微软雅黑";
            color: #f80;
            vertical-align: top;
          }
          button {
            outline: none;
            font: 18px/40px "微软雅黑";
            background-color: #f80;
            padding: 0 50px;
            color: #fff;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
          }
        }
      }
    }

  }

  //保障描述
  .describe {
    list-style: none;
    width: 1200px;
    height: 105px;
    margin: 0px auto;
    li {
      width: 297px;
      float: left;
      line-height: 100px;
      span {
        font-size: 40px;
        color: #f80;
        font-family: "Microsoft YaHei";
      }
      p {
        line-height: 20px;
        font-size: 14px;
        display: inline-block;
        margin-left: 10px;
        color: #999;
      }
    }
  }

  /*//租车精选*/
  .RentalCar {
    width: 100%;
    height: 700px;
    background-color: rgba(200, 200, 200, .1);
    .RentalCont {
      width: 1200px;
      margin: 0px auto;
      padding-top: 50px;
      h1 {
        font-family: "Microsoft YaHei";
        font-weight: normal;
        text-align: center;
      }
      /*//城市地点*/
      .CarShow {
        height: 500px;
        margin-top: 50px;
        ul {
          height: 40px;
          list-style: none;
          border-bottom: 3px solid #eee;
          strong, li {
            height: 40px;
            line-height: 40px;
            float: left;
          }
          li.active {
            line-height: 40px;
            color: #22c233;
            border-bottom: 3px solid #22c233;
          }
          strong {
            margin-left: -40px;
            font-family: "Microsoft YaHei";
            font-size: 20px;
            font-weight: normal;
          }
          li {
            margin-left: 40px;
            font-size: 14px;
            &:hover {
              color: #22c233;
            }
          }
        }
        //车子种类
        .CarClass {
          height: 500px;
          .Car {
            width: 287px;
            height: 217px;
            float: left;
            background-color: #fff;
            margin: 10px 5px 0px 5px;
            img {
              width: 200px;
              height: 140px;
              margin: 0px 0px 10px 40px;
            }
            .CarDes {
              height: 60px;
              span {
                display: inline-block;
                float: left;
                font-family: "Microsoft YaHei";
                margin-left: 10px;
                line-height: 20px;
                font-size: 12px;
                color: #999;
                strong {
                  font-weight: normal;
                  font-size: 18px;
                  color: #333;
                }
              }
              p {
                float: right;
                font-family: "Microsoft YaHei";
                position: relative;
                color: #999;
                margin-right: 20px;
                font-size: 14px;
                line-height: 30px;
                padding-top: 10px;
                span {
                  color: #f80;
                  font-size: 20px;
                  padding-right: 5px;
                }
              }
            }
          }
        }
      }
    }
  }

  .CarClass > .Car {
    overflow: hidden;
  }

  .CarClass > .Car:hover img {
    animation: myfirst .5s linear;
  }

  @keyframes myfirst {
    0% {
      transform: translateX(0)
    }
    20% {
      transform: translateX(-300px)
    }
    40% {
      transform: translate(-300px, -500px)
    }
    60% {
      transform: translate(300px, -500px)
    }
    80% {
      transform: translate(300px, 0px)
    }
    100% {
      transform: translateX(0)
    }
  }

  /*//车轮下的中国*/
  .modwhite {
    width: 100%;
    .PathCont {
      width: 1200px;
      height: 600px;
      margin: 0px auto;
      #1 {
        margin-top: 50px;
      }
      h1 {
        font-family: "Microsoft YaHei";
        font-weight: normal;
        text-align: center;
      }
      ul {
        list-style: none;
        margin: 80px auto 0px;
        padding: 0px;
        li {
          width: 280px;
          height: 410px;
          float: left;
          margin: 0px 10px 0px 10px;
          background-color: rgba(200, 200, 200, .1);
          .textCont {
            width: 230px;
            height: 100px;
            position: relative;
            .posLeft, .posRight {
              color: #ccc;
              font-size: 40px;
              position: absolute;
            }
            .posLeft {
              top: 0px;
              left: -10px;
            }
            .posRight {
              right: -60px;
              top: 90px;
            }
            p {
              width: 230px;
              height: 90px;
              padding-top: 20px;
              margin-left: 30px;
              font: 18px/1.5 "微软雅黑";
              overflow: hidden;
              text-indent: 2rem;
            }
          }
        }
      }
    }
  }

  //一线租车公司
  .RentalCompany {
    height: 360px;
    width: 100%;
    background-color: rgba(200, 200, 200, .1);
    .companyCont {
      width: 1200px;
      height: 360px;
      margin: 0px auto;
      h1 {
        font-family: "Microsoft YaHei";
        font-weight: normal;
        text-align: center;
        padding-top: 40px;
      }
      .CarCompany {
        margin-top: 20px;
        width: 380px;
        height: 160px;
        float: left;
        margin-left: 20px;
        word-wrap: break-word;
        img {
          vertical-align: top;
        }
        span {
          font-family: "Microsoft YaHei";
          margin-left: 10px;
          padding-top: 6px;
          display: inline-block;
          width: 210px;
          height: 130px;
          font-size: 14px;
          color: #666;
          line-height: 20px;
        }
      }
    }
  }

  //预定
  .reserve {
    width: 100%;
    .content {
      width: 1200px;
      margin: 0px auto;
      height: 340px;
      h1 {
        font-family: "Microsoft YaHei";
        font-weight: normal;
        text-align: center;
        font: 20px/2 "微软雅黑";
      }
      .step {
        margin: 50px 0px 0px 90px;
        font-family: "Microsoft YaHei";
        float: left;
        strong {
          font-size: 22px;
          font-weight: normal;
        }
        p {
          margin-top: 4px;
          font-size: 14px;
          color: #666;
        }
      }
      button {
        position: relative;
        right: 500px;
        top: 200px;
        width: 180px;
        height: 40px;
        font-family: "Microsoft YaHei";
        font-size: 20px;
        border: none;
        outline: none;
        color: #fff;
        background-color: #f80;
        &:hover {
          opacity: .8;
        }
      }
    }
  }

  .inputDiv {
    width: 120px;
    border: 1px solid #dcdfe6;
    font-size: 14px;
    line-height: 20px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    padding: 9px;
    color: #606266;
  }

  .inputDiv2 {
    width: 200px;
    border: 1px solid #dcdfe6;
    font-size: 14px;
    line-height: 20px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    padding: 9px;
    color: #606266;
  }

</style>
