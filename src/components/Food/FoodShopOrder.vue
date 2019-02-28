<template>
  <div>
    <div id="wrap">
      <div class="wrapBox">
        <div class="Title clearfix">
          <strong><i></i><span>到店点餐</span></strong>
          <div>
            <el-steps :active="1" align-center>
              <el-step title="确认订单"></el-step>
              <el-step title="支付"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
          </div>
        </div>
        <!--订单-->
        <div class="seleteOrder">
          <div class="aboutName clearfix">
            <i></i>
            <strong>{{foodModel.fd_sf_ProductName}}</strong>
            <span>到店点餐</span>
          </div>
          <div class="seleteDetails">
            <div class="aboutEatRoom clearfix">
              <strong>{{foodModel.fd_sf_ProductName}}</strong>
              <span>不可退</span>
            </div>
            <div class="date clearfix">
              <strong>用餐日期：</strong>
              <span>
                <el-select v-model="addOptions.useDate" placeholder="请选择">
                <el-option
                  v-for="item,index in foodOrderChoseDateList"
                  :key="index"
                  :label="item.date"
                  :value="item.date">
                </el-option>
              </el-select>
             </span>
              <i>*</i>
            </div>
            <div class="remind clearfix">
              <strong>用餐时间：</strong>
              <span>
                <el-select v-model="addOptions.useTime" placeholder="请选择" @change="changeNewUseTime">
                <el-option
                  v-for="item,index in foodOrderChoseTimeList"
                  :key="index"
                  :label="item.fd_py_Name"
                  :value="item.fd_fp_PropertyID">
                </el-option>
              </el-select>
             </span>
              <i>*</i>
            </div>
            <div class="remind clearfix">
              <strong>提醒时间：</strong>
              <span>
                  <el-time-select
                    v-model="addOptions.noticeTime"
                    :picker-options="pickerOptions"
                    placeholder="选择时间">
            </el-time-select>
              </span>
              <i>*</i>
            </div>

            <div class="position clearfix" v-show="foodOrderChoseRoomList.length">
              <strong>位置：</strong>
              <div>
                <div class="roomType">
                  <el-radio v-model="roomType" :label="item.fd_py_ID" v-for="item,index in foodOrderChoseRoomList"
                            :key="index"
                            @change="changeRoomType(item)">{{item.fd_py_Name}}
                  </el-radio>
                  <!--<el-radio v-model="roomType" label="2">大厅</el-radio>-->
                  <!--<el-radio :label="item.fd_sfr_ID" v-for="item,index in foodOrderChoseRoomList" :key="index" @change="changeFreeCount(item)">{{item.fd_sfr_RoomName}} <span v-loading="freeLoading" style="color: #f60">余({{item.freeCount}})</span>-->
                  <!--</el-radio>-->
                </div>
                <div class="roomPic clearfix">
                  <a href="javascript:;" v-for="item,index in newFoodOrderChoseRoomList">
                    <img
                      :class="{active:activeArr[index]}"
                      @click="changeImage(index,item)"
                      v-lazy="item.oneImg"
                      alt="">
                    <span>{{item.fd_sfr_RoomName}}({{item.fd_sfr_roomState == 1 ? "已订" : "空"}})</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--用户信息-->
        <div class="userInfo">
          <div class="userInfoTitle clearfix">
            <i></i>
            <strong>用户信息</strong>
            <span>您需要填写一个订餐人的信息</span>
          </div>
          <div class="userInfoC">
            <div class="orderP clearfix">
              <strong>订餐人</strong>
              <span>取票人</span>
            </div>
            <div class="stopCar clearfix">
              <strong>停车位</strong>
              <el-input-number v-model="hasBeenCanceled" :min="0" :max="WaitCarCount" label="描述文字"
                               size="small"></el-input-number>
              <i></i>
              <span>剩余{{newWaitCarCount}}</span>
            </div>
            <div class="stopCar clearfix">
              <strong>订餐人</strong>
              <span><el-input v-model="addOptions.bookName" placeholder="请输入姓名" size="small"
                              style="width: 200px;"></el-input><i style="padding-left: 5px">*</i></span>
            </div>
            <div class="stopCar clearfix">
              <strong>手机号</strong>
              <span><el-input v-model="addOptions.fd_or_Phone" placeholder="请输入手机号" size="small"
                              style="width: 200px;"></el-input><i style="padding-left: 5px">*</i></span>
            </div>
          </div>
        </div>
        <!--订单信息-->
        <div class="orderInfo">
          <nav class="clearfix">
            <span class="orderInformation">订单信息</span>
            <span class="orderState">房间费用(元)</span>
            <span class="unitPrice">定金(元)</span>
            <span class="foodNum">桌数</span>
            <!--<span class="moneyNum">金额(元)</span>-->

          </nav>
          <ul class="orderList">
            <li class="clearfix" v-for="item,index in newActiveArr">
              <div class="orderInformation roomName">
                <img
                  v-lazy="item.oneImg"
                  alt="">
                <span>{{item.fd_sfr_RoomName}}</span>
              </div>
              <div class="orderState">{{item.fd_sfr_RoomMoney}}</div>
              <div class="unitPrice APrice">￥{{item.fd_sfr_BookMoney}}.00</div>
              <div class="foodNum" style="margin-top: 22px;">
                <el-input-number v-model="item.num" :min="1" :max="10" size="small" style="width: 100px;"
                                 :disabled="isNum"></el-input-number>
              </div>
              <!--<div class="moneyNum APrice">￥{{item.fd_sfr_BookMoney*item.num}}.00</div>-->

            </li>
            <li class="clearfix" v-show="!this.newActiveArr.length" style="text-align: center;padding-bottom: 50px">
              暂无订单
            </li>
          </ul>
          <div class="allMoney clearfix" v-show="newActiveArr.length">
            <!--<a href="javascript:;" @click="goPay">去付款</a>-->
            <strong>￥{{allPrice}}.00</strong>
            <span>餐桌总价:</span>
          </div>
          <div class="foodOrder"></div>
        </div>

        <!--菜品信息-->

        <div class="foodInfo" v-show="foodCaiList.length">
          <nav class="clearfix">
            <span class="orderInformation">菜品信息</span>
            <span class="unitPrice">单价(元)</span>
            <span class="foodNum">份数</span>
            <span class="moneyNum">金额(元)</span>
          </nav>
          <ul class="foodList">
            <li class="clearfix" v-for="item,index in foodCaiList">
              <div class="orderInformation">
                <img
                  alt="" v-lazy="item.foodImageList[0].fd_gi_GoodImage">
                <span>{{item.fd_sfp_Name}}</span>
              </div>
              <span class="unitPrice">￥{{item.fd_sfp_Price}}.00</span>
              <span class="foodNum">{{item.num}}</span>
              <span class="moneyNum">￥{{item.fd_sfp_Price * item.num}}.00</span>
            </li>
          </ul>
          <div class="allMoney clearfix">
            <!--<a href="javascript:;" @click="goPay">去付款</a>-->
            <strong>￥{{caiAllPrice}}.00</strong>
            <span>菜品总价:</span>
          </div>
        </div>

        <!--去支付-->

        <div class="goPayBox clearfix">
          <a href="javascript:;" @click="goPay">去付款</a>
          <strong>￥{{twoPrice}}.00</strong>
          <span>合计支付:</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {deepClone, isPhone} from '@/assets/public'

  export default {
    computed: Object.assign({
      newWaitCarCount() {
        return Number(this.WaitCarCount) - Number(this.hasBeenCanceled)
      },
      price() {
        let num = 0
        for (var i = 0; i < this.checkedCities.length; i++) {
          num = num + (this.checkedCities[i].fd_sfp_Price * this.checkedCities[i].num)
        }
        return num;
      },
      caiAllPrice() {
        let num = 0
        for (var i = 0; i < this.foodCaiList.length; i++) {
          num = num + (this.foodCaiList[i].fd_sfp_Price * this.foodCaiList[i].num)
        }
        return num;
      },
      twoPrice() {
        return Number(this.allPrice) + Number(this.caiAllPrice)
      },
      allPrice() {
        let num = 0;
        for (let i = 0; i < this.newActiveArr.length; i++) {
          num += Number(this.newActiveArr[i].fd_sfr_BookMoney*this.newActiveArr[i].num);
        }
        return num
      }
    }, mapGetters([
      'foodOrderChoseDateList',
      'foodOrderStopCarList',
      'foodOrderChoseTimeList',
      'foodOrderChoseRoomList',
    ])),
    watch: {},
    data() {
      return {
        hasBeenCanceled: 0,
        pickerOptions: {
          start: '06:00',
          step: '00:30',
          end: '22:00'
        },
        isNum: false,
        newFoodOrderChoseRoomList: [],
        roomTypeList: [
          {id: 1, name: '大厅'},
          {id: 2, name: '包间'}
        ],
        roomType: 76,
        value1: '',
        num3: 1,
        activeArr: [],
        n: 0,
        isActive: false,
        showChange: true,
        foodModel: {},
        isFreeCount: true,
//        allPrice: 0,
        freeCount: 0,
        freeLoading: false,
        num1: 1,
//        pickerOptions1:{
//          disabledDate(time) {
//            let date = new Date(str);
//
//            return time.getTime() > date.getTime()||time.getTime()<=new Date().getTime();
//          },
//        },
        inFoodList: [],
        user: {},
        num2: '1',
        tableNum: '',
        value: '',
        value2: '',
        radio2: '1',
        dateNum: 0,
        checkAll: false,
        checkedCities: [],
        foodOrderList: [],
        foodCaiList: [],
        isIndeterminate: true,
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "shopFrontID": '',//店面编码
          "fd_or_UserID": '',//用户编码
          "fd_or_RoomTableInfo": [],//房间编码  以及桌数
          "useDate": "",//用餐日期
          "useTime": "",//用餐时间
          "carNo": "",//车位数
          "bookName": "",//订餐人
          "fd_or_Phone": "",//联系电话
          "noticeTime": "",//通知时间
          "bookType": 1,//点餐方式0在线点   1到店点餐
          "productInfo": []//产品列表
        },
        newActiveArr: [],
        orderArr: [],
        newOrderArr: [],
        telephonenum: '',
        userName: '',
        WaitCarCount: 0,
      }
    },
    created() {
      let d = new Date()
      let h = d.getHours();
      let m = d.getMinutes()
      let str = ''
      if (h >= 10) {
        if (m > 30) {
          h = h + 1;
        }
        str = h;
      } else {
        if (m > 30) {
          h = h + 1;
        }
        str = '0' + h
      }

      this.pickerOptions.start = str + ':00'
      let foodModel = JSON.parse(sessionStorage.getItem('foodModel'));
      let foodCaiList = JSON.parse(sessionStorage.getItem('foodCaiList'))
      if (foodCaiList) {
        //获取菜品信息
        this.foodCaiList = foodCaiList
      }
      if (foodModel) {
        this.foodModel = foodModel;
        this.initData().then((foodOrderList) => {
          this.$nextTick(() => {
            document.title = '美食_到店点餐'
          })
          this.foodOrderList = foodOrderList;

        })
      }

    },
    methods: {

      //选中包间或者大厅
      changeRoomType(item) {
        if (item.fd_py_ID == 78) {
          this.isNum = true;
        } else {
          this.isNum = false;
        }
        this.newOrderArr = []
        this.activeArr = [];
        this.newActiveArr = [];
        for (var i = 0; i < item.choseRoomList.length; i++) {
          this.activeArr.push(false)
        }
        this.newFoodOrderChoseRoomList = item.choseRoomList
      },
      //去付款
      goPay() {
        if (!this.addOptions.bookName) {
          this.$notify({
            message: '请输入订餐人信息!',
            type: 'error'
          });
          return;
        }
        if (!isPhone(this.addOptions.fd_or_Phone)) {
          this.$notify({
            message: '手机号码输入格式不正确!',
            type: 'error'
          });
          return;
        }
        let user = JSON.parse(sessionStorage.getItem('user'))
        this.addOptions.shopFrontID = this.$route.query.id;
        this.addOptions.fd_or_UserID = user.sm_ui_ID;
        this.addOptions.token = user.token;
//        if(this.hasBeenCanceled>0){
//          this.addOptions.carNo = hasBeenCanceled
//        }else{
//          this.addOptions.carNo = 0
//        }
        this.addOptions.carNo = this.hasBeenCanceled
        //菜品存在选中点餐方式
        if (this.foodCaiList.length) {
          this.addOptions.bookType = 0;
          for (var i = 0; i < this.foodCaiList.length; i++) {
            this.addOptions.productInfo.push({
              productID: this.foodCaiList[i].fd_sfp_ID,
              productCount: this.foodCaiList[i].num
            })
          }
        }
//        if (this.newOrderArr.length) {
//          for (var i = 0; i < this.newOrderArr.length; i++) {
//            this.addOptions.fd_or_RoomTableInfo.push({
//              roomID: this.newOrderArr[i].fd_sfr_ID,
//              tableCount: this.newOrderArr[i].num
//            })
//          }
//        } else {
//          this.$notify({
//            message: '请先选中的大厅或者包间并勾选！',
//            type: 'error'
//          });
//          return
//        }
        this.$store.commit('showLoading');
        this.$store.dispatch('foodOrderDown', this.addOptions)
          .then(orderID => {
            this.$store.commit('hideLoading');
            let newData = {}

            newData.title = this.foodModel.fd_sf_ProductName;
            newData.orderID = orderID;
            newData.adultNumber = 1;
            newData.adultPrice = this.twoPrice;
            newData.childNumber = 0;
            newData.childPrice = 0;
            newData.oi_OrderName = this.foodModel.fd_sf_ProductName;
            newData.OrderID = orderID;
            newData.oi_OrderTypeID = 3;
            newData.oi_SellMoney = this.twoPrice;
            sessionStorage.setItem('orderInfo', JSON.stringify(newData))
            this.$router.push({name: 'PaymentPlatform'})
          }, err => {
            this.$store.commit('hideLoading');
            this.$notify({
              message: err,
              type: 'error'
            });
            console.log(err)
          })
      },
      changeImage(index, item) {

        for (var i = 0; i < this.activeArr.length; i++) {
          if (i == index) {
            this.activeArr[index] ? this.activeArr.splice(index, 1, false) : this.activeArr.splice(index, 1, true)
          }
        }
        let newActiveArr = this.getObj(this.activeArr, item)
        for (var i = 0; i < newActiveArr.length; i++) {
          newActiveArr[i]['num'] = 1;
        }
        this.newActiveArr = newActiveArr;
      },
      getObj(arr, obj) {
        let deepCloneArr = deepClone(this.foodOrderChoseRoomList)
        for (var i = 0; i < deepCloneArr.length; i++) {
          let newArr = deepCloneArr[i].choseRoomList
          for (var j = 0; j < newArr.length; j++) {
            if (newArr[j].fd_sfr_ID == obj.fd_sfr_ID) {
              return deepCloneArr[i].choseRoomList.filter((item, index) => {
                for (var i = 0; i < arr.length; i++) {
                  if (arr[i] && i == index) {
                    return true
                  }
                }
                return false
              })
            }
          }
        }
      },
      getNewObj(arr) {
        return this.newActiveArr.filter((item, index) => {
          for (var i = 0; i < arr.length; i++) {
            if (arr[i] && i == index) {
              return true
            }
          }
          return false
        })
      },
      //选中位置
      changeFreeCount(obj) {
        if (obj.freeCount > 0) {
          this.isFreeCount = false;
          this.freeCount = obj.freeCount
        }
      },
      //选中用餐日期
      changeNewUseTime(num) {
        switch (num) {
          case 87:
            //早餐
            this.pickerOptions.start = '05:00';
            this.pickerOptions.end = '09:00';
            break;
          case 88:
            //中餐
            this.pickerOptions.start = '10:00';
            this.pickerOptions.end = '14:00';
            break;
          case 89:
            //晚餐
            this.pickerOptions.start = '16:00';
            this.pickerOptions.end = '20:00';
            break;
        }
        this.changeUseTime().then(data => {
          //初始化房间类型
          if (this.foodOrderChoseRoomList.length) {
            this.roomType = this.foodOrderChoseRoomList[0].fd_py_ID
            //初始化房间
            this.newFoodOrderChoseRoomList = this.foodOrderChoseRoomList[0].choseRoomList
            for (var i = 0; i < this.newFoodOrderChoseRoomList.length; i++) {
              if (this.newFoodOrderChoseRoomList[i].imageList.length) {
                this.newFoodOrderChoseRoomList[i].oneImg = this.newFoodOrderChoseRoomList[i].imageList[0].fd_ri_Image
              } else {
                this.newFoodOrderChoseRoomList[i].oneImg = ''
              }

            }
            for (var i = 0; i < this.foodOrderChoseRoomList[0].choseRoomList.length; i++) {
              this.activeArr.push(false)
            }
            for (var i = 0; i < this.foodOrderChoseRoomList.length; i++) {
              this.orderArr.push(false)
            }
          }
          this.freeLoading = false;
        })
        //获取停车位个数
      },
      getWaitCarCount(type) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "shopID": this.$route.query.id,
          "bookDate": this.addOptions.useDate,
          bookTime: type
        }
        this.$store.dispatch('getWaitCarCount', options)
          .then(num => {
            this.WaitCarCount = num
          }, err => {
            console.log(err)
          })
      },
      changeUseTime() {
        if (!this.addOptions.useDate) {
          this.$notify({
            message: '亲,请先选择用餐日期!',
            type: 'error'
          });
          return;
        }
        this.getWaitCarCount(this.addOptions.useTime)
        this.freeLoading = true;
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "shopID": this.foodModel.fd_sf_ID,
          "bookDate": this.addOptions.useDate,
          "bookTime": this.addOptions.useTime
        };
        return this.$store.dispatch('GetCanSellTableCount', options)

      },
      //提交订单
      submitOrder() {
        if (!isPhone(this.addOptions.fd_or_Phone)) {
          this.$notify({
            message: '手机号码输入格式不正确!',
            type: 'error'
          });
          return;
        }
        if (!isNumber(this.addOptions.fd_or_TicketCount)) {
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
        for (var i = 0; i < this.checkedCities.length; i++) {
          this.addOptions.productInfo.push({
            productID: this.checkedCities[i].fd_sfp_ID,
            productCount: this.checkedCities[i].num
          })
        }
        this.$store.dispatch('foodSubmitOrder', this.addOptions)
          .then(data => {
            let newData = {};
            newData.title = this.foodModel.fd_sf_ProductName;
            newData.orderID = data;
            newData.adultNumber = 1;
            newData.adultPrice = this.twoPrice;
            newData.childNumber = 0;
            newData.childPrice = 0;
            newData.oi_OrderName = this.foodModel.fd_sf_ProductName;
            newData.OrderID = data;
            newData.oi_OrderTypeID = 6;
            newData.oi_SellMoney = this.twoPrice;
            sessionStorage.setItem('orderInfo', JSON.stringify(newData))
            this.$router.push({name: 'PaymentPlatform'})
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      initData() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "storeFrontID": this.$route.query.id
        };
        return this.$store.dispatch('initFoodOrder', options)
      },
      search() {
        this.initData().then((foodOrderList) => {
          this.foodOrderList = foodOrderList;
        })
      },

    },
  }
