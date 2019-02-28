<template>
  <!--首页-->
  <div class="FoodPage">
    <!--顶部logo部分,header-->
    <div class="FoodLogo">
      <!--返回首页-->
      <div class="BackPage">
        <el-carousel indicator-position="outside" height="400px">
          <el-carousel-item v-for="item,index in topTurnLlist" :key="index" style="cursor: pointer">
            <!--<img width="1200" height="400" src="@/assets/img/foodlogo.jpg">-->
            <img width="1200" height="400" v-lazy="item.fd_st_ImageURL" @click="jump(item)">
          </el-carousel-item>
        </el-carousel>
      </div><!--美食天堂Gourmet Paradise-->
    </div>
    <!--美食种类-->
    <div class="foodClassify">
      <div class="foodClassifyContent">
        <input type="text" class="foodClassifyContentInput" placeholder="菜系: 川菜" v-model="keyword"/>
        <div class="foodClassifyContentSelect" @click="select">
          <div class="icon-search"></div>
        </div>
      </div>
      <div class="foodClassifyInfo">
        <div class="meatType">
          <dl class="clearfix">
            <dt>菜系名称</dt>
            <dd v-for="item,index in searchHomeFilter.foodTypeList" :class="{active: index == meatId}"
                @click="changeAvtive(index,item)">{{item.fd_py_Name}}
            </dd>
          </dl>
        </div>
        <div class="meatType">
          <dl class="clearfix">
            <dt>就餐人数</dt>
            <dd v-for="item,index in searchHomeFilter.usePersontList" :class="{active: index == n}"
                @click="changeUsePersontActive(index,item)">{{item.fd_py_Name}}
            </dd>
          </dl>
        </div>

        <div class="meatType">
          <dl class="clearfix">
            <dt>分类</dt>
            <dd v-for="item,index in searchHomeFilter.catagoryList" :class="{active: index == meatsId}"
                @click="changeCatagoryActive(index,item)">{{item.fd_py_Name}}
            </dd>
          </dl>
        </div>

      </div>
    </div>
    <!--美食具体信息-->
    <div class="foodInfo" v-loading="isLoading">
      <ul>
        <li v-for="item in RecommendMerchantsShopList" class="clearfix">
          <div class="foodInfoContentImg" @click="goNewFoodDetail(item)">
            <img width="200" height="144" v-lazy="item.imageList[0].fd_pi_ImageUrl">
          </div>
          <div class="foodInfoContentInfo">
            <div class="foodInfoContentInfoStore" @click="goNewFoodDetail(item)" style="cursor: pointer">
              {{item.fd_sf_ProductName}}
            </div>
            <div class="foodInfoContentInfoAddr">
              <img width="15" height="15" src="@/assets/img/dt.jpg">
              {{item.fd_sf_Address}}
            </div>
            <div class="storeService clearfix">
              <div class="noMWifi" v-show="item.fd_sf_HasWafi == 1">
                <i></i>
                <span>免费无线</span>
              </div>
              <div class="haveMeals">
                <i></i>
                <span><em v-for="ite,index in item.type">{{ite.fd_py_Name}}</em></span>
              </div>
              <div class="haveMeals">
                <i></i>
                <span>{{item.people}}</span>
              </div>
              <div class="stopCar" v-show="item.fd_sf_WaitCarCount">
                <i></i>
                <span>剩余{{item.fd_sf_WaitCarCount}}个</span>
              </div>
              <div>月销量: {{item.monthPersons}}份</div>
            </div>
            <div class="foodInfoContentInfoCon">{{item.fd_sf_Introduce}}</div>
            <!--<div class="clearfix">-->
            <!--<span class="foodInfoContentInfoWifi">-->
            <!--<img src="@/assets/img/wifi1.gif" alt="" v-show="item.fd_sf_HasWafi==1">-->
            <!--<img src="@/assets/img/wifi.png" alt="" v-show="item.fd_sf_HasWafi!=1">-->
            <!--</span>-->
            <!--<div class="foodInfoContentInfoNum"><span>免费WiFi</span>-->
            <!--&lt;!&ndash;<img width="25" height="25" src="@/assets/img/food.png">&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;5人用餐&ndash;&gt;-->
            <!--<span>月销量:{{item.monthPersons}}</span>-->
            <!--</div>-->
            <!--</div>-->
            <div class="storeInfo clearfix">
              <span>人均¥{{item.fd_sf_AvgPrice}} </span>
              <span class="storeInfoTime">
              <i></i>
              <span>{{item.fd_sf_OpenTime}}</span>
            </span>
              <span class="telephoneNumber">
              <i></i>
              <span>{{item.fd_sf_Phone}}</span>
            </span>
            </div>
          </div>
          <div class="foodInfoContentOperation">
            <div class="foodInfoContentOperationDiv1">￥<span class="foodInfoContentOperationSpan2">{{item.fd_sf_AvgPrice}}</span>/人
            </div>
            <!--<div class="foodInfoContentOperationDiv2">3分钟前有人预定</div>-->
            <div>
              <input type="button" value="立即预定" name="button" class="button" @click="goNewFoodDetail(item)"
                     style="cursor: pointer"/>
            </div>
          </div>
        </li>
        <li v-show="!RecommendMerchantsShopList.length" style="text-align: center;font-weight: bold;font-size: 20px;">
          暂无美食
        </li>
      </ul>

      <div class="block" style="text-align: right;padding: 20px 0">
        <el-pagination
          :page-size="10"
          background
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next"
          :total="total"
          v-show="total"
        >
        </el-pagination>
      </div>
    </div>


  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {GetQueryString} from '@/assets/public'

  export default {
    data() {
      return {
        keyword: '',
        isLoading: false,
        total: 0,
        input: '',
        FoodClassify: ['早餐', '中餐', '晚餐', '下午茶', '夜啤酒'],
        FoodStyle: ['川菜', '粤菜', '湘菜', '苏菜', '徽菜', '闽菜', '浙菜', '鲁菜'],
        meatId: 0,
        meatsId: 0,
        obj: {CatagoryID: '', UsePersontID: '', foodTypeID: ''},
        n: 0,
        keyword: ''
      }
    },
    computed: mapGetters([
      'searchHomeFilter',
      'RecommendMerchantsShopList',
      'RecommendMerchants',
      'RecommendMerchantsObj',
      'topTurnLlist'
    ]),
    created() {
      let keyword = this.$route.query.keyword;
      if (keyword) {
        //请求搜索条件
        this.searchFilter().then(() => {
          this.init(keyword, 1, this.searchHomeFilter.foodTypeList[0].fd_py_ID, this.searchHomeFilter.catagoryList[0].fd_py_ID, this.searchHomeFilter.usePersontList[0].fd_py_ID).then((total) => {
            this.total = total;
            this.isLoading = false;
          })
        })
      } else {
        //请求搜索条件
        this.searchFilter().then(() => {
          this.init('', 1, this.searchHomeFilter.foodTypeList[0].fd_py_ID, this.searchHomeFilter.catagoryList[0].fd_py_ID, this.searchHomeFilter.usePersontList[0].fd_py_ID).then((total) => {
            this.total = total;
            this.isLoading = false;
          })
        })
      }

    },
    methods: {
      //首页
      init(keyword, page, foodType, eatType, eatMans) {
        let Recommends = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "keyName": keyword ? keyword : '',
          "foodType": foodType ? foodType : '',
          "eatType": eatType ? eatType : '',
          "eatMans": eatMans ? eatMans : '',
          "token": "",
          "page": page ? page : 1,
          "rows": 10,
        }
        this.isLoading = true;
        return this.$store.dispatch('initRecommendMerchants', Recommends)
      },
      //菜系
      changeAvtive(index, item) {
        this.meatId = index;
        this.obj.foodTypeID = item.fd_py_ID
        this.init(this.keyword, 1, item.fd_py_ID, this.obj.CatagoryID, this.obj.UsePersontID).then((total) => {
          this.total = total;
          this.isLoading = false
        })
      },
      //分类
      changeCatagoryActive(index, item) {
        this.obj.CatagoryID = item.fd_py_ID
        this.meatsId = index;
        this.init(this.keyword, 1, this.obj.foodTypeID, item.fd_py_ID, this.obj.UsePersontID).then((total) => {
          this.total = total;
          this.isLoading = false
        })
      },
      //就餐人数
      changeUsePersontActive(index, item) {
        this.obj.UsePersontID = item.fd_py_ID
        this.n = index;
        this.init(this.keyword, 1, this.obj.foodTypeID, this.obj.CatagoryID, item.fd_py_ID).then((total) => {
          this.total = total;
          this.isLoading = false
        })
      },
      searchFilter() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
        }
        return this.$store.dispatch('initSearchFilter', options)
      },
      goNewFoodDetail(item) {
        const {href} = this.$router.resolve({
          name: 'NewFoodDetail',
          query: {id: item.fd_sf_ID}
        });
        window.open(href, '_blank')
      },
      handleCurrentChange(num) {
      },
      select() {
        this.init(this.keyword).then((total) => {
          this.total = total;
          this.isLoading = false;
        })
      },

      toMerchantList() {
        const {href} = this.$router.resolve({
          name: 'FoodMerchantList',
          params: ""
        });
        window.open(href, '_blank')
      },
      //跳转
      jump(item) {

        if (item.fd_sfp_Name) {
          sessionStorage.setItem('MStitle', '美食_' + item.fd_sfp_Name)

        } else {
          sessionStorage.setItem('MStitle', '美食_' + item.fd_sf_ProductName)
        }
        console.log(item)
        const {href} = this.$router.resolve({
          name: 'NewFoodDetail',
          query: {id: item.fd_sf_ID}
        });
        window.open(href, '_blank')
      },

    }
  }
