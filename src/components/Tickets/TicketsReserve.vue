<template>
  <div>
    <header class="TicketsReserveLogoAndProgressBar">
      <div class="TicketsReserveLogoAndProgressBarWrap clearfix">
        <div class="TicketsReserveLogo">
          <img src="../../assets/img/huileyouLogo.jpg" width="200" height="60">
          <router-link to="/Comment/agenciesHome"></router-link>
        </div>
        <!--进度条-->
        <div class="TicketsReserveProgressBar"></div>
      </div>
    </header>
    <!--预定内容-->
    <section class="TicketsReserveContent">
      <div class="TicketsReserveContentWrap">
        <div class="TicketsReserveContent clearfix">
          <!--内容左边-->
          <div class="TicketsReserveContentLeft">
            <div class="TicketsReserveContentLeftContent">
              <!--标题-->
              <div class="TicketsReserveContentLeftTitle">
                <h2>{{ticketsReserveDetail.tm_tt_Name}}</h2>
                <a href="javascript:;" :class="{active: showReserve}" @click="showReserveBox">预定须知<i></i></a>
                <div class="reserveDetails" v-show="showReserve">
                  <div class="reserveDetailsReserve clearfix">
                    <strong>预定须知</strong>
                    <ul class="reserveDetailsReserveList">
                      <li>
                        <span>门票类型:</span>
                        <span>{{bookKnowObj.Notice.tm_tt_typeName}}</span>
                      </li>
                      <li>
                        <span>提前预定时间:</span>
                        <span>{{bookKnowObj.Notice.tm_tt_BeforeTime | getReserveTime}}</span>
                      </li>
                      <li>
                        <span>取票时间:</span>
                        <span>{{bookKnowObj.Notice.tm_tt_GetTime}}</span>
                      </li>
                      <li>
                        <span>取票地址:</span>
                        <span>{{bookKnowObj.Notice.tm_tt_GetAddress}}</span>
                      </li>
                      <li>
                        <span>重要条款:</span>
                        <span>{{bookKnowObj.Notice.tm_tt_ImportantCause}}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="reserveDetailsOther clearfix">
                    <strong>其他说明</strong>
                    <div>
                      <p>预订限制：{{bookKnowObj.Other.tm_tt_BookLimit}}</p>
                      <p>温馨提示：{{bookKnowObj.Other.tm_tt_HappyNotice}}</p>
                      <p>优待政策：{{bookKnowObj.Other.tm_tt_PreferentialPolicy}}</p>
                      <p>购票须知：{{bookKnowObj.Other.tm_tt_ByeNotice}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!--选择出游日期-->
              <div class="choiceOutTime">
                <div class="choiceOutTimeInput">
                  <span><em>*</em>出游日期:</span>
                  <input type="text" v-model="dateOfExcursion" placeholder="请选择日期">
                  <i></i>
                </div>
                <div class="choiceOutTimeCalendar">
                  <div class="lastTimeNext clearfix">
                    <a href="javascript:;" class="last" @click="showLastMonth"></a>
                    <span class="time">{{date}}</span>
                    <a href="javascript:;" class="next" @click="showNextMonth"></a>
                  </div>
                  <div class="weekListWrap">
                    <ul class="weekList clearfix">
                      <li>日</li>
                      <li>一</li>
                      <li>二</li>
                      <li>三</li>
                      <li>四</li>
                      <li>五</li>
                      <li>六</li>
                    </ul>
                  </div>
                  <!--日历-->
                  <div class="choiceOutTimeCalendarListWrap">
                    <ul class="choiceOutTimeCalendarList clearfix" v-loading="isLoading">

                      <li v-for="item,index in lastDateArr" style="color: #ccc;text-indent: 5px;">{{item}}</li>
                      <li v-for="item,index in monthArr"  @click="clickDate(item,index)" :class="{active: index == liActive}">
                        <strong>{{item.day ? item.day : item}}</strong>
                        <span v-show="item.tm_tp_RealPrice">￥{{item.tm_tp_RealPrice ? item.tm_tp_RealPrice : ''}}</span>
                      </li>
                      <li v-for="item,index in nextDateArr" style="color: #ccc;text-indent: 5px;">{{item}}</li>
                    </ul>
                  </div>
                </div>
                <!--选择人数-->
                <div class="selectBox">
                  <div class="peopleNumberBox clearfix">
                    <strong><i>*</i>出游人数:</strong>
                    <el-input-number
                      v-model="peopleNumber"
                      :min="0"
                      :max="dateObj.tm_tp_Limit"
                      @change="handleChange"
                      size="mini"
                      :disabled="!dateObj.tm_tp_Limit"
                      class="accumulation"
                    ></el-input-number>
                    <span>最多可预定{{dateObj.tm_tp_Limit ? dateObj.tm_tp_Limit : '0'}}张</span>
                  </div>
                  <div class="distributionInformation clearfix">
                    <strong>配送信息:</strong>
                    <el-radio-group v-model="pickUp" class="distributionInformationBtn">
                      <el-radio :label="1">（门票自取）</el-radio>
                    </el-radio-group>
                    <span>地址:{{ticketsReserveDetail.Address}}</span>
                  </div>
                </div>
              </div>
            </div>
            <!--取票人信息-->
            <div class="theTouristInfromation">
              <h5>取票人/出游人信息</h5>
              <div class="fillInTheTouristInfromation">
                <div class="fillInTheTouristInfromationTitle">
                  <strong>常用出游人</strong>
                </div>
                <div class="fillInPeopleInfromation" v-for="item in arr">
                  <strong class="fillInPeopleInfromationTitle" v-show="peopleNumber.length==0">暂无常用出游人</strong>
                  <span class="ticketCollector">取票人</span>
                  <ul class="fillInInputList">
                    <li>
                      <strong><i>*</i>姓名:</strong>
                      <input type="text" placeholder="请填写姓名" v-model="item.tm_oc_UserName">
                    </li>
                    <li>
                      <strong><i>*</i>身份证:</strong>
                      <input type="text" placeholder="请填写证件号" v-model="item.tm_oc_CertNo">
                    </li>
                    <li>
                      <strong><i>*</i>手机号码:</strong>
                      <input type="text" placeholder="用于接收出票短信" v-model="item.tm_oc_Phone">
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!--支付-->
            <div class="agreement">
              <el-checkbox v-model="checked">同意</el-checkbox>
              <a href="javascript:;">西岭雪山预订协议</a>
            </div>
            <div class="paymentOrder clearfix">
              <span>订单金额:<em>￥</em><strong>{{dateObj.tm_tp_RealPrice * peopleNumber ? dateObj.tm_tp_RealPrice * peopleNumber : 0}}</strong></span>
              <el-button class="paymentOrderSubmit" @click="ticketPay">立即支付</el-button>
            </div>
          </div>
          <!--内容右边-->
          <div class="TicketsReserveContentRight">
            <div class="TicketsReserveContentRightTopBorder"></div>
            <div class="TicketsReserveContentRightContent">
              <div class="detailsOfCharges">
                <strong>费用明细 <em>(在线支付)</em></strong>
                <span>门票价格:<em>￥{{dateObj.tm_tp_RealPrice ? dateObj.tm_tp_RealPrice : 0}}</em></span>
              </div>
              <div class="orderMoney">
                <strong>订单总金额:<em>￥<i>{{dateObj.tm_tp_RealPrice * peopleNumber ? dateObj.tm_tp_RealPrice * peopleNumber : 0}}</i></em></strong>
                <a href="javascript:;" @click="ticketPay">立即支付</a>
                <div class="border"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
//  import $ from 'jquery'
  import {isPhone, isCardNo, toZear2} from '@/assets/public'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        showReserve: false,
        n: 999,
        isLoading: false,
        day: {},
        str: '',
        peopleNumber: '0',
        pickUp: 1,
        date: '',
        id: '',
        checked: false,
        m: '',
        arr: [],
        user: {},
        arr1: [],
        arr2: [],
        arr3: [],
        arr4: [],
        arr5: [],
        dateObj: {},
        ticketsReserveDetail: {},
        supplierId: '',
        dateOfExcursion: '',
        bookKnowObj: {},
        liActive: '',


        lastDateArr: [],
        monthArr: [],
        nextDateArr: [],
        yearStr: '',
        monthStr: '',
        dateStr: '',
        currentMonth: '',
      }
    },

    created() {
      if (sessionStorage.getItem('bookKnowObj')) {
        this.bookKnowObj = JSON.parse(sessionStorage.getItem('bookKnowObj'))
      }

      this.supplierId = sessionStorage.getItem('supplierId');
      //获取门票立即预订详情数据
      this.ticketsReserveDetail = JSON.parse(sessionStorage.getItem('ticketsReserveDetail'));
      this.user = JSON.parse(sessionStorage.getItem('user'))
      if (!this.user) {
        this.$router.push({name: 'AdminLogin'})
        return
      }
      this.day.d = new Date().getDate();
      this.id = this.$route.params.id;
      let month = this.getNum(new Date().getMonth() + 1);
      this.m = new Date().getMonth() + 1;
      this.date = new Date().getFullYear() + '-' + month + '-' + this.getNum(new Date().getDate())
      this.isLoading = true;

      this.yearStr = new Date().getFullYear();
      this.monthStr = new Date().getMonth();
      this.dateStr = this.yearStr + '-' + this.monthStr + '-01';
      this.currentMonth = this.yearStr + '-' + toZear2(Number(this.monthStr) + 1);
      this.initData();


      this.liActive = new Date().getDate()-1;
      //获取票板信息
    },
    methods: {
      showReserveBox() {
        if (this.showReserve) {
          this.showReserve = false;
        } else {
          this.showReserve = true;
        }

      },
      handleChange(value) {
        if( this.arr.length > value ){
          this.arr.pop();
        }else{
          this.arr.push({
            tm_oc_UserName: '',
            tm_oc_CertNo: '',
            tm_oc_Phone: ''
          })
        }
      },
      //立即支付
      ticketPay() {
        if (!this.dateObj.day) {
          this.$notify({
            message: '请先选择出游日期!',
            type: 'error'
          });
          return
        }
        if (!this.arr.length) {
          this.$notify({
            message: '取票人不能为空!',
            type: 'error'
          });
          return
        }
        for (var i = 0; i < this.arr.length; i++) {
          let newArr = this.arr[i];
          if (!isPhone(newArr.tm_oc_Phone)) {
            this.$notify({
              message: '手机号码输入格式不正确!',
              type: 'error'
            });
            return;
          }
          if (!isCardNo(newArr.tm_oc_CertNo)) {
            this.$notify({
              message: '身份证号码输入格式不正确!',
              type: 'error'
            });
            return;
          }
        }
        if (!this.checked) {
          this.$notify({
            message: '请先同意预定协议,否则无法继续!',
            type: 'error'
          });
          return;
        }
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": this.user.sm_ui_ID,
          "operateUserName": "",
          "pcName": "",
          "data": {
            "tm_or_TourID": this.ticketsReserveDetail.tm_tt_TourID,//景点编号
            "tm_or_TicketTypeID": this.ticketsReserveDetail.tm_tt_ID,//商户票种编号
            "tm_or_UserID": this.user.sm_ui_ID,//用户编码
            "tm_or_TradeInfoID": this.supplierId,//供应商商家编码
            "tm_or_TicketCount": this.peopleNumber,//总张数
            "tm_or_SumPrice": this.dateObj.tm_tp_RealPrice * this.peopleNumber,//总金额
            "tm_or_SumService": "0",//总网售手续费
            "tm_oc_PlayDate": this.dateObj.tm_tp_Date,
            "tm_or_Remark": "",
          },
          "personInfo": this.arr
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('initTicketPay', options)
          .then((data) => {
            this.$store.commit('hideLoading');
            let newData = data.data;
            let type = data.type;
            newData.type = type;
            newData.title = this.ticketsReserveDetail.tm_tt_Name;
            newData.orderID = newData.tm_or_OrderID;
            newData.adultNumber = this.peopleNumber;
            newData.adultPrice = this.dateObj.tm_tp_RealPrice;
            newData.childNumber = 0;
            newData.childPrice = 0;
            newData.oi_OrderName = this.ticketsReserveDetail.tm_tt_Name;
            newData.OrderID = newData.tm_or_OrderID;
            newData.oi_OrderTypeID = 2;
            newData.oi_SellMoney = this.dateObj.tm_tp_RealPrice * this.peopleNumber;
            sessionStorage.setItem('orderInfo', JSON.stringify(newData))
            this.$router.push({name: 'PaymentPlatform'})
          }, err => {
            this.$store.commit('hideLoading');
            this.$notify({
              message: err,
              type: 'error'
            });
            this.$router.push({name: 'PersonalDataDetails'})
          })
      },
      //点击日期
      clickDate(item, index) {
        this.liActive = index;
        this.dateObj = item;
        this.n = index
        this.dateOfExcursion = item.tm_tp_Date
      },
      getNum(num) {
        return num < 10 ? '0' + num : '' + num
      },

      initData(date) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "dateFrom": date ? date : '',
          "tm_tt_ID": this.$route.params.id,//商户票种编号
        }
        this.$store.dispatch('initTicketsReserveDate', options)
          .then(data => {
            this.isLoading = false;
            this.$nextTick(() => {
              this.get(this.yearStr, this.monthStr, data);
            })
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })

      },


      //获取周数
      getWeek(year, month) {
        return new Date(year, month, 1, 0, 0, 0).getDay();
      },
      //获取一个月中的所有天数
      getDates(year, month) {
        return new Date(year, month + 1, 1, -1, 0, 0).getDate();
      },
      get(year, month, data) {
        for (var n = 0; n < data.length; n++) {
          data[n].day = Number(data[n].tm_tp_Date.split('-')[2])
        }
        let newArr = [];
        let today = 0;
        let s = 0;
        for (var i = 1; i <= 42; i++) {
          var v = i - this.getWeek(year, month);
          if (v < 1) {
//            上个月天数
            var topMonth = this.getDates(year, month - 1);
            this.lastDateArr.push(topMonth - (this.getWeek(year, month) - i))
          } else if (v > this.getDates(year, month)) {
//            下个月
            let value = v - this.getDates(year, month)
            this.nextDateArr.push(value)
          } else {
            newArr.push(v)
          }
        }
        for (var i = 0; i < newArr.length; i++) {
          for (var j = 0; j < data.length; j++) {
            if (newArr[i] == data[j].day) {
              newArr[i] = data[j]
            }
          }
        }
        for (var i = 0; i < newArr.length; i++) {
          if (newArr[i].day == new Date().getDate() && month == (new Date().getMonth())) {
            newArr[i].day = '今天'
          } else {
            newArr[i] = newArr[i]
          }
          if (newArr[i] == new Date().getDate() && month == (new Date().getMonth()) && year == new Date().getFullYear()) {
            newArr[i] = '今天'
          } else {
            newArr[i] = newArr[i]
          }
        }
        this.monthArr = newArr;
      },
