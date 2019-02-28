<template>
  <div id="app">
    <!--loading加载-->
    <div class="loadingMask" v-show="isLoading">
      <div class="loadingMaskBox"></div>
      <div class="loadingContentBox">
        <i></i>
        <p>{{text}}</p>
      </div>
    </div>
    <!--<comment></comment>-->
    <keep-alive>
      <router-view/>
    </keep-alive>

    <!--<div class="HotelRecommendDetalisListIntroduceBoxIconList">-->
      <!--<i class="Restaurant"></i>-->
      <!--<i class="ParkingLot"></i>-->
      <!--<i class="meetPlaneService"></i>-->
      <!--<i class="laundryService"></i>-->
      <!--<i class="swimmingPool"></i>-->
      <!--<i class="Gym"></i>-->
      <!--<i class="ConferenceRoom"></i>-->
      <!--<i class="hotWater"></i>-->
      <!--<i class="WiFi"></i>-->
      <!--<i class="pet"></i>-->
      <!--<i class="spa"></i>-->
      <!--<i class="transit"></i>-->
    <!--</div>-->
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
export default {
  name: 'app',
  computed:mapGetters([
    'isLoading',
    'text'
  ]),
  methods:{
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      return flag;
    },
  },
  mounted() {
    let href = window.location.href;
    if (this._isMobile()) {
      window.location.href = 'http://hly.1000da.com.cn/mobile/index.html#/';
    }
  }
}
</script>

<style>
  /*加载遮罩*/
  .loadingMask .loadingContentBox {
    width: 100%;
    text-align: center;
    color: #409eff;
    position: absolute;
    z-index: 9999;
    top: 50%;
  }

  .loadingMask .loadingContentBox i {
    width: 31px;
    height: 32px;
    background: url("./assets/img/loadingICon.png") no-repeat;
    display: block;
    margin: 0 auto 10px;
    animation: rotating 2s linear infinite;
  }
  .loadingMask .loadingMaskBox {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
    background-color: #000;
    /*opacity: .9;*/
  }
  .el-loading-spinner .circular {
    /*margin-left: 50%;*/
  }
  .HotelRecommendDetalisListIntroduceBoxIconList > i {
    float: left;
    width: 24px;
    height: 24px;
    background: url("./assets/img/hotel-facility.png") no-repeat;
    margin-right: 5px;
  }
  /*餐厅*/
  .HotelRecommendDetalisListIntroduceBoxIconList > .Restaurant {
    background-position: -432px 0;
  }

  /*停车场*/

  .HotelRecommendDetalisListIntroduceBoxIconList > .ParkingLot {
    background-position: -192px 0;
  }

  /*接机服务*/

  .HotelRecommendDetalisListIntroduceBoxIconList > .meetPlaneService {
    background-position: -240px 0;
  }

  /*洗衣服务*/

  .HotelRecommendDetalisListIntroduceBoxIconList > .laundryService {
    background-position: -312px 0;
  }

  /*游泳池*/

  .HotelRecommendDetalisListIntroduceBoxIconList > .swimmingPool {
    background-position: -336px 0;
  }

  /*健身房*/

  .HotelRecommendDetalisListIntroduceBoxIconList > .Gym {
    background-position: -96px 0;
  }

  /*会议室*/

  .HotelRecommendDetalisListIntroduceBoxIconList > .ConferenceRoom {
    background-position: -552px 0;
  }

  /*24小时热水*/

  .HotelRecommendDetalisListIntroduceBoxIconList > .hotWater {
    background-position: -504px 0;
  }

  /*WIFI*/

  .HotelRecommendDetalisListIntroduceBoxIconList > .WiFi {
    background-position: -168px 0;
  }

  /*宠物*/

  .HotelRecommendDetalisListIntroduceBoxIconList > .pet {
    background-position: -384px 0;
    height: 24px;
    width: 24px
  }

  /*spa*/

  .HotelRecommendDetalisListIntroduceBoxIconList > .spa {
    background-position: -72px 0;
    height: 24px;
    width: 24px
  }

  /*公共汽车*/

  .HotelRecommendDetalisListIntroduceBoxIconList > .transit {
    background-position: -408px 0;
    height: 24px;
    width: 24px
  }
  .HotelRecommendDetalisListIntroduceBoxIconList > .shuttleBus {
    background-position: -408px 0;
    height: 24px;
    width: 24px
  }

</style>