</script>

<style lang="scss" scoped type="text/less">
  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .FoodPage {
    background-color: #f8f8f8;
    /*position:relative;*/
  }

  .FoodLogo {
    width: 1200px;
    height: 400px;
    margin: 20px auto;

    font-family: '华文隶书';
    .BackPage {
      width: 1200px;
      height: 400px;
      margin: 20px auto;
    }
  }

  .foodClassify {
    width: 1200px;
    background-color: white;
    margin: 20px auto;
    padding: 20px;
  }

  .foodClassifyContentInput {
    margin-top: 10px;
    /*-webkit-border-radius: 16px;*/
    /*-moz-border-radius: 16px;*/
    /*border-radius: 16px;*/
    border-bottom-left-radius: 35px;
    border-top-left-radius: 35px;
    height: 40px;
    width: 500px;
    text-indent: 15px;
    font-size: 16px;
    margin-left: 20px;
    border: 1px solid red;
  }

  .foodInfoContentInfoWifi {
    float: left;
  }

  .foodInfoContentInfoWifi img {
    height: 25px;
    width: 25px;
    float: left;
    position: relative;
    top: 35px;
  }

  .foodInfoContentInfoNum {
    float: left;
    padding-top: 35px;
    margin-left: 15px;
    font-size: 18px;
    color: gray;
  }

  .foodInfoContentInfoNum img {
    height: 25px;
    width: 25px;
    margin-right: 10px;
    position: relative;
    top: 8px;
  }

  .foodInfoContentInfoNum span {
    margin-right: 40px;
    color: gray;
  }

  .foodClassifyInfo {
    margin-top: 20px;
    padding: 20px;
    font: 16px/2 "微软雅黑";
  }

  .meatType {
    margin-top: 10px;
    padding-left: 120px;
    position: relative;
  }

  .meatType dt {
    position: absolute;
    top: 10px;
    left: 0;
    width: 121px;
  }

  .meatType dd {
    float: left;
    margin-right: 7px;
    padding: 0 15px;
    -webkit-border-radius: 16px;
    -moz-border-radius: 16px;
    border-radius: 16px;
    color: #585757;
  }

  .meatType dd:hover {
    color: #fff;
    background-color: red;
  }

  .meatType dd.active {
    color: #fff;
    background-color: red;
  }

  .foodClassifyInfoDd:hover {
    background-color: #e694a6;
    color: #fff;
    font: 14px/22px "\5FAE\8F6F\96C5\9ED1";
    border-radius: 5px;
    // box-shadow: 1px 1px 3px #f60;
  }

  .foodClassifyStyle {
    margin-top: 50px;
    clear: both
  }

  .foodInfo {
    width: 1200px;

    background-color: white;
    margin: 0px auto;
    /*padding: 20px;*/
    padding-top: 40px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .foodInfo li {
    border-top: 1px solid #d3d1d1;
    border-bottom: 1px solid #d3d1d1;
    padding: 25px 0;
  }

  .foodInfo li:hover {
    background-color: #f8f8f8;
  }

  .foodInfoContentImg {

    float: left;
    height: 192px;
    width: 20%;

  }

  .foodInfoContentInfo {
    float: left;
    width: 60%;

  }

  .foodInfoContentOperation {
    float: left;
    width: 18%;
  }

  .foodInfoContentInfoStore {
    float: left;
    font-weight: bold;
    font-size: 18px;
    margin-right: 15px;
  }

  .foodInfoContentInfoStore:hover {
    color: #f60;
  }

  .foodInfoContentInfoAddr {
    float: left;
    padding-bottom: 10px;
    color: red;
  }

  .foodInfoContentInfoCon {
    clear: both;
    font-size: 15px;
    line-height: 20px;
    overflow: hidden;
    font-family: "微软雅黑";
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    text-indent: 2em;
  }

  .foodInfoContentInfoAddr img {
    background-color: red;
  }

  .foodInfoContentOperation {
    padding-top: 50px;
  }

  .foodInfoContentOperation input {
    float: right;
    margin-right: 33px;
    height: 40px;
    width: 95px;
    border-radius: 5px;
    background-color: orange;
    color: white;
  }

  .foodInfoContentOperationDiv1 {
    float: right;
    margin-right: 45px;
    font-size: 18px;
    color: orange;
  }

  .foodInfoContentOperationDiv2 {
    padding-top: 10px;
    padding-bottom: 10px;
    float: right;
    margin-right: 30px;
    color: #20E191;
  }

  .foodInfoContentOperationSpan2 {
    font-size: 24px;
  }

  .foodInfoContentOperationbotten {
    margin: 0;
    background-color: orange;
    color: white;
    margin-left: 85px;
  }

  .storeInfo {
    font: 16px/3 "微软雅黑";
    color: #ff8300;
    display: block;
  }

  .storeInfo > span {
    float: left;
    margin-right: 30px;
  }

  .storeInfo > span > * {
    float: left;
  }

  .storeInfoTime > i {
    width: 22px;
    height: 22px;
    background: url("../../assets/img/timeIcon.png") no-repeat;
    margin-top: 14px;
    margin-right: 5px;
  }

  .telephoneNumber > i {
    width: 25px;
    height: 20px;
    background: url("../../assets/img/phoneIcon.png") no-repeat;
    margin-top: 15px;
    margin-right: 5px;
  }

  .icon-search {
    width: 17px;
    height: 17px;
    color: white;
    border-radius: 100%;
    border: 3px solid currentcolor;
    position: relative;
    margin-left: 30px;
  }

  .icon-search:after {
    content: "";
    color: white;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
    width: 11px;
    height: 4px;
    position: absolute;
    top: 14px;
    left: 10px;
    background-color: currentcolor;
  }

  .foodClassifyContentSelect {
    padding-top: 10px;
    position: relative;
    left: 500px;
    top: -40px;
    width: 84px;
    height: 40px;;
    background-color: red;
    border-top-right-radius: 35px;
    border-bottom-right-radius: 35px;
  }

  .storeService {
    display: block;
    float: left;
    width: 100%;
    margin-top: 10px;
    font: 15px/3 "微软雅黑";
  }

  .storeService > div {
    float: left;
    margin-right: 30px;
    color: #b2b0b0;
  }

  .storeService > div > * {
    float: left;
  }

  .noMWifi > i {
    width: 17px;
    height: 13px;
    background: url("../../assets/img/foodWifiIcon.png") no-repeat;
    margin-right: 5px;
    margin-top: 16px;
  }

  .haveMeals > i {
    width: 17px;
    height:17px;
    background: url("../../assets/img/breakFeastIcon.png") no-repeat;
    margin-right: 5px;
    margin-top: 14px;
  }

  .haveMeals em {
    margin-right: 5px;
  }

  .stopCar > i {
    width: 25px;
    height: 19px;
    background: url("../../assets/img/stopCarIcon.png") no-repeat;
    margin-right: 5px;
    margin-top: 12px;
  }

</style>