//      上个月
      showLastMonth() {
        this.monthStr--;
        if (this.monthStr < new Date().getMonth() && this.yearStr == new Date().getFullYear()) {
          this.monthStr = new Date().getMonth();
          this.$notify({
            message: '不能再点了!!',
            type: 'warning'
          })
          return
        }
        this.lastDateArr = [];
        this.monthArr = [];
        this.nextDateArr = [];
        if (this.monthStr < 0) {
          this.monthStr = 11;
          this.yearStr--;
        }
        this.dateStr = this.yearStr + '-' + toZear2(this.monthStr + 1) + '-01';
        this.date = this.dateStr
        this.currentMonth = this.yearStr + '-' + toZear2(this.monthStr + 1);
        this.initData(this.dateStr)
      },
//      下个月
      showNextMonth() {
        this.monthStr++;
        this.lastDateArr = [];
        this.monthArr = [];
        this.nextDateArr = [];
        if (this.monthStr > 11) {
          this.monthStr = 0;
          this.yearStr++;
        }
        this.dateStr = this.yearStr + '-' + toZear2(this.monthStr + 1) + '-01';
        this.date = this.dateStr
        this.currentMonth = this.yearStr + '-' + toZear2(this.monthStr + 1);
        this.initData(this.dateStr)

      },
    },
    mounted() {
      window.addEventListener('popstate', function () {
        window.location.reload()
      });
    }
  }
