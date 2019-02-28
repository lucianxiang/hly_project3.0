<template>
  <!--商家列表-->
  <div class="MerchantList">
    <!--食物类型-->
    <div class="FoodType clearfix">
      <strong>美食类型</strong>
      <ul>
        <li v-for="item in foodTypeList"><label><input type="radio" name="1"  @change.stop="changeName(item)">{{item.fd_py_Name}}</label></li>
      </ul>
    </div>
    <!--菜品类型-->
    <!--<div class="GreenType">-->
      <!--<ul>-->
        <!--<strong>菜类</strong>-->
        <!--<li v-for="ifs in foodType2"><label><input type="radio" name="2">{{ifs}}</label></li>-->
      <!--</ul>-->
    <!--</div>-->
    <!--座位搜索-->
    <div style="clear: both"></div>
    <div class="SeatSeo">
      <ul>
        <li><span>座位</span>
          <el-select v-model="value" placeholder="请选择" size="small" @change="changeUsePersontList">
            <el-option v-for="item,index in usePersontList" :key="index" :label="item.fd_py_Name" :value="item.fd_py_ID">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>营业时间</span>
          <el-time-picker
            is-range
            arrow-control
            size="small"
            v-model="timeValue"
            range-separator="至"
            @change="changeTimes"
            start-placeholder="开始时间"
            value-format="HH:mm:ss"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
        </li>
      </ul>
    </div>
    <!--商家展示-->
    <div v-loading="loading">
      <div class="MerchantShow clearfix" v-for="item in foodDataList" v-if="foodDataList.length" >
        <img src="" alt="" v-lazy="item.fd_ImageURL">
        <div class="Merchant">
          <strong>商家名:</strong>
          <p class="ProductName">{{item.fd_sf_ProductName}}</p>
          <div class="MerchantDes">商家简介 <p style="padding: 10px">{{item.fd_sf_Introduce}}</p></div>

        </div>
        <div class="InMerchant">
          <p><button @click="toFoodDetail(item)">查看详情</button></p>
          <p><button @click="PlaceOrder(item)">立即预定</button></p>
        </div>
      </div v-lo>
    </div>
    <div v-if="!foodDataList.length" style="width: 1200px;margin: 30px auto;text-align: center;font-size: 20px;font-weight: bold;background: #fff;padding: 30px; box-shadow: 0 0 10px 0px #aaa;">暂无美食</div>
    <!--分页-->

    <div class="block" style="text-align: right;width: 1200px;margin: 0 auto;padding-top: 20px;padding-right: 20px">
      <el-pagination
        :page-size="5"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total"
        v-show="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return{
        loading:false,
        total:0,
        timeValue: ['00:00:00', '23:59:59'],
        value: '',
        value1: '',
        options:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          //"fd_sf_ID": "2",//店面编号
          "fd_sf_TypeID": "",//用餐类型
          "fd_sf_MansID": "",//用餐人数编号
          //"fd_sf_ProductName": "",//产品名称 like
          //"fd_sf_Provice": "四川省",//省
          //"fd_sf_City": "泸州市",//市
          //"priceFrom": "21",//人均价格大于
          //"priceTo":"50",//人均价格小于
          //"fd_sf_Phone": "1",//联系电话
          //"fd_sf_TradeID": "4",//供应商编码
          "openTimeFrom": "",
          "openTimeTo":"",
          "page": "1",
          "rows":"5",
        }
      }
    },
    computed:mapGetters([
      'foodTypeList',
      'usePersontList',
      'foodDataList'
    ]),
    created(){
      this.initSearchFoodType()
      .then(()=>{
        this.initFoodDataList()
        .then(v=>{
          this.loading = false;
          this.total = v
        })
      })
    },
    methods:{
      //营业时间
      changeTimes(times){
        this.options.openTimeFrom =times[0];
        this.options.openTimeTo =times[1];
        this.initFoodDataList().then(()=>{
          this.loading = false;
        })
      },
      //座位
      changeUsePersontList(v){
        this.options.fd_sf_MansID =v;
        this.initFoodDataList().then(()=>{
          this.loading = false;
        })
      },
      changeName(obj){
        this.options.fd_sf_TypeID = obj.fd_py_ID;
        this.initFoodDataList().then(()=>{
          this.loading = false;
        })
      },
      //分页
      handleCurrentChange(num){
        this.options.page = num;
        this.initFoodDataList().then(()=>{
          this.loading = false;
        })
      },
      initSearchFoodType(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
        }
        return this.$store.dispatch('initSearchFoodType',options)
      },
      initFoodDataList(){
        this.loading = true;
        return this.$store.dispatch('initFoodDataList',this.options)
      },
      toFoodDetail(item){
        const {href} = this.$router.resolve({
          name: 'FoodDetail',
          params: {id: item.fd_sf_ID}
        });
        window.open(href,'_blank')
      },
      PlaceOrder(item){
        sessionStorage.setItem('foodModel',JSON.stringify(item))
        this.$router.push({name:'FoodOrder'});
      }
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  .MerchantList{
    width: 100%;
    height: 100%;
    background-color: #f9f9f9; //页面的背景颜色
    padding-bottom: 30px;
    padding-top: 25px;
    //食物类型
    .FoodType{
      width: 1200px;
      background: #fff;
      padding-bottom: 20px;
      margin: 0px auto;
      box-shadow: 0 0 10px 0px #aaa;
      strong{
        float: left;
        height: 40px;
        /*color: rgb(0,170,255);*/
        color: rgba(0,0,0,.6);
        margin:30px 30px 0px 40px;
        font-size: 20px;
        font-weight: bold;
      }
      ul{
        list-style: none;
        margin-left: 70px;
        float: left;
        line-height: 30px;
        &:after{
          content: '';
          overflow: hidden;
          height: 0;
          display: block;
          clear: left;
        }
        li{
          float: left;
        }

        li{
          width: 120px;
        }
      }
    }
    //菜品类型
    .GreenType{
      width: 1200px;
      margin: 40px auto 0px;
      ul{
        list-style: none;
        line-height: 30px;
        border-bottom: 1px solid #c8c8c8;
        &:after{
          content: '';
          height: 0;
          display: block;
          overflow: hidden;
          clear: left;
        }
        strong,li{
          float: left;
        }
        strong{
          width: 42px;
          height: 40px;
          /*color: rgb(0,170,255);*/
          color: rgba(0,0,0,.6);
          margin: 0px 30px 0px 40px;
          font-size: 20px;
          font-weight: bold;
        }
        li{
          width: 120px;
        }
      }
    }
    //座位搜索
    .SeatSeo{
      width: 1200px;
      height: 70px;
      background: #fff;
      margin: 30px auto 0px;
      box-shadow: 0 0 10px 0px #aaa;
      ul{
        list-style: none;
        display: flex;
        height: 50px;
        padding-top: 10px;
        line-height: 50px;
        li{
          margin-left: 40px;
          span{
            font-size: 18px;
            font-weight:bold;
            margin-right: 10px;
          }
          &:nth-of-type(2){
            margin-left: 100px;
          }
        }
      }
    }
    //商家展示
    .MerchantShow{
      width: 1200px;
      display: flex;
      box-shadow: 0 0 10px 0px #aaa;
      margin: 40px auto 0px;
      /*border-bottom: 1px solid #c8c8c8;*/
      background-color: hsla(0,100%,100%,1);
      .ProductName{
        padding: 10px;
        color: red;
      }
      /*&:hover{*/
        /*border: 1px solid #fb7403;*/
      /*}*/
      img{
        width: 200px;
        height: 170px;
        margin: 16px 0px 0px 10px;
      }
      .Merchant{
        width: 970px;
        /*height: 170px;*/
        margin: 16px 0px 0px 10px;
        padding-left: 40px;
        padding-bottom: 10px;
        strong{
          font-weight: bold;
          font-size: 18px;
        }
        .MerchantDes{
          text-indent: 2em;
          width: 600px;
          height: 140px;
          padding-top: 8px;
          letter-spacing: 1px;
          line-height: 20px;
          overflow: hidden;
          text-overflow:ellipsis;
          display: -webkit-box;
           -webkit-box-orient: vertical;
           -webkit-line-clamp: 7;
        }
      }
      .InMerchant{
        margin: 24px 70px 0px 0px;
        p{
          button{
            border: none;
            outline: none;
            width: 100px;
            height: 30px;
            font-size: 18px;
            margin-top: 30px;
            color: #fff;
            background-color: #fb7403;
            border-radius: 2px;
            &:hover{
              opacity: .7;
            }
          }
        }
      }
    }
  }
</style>
