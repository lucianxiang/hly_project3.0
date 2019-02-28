<template>
  <!--首页-->
  <div class="FoodPage">
    <!--顶部logo部分,header-->
    <div class="FoodLogo">
      <!--返回首页-->
      <div class="BackPage">
        <el-carousel  height="500px"  type="card">
          <el-carousel-item style="cursor: pointer"  v-for="item,index in foodDetailStoreFrontList.fd_ImageURL" :key="index">
            <img v-lazy="item" :key="item">
          </el-carousel-item>
        </el-carousel>
      </div><!--美食天堂Gourmet Paradise-->
    </div>

    <!--餐厅简介-->
    <div class="aboutFoodRoom">
      <div class="aboutFoodRoomTitle">
        <strong>--餐厅简介--</strong>
        <span>Restaurant introduction</span>
      </div>
      <div class="aboutFoodRoomContent clearfix">
        <img v-lazy="fd_ImageURL" alt="">
        <div class="aboutFoodRoomC">
          <strong>Restaurant introduction</strong>
          <span>餐厅简介</span>
          <p>
            <span>{{foodDetailStoreFrontList.fd_sf_ProductName}}</span>
            {{foodDetailStoreFrontList.fd_sf_Introduce}}
          </p>
          <strong style="font-size: 14px;color: #fff;padding:3px;border:1px solid #fff;display:inline-block;margin-top: 4px;cursor: pointer" @click="lookAllValue">查看更多</strong>
        </div>
      </div>
    </div>

    <!--欢迎订餐-->

    <div class="welcomeToFood">
      <div class="aboutFoodRoomTitle">
        <strong>--欢迎订餐--</strong>
        <span>Welcome to a reservation</span>
      </div>
      <div class="welcomeToFoodContent">
        <div class="roomIcon clearfix">
          <i title="定位" class="positionIcon"></i>
          <i title="WIFI" class="wifiIcon" v-show="foodDetailStoreFrontList.fd_sf_HasWafi"></i>
          <i title="停车场" class="stopCarIcon" v-show="foodDetailStoreFrontList.fd_sf_WaitCarCount"></i>
          <i title="餐厅" class="foodRoomIcon"></i>
        </div>
        <div class="reservationBtn clearfix">
          <a href="javascript:;" class="immediatelyReservation" @click="reservation(foodDetailStoreFrontList)">立即预定</a>
          <a href="javascript:;" class="shopReservation" @click="shopReservation(foodDetailStoreFrontList)">到店预定</a>
        </div>
      </div>
    </div>

    <!--餐厅位置-->

    <div class="foodRoomPosition">
      <div class="aboutFoodRoomTitle">
        <strong>--餐厅位置--</strong>
        <span>Restaurant location</span>
      </div>
    </div>
    <div id="allmap"></div>

    <!--买家评论-->

    <div class="customerComment">
      <div class="aboutFoodRoomTitle">
        <strong>--买家评论--</strong>
        <span>Customer Comment</span>
      </div>
      <div class="commentsOnTourists clearfix">
        <div class="discountIcon">
          <h3>买家评论</h3>
        </div>
        <!--右边内容-->
        <div class="commentsOnTouristsContentWrap">
          <div class="commentsOnTouristsStatistics">
            <!--点评统计-->
            <div class="commentsOnTouristsStatisticsContent clearfix">
              <div class="satisfaction">
                <span>满意度</span>
                <strong>{{allTicketCommendList.goodrate}}%</strong>
                <span>来自{{total}}名游客的点评</span>
              </div>
              <div class="statisticalChart">
                <div class="statisticalChartLeft">
                  <ul>
                    <li class="clearfix">
                      <span>满意</span>
                      <div class="statisticalChartLeftBar">
                        <div class="statisticalChartLeftBarChild"
                             :style="{width: allTicketCommendList.goodrate + '%'}"></div>
                      </div>
                      <span>{{allTicketCommendList.goodrate}}%</span>
                    </li>
                    <li class="clearfix">
                      <span>一般</span>
                      <div class="statisticalChartLeftBar">
                        <div class="statisticalChartLeftBarChild"
                             :style="{width: allTicketCommendList.middlerate + '%'}"></div>
                      </div>
                      <span>{{allTicketCommendList.middlerate}}%</span>
                    </li>
                    <li class="clearfix">
                      <span>不满意</span>
                      <div class="statisticalChartLeftBar">
                        <div class="statisticalChartLeftBarChild"
                             :style="{width: allTicketCommendList.poorrate + 'px'}"></div>
                      </div>
                      <span>{{allTicketCommendList.poorrate}}%</span>
                    </li>
                  </ul>
                </div>
                <ul class="statisticalChartRight">
                  <li v-for="item,index in allTicketCommendList.data">
                    <strong>{{item.ts_ct_Name}}</strong>
                    <span><i>{{item.score}}</i>/5分</span>
                  </li>
                </ul>
              </div>
              <div class="commentOnAComment">
                <!--<strong>出游归来发点评返现金,<br>-->
                <!--本产品已累计发放<i>19012</i>元</strong>-->
                <a href="javascript:;" @click="goOutComment">发表点评</a>
              </div>
            </div>
            <!--点评类型-->
            <ul class="commentsOnTouristsStatisticsTypeList clearfix">
              <li v-for="item,index in typeList">
                <a href="javascript:;">{{item.name}}</a>
              </li>
            </ul>
          </div>
          <!--评论列表-->
          <ul class="evaluationContent">
            <li class="clearfix" v-for="item,index in ticketCommentDataList">
              <!--游客信息-->
              <div class="touristInfromation">
                <div class="headerImage">
                  <img v-lazy="item.sm_ui_HeadImage" v-show="item.sm_ui_HeadImage" width="60" height="60">
                </div>
                <span class="touristInfromationName">{{item.ts_ct_userName}}</span>
              </div>
              <!--点评内容-->
              <div class="touristComment">
                <ul class="touristCommentList clearfix">
                  <li><span>总体评价:{{item.satisfaction}}</span></li>
                  <li v-for="ite,index in item.typeScore"><span>{{ite.ts_ct_Name}}：{{ite.ts_cs_Score}}分</span></li>
                </ul>
                <p class="touristCommentContent">
                  {{item.ts_ct_Content}}
                </p>
                <ul class="uploadPictureList clearfix" v-show="item.imgData">
                  <li v-for="ite,index in item.imgData">
                    <img width="100" height="100" v-lazy="ite">
                  </li>
                </ul>
                <div class="touristCommentTime">{{item.ts_ct_CreateTime}}</div>
              </div>
              <!--点评赠送-->
              <!--<div class="commentGive">-->
              <!--<strong>点评赠送</strong>-->
              <!--<span>返现<em>￥12</em></span>-->
              <!--<span>抵用券<em>￥100</em></span>-->
              <!--</div>-->
            </li>
          </ul>
          <p v-show="!ticketCommentDataList.length"
             style="font: 16px/2 '微软雅黑';padding:  40px 0;text-align: center;border-bottom: 1px dashed #ccc;"
          >暂无评论</p>
          <!--分页-->
          <div class="block" style="float: right;margin-top: 20px;">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :page-size="5"
              layout="total, prev, pager, next"
              :total="total"
              v-show="total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
  title="更多内容"
  :visible.sync="isLookAll"
  width="50%">
  <p style="text-indent:20px;line-height: 20px">{{foodDetailStoreFrontList.fd_sf_Introduce}}</p>
  <span slot="footer" class="dialog-footer">
    <el-button @click="isLookAll = false">关闭</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        isLookAll:false,
        id: '',
        FoodNames: [{name: ''}, {name: ''}, {name: ''}],
        obj: {},
        typeList: [
          {name: '全部', id: 1},
//          {name: '一般', id: 2},
//          {name: '满意', id: 3},
//          {name: '不满意', id: 4}
        ],//点评类型
        userInfo: {},
        total: 0,
        totalN: 1,
        fd_ImageURL:''
      }
    },
    computed: mapGetters([
      'foodDetailStoreFrontList',
      'inFoodList',
      'ticketCommentDataList',
      'allTicketCommendList'
    ]),
    created() {
      if (this.$route.query.id) {
        this.id = this.$route.query.id;
      }
      if (sessionStorage.getItem('user')) {
        this.userInfo = JSON.parse(sessionStorage.getItem('user'))
      }

      this.initCommentData()
        .then(total => {

          this.total = total;
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          })
        })
      this.allTicketCommend();
    },
    mounted() {
      this.initData().then((obj) => {
        this.fd_ImageURL = obj.fd_ImageURL[0]
        this.$nextTick(() => {
          document.title = '美食_' + obj.fd_sf_ProductName;
          var map = new BMap.Map("allmap");
          var point = new BMap.Point(obj.fd_sf_Lng, obj.fd_sf_Lat);
          map.centerAndZoom(point, 15);

          //添加缩略图控件
          map.addControl(new BMap.OverviewMapControl({isOpen: false, anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));
          //添加缩放平移控件
          map.addControl(new BMap.NavigationControl());
          //添加比例尺控件
          map.addControl(new BMap.ScaleControl());
          var marker = new BMap.Marker(point);  // 创建标注
          map.addOverlay(marker);               // 将标注添加到地图中
          marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        })
        sessionStorage.setItem('foodModel', JSON.stringify(obj))
      })
    },
    methods: {
      //查看更多
      lookAllValue(){
        this.isLookAll = true;
      },
      //立即预订
      reservation(item) {
        if(this.userInfo.sm_ui_ID){
          const {href} = this.$router.resolve({
            name: 'LineOrder',
            query: {id: item.fd_sf_ID}
          });
          window.open(href, '_blank')
        }else{
          this.$router.push({name:'AdminLogin'})
        }
        
      },
      //到店预订
      shopReservation(item) {
        if(this.userInfo.sm_ui_ID){
          const {href} = this.$router.resolve({
            name: 'FoodShopOrder',
            query: {id: item.fd_sf_ID}
          });
          window.open(href, '_blank')
        }else{
          this.$router.push({name:'AdminLogin'})
        }
        
      },
      handleCurrentChange(num) {
        this.initCommentData(num)
      },
      select() {
      },
      changeAvtive(index) {
        this.meatId = index;
      },
      changeActive(index) {
        this.meatsId = index;
      },
      async initData() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "storeFrontID": this.id,//店面编号
        };
        let foodModel = await this.$store.dispatch('initFoodDetailStoreFront', options)
        return foodModel
      },
      PlaceOrder() {
        this.$router.push({name: 'FoodOrder'});
      },
      goBack() {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      },
      goOutComment() {
        this.goComment()
          .then(totalArr => {
            if (totalArr[0]) {
              this.$notify({
                message: '您已评论!!!',
                type: 'warning'
              })
            } else if (!totalArr[0] && totalArr[1]) {
              this.$router.push({name: 'CommentOnAComment', params: {id: this.id ? this.id : '', typeId: 3}})
            } else if (!totalArr[0] && !totalArr[1]) {
              this.$notify({
                message: '您还未到此餐厅用过餐!!!',
                type: 'warning'
              })
            }
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },

      //去评论
      async goComment() {
        let SelectAllComment = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": this.userInfo.token ? this.userInfo.token : '',
          "ID": "",       //产品评论编码
          "UserInfoID": this.userInfo.sm_ui_ID,  // 用户信息编码
          "GoodID": this.id,       //产品编码
          "IsDelete": "0",     //是否有效
          "ts_ct_SysID": "3",     //系统编码  6旅行社 1车票 2门票 3美食 4酒店 5租车
        }
        this.totalN = await this.$store.dispatch('initFoodUserCommend', SelectAllComment)

        let selectOrderInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": this.userInfo.token,
          "fd_or_UserID": this.userInfo.sm_ui_ID,//用户编码
          "fd_or_UseState": "1",//使用状态 0未使用 1已使用
          "fd_or_IsDelete": "0",//是否删除 0未注销 1已注销
        }
        let a = await this.$store.dispatch('foodOrderDetails', selectOrderInfo)
        return [this.totalN, a]

      },
      //     初始化评论
      initCommentData(num) {
        let SelectAllComment = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": this.userInfo.token ? this.userInfo.token : '',
          "ID": "",       //产品评论编码
          "UserInfoID": '',  // 用户信息编码
          "GoodID": this.id,       //产品编码
          "IsDelete": "0",     //是否有效
          "ts_ct_SysID": "3",     //系统编码  6旅行社 1车票 2门票 3美食 4酒店 5租车
          "page": num ? num : 1,
          "rows": 5,
        }
        return this.$store.dispatch('initTicketCommentData', SelectAllComment)

      },
      //总体评论
      allTicketCommend() {
        let SelectAllCommentFixed = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": this.userInfo.token,
          "GoodID": this.id,       //产品编码
          "ts_ct_SysID": "3",     //系统编码  0旅行社 1车票 2门票 3美食 4酒店 5租车
        }
        this.$store.dispatch('allTicketCommend', SelectAllCommentFixed)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
    }
  }
