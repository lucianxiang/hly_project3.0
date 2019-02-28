<template>
  <!--下订单-->
  <div class="PlaceOrder">
    <!--商家-->
    <div class="Merchant">
      <img alt="" v-lazy="foodModel.fd_ImageURL">
      <div class="Detail">
        <p>{{foodModel.fd_sf_ProductName}}</p>
        <div class="Show">{{foodModel.fd_sf_Introduce}}</div>
      </div>
    </div>
    <!--信息选择-->
    <div class="NewsChoose">
      <form action="">
        <ul>
          <li><span>用餐日期选择</span>
            <el-select v-model="addOptions.useDate" placeholder="请选择">
              <el-option
                v-for="item,index in foodOrderChoseDateList"
                :key="index"
                :label="item.date"
                :value="item.date">
              </el-option>
            </el-select>
          </li>
          <li><span>用餐时间</span>
            <el-select v-model="addOptions.useTime" placeholder="请选择" @change="changeUseTime">
              <el-option
                v-for="item,index in foodOrderChoseTimeList"
                :key="index"
                :label="item.time"
                :value="item.time">
              </el-option>
            </el-select>
          </li>
          <li><span>提醒出发时间</span>
            <el-time-select
              v-model="addOptions.noticeTime"
              :picker-options="{
                start: '06:00',
                step: '00:10',
                end: '22:00'
              }"
              placeholder="选择时间">
            </el-time-select>
          </li>
          <li><span>位置选择</span>
            <el-radio-group v-model="addOptions.fd_or_RoomID">
              <el-radio :label="item.fd_sfr_ID" v-for="item,index in foodOrderChoseRoomList" :key="index" @change="changeFreeCount(item)">{{item.fd_sfr_RoomName}} <span v-loading="freeLoading" style="color: #f60">余({{item.freeCount}})</span>
              </el-radio>

              <!--<el-radio :label="2">大厅</el-radio>-->
              <!--<el-radio :label="3">雅间</el-radio>-->
            </el-radio-group>
          </li>
          <li><span>点餐方式</span>
            <el-radio v-model="addOptions.bookType" label="0">在线点餐</el-radio>
            <el-radio v-model="addOptions.bookType" label="1">到店点餐</el-radio>
          </li>
          <li><span>桌数</span>
            <el-input-number v-model="addOptions.bookCount" size="small" :min="0" :max="freeCount" :disabled="isFreeCount"></el-input-number>
            <!--<el-input v-model="tableNum" placeholder="请输入桌数" style="width: 200px" size="small"></el-input>-->
            <br/></li>
          <li><span>用餐人数</span><el-input v-model="addOptions.fd_or_TicketCount" placeholder="请输入用餐人数" style="width: 200px" size="small"></el-input><br/></li>
          <li><span>停车位</span><el-input v-model="addOptions.carNo" placeholder="请输入停车位" style="width: 200px" size="small"></el-input><span style="padding-left: 10px;color: #f60">剩余({{foodOrderStopCarList.length}})</span><br/></li>
          <!--<li><span>停车位</span><el-input v-model="input" placeholder="请输入内容"></el-input><br/></li>-->
          <li><span>菜品选择</span>
            <el-checkbox-group v-model="checkedCities" style="margin: 0px 0px 0px 200px">
              <div v-for="item,index in foodOrderList">
                <el-checkbox :label="item" :key="index" style="margin-right: 20px">{{item.fd_sfp_Name}}</el-checkbox>
                <el-input-number v-model="item.num"  :min="0" :max="100" label="菜品数量" size="small"></el-input-number>
                <el-tag style="margin-left: 10px;text-align: center">价格:{{item.num==0?item.fd_sfp_Price:item.fd_sfp_Price*item.num}}元</el-tag>
              </div>
            </el-checkbox-group>
          </li>
          <li><span>总价:</span><span>{{price}}元</span></li>
          <li><span>联系电话</span><el-input v-model="addOptions.fd_or_Phone" placeholder="请输入联系电话" style="width: 200px" size="small"></el-input><span style="padding-left: 5px;color:#f60;display: inline-block;width: 300px">注：保持电话畅通，更好的和商家沟通</span><br/></li>
        </ul>
      </form>
    </div>
    <!--提交按钮-->
    <div class="SubmitBtn">
      <button @click="submitOrder">提交订单</button>
      <button>返回</button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {isPhone,isNumber} from '@/assets/public'
  export default {
    computed:Object.assign({
      price(){
        let num = 0
        for(var i=0;i<this.checkedCities.length;i++){
          num = num+(this.checkedCities[i].fd_sfp_Price*this.checkedCities[i].num)
        }
        return num;
      }
    },mapGetters([
      'foodOrderChoseDateList',
      'foodOrderStopCarList',
      'foodOrderChoseTimeList',
      'foodOrderChoseRoomList',
    ])),
    data() {
      return {
        isFreeCount:true,
        freeCount:0,
        freeLoading:false,
        num1:1,
//        pickerOptions1:{
//          disabledDate(time) {
//            let date = new Date(str);
//
//            return time.getTime() > date.getTime()||time.getTime()<=new Date().getTime();
//          },
//        },
        inFoodList:[],
        user:{},
        num2:'1',
        tableNum:'',
        foodModel:{},
        value: '',
        value2:'',
        radio2:'1',
        dateNum:0,
        checkAll: false,
        checkedCities: [],
        foodOrderList:[],
        allPrice:'',
        isIndeterminate: true,
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "shopFrontID": "",//店面ID
          "fd_or_RoomID": "",//房间ID
          carNo:'',
          //"fd_or_RoomTableID": [3, 2],//房间餐桌编号
          "fd_or_UserID": "",//用户编码
          "fd_or_UserName": "",//用户名称
          "fd_or_TouristTraderID": "",//供应商编码
          "fd_or_TouristTraderName": "",//供应商名称
          "fd_or_TicketCount": "",//就餐人数
          "bookCount":"",//预定桌数
          "fd_or_Phone": "",//手机号
          "useDate": "",//用餐日期
          "useTime": "",//用餐时间
          "noticeTime":"",//提醒时间
          "productInfo": [],
          "bookType": '0',//点餐方式0在线点   1到店点餐
//          "payType": 1,//0交定金  1付全款
        }
      };
    },
    created(){
      this.foodModel = JSON.parse(sessionStorage.getItem('foodModel'));
      this.inFoodList = JSON.parse(sessionStorage.getItem('inFoodList'));
      let user = JSON.parse(sessionStorage.getItem('user'))
      if(!user){
        this.$notify({
          message: '请先登录!!',
          type: 'error'
        });
        this.$router.push({name:'AdminLogin'})
        return
      }
      this.user = user;
      if(!this.foodModel){
        this.$notify({
          message: '请选择商家!',
          type: 'error'
        });
        this.$router.push({name:'FoodHomePage'})
        return;
      }
      this.initData()
        .then(foodOrderList=>{
          console.log(1)
          this.$nextTick(()=>{
            document.title = '美食_到店点餐'
          })
          this.foodOrderList = foodOrderList;
        })
    },
    methods: {
      //选中位置
      changeFreeCount(obj){
        if(obj.freeCount>0){
          this.isFreeCount = false;
          this.freeCount = obj.freeCount
        }
      },
      //选中用餐日期
      changeUseTime(){
        if(!this.addOptions.useDate){
          this.$notify({
            message: '亲,请先选择用餐日期!',
            type: 'error'
          });
          return;
        }
        this.freeLoading = true;
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "storeFrontID": this.foodModel.fd_sf_ID,
          "date": this.addOptions.useDate,
          "time":this.addOptions.useTime
        };
        this.$store.dispatch('GetCanSellTableCount',options)
        .then(data=>{
          this.freeLoading  = false;
        })
      },
      //提交订单
      submitOrder(){
        if(!isPhone(this.addOptions.fd_or_Phone)){
          this.$notify({
            message: '手机号码输入格式不正确!',
            type: 'error'
          });
          return;
        }
        if(!isNumber(this.addOptions.fd_or_TicketCount)){
          this.$notify({
            message: '就餐人数请输入数字!',
            type: 'error'
          });
          return;
        }
        this.addOptions.shopFrontID = this.foodModel.fd_sf_ID;
        this.addOptions.operateUserID = this.user.sm_ui_ID;
        this.addOptions.fd_or_UserID = this.user.sm_ui_ID;
        this.addOptions.fd_or_UserName = this.user.sm_ui_Name;
        for(var i=0;i<this.checkedCities.length;i++){
          this.addOptions.productInfo.push({
            productID:this.checkedCities[i].fd_sfp_ID,
            productCount:this.checkedCities[i].num
          })
        }
        this.$store.dispatch('foodSubmitOrder',this.addOptions)
        .then(data=>{
          let newData = data;
          newData.title = this.foodModel.fd_sf_ProductName;
          newData.orderID = newData.fd_or_OrderID;
          newData.adultNumber = 1;
          newData.adultPrice = newData.fd_or_SumPrice;
          newData.childNumber = 0;
          newData.childPrice = 0;
          newData.oi_OrderName = this.foodModel.fd_sf_ProductName;
          newData.OrderID = newData.fd_or_OrderID;
          newData.oi_OrderTypeID = 3;
          newData.oi_SellMoney = newData.fd_or_SumPrice;
          sessionStorage.setItem('orderInfo',JSON.stringify(newData))
          this.$router.push({name:'PaymentPlatform'})
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      },
      initData(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "storeFrontID": this.foodModel.fd_sf_ID
        };
//        this.foodModel.fd_sf_ID
        return this.$store.dispatch('initFoodOrder',options)

      },
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  .PlaceOrder{
    padding-top: 30px;
    width: 100%;
    height: 100%;
    background-color: #f9f9f9; //页面的背景颜色
    //商家
    .Merchant{
      width: 1200px;
      box-shadow: 0 0 10px 0px #aaa;
      height: 200px;
      margin: 0px auto;
      display: flex;
      background-color: hsla(0,100%,100%,1);
      img{
        width: 230px;
        height: 170px;
        margin: 16px 0px 0px 10px;
      }
      .Detail{
        width: 940px;
        height: 170px;
        /*background-color: hsla(30,20%,20%,.4);*/
        margin: 16px 0px 0px 10px;
        p{
          margin: 0px auto 10px;
          font-weight: bold;
        }
        .Show{
          text-indent: 2em;
        }
      }
    }
    //信息选择
    .NewsChoose{
      width: 1200px;
      height: 100%;
      margin: 40px auto 0px;
      box-shadow: 0 0 10px 0px #aaa;
      background-color: hsla(0,100%,100%,1);
      ul{
        list-style: none;
        li:last-of-type{
          padding-bottom: 30px;
        }
        li:nth-of-type(1){
          padding-top: 15px;
        }
        li{
          margin-left: 15px;
          margin-top: 40px;
          span{
            margin-right: 60px;
            width: 140px;
            height: 40px;
            line-height: 40px;
            display: inline-block;
          }
          .block{
            margin-left: -8px;
          }
          input{
            width: 170px;
            height: 28px;
            padding-left: 7px;
            outline: none;
          }
        }
      }
    }
    //提交按钮
    .SubmitBtn {
      width: 1200px;
      height: 100px;
      line-height: 100px;
      margin: 20px auto 0px;
      /*background-color: hsla(200, 30%, 30%, .3);*/
      button {
        border: none;
        outline: none;
        width: 150px;
        color: hsla(0, 100%, 100%, 1);
        background-color: hsla(20,50%,50%,.6);
        height: 40px;
        font-size: 20px;
        font-family: "Microsoft YaHei";
        margin-left: 70px;
         -webkit-border-radius: .4em;
         -moz-border-radius: .4em;
        border-radius: .4em;
        &:hover {
          opacity: .7;
        }
      }
      button:nth-of-type(1) {
        margin-left: 35%;
      }
    }
  }
</style>
