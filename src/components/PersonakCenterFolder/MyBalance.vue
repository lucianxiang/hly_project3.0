<template>
  <div id="wrapBox">
    <div class="tital clearfix">
      <h1>钱 包</h1>
      <button @click="update">修改钱包信息</button>
      <button @click="rechargeMoneyDialog" v-show="packMoneyObj.sm_up_PayCode">充值</button>
    </div>
    <div class="money">
      您的余额为<strong> {{packMoneyObj.sm_up_Money}} </strong>元
    </div>
    <!--充值-->
    <el-dialog
      title="充值"
      :visible.sync="moneyDialog"
      width="500px">
      <el-input placeholder="请输入充值金额" style="width: 60%;" v-model="moneyNumber"></el-input>
      <el-button @click="showQRCode">确认充值</el-button>
      <div class="QRCodeBox">
        <div class="QRCode" ref="ewm"></div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="moneyDialog = false">取 消</el-button>
  </span>
    </el-dialog>
    <!--修改-->
    <el-dialog
      title="修改钱包信息"
      :visible.sync="updateDialog"
      width="500px">
      <el-input placeholder="输入新的支付密码" maxlength="6" type="password" v-model="payPassword"></el-input>
      <el-input placeholder="输入当前账号密码" style="margin-top: 20px;" type="password" v-model="password"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([
      'packMoneyObj'
    ]),
    data() {
      return {
        moneyDialog: false,
        timer: null,
        timer1: null,
        moneyNumber: '',
        user: {},
        updateDialog: false,
        payPassword: '',
        password: '',
      }
    },
    created() {
      this.user = JSON.parse(sessionStorage.getItem('user'))
      if(!this.user){
        this.$router.push({name:'AdminLogin'})
        return;
      }
      this.initData();
    },
    methods: {
      initData() {
        let selectUserPot = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "huileyou",//操作员编码
          "operatePassword": "123",//操作员密码
          "operateUserName": "",//
          "pcName": "",
          "sm_up_ID": this.user.sm_ui_ID,//用户编码
        };
        this.$store.dispatch('initPackMoney', selectUserPot)
      },
      //初始化充值
      initPay() {
        let payOptions = {
          "userID": "qianke",
          "password": "qianke123",
          "stationID": "qianlidagzh",
          "money": 1,//this.moneyNumber*100
        };
        return this.$store.dispatch('payWechat', payOptions)
      },
      //充值弹窗
      rechargeMoneyDialog() {
        this.$store.commit('setTranstionFalse');
        this.moneyDialog = true;
      },
      //显示支付二维码
      showQRCode() {
        if (!this.moneyNumber) {
          this.$notify({
            message: '请输入充值金额！！',
            type: 'error'
          })
          return
        }
        this.$refs.ewm.innerHTML = '';
        var qrcode = new QRCode(this.$refs.ewm, {
          width: 200,
          height: 200
        });
        setTimeout(() => {
          this.initPay().then(data => {
            qrcode.clear();
            qrcode.makeCode(data.list);
            if (this.isLoad > 0) {
              return;
            }
            clearInterval(this.timer);
            this.timer = setInterval(() => {
              let options = {
                "userID": "qianke",
                "password": "qianke123",
                "stationID": "qianlidagzh",
                "orderNo": data.backstring
              }
              this.$store.dispatch('getOrderStatus', options)
                .then(resulte => {
                  if (this.isLoad > 0) {
                    return;
                  }
                  if (resulte.list == "SUCCESS") {
                    clearInterval(this.timer);
                    this.isLoad++;
                    this.rechargeMoney(this.moneyNumber);
                    this.moneyDialog = false;
                  }
                })
            }, 300)
          })
        }, 30)
      },
      //充值钱包
      rechargeMoney(money) {
        let userCharge = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "huileyou",//操作员编码
          "operatePassword": "123",//操作员密码
          "operateUserName": "",//
          "pcName": "",
          "token": this.user.token,
          "charageUserID": JSON.parse(sessionStorage.getItem('user')).sm_ui_ID,//充值用户编码
          "charageMoney": Number(money),//充值金额//Number(money)
        }
        this.$store.dispatch('userRechargeMoney', userCharge)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //修改余额信息
      update() {
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
      },
      updateSubmit() {
        if (this.payPassword.length != 6 || isNaN(this.payPassword)) {
          this.$notify({
            message: '支付密码为6位纯数字！',
            type: 'error'
          })
          return
        }
        let updateUserPot = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": this.packMoneyObj.sm_up_ID,//操作员编码
          "operatePassword": this.password,//操作员密码
          "operateUserName": "",//
          "pcName": "",
          "token": this.user.token,
          "payCode": this.payPassword,//钱包密码
          "isDelete": "0",//钱包状态  1停用 0启用
        }
        this.$store.dispatch('updateUserPot', updateUserPot)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.updateDialog = false;
            this.password = "";
            this.payPassword = "";
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
    },
  }
</script>
<style scoped>
  #wrapBox {
    position: relative;
    height: 400px;
  }

  .tital {
    margin: 20px;
  }

  .tital > button {
    outline: none;
    float: right;
    padding: 0 30px;
    border: 1px solid #cccccc;
    color: #4ecf5b;
    font: 16px/2 "微软雅黑";
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    margin-right: 10px;
  }

  .tital > button:hover {
    border-color: #f80;
    color: #f80;
  }

  h1 {
    font: 20px/2 "微软雅黑";
    color: #999;
    float: left;
  }

  .money {
    font: 16px/2 "微软雅黑";
    color: #4ecf5b;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
  }

  .money strong {
    font-weight: bold;
    color: #f80;
  }

  .QRCodeBox {
    display: inline-block;
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }

  .QRCode {
    display: inherit;
  }
</style>