</script>
<style scoped>
  .strongActive {
    color: #f60;
  }

  .spanClass {
    color: #333;
  }

  .spanActive {
    color: #fff;
  }

  .active {
    color: #fff;
    background: #ffa833;
  }

  .TicketsReserveLogoAndProgressBar {
    width: 100%;
    background-color: #fff;
    padding: 20px 0;
  }

  .TicketsReserveLogoAndProgressBarWrap {
    width: 1250px;
    margin: 0 auto;
  }

  .TicketsReserveLogo {
    width: 200px;
    position: relative;
    float: left;
  }

  .TicketsReserveLogo a {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .TicketsReserveProgressBar {
    float: right;
  }

  /*头部结束*/

  /*内容开始*/

  .TicketsReserveContent {
    width: 100%;
    padding-top: 40px;
    background-color: #f4f5f6;
    padding-bottom: 50px;
  }

  .TicketsReserveContentWrap {
    width: 1250px;
    margin: 0 auto;
  }

  /*内容左边*/
  .TicketsReserveContentLeft {
    width: 953px;
    float: left;
  }

  .TicketsReserveContentLeftContent {
    padding: 20px;
    border: 3px solid #ffc073;
    box-sizing: content-box;
  }

  /*内容右边*/
  .TicketsReserveContentRight {
    float: right;
  }

  .TicketsReserveContentLeftTitle > h2 {
    font: bold 22px/52px "微软雅黑";
    display: inline-block;
    color: #333;
  }

  .TicketsReserveContentLeftTitle > a {
    display: inline-block;
    font: 16px/52px "宋体";
    color: #ff8800;
    position: relative;
    padding-right: 10px;
  }

  .TicketsReserveContentLeftTitle > a.active i {
    transform: rotateZ(180deg);
  }

  .TicketsReserveContentLeftTitle > a.active {
    background-color: transparent;
  }

  .TicketsReserveContentLeftTitle i {
    transition: .5s;
    position: absolute;
    right: 0;
    top: 25px;
    border: 4px solid transparent;
    border-top-color: #ff8800;
    transform-origin: 4px 2px;
    transform: rotateZ(0);
  }

  .reserveDetails {
    width: 100%;
    border: 1px solid #ff8800;
    background-color: #fffce9;
    padding: 25px;
    margin-bottom: 30px;
    /*display: none;*/
  }

  .reserveDetailsReserve strong,
  .reserveDetailsOther strong {
    font: 16px/26px "微软雅黑";
    float: left;
  }

  .reserveDetailsReserveList,
  .reserveDetailsOtherList {
    float: left;
    font: 14px/2 "微软雅黑";
    margin-left: 30px;
    color: #666;
  }

  .reserveDetailsReserveList span:nth-of-type(1),
  .reserveDetailsOtherList span:nth-of-type(1) {
    display: inline-block;
    width: 110px;
    text-align: left;
  }

  .reserveDetailsOther > div {
    float: left;
    width: 100%;
    font: 14px/2 "微软雅黑";
    color: #666;
  }

  /*预定须知结束*/

  /*出游日期开始*/

  .choiceOutTime {
    padding: 40px;
    background-color: #fff;
  }

  .choiceOutTimeInput {
    position: relative;
  }

  .choiceOutTimeInput span {
    font: 14px/26px "微软雅黑";
  }

  .choiceOutTimeInput input {
    width: 285px;
    height: 36px;
    border: 1px solid #ddd;
    margin-left: 20px;
    padding: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .choiceOutTimeInput em {
    color: #f60;
  }

  .choiceOutTimeInput i {
    position: absolute;
    top: 7px;
    left: 350px;
    width: 19px;
    height: 20px;
    background: url("../../assets/img/calendar.png") no-repeat;
  }

  .choiceOutTimeCalendar {
    margin-left: 89.5px;
  }

  .lastTimeNext {
    width: 615px;
    height: 51px;
    border: 1px solid #ddd;
    position: relative;
    margin-top: -1px;
    border-top-right-radius: 5px;
  }

  .lastTimeNext > .last {
    width: 11px;
    height: 11px;
    position: absolute;
    top: 20px;
    left: 20px;
    border-top: 2px solid #999;
    border-right: 2px solid #999;
    transform: rotateZ(-140deg);
  }

  .lastTimeNext > .next {
    width: 11px;
    height: 11px;
    position: absolute;
    top: 20px;
    right: 20px;
    border-top: 2px solid #999;
    border-right: 2px solid #999;
    transform: rotateZ(45deg);
  }

  .lastTimeNext > .time {
    display: block;
    width: 100%;
    text-align: center;
    font: 12px/4 "微软雅黑";
  }

  .weekListWrap {
    width: 615px;
    overflow: hidden;
  }

  .weekList {
    width: 616px;
    font: 14px/30px "宋体";
  }

  .weekList > li {
    float: left;
    width: 88px;
    text-align: center;
    background-color: #535d63;
    color: #fff;
  }

  .choiceOutTimeCalendarList {
    width: 616px;
  }

  .choiceOutTimeCalendarList > li {
    float: left;
    width: 88px;
    height: 64px;
    font: 16px/2 "微软雅黑";
    box-shadow: 0 0 1px #ccc;
    cursor: pointer;
  }

  .choiceOutTimeCalendarList > li.active {
    color: #fff;
    background-color: #f80;
  }

  .choiceOutTimeCalendarList > li.active span {
    color: #fff;
  }

  .choiceOutTimeCalendarList strong {
    display: block;
    text-align: left;
    text-indent: 5px;
  }

  .choiceOutTimeCalendarList span {
    display: block;
    text-align: center;
    color: #f80;
  }


  .choiceOutTimeCalendarListWrap {
    width: 615px;
  }

  .choiceOutTime .selectBox {
    font: 14px/40px "微软雅黑";
    margin-top: 20px;
    color: #666;
  }

  .peopleNumberBox i {
    color: #f60;
  }

  .peopleNumberBox > * {
    float: left;
  }

  .peopleNumberBox > .accumulation {
    margin: 5px 10px 0;
  }

  .distributionInformation > * {
    float: left;
  }

  .distributionInformationBtn {
    margin: 12px 10px 0;
  }

  /*取票人信息*/
  .theTouristInfromation {
    margin-top: 20px;
    border: 1px solid #ddd;
    border-top: 2px solid #b9b9b9;
    background-color: #fff;
  }

  .theTouristInfromation > h5 {
    font: bold 16px/3 "微软雅黑";
    background-color: #f8f8f8;
    padding-left: 20px;
  }

  .fillInTheTouristInfromation {
    padding: 10px 20px;
  }

  .fillInTheTouristInfromationTitle {
    font: 16px/2 "微软雅黑";
    border-bottom: 4px solid #eee;
    color: #333333;
  }

  .fillInPeopleInfromationTitle {
    display: block;
    width: 100%;
    text-align: center;
    font: 16px/3 "微软雅黑";
    color: #999999;
  }

  .ticketCollector {
    font: bold 14px/2 "微软雅黑";
    color: #ff8800;
  }

  .fillInInputList li {
    margin-bottom: 10px;
  }

  .fillInInputList strong {
    display: inline-block;
    width: 140px;
    font: 12px/40px "微软雅黑";
    text-align: right;
    margin-right: 10px;
  }

  .fillInInputList i {
    color: #f80;
  }

  .fillInInputList input {
    width: 300px;
    font: 12px/3 "微软雅黑";
    padding: 0 5px;
    border: 1px solid #ddd;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  /*支付订单*/

  .TicketsReserveContentLeft .agreement {
    font-size: 12px;
  }

  .TicketsReserveContentLeft .agreement a {
    display: inline-block;
    margin-left: 20px;
    color: #f80;
    line-height: 70px;
    font-family: "微软雅黑";
  }

  .TicketsReserveContentLeft .paymentOrder {
    border: 1px solid #ffdaac;
    background-color: #fffce9;
    font: 14px/80px "微软雅黑";
    color: #333;
    text-indent: 18px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }

  .TicketsReserveContentLeft .paymentOrder em {
    color: #f80;
    padding-left: 10px;
  }

  .TicketsReserveContentLeft .paymentOrder strong {
    font-size: 20px;
    color: #f80;
  }

  .TicketsReserveContentLeft .paymentOrder > span {
    float: left;
  }

  .paymentOrderSubmit {
    float: right;
    background-color: #ff8800;
    color: #fff;
    margin: 20px 20px 0;
  }

  /*费用明细*/

  .TicketsReserveContentRightTopBorder {
    width: 240px;
    height: 8px;
    background: url("../../assets/img/border-top.png") no-repeat;
    -webkit-background-size: 240px 8px;
    background-size: 240px 8px;
    margin-bottom: -4px;
  }

  .TicketsReserveContentRightContent {
    width: 230px;
    margin: 0 auto;
    border: 1px solid #ddd;
    background-color: #fff;
    position: relative;
    z-index: 2;
  }

  .detailsOfCharges {
    padding: 10px;
  }

  .detailsOfCharges strong {
    font: bold 16px/3 "微软雅黑";
    display: block;
    text-align: center;
  }

  .detailsOfCharges strong em {
    font-weight: normal;
  }

  .detailsOfCharges span {
    font: 14px/3 "微软雅黑";
    text-align: center;
    display: block;
  }

  .detailsOfCharges span em {
    color: #f80;
    padding-left: 10px;
  }

  .TicketsReserveContentRightContent .orderMoney {
    border-top: 1px solid #ffebce;
    padding: 10px;
    background-color: #fffce9;
    position: relative;
  }

  .TicketsReserveContentRightContent .orderMoney strong {
    display: block;
    text-align: center;
    font: bold 16px/2 "微软雅黑";
    color: #333;
  }

  .TicketsReserveContentRightContent .orderMoney strong em {
    padding-left: 10px;
    color: #f80;
  }

  .TicketsReserveContentRightContent .orderMoney a {
    font: 16px/2 "微软雅黑";
    display: block;
    width: 60%;
    text-align: center;
    color: #fff;
    background-color: #f80;
    margin: 10px auto;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .TicketsReserveContentRightContent .orderMoney .border {
    width: 230px;
    height: 8px;
    background: url("../../assets/img/border.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    position: absolute;
    left: -1px;
    bottom: -7px;
  }


</style>
