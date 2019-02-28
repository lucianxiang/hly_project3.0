<template>
    <!--商家详情-->
  <div class="MerchantDetail">
    <!--商家描述-->
    <div class="MerchantDes">
      <!--商家图片-->
      <img alt="" v-lazy="foodDetailStoreFrontList.fd_ImageURL">
      <!--商家简介-->
      <div class="MerchantAbout">
        <p class="MerchantName">{{foodDetailStoreFrontList.fd_sf_ProductName}}</p>
        <div class="Describe">{{foodDetailStoreFrontList.fd_sf_Introduce}}</div>
      </div>
    </div>
    <!--交通情况-->
    <div class="TrafficCondition">
      <div class="TrafficNews">交通情况</div>
      <div>

      </div>
      <div id="allmap" style="margin: 0 auto;"></div>
    </div>
    <!--菜品名-->
    <div class="FoodName" v-for="item in inFoodList">

      <img alt="" v-lazy="item.fd_gi_GoodImage">
      <div class="FoodDescribe">
        <div>
          <p>{{item.fd_sfp_Name}}</p>
          <p>价格:{{item.fd_sfp_Price}}</p>
          <div class="FoodDes">{{item.fd_if_Describe}}</div>
        </div>
      </div>
    </div>
    <!--预定-->
    <div class="Reservation">
      <button @click="PlaceOrder">立即预定</button>
      <button @click="goBack">返回</button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
      data(){
        return{
          id:'',
          FoodNames:[{name:''},{name:''},{name:''}]
        }
      },
      computed:mapGetters([
        'foodDetailStoreFrontList',
        'inFoodList'
      ]),
      created(){
        if(sessionStorage.getItem('MStitle') ){
          document.title=sessionStorage.getItem('MStitle')
        }

        this.id= this.$route.params.id;
        this.initData().then((obj)=>{
          sessionStorage.setItem('foodModel',JSON.stringify(obj))
          this.initMap(obj)
        })
      },
      methods:{
        //查询地图
        initMap(foodModel) {
          var map = new BMap.Map("allmap");
          var point = new BMap.Point(foodModel.fd_sf_Lng, foodModel.fd_sf_Lat);
          var marker = new BMap.Marker(point);  // 创建标注
          map.addOverlay(marker);              // 将标注添加到地图中
          map.centerAndZoom(point, 15);
          setTimeout(function(){
            map.setZoom(14);
          }, 2000);  //2秒后放大到14级
          map.enableScrollWheelZoom(true);
          var opts = {
            width : 200,     // 信息窗口宽度
            height: 100,     // 信息窗口高度
            title : foodModel.fd_sf_ProductName , // 信息窗口标题
            enableMessage:true,//设置允许信息窗发送短息
            message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
          };
          var infoWindow = new BMap.InfoWindow(`地址：${foodModel.fd_sf_Address}`, opts);  // 创建信息窗口对象
          marker.addEventListener("click", function(){
            map.openInfoWindow(infoWindow,point); //开启信息窗口
          });
        },
        async initData(){
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "storeFrontID": this.id,//店面编号
          };
          let foodModel = await this.$store.dispatch('initFoodDetailStoreFront',options)
          return foodModel
        },
        PlaceOrder(){
          this.$router.push({name:'FoodOrder'});
        },
        goBack () {
          window.history.length > 1
            ? this.$router.go(-1)
            : this.$router.push('/')
        }
      }
    }
</script>

<style lang="scss" scoped type="text/scss">
  #allmap{
    width: 1198px;
    height: 400px;
  }
  .MerchantDetail {
    padding-top:40px;
    width: 100%;
    height: 100%;
    background-color: #f9f9f9; //页面的背景颜色
    //商家描述
    .MerchantDes {
      box-shadow: 0 0 10px 0px #aaa;
      width: 1200px;
      height: 300px;
      margin: 0px auto;
      display: flex;
      border: 1px solid #c8c8c8;
      background-color: hsla(0, 100%, 100%, 1);
      &:hover{
        /*border: 2px solid rgba(255,0,0,.4);*/
      }
      //商家图片
      img {
        width: 400px;
        height: 220px;
        margin: 40px 0px 0px 20px;
        /*background-color: hsla(123, 70%, 70%, .2);*/
      }
      //商家简介
      .MerchantAbout {
        width: 750px;
        height: 220px;
        margin: 40px 0px 0px 20px;
        /*background-color: hsla(45, 0%, 0%, .2);*/
        .MerchantName {
          font-weight: bold;
          /*float: left;*/
          font-size:18px;
          margin: 0px 0px 12px 0px;
        }
        img{
          float: left;
        }
        .Describe {
          text-indent: 2em;
          width: 750px;
          height: 190px;
          /*background-color: hsla(20, 100%, 100%, 1);*/
        }
      }
    }
    //交通情况
    .TrafficCondition {
      box-shadow: 0 0 10px 0px #aaa;
      width: 1200px;
      /*display: flex;*/
      padding-bottom: 20px;
      margin: 30px auto 0px;
      border: 1px solid #c8c8c8;
      background-color: hsla(125, 100%, 100%, 1);
      &:hover{
        /*border: 2px solid rgba(255,0,0,.4);*/
      }
      img {
        width: 330px;
        height: 210px;
        margin: 16px 0px 0px 20px;
        background-color: hsla(123, 70%, 70%, .2);
      }
      .TrafficNews {
        padding: 20px 0;
        width: 820px;
        text-indent: 2em;
        font-weight:bold;
        font-size:18px;
      }
    }
    //菜品名
    .FoodName {
      width: 1200px;
      height: 200px;
      box-shadow: 0 0 10px 0px #aaa;
      display: flex;
      margin: 20px auto 0px;
      border: 1px solid #c8c8c8;
      background-color: hsla(0, 100%, 100%, 1);
      &:hover{
        /*border: 2px solid rgba(255,0,0,.4);*/
      }
      img {
        width: 270px;
        height: 170px;
        margin: 16px 0px 0px 20px;
        background-color: hsla(123, 70%, 70%, .2);
      }
      .FoodDescribe {
        width: 880px;
        height: 170px;
        margin: 16px 0px 0px 20px;
        /*background-color: hsla(127, 30%, 30%, .4);*/
        p {
          margin: 0px auto 10px;
          font-weight: bold;
        }
        .FoodDes {
          text-indent: 2em;
        }
      }
    }
    //预定
    .Reservation {
      width: 1200px;
      height: 100px;
      line-height: 100px;
      margin: 20px auto 0px;
      button{
        border: none;
        outline: none;
        width: 150px;
        color: hsla(0,100%,100%,1);
        background-color: hsla(20,50%,50%,.6);
        height: 40px;
        font-size: 20px;
        font-family: "Microsoft YaHei";
        margin-left: 70px;
         -webkit-border-radius: .4em;
         -moz-border-radius: .4em;
        border-radius: .4em;
        &:hover{
          opacity: .7;
        }
      }
      button:nth-of-type(1){
        margin-left: 35%;
      }
    }
  }
  </style>