</script>

<style lang="scss" scoped type="text/less">
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  #allmap {
    width: 1200px;
    height: 500px;
    overflow: hidden;
    margin: 0;
    font-family: "微软雅黑";
    margin: 0 auto
  }

  .FoodPage {
    width: 100%;

    overflow: hidden;
  }

  .FoodLogo {
    position: relative;
  }

  .BackPage img {
    width: 100%;
    height: 550px;
  }

  .StoreIntruduce {
    padding-top: 50px;
  }

  .StoreIntruduce > strong {
    position: relative;
    display: block;
    height: 40px;
  }

  .StoreIntruduce > strong > span {
    position: absolute;
    left: 49%;
    top: 0;
    transform: translateX(-50%);
    font: 28px/40px "微软雅黑";
  }

  .StoreIntruduce > strong > div {
    position: absolute;
    left: 49%;
    top: 35px;
    transform: translateX(-50%);
    font: 15px/40px "微软雅黑";
  }

  .FoodStoreIntruduce {
    padding-top: 50px;
  }

  .FoodStoreIntruduceImg img {
    float: left;
    width: 500px;
    height: 320px;
    margin-left: 350px;
  }

  .FoodStoreIntruduce img {
    float: left;
    height: 320px;
  }

  .Triangle {
    position: absolute;
    left: 770px;
    width: 0;
    height: 0;
    border-bottom: 319px solid #d55161;
    border-left: 80px solid transparent;
  }

  .FoodStoreIntruduceInfo {
    float: left;
    width: 500px;
    height: 320px;
    background-color: #d55161;

  }

  .orderFooder {
    height: 222px;
    width: 100%;
    background-color: #d55161;
    position: relative;
    top: -114px;
    z-index: -1;
  }

  .Welcome {
    clear: both;
    padding: 20px;
    margin-left: 730px;
    position: relative;
    top: 15px;
  }

  .Welcome > strong > span {

    margin-left: 10px;
    font: 28px/40px "微软雅黑";
  }

  .Welcome > strong > div {
    margin-left: 15px;
    font: 15px/40px "微软雅黑";
  }

  .orderReservation {
    left: 380px;
  }

  .aboutFoodRoomTitle {
    margin: 70px 0 50px;
  }

  .aboutFoodRoomTitle > strong {
    font: 30px/1.5 "微软雅黑";
    display: block;
    text-align: center;
  }

  .aboutFoodRoomTitle > span {
    font: 16px/1.5 "微软雅黑";
    display: block;
    text-align: center;
  }

  .aboutFoodRoom {
    width: 1200px;
    margin-top: 20px;
    margin: 0 auto;
  }

  .aboutFoodRoomContent {
    margin-top: 50px;
  }

  .aboutFoodRoomContent > img {
    width: 623px;
    height: 402px;
    float: left;
  }

  .aboutFoodRoomContent > div {
    width: 703px;
    height: 402px;
    float: left;
    background-color: #d55161;
    padding-left: 164px;
    padding-top: 35px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 126px 100%);
    margin-left: -126px;
  }

  .aboutFoodRoomC {
    color: #fff;
  }

  .aboutFoodRoomC > strong {
    font: 20px/1.5 "微软雅黑";
    display: block;
  }

  .aboutFoodRoomC > span {
    font: 20px/2 "微软雅黑";
    display: inline-block;
    border-bottom: 2px solid #fff;
  }

  .aboutFoodRoomC > p {
  overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 11;
      -webkit-box-orient: vertical;
    margin-top: 20px;
    font: 14px/20px "微软雅黑";
  }

  .aboutFoodRoomC > p > span {
    font: 18px/24px "微软雅黑";
  }

  .welcomeToFood {
    width: 936px;
    margin: 0 auto;
  }

  .welcomeToFoodContent {
    background-color: #373234;
    margin-top: 50px;
    height: 358px;
    padding-top: 117px;
  }

  .roomIcon {
    width: 606px;
    text-align:center;
    margin: 0 auto 70px;
  }

  .roomIcon > i {
    width: 92px;
    height: 92px;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    display:inline-block;
  }

  .positionIcon {
    margin-right: 79px;
    background: url("../../assets/img/maps.png") no-repeat;
  }

  .wifiIcon {
    margin-right: 79px;
    background: url("../../assets/img/wifi12.png") no-repeat;
  }

  .stopCarIcon {
    margin-right: 79px;
    background: url("../../assets/img/cars.png") no-repeat;
  }

  .foodRoomIcon {
    background: url("../../assets/img/store.png") no-repeat;
  }

  .reservationBtn {
    width: 230px;
    margin: 0 auto;
    font: 15px/34px "微软雅黑";
  }

  .immediatelyReservation {
    float: left;
    margin-right: 44px;
    padding: 0 15px;
    background-color: #f69b3a;
    color: #fff;
    border-radius: 17px;
  }

  .shopReservation {
    float: left;
    padding: 0 15px;
    border: 1px solid #f69b3a;
    border-radius: 17px;
    color: #fff;
  }

  .foodRoomPosition {
    border-top: 227px solid #d55161;
    margin-top: -120px;
    position: relative;
    z-index: -1;
  }

  .customerComment {
    width: 1200px;
    margin: 0 auto;
  }

  .commentsOnTourists {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px;
    border: 1px solid #ccc;
  }

  .commentsOnTouristsContentWrap {
    width: 1028px;
    float: left;
  }

  .commentsOnTouristsStatistics {
    border: 1px solid #ccc;
  }

  .commentsOnTouristsStatisticsContent {
    padding: 20px 0;
  }

  .commentsOnTouristsStatisticsContent > * {
    float: left;
  }

  .commentsOnTouristsStatistics .satisfaction {
    width: 200px;
    text-align: center;
  }

  .commentsOnTouristsStatistics .satisfaction strong {
    font: 40px/2 "微软雅黑";
    color: #ff8800;
  }

  .commentsOnTouristsStatistics .satisfaction span {
    font: 14px/1 "微软雅黑";
    display: block;
    color: #999;
  }

  .statisticalChart {
    width: 600px;
    margin-top: 10px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }

  .statisticalChartLeft {
    float: left;
    font: 14px/2 "微软雅黑";
    margin-left: 10px;
  }

  .statisticalChartLeft li * {
    float: left;
  }

  .statisticalChartLeft span:nth-of-type(1) {
    width: 90px;
    color: #999;
    text-align: left;
  }

  .statisticalChartLeft span:nth-of-type(2) {
    color: #f80;
  }

  .statisticalChartLeft .statisticalChartLeftBar {
    width: 112px;
    height: 13px;
    background-color: #ddd;
    margin-top: 7px;
    margin-right: 10px;
  }

  .statisticalChartLeftBarChild {
    background-color: #ff8800;
    height: 13px;
  }

  .statisticalChartRight {
    width: 288px;
    float: left;
    margin-left: 50px;
    color: #999;
  }

  .statisticalChartRight i {
    color: #ff8800;
  }

  .statisticalChartRight > * {
    float: left;
    width: 144px;
    margin: 3px 0;
  }

  .commentOnAComment {
    text-align: center;
    width: 200px;
    padding: 0 20px;
    font: 13px/1.5 "微软雅黑";
    color: #999;
    margin-top: 20px;
  }

  .commentOnAComment i {
    color: #f80;
  }

  .commentOnAComment a {
    width: 80px;
    display: block;
    font: 14px/2 "微软雅黑";
    background-color: #22c233;
    color: #fff;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    margin: 20px auto 0;
  }

  .commentsOnTouristsStatisticsTypeList {
    border-top: 1px solid #ccc;
    padding: 0 20px 15px;
    font: 14px/1.5 "微软雅黑";
  }

  .commentsOnTouristsStatisticsTypeList li {
    float: left;
    margin: 15px 12px 0;
  }

  .commentsOnTouristsStatisticsTypeList li .active {
    background-color: #22c233;
    color: #fff;
  }

  .commentsOnTouristsStatisticsTypeList a {
    display: block;
    padding: 0 15px;
    border: 1px solid #22c233;
    color: #22c233;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .evaluationContent > li > * {
    float: left;
  }

  .touristInfromation {
    width: 130px;
    margin-top: 30px;
  }

  .touristInfromation img {
    margin: 0 auto;
    display: block;
    border-radius: 50%;
  }

  .touristInfromation span {
    font: 15px/2 "微软雅黑";
    display: block;
    text-align: center;
    color: #333;
  }

  .touristInfromation strong {
    font: 16px/2 "微软雅黑";
    text-align: center;
    display: block;
    color: #ff8800;
  }

  .touristComment {
    width: 898px;
    padding: 18px 0;
  }

  .touristCommentList {
    padding: 5px 0;
    font: 13px/20px "微软雅黑";
    color: #999;
    background-color: #f0f2f5;
  }

  .touristCommentList li:nth-of-type(1) {
    border-left: none;
    color: #ff7733;
  }

  .touristCommentList li {
    border-left: 1px solid #d4dae2;
    float: left;
    padding: 0 20px;
  }

  .touristCommentContent {
    font: 14px/2 "微软雅黑";
    margin: 10px 0;
  }

  .TypeCommentList {
    font: 14px/24px "微软雅黑";
  }

  .TypeCommentList li {
    margin-top: 5px;
  }

  .TypeCommentList li > strong {
    float: left;
    color: #999;
  }

  .TypeCommentList li > span {
    float: left;
    max-width: 680px;
    margin-left: 5px;
  }

  .uploadPictureList {
    margin-top: 10px;
    height: 100px;
    overflow: hidden;
  }

  .uploadPictureList li {
    float: left;
    margin-right: 10px;
  }

  .touristCommentTime {
    font: 12px/5 "微软雅黑";
    color: #ccc;
  }

  .evaluationContent .commentGive {
    float: right;
    width: 120px;
    margin-top: 18px;
    border-radius: 5px;
    overflow: hidden;
    font: 14px/37px "微软雅黑";
  }

  .commentGive strong {
    text-align: center;
    display: block;
    width: 100%;
    color: #fff;
    background-color: #ffac4c;
  }

  .commentGive span {
    display: block;
    text-align: center;
    background-color: #fdfaf1;
    border-bottom: 1px dotted #fdfaf1;
  }

  .evaluationContent > li {
    border-bottom: 1px dashed #dddddd;
  }

  .swiper-slide {
    background-size: cover;
    background-position: center;
  }

  .gallery-top {
    height: 100% !important;
    width: 100%;
  }

  .bookKnow {
    background-color: #f6f6f6;
    width: 100%;
    padding: 15px;
    position: relative;
  }

  .bookKnowCon > strong,
  .otherExplain > strong {
    font: bold 12px/2 "微软雅黑";
    float: left;
    width: 10%;
  }

  .otherExplain {
    margin-top: 10px;
  }

  .bookKnowConList,
  .otherExplainCon {
    float: left;
    font: 12px/2 "微软雅黑";
    color: #666;
    width: 70%;
  }

  .bookKnowConList p,
  .otherExplainCon p {
    text-align: left;
  }

  .bookKnow > a {
    font: 12px/2 "微软雅黑";
    position: absolute;
    bottom: 15px;
    right: 15px;
    color: #f80;
  }

  .widthCommentA {
    position: relative;
  }

  .widthCommentA i {
    position: absolute;
    content: '';
    left: 10px;
    top: 30px;
    border: 4px solid transparent;
    border-top-color: green;
    transform-origin: 4px 2px;
    transform: rotateZ(0);
  }

  .ticketDetailsContent strong {
    font: bold 20px/40px "微软雅黑";
    color: #333;
  }

  .ticketDetailsContent p {
    font: 12px/1.5 "微软雅黑";
    text-indent: 2em;
    margin: 10px 0;
  }

  .ticketDetailsContent img {
    float: left;
    width: 460px;
    height: 300px;
    margin: 10px;
  }

  .headerImage {
    width: 60px;
    height: 60px;
    margin: 0 auto;
    background: url("../../assets/img/center.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
  }

</style>
