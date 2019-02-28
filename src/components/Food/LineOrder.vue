<template>
  <div id="wrapBox">
    <div id="wrap">
      <!--搜索-->
      <div class="searchBox">
        <div class="queryInput clearfix">
          <input type="text" placeholder="早餐 川菜" v-model="foodName">
          <button @click="searchCai">搜索</button>
        </div>
        <div class="foodClassification">
          <!--菜系-->
          <div class="classification clearfix">
            <strong>菜系</strong>
            <div class="classificationCon">
              <a href="javascript:;" v-for="item,index in foodSearchTypeList.foodMeatVeList" :class="{active:index==n}"
                 @click="clickFoodMeatVeList(index,item)">{{item.fd_py_Name}}</a>
            </div>
          </div>
          <!--分类-->
          <div class="classification clearfix">
            <strong>分类</strong>
            <div class="classificationCon">
              <a href="javascript:;" v-for="item,index in foodSearchTypeList.foodTypeList" :class="{active:index==m}"
                 @click="clickFoodTypeList(index,item)">{{item.fd_py_Name}}</a>
            </div>
          </div>
          
        </div>
      </div>
      <!--搜索结果-->
      <section class="clearfix">
        <div class="contentBox" v-loading="isLoading">
          <ul class="resultList clearfix" v-if="newFoodCaiList.length">
            <li v-for="item,index in newFoodCaiList">
              <img alt="" v-lazy="item.foodImageList[0].fd_gi_GoodImage">
              <strong>{{item.fd_sfp_Name}}</strong>
              <div class="foodMoney clearfix">
                <strong>￥{{item.fd_sfp_Price}}/份</strong>
                <span>
                  <el-input-number style="width: 90px;" v-model="item.num" :min="0" :max="100"
                                   size="mini" @change="changeNum(item)"></el-input-number>
                </span>
              </div>
            </li>
          </ul>
          <p v-else style="text-align: center;padding: 20px 0;background: #fff;font-weight: bold;font-size: 18px;">
            暂无美食</p>
          <div class="pagingBox" v-show="total">
            <!--分页-->
            <el-pagination
              v-show="total"
              @current-change="handleCurrentChange"
              :page-size="9"
              layout="total, prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
        <div class="shoppingCart">
          <div class="clearCart clearfix">
            <strong>食品列表</strong>
            <a href="javascript:;" @click="clearFood">清空菜品</a>
          </div>
          <ul class="shoppingCartList">
            <li class="clearfix" v-for="item,index in foodOrderList">
              <strong>{{item.fd_sfp_Name}}</strong>
              <span>
                <em>X</em><i>{{item.num}}</i>
              </span>
              <em>￥{{item.fd_sfp_Price * item.num}}</em>
            </li>
          </ul>
          <!--<div class="distributionFee clearfix">-->
          <!--<strong>配送费(不计入起送价)</strong>-->
          <!--<em>￥12</em>-->
          <!--</div>-->
          <div class="allMoney">
            <span>共<em> {{foodOrderList.length}} </em>份,总计<strong>￥{{allPrice}}</strong></span>
          </div>
          <a href="javascript:;" @click="immediatelyOrder">立即下单</a>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {deepClone, arrayUnique2} from '@/assets/public'

  export default {

    computed: Object.assign({}, mapGetters([
      'foodSearchTypeList',
      'foodCaiList'
    ])),
    watch: {
      foodOrderList(arr) {
        let num = 0;
        for (var i = 0; i < arr.length; i++) {
          num = num + (arr[i].fd_sfp_Price * arr[i].num)
        }
        this.allPrice = num;
      }
    },
    data() {
      return {
        shareNum: 0,
        m: 0,
        n: 0,
        total: 0,
        isLoading: false,
        foodName: '',
        foodType: '',
        foodOrderList: [],
        catagory: '',
        newFoodCaiList: [],
        allPrice: '0'
      }
    },
    created() {
      this.$nextTick(() => {
        document.title = '美食_立即预订'
      })
      this.initData()
        .then(() => {
          if (this.foodCaiList.length) {
            this.newFoodCaiList = deepClone(this.foodCaiList)
          }
        })
      this.initFoodSearchTypeList()
    },
    watch: {
      foodCaiList() {
        this.newFoodCaiList = deepClone(this.foodCaiList)
      }
    },
    methods: {
      //清空菜品
      clearFood() {
        this.foodOrderList = [];
      },
      //获取总价
      getPrice() {
        let num = 0;
        for (var i = 0; i < this.foodOrderList.length; i++) {
          num += this.foodOrderList[i].fd_sfp_Price*this.foodOrderList[i].num;
        }
        return num;
      },
      //分页
      handleCurrentChange(num) {
        this.initData(this.foodName, this.foodType, this.catagory, num)
      },
      //选中价格
      changeNum(obj) {
        this.foodOrderList.push(obj);
        this.foodOrderList = arrayUnique2(this.foodOrderList, 'fd_sfp_ID')
        this.foodOrderList = this.foodOrderList.filter(item => {
          if (item.num) {
            return true
          }
          return false;
        })
        this.allPrice = this.getPrice();
      },
      //搜索
      searchCai() {
        this.initData(this.foodName)
      },
      //初始化搜索条件
      initFoodSearchTypeList() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
        }
        return this.$store.dispatch('initFoodSearchTypeList', options)
      },
      //点击菜系名称
      clickFoodTypeList(index, obj) {
        this.m = index;
        this.foodType = obj.fd_py_ID
        this.initData(this.foodName, this.foodType, this.catagory)
      },
      //点击荤菜蔬菜
      clickFoodMeatVeList(index, obj) {
        this.n = index;
        this.catagory = obj.fd_py_ID
        this.initData(this.foodName, this.foodType, this.catagory)
      },
      initData(foodName, foodType, catagory, page) {
        return new Promise((relove, reject) => {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "foodName": foodName ? foodName : '',//菜名
            "foodType": foodType ? foodType : '',   //菜系名称
            "catagory": catagory ? catagory : '',    //美食类别  0素/1荤
            "frontID": this.$route.query.id,    //店面编码
            "page": page ? page : 1,
            "rows": 9,
          };
          this.isLoading = true;
          this.$store.dispatch('initFoodCaiList', options)
            .then(total => {
              this.total = total
              this.isLoading = false;
              relove()
            }, err => {
              reject(err)
              console.log(err)
            })
        })
      },
      //立即下单
      immediatelyOrder() {
        this.$router.push({name: 'FoodShopOrder', query: {id: this.$route.query.id}})
        sessionStorage.setItem('foodCaiList', JSON.stringify(this.foodOrderList))
      },
    },
  }
