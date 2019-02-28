<template>
  <div>
    <div class="MyOrderWrapContent">
      <ul class="MyOrderWrapContentNav clearfix">
        <li><a href="javascript:;">全部订单</a><span></span></li>
        <!--<li><a href="javascript:;">待付款(0)</a><span></span></li>-->
        <!--<li><a href="javascript:;">待出行/收货(0)</a><span></span></li>-->
        <!--<li><a href="javascript:;">待点评(0)</a><span></span></li>-->
      </ul>
      <div class="selectBox">
        <strong style="padding-left: 20px">请选择订单类型:</strong>
        <el-select v-model="orderType" placeholder="请选择订单" size="small" @change="changeOrderType">
          <el-option key="" label="全部订单" value=""></el-option>
          <el-option key="0" label="旅行社订单" value="0"></el-option>
          <el-option key="1" label="车票订单" value="1"></el-option>
          <el-option key="2" label="门票订单" value="2"></el-option>
          <el-option key="3" label="美食订单" value="3"></el-option>
          <el-option key="4" label="酒店订单" value="4"></el-option>
          <el-option key="5" label="租车订单" value="5"></el-option>
        </el-select>

      </div>

      <el-table
        :data="myTourOrderList"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="订单名称:">
                <span>{{props.row.oi_MerchantName ? props.row.oi_MerchantName + '-' : ''}}{{ props.row.oi_OrderName ? props.row.oi_OrderName : "未知"
                  }}</span>
              </el-form-item>
              <el-form-item label="订单号:">
                <span>{{ props.row.oi_OrderID }}</span>
              </el-form-item>
              <el-form-item label="数量:">
                <span>{{ props.row.oi_Number + '张' }}</span>
              </el-form-item>
              <el-form-item label="订单类型:">
                <span>{{ props.row.oi_OrderTypeID | getOrderType}}</span>
              </el-form-item>
              <el-form-item label="订单金额：">
                <span>￥{{ props.row.oi_SellMoney ? props.row.oi_SellMoney : 0 }}</span>
              </el-form-item>
              <el-form-item label="支付状态：">
                <span>{{ props.row.oi_OrderStatus | getTicketStatus }}<el-button size="mini"
                                                                                 @click="orderDetail(props.row)">订单详情</el-button></span>
              </el-form-item>
              <el-form-item label="出票状态：">
                <span>{{ props.row.oi_OutStatus | getOutStatus }}</span>
              </el-form-item>
              <el-form-item label="下单时间：">
                <span>{{ props.row.oi_CreateTime | getUseTime }}</span>
              </el-form-item>
              <el-form-item label="使用时间：">
                <span>{{ props.row.oi_UseTime | getUseTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单金额" align="center" width="100">
          <template slot-scope="scope">
            ￥{{scope.row.oi_SellMoney}}
          </template>
        </el-table-column>
        <el-table-column label="订单类型" align="center">
          <template slot-scope="scope">
            {{scope.row.oi_OrderTypeID | getOrderType}}
          </template>
        </el-table-column>
        <el-table-column label="出票状态" align="center">
          <template slot-scope="scope">
            {{scope.row.oi_OutStatus | getOutStatus}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteOrder(scope.row)">删除</el-button>
            <el-button size="mini" type="primary" @click="goPay(scope.row)" v-show="scope.row.oi_OrderStatus!=1">去支付
            </el-button>
            <el-button size="mini" type="success" @click="printInvoice(scope.row)"
                       v-show="scope.row.oi_MakeBillState!=1">申请开票
            </el-button>
          </template>
        </el-table-column>
      </el-table>


    </div>
    <!--分页-->
    <div class="block" style="float: right;margin-top: 20px;padding-bottom: 200px;">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="5"
        background
        layout="total, prev, pager, next"
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
    data() {
      return {
        total: 0,
        isLoading: false,
        orderType: '',//订单类型
        user: {}
      }
    },
    computed: mapGetters([
      'myTourOrderList'
    ]),
    created() {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      let orderTypeID = sessionStorage.getItem('orderTypeID')
      this.orderType = orderTypeID
      this.initData(1, orderTypeID)
    },
    methods: {
      //分页
      handleCurrentChange(num) {
        this.initData(num, this.orderType)
      },
      //选中订单类型
      changeOrderType() {
        this.initData(1, this.orderType)
      },
      initData(page, orderType) {
        let userID = JSON.parse(sessionStorage.getItem('user')).sm_ui_ID
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": userID,
          "operateUserName": "",
          "pcName": "",
          orderType: orderType ? orderType : '',
          token: this.user.token,
          "huiuserid": userID,
          isDelete: 0,
          "page": page ? page : 1,
          "rows": "5"
        };
        this.isLoading = true;
        this.$store.dispatch('initMyTourOrder', options)
          .then(total => {
            this.total = total;
            this.isLoading = false;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      search() {
        this.initData(1)
      },
      //去支付
      goPay(item) {
        item.OrderID = item.oi_OrderID;
        sessionStorage.setItem('orderTypeID', item.oi_OrderTypeID)
        sessionStorage.setItem('orderInfo', JSON.stringify(item))
        this.$router.push({name: 'PaymentPlatform'})
      },
      //删除订单
      deleteOrder(item) {
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          token: this.user.token,
          "orderID": item.oi_OrderID
        };
        this.$store.dispatch('DeleteOrder', deleteOptions)
          .then((suc) => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(1, 0)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });

      },
      //订单详情
      orderDetail(item) {
        switch (item.oi_OrderTypeID) {
          case 0:
            sessionStorage.setItem('orderTypeID', 0)
            //旅行社
            let orderDeatilOptions = {
              "loginUserID": "huileyou",
              "loginUserPass": "123",
              "operateUserID": "",
              "operateUserName": "",
              "pcName": "",
              "token": this.user.token,
              "ts_to_OrderID": item.oi_OrderID,
              "page": 1,
              "rows": 10
            };
            this.$store.dispatch('initOrderDetail', orderDeatilOptions)
              .then((obj) => {
                let newObj = {isOff: false};

                if (obj.ts_to_PayState == 1 || obj.ts_to_PayState == 2 || obj.ts_to_OutStatus == 1) {
                  newObj.isOff = true
                } else {
                  newObj.isOff = false;
                }
                sessionStorage.setItem('payStatusObj', JSON.stringify(newObj));
                this.$router.push({name: 'MyOrderDetails'})
              }, err => {
                this.$notify({
                  message: err,
                  type: 'error'
                });
              })
            break;
          case 2:
            sessionStorage.setItem('orderTypeID', 2)
            //门票
            let ticketOptions = {
              "loginUserID": "huileyou",
              "loginUserPass": "123",
              "operateUserID": "",
              "operateUserName": "",
              "pcName": "",
              "token": this.user.token,
              // "userID": "18111729770",//用户编码
              "orderID": item.oi_OrderID,//订单编号
              "page": 1,
              "rows": 10
            };
            this.$store.dispatch('initTicketOrderDetail', ticketOptions)
              .then((obj) => {
                let newObj = {isOff: false};
                if (obj.tm_or_PayState == 1 || obj.tm_or_PayState == 2 || obj.tm_or_PayState == 1) {
                  newObj.isOff = true
                } else {
                  newObj.isOff = false;
                }
                sessionStorage.setItem('payStatusObj', JSON.stringify(newObj));
                this.$router.push({name: 'TicketOrderDetails'})
              }, err => {
                this.$notify({
                  message: err,
                  type: 'error'
                });
              })
            break;
          case 3:
            sessionStorage.setItem('orderTypeID', 3);
            //美食
            let mOptions = {
              "loginUserID": "huileyou",
              "loginUserPass": "123",
              "operateUserID": "",
              "operateUserName": "",
              "token": this.user.token,
              "pcName": "",
              "orderID": item.oi_OrderID, //订单Id
            };
            this.$store.dispatch('initFoodOrderDetail', mOptions)
              .then((obj) => {
                let newObj = {isOff: false};
                if (obj.fd_or_PayState == 1 || obj.fd_or_PayState == 2 || obj.fd_or_PayState == 1) {
                  newObj.isOff = true
                } else {
                  newObj.isOff = false;
                }
                sessionStorage.setItem('payStatusObj', JSON.stringify(newObj));
                this.$router.push({name: 'FoodOrderDetails'})
              }, err => {
                this.$notify({
                  message: err,
                  type: 'error'
                });
              })
            break;
          case 4:
            sessionStorage.setItem('orderTypeID', 4)
            //酒店
            let hOptions = {
              "loginUserID": "huileyou",
              "loginUserPass": "123",
              "operateUserID": "",
              "operateUserName": "",
              "pcName": "",
              "token": this.user.token,
              "ht_or_OrderID": item.oi_OrderID, //订单Id
            };
            this.$store.dispatch('initHotelOrderDetail', hOptions)
              .then((obj) => {
                let newObj = {isOff: false};
                if (obj.ht_or_PayState == 1 || obj.ht_or_PayState == 2 || obj.ht_or_PayState == 1) {
                  newObj.isOff = true
                } else {
                  newObj.isOff = false;
                }
                sessionStorage.setItem('payStatusObj', JSON.stringify(newObj));
                this.$router.push({name: 'HotelOrderDetails'})
              }, err => {
                this.$notify({
                  message: err,
                  type: 'error'
                });
              });
            break;
          case 5:
            sessionStorage.setItem('orderTypeID', 5)
            //租车
            let cOptions = {
              "loginUserID": "huileyou",
              "loginUserPass": "123",
              "operateUserID": "",
              "operateUserName": "",
              "pcName": "",
              "token": this.user.token,
              "cr_cro_OrderId": item.oi_OrderID, //订单Id
            };
            this.$store.dispatch('initCarOrderDetail', cOptions)
              .then((obj) => {
                let newObj = {isOff: false};
                if (obj.cr_cro_PlayStatus == 1 || obj.cr_cro_PlayStatus == 2) {
                  newObj.isOff = true
                } else {
                  newObj.isOff = false;
                }
                sessionStorage.setItem('payStatusObj', JSON.stringify(newObj));
                this.$router.push({name: 'CarOrderDetails'})
              }, err => {
                this.$notify({
                  message: err,
                  type: 'error'
                });
              })
            break;
        }
      },
      //申请开票
      printInvoice(item) {
        if (item.ts_to_OrderID) {
          //跟团游
          item.orderID = item.ts_to_OrderID
          item.price = item.ts_to_SumPrice
          item.id = item.oi_ID
        } else if (item.oi_OrderID) {
          //门票
          item.orderID = item.oi_OrderID
          item.price = item.oi_SellMoney
          item.id = item.oi_ID
        } else if (item.fd_or_OrderID) {
          //美食
          item.orderID = item.fd_or_OrderID
          item.price = item.fd_or_SumPrice
        } else if (item.ht_od_OrderID) {
          //酒店
          item.price = item.ht_od_SellPrice
          item.orderID = item.ht_od_OrderID
        }
        sessionStorage.setItem('orderInfoItem', JSON.stringify(item))
        this.$router.push({name: 'PrintTheInvoice'})
      },
    },
    mounted() {
    }
  }
</script>
<style scoped>
  .MyOrderWrapContent {
    width: 990px;
  }

  .MyOrderWrapContentNav {
    font: bold 16px/50px "微软雅黑";
    border: 1px solid #eaeaea;
    background-color: #fff;
  }

  .MyOrderWrapContentNav > li {
    float: left;
  }

  .MyOrderWrapContentNav > li > a {
    float: left;
    padding: 0 30px;
    color: #3b2d22;
  }

  .MyOrderWrapContentNav span {
    float: left;
    width: 1px;
    height: 24px;
    background-color: #ddd;
    margin-top: 14px;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .selectBox {
    padding: 20px 0;
    background-color: #fff;
  }

</style>