</script>
<style scoped>
  #wrap {
    margin: 0;
    padding: 58px 0 50px 0;
    background-color: #f5f4f4;
    width: 100%;
  }

  .wrapBox {
    width: 1200px;
    margin: 0 auto;
  }

  .Title > strong {
    float: left;
  }

  .Title > strong > i {
    float: left;
    width: 46px;
    height: 54px;
    background: url("../../assets/img/foodIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-left: 40px;
  }

  .Title > strong > span {
    float: left;
    margin-left: 15px;
    font: 20px/54px "微软雅黑";
    color: #525151;

  }

  .Title > div {
    float: right;
    width: 550px;
  }

  .seleteOrder {
    margin-top: 20px;
    background-color: #fff;
    padding: 40px 30px 20px 30px;
  }

  .aboutName {
    background-color: #eaeaea;
    height: 50px;
  }

  .aboutName > i {
    float: left;
    width: 50px;
    height: 50px;
    background: #ffaa00 url("../../assets/img/food2.png") no-repeat 9px 9px;
  }

  .aboutName > strong {
    float: left;
    margin-left: 10px;
    font: 18px/50px "微软雅黑";
    color: #5a5959;
  }

  .aboutName > span {
    float: left;
    margin-left: 10px;
    font: 12px/50px "微软雅黑";
    color: #ffaa00;
  }

  .seleteDetails {
    margin-top: 30px;
    padding-left: 60px;
  }

  .aboutEatRoom > strong {
    float: left;
    font: 19px/49px "微软雅黑";
    color: #6d6c6b;
  }

  .aboutEatRoom > span {
    float: left;
    margin-left: 10px;
    padding: 0 5px;
    font: 12px/17px "微软雅黑";
    border: 1px solid #8fd2fa;
    color: #8fd2fa;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    margin-top: 17px;
  }

  .date > strong,
  .remind > strong,
  .position > strong {
    float: left;
    font: 20px/64px "微软雅黑";
    color: #6d6c6b;
    /*letter-spacing: 25px;*/
  }

  .date > span,
  .remind > span {
    float: left;
    margin-top: 14px;
  }

  .date > i,
  .remind > i {
    font: 20px/64px "微软雅黑";
    float: left;
    margin-left: 10px;
    color: red;
  }

  .position > div {
    float: left;
    width: 800px;
    margin-top: 15px;
  }

  .roomPic {
    margin-top: 25px;
  }

  .roomPic img {
    width: 109px;
    height: 78px;
    padding: 4px 7px;
    border: 1px solid transparent;
    vertical-align: top;
  }

  .roomPic img.active {
    border-color: #ffaa00;
  }

  .roomPic > a {
    float: left;
    margin-right: 20px;
  }

  .roomPic span {
    font: 15px/2 "微软雅黑";
    display: block;
    color: #4b4b4b;
    text-align: center;
  }

  .userInfo {
    margin-top: 40px;
    background-color: #fff;
    padding: 40px 30px 20px 30px;
  }

  .userInfoTitle {
    height: 50px;
    background-color: #eaeaea;
  }

  .userInfoTitle > i {
    float: left;
    width: 50px;
    height: 50px;
    background: #ffaa00 url("../../assets/img/foodIcon3.png") no-repeat 11px 11px;
  }

  .userInfoTitle > strong {
    font: 18px/50px "微软雅黑";
    color: #5a5959;
    float: left;
    margin-left: 10px;
  }

  .userInfoTitle > span {
    float: left;
    margin-left: 10px;
    color: #ffaa00;
    font: 12px/50px "微软雅黑";
  }

  .userInfoC {
    margin-top: 20px;
    padding-left: 60px;
    font: 20px/55px "微软雅黑";
    color: #6d6c6b;
  }

  .userInfoC .a {
    letter-spacing: 20px;
  }

  .userInfoC .a strong {
    float: left;
    width: 90px;
  }

  .orderP > strong {
    float: left;
  }

  .orderP > span {
    font: 16px/20px "微软雅黑";
    padding: 0 5px;
    background-color: #ff8888;
    color: #fff;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    float: left;
    margin-top: 17px;
    margin-left: 5px;
  }

  .stopCar > strong {
    width: 90px;
    float: left;
  }

  .stopCar > i {
    float: left;
    width: 26px;
    height: 24px;
    background: url("../../assets/img/foodIcon4.png") no-repeat;
    margin-top: 17px;
    margin-right: 10px;
  }

  .stopCar span {
    color: #ff8888;
  }

  .orderInfo {
    margin-top: 36px;
    background-color: #fff;
    position: relative;
  }

  .orderInfo > nav,
  .foodInfo > nav {
    font: 20px/4 "微软雅黑";
    color: #fff;
    padding: 0 50px;
    border: 1px solid #e9e9e9;
    background-color: #ee1a54;
  }

  .orderInfo > nav > *,
  .foodInfo > nav > * {
    float: left;
    text-align: center;
  }

  .orderInformation {
    width: 480px;
  }

  .foodInfo {
    margin-top: 40px;
    background-color: #fff;
  }

  .foodInfo > nav {
    background-color: #fdc148;
  }

  .unitPrice {
    width: 151px;
  }

  .foodNum {
    width: 151px;
  }

  .moneyNum {
    width: 151px;
  }

  .orderState {
    width: 151px;
  }

  .orderList {
    padding: 0 50px;
  }

  .orderList > li {
    border-bottom: 1px solid #e9e9e9;
    padding: 62px 0 19px 0;
    font: 20px/30px "微软雅黑";
  }

  .orderList > li > * {
    float: left;
    text-align: center;
    margin-top: 25px;
    color: #696868;
  }

  .orderList > li > .roomName {
    margin-top: 0;
  }

  .roomName > img {
    width: 147px;
    height: 84px;
    float: left;
    margin-left: 30px;
  }

  .roomName > span {
    float: left;
    margin-top: 25px;
    margin-left: 30px;
    width: 220px;
    text-align: left;
  }

  .icon {
    width: 28px;
    height: 28px;
    border: 1px solid #ffc144;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-top: 27px;
    float: left;
  }

  .icon > i {
    display: block;
    width: 15px;
    height: 15px;
    background-color: #ffaa00;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin: 5px auto 0;
    display: none;
  }

  .icon > i.active {
    display: block;
  }

  .orderList > li > .APrice {
    color: #ff4d67;
  }

  .allMoney {
    margin-top: 60px;
    padding-right: 90px;
    padding-bottom: 40px;
  }

  .allMoney > * {
    float: right;
    font: 18px/44px "微软雅黑";
  }

  .allMoney > a {
    padding: 0 30px;
    background-color: #ee1a54;
    color: #fff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    margin-left: 10px;
  }

  .allMoney > strong {
    color: #ee1a54;
  }

  .allMoney > span {
    color: #979696;
    font-size: 14px;
  }

  .foodOrder {
    width: 100%;
    height: 6px;
    background: transparent url("../../assets/img/foodBorder.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    position: absolute;
    bottom: -5px;
    left: 0;
  }

  .foodList {
    padding: 0 50px;
    background-color: #fff;
  }

  .foodList > li {
    padding: 13px 0;
    border-bottom: 1px solid #e7e7e7;
  }

  .foodList > li img {
    width: 129px;
    height: 68px;
    float: left;
    margin-right: 60px;
  }

  .foodList > li > div > span {
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 200px;
  }

  .foodList > li > * {
    float: left;
    text-align: center;
    font: 18px/68px "微软雅黑";
    color: #3f3f3f;
  }

  .foodList .unitPrice,
  .foodList .moneyNum {
    color: #fdc148;
  }

  .goPayBox {
    margin-top: 20px;
    background-color: #fff;
    padding: 30px;
  }

  .goPayBox > a {
    float: right;
    font: 22px/57px "微软雅黑";
    padding: 0 40px;
    background-color: #ee1a54;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    color: #fff;
  }

  .goPayBox > strong {
    float: right;
    font: 33px/57px "微软雅黑";
    color: #fdc148;
    margin-right: 40px;
  }

  .goPayBox > span {
    float: right;
    font: 22px/57px "微软雅黑";
    color: #979696;
  }

</style>