</script>
<style scoped>

  #wrapBox {
    background-color: #eeeded;
    padding: 40px 0 60px;
  }

  #wrapBox a {
    display: block !important;
  }

  #wrap {
    width: 1200px;
    margin: 0 auto;
    background-color: #eeeded;
  }

  .searchBox {
    width: 100%;
    background-color: #fff;
    padding: 40px 30px 30px;
  }

  .queryInput {
    width: 580px;
    height: 40px;
    border: 2px solid #ee1a54;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 40px;
    margin-left: 120px;
  }

  .queryInput > input {
    height: 36px;
    width: 500px;
    border: none;
    padding: 0 20px;
    font: 16px/36px "微软雅黑";
    color: #353535;
    float: left;
  }

  .queryInput > button {
    height: 36px;
    width: 76px;
    float: right;
    background-color: #ee1a54;
    color: #fff;
  }

  .classification {
    font: 17px/27px "微软雅黑";
    margin-top: 20px;
  }

  .classification > strong {
    float: left;
    width: 120px;
    color: #585757;
    margin-top: 5px;
  }

  .classificationCon {
    float: left;
    width: 1000px;
  }

  .classificationCon > a {
    float: left;
    padding: 0 15px;
    -webkit-border-radius: 13px;
    -moz-border-radius: 13px;
    border-radius: 13px;
    color: #585757;
    margin: 5px 5px 0 0;
  }

  .classificationCon > a:hover,
  .classificationCon > a.active {
    color: #fff;
    background-color: #ee1a54;
  }

  section {
    margin-top: 30px;
  }

  .contentBox {
    width: 800px;
    float: left;
  }

  .resultList {
    background-color: #fff;
  }

  .resultList > li {
    float: left;
    margin-right: 30px;
    width: 246px;
    border: 1px solid #d6d5d5;
    padding-bottom: 20px;
    margin-bottom: 30px;
  }

  .resultList > li:nth-of-type(3n) {
    margin-right: 0;
  }

  .resultList > li > img {
    width: 246px;
    height: 238px;
    margin-left: -1px;
  }

  .resultList > li > strong {
    font: 18px/2 "微软雅黑";
    display: block;
    padding: 0 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .foodMoney {
    padding: 0 5px;
  }

  .foodMoney > strong {
    float: left;
    color: #f04071;

  }

  .foodMoney > span {
    float: right;

  }

  .pagingBox {
    width: 100%;
    background-color: #fff;
    margin-top: 30px;
    text-align: center;
    padding: 30px 0;
  }

  .shoppingCart {
    float: right;
    width: 370px;
    background-color: #fff;
    padding: 10px;
  }

  .clearCart {
    font: 14px/3 "微软雅黑";
  }

  .clearCart > strong {
    float: left;
    color: #383533;
  }

  .clearCart > a {
    float: right;
    color: #ffb357;
  }

  .shoppingCartList > li {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    font: 14px/2 "微软雅黑";
  }

  .shoppingCartList strong,
  .distributionFee strong {
    float: left;
    width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .shoppingCartList span {
    width: 90px;
    float: left;
    text-align: center;
    color: #ffb357;
  }

  .shoppingCartList span > i {
    display: inline-block;
    font-size: 16px;
  }

  .shoppingCartList span > em {
    display: inline-block;
    float: none;
    font-size: 14px;
  }

  .shoppingCartList em,
  .distributionFee em {
    float: right;
    color: #ffb357;
  }

  .distributionFee {
    padding: 10px 0;
  }

  .allMoney {
    text-align: right;
    padding-top: 10px;
    font: 13px/2 "微软雅黑";
  }

  .allMoney em {
    color: #fe4831;
  }

  .allMoney strong {
    font-size: 20px;
    font-weight: bold;
    color: #fe4831;
  }

  .shoppingCart > a {
    display: block;
    font: 18px/3 "微软雅黑";
    background-color: #ffd161;
    text-align: center;
    color: #fff;
  }

</style>
