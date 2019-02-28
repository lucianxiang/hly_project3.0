<template>
  <div id="wrapBox">
    <div class="huLeYouLogo">
      <router-link to="/Comment/AgenciesHome">
        <img src="../assets/img/huileyouLogo.jpg" width="286" height="75">
      </router-link>
    </div>
    <div class="loginBoxWrap">
      <div class="loginBox">
        <div class="loginSwitch clearfix" ref="loginSwitch" id="loginSwitch">
          <a href="javascript:;" v-for="item,index in LoginType" :class="{active: changeTypeIndex == index}"
             @click="changeType(index)">{{item}}</a>
        </div>
        <!--输入登录-->
        <div class="inputBox" v-show="changeTypeIndex === 0" id="inputBox">
          <div class="loginNumber" v-show="showLoginNumber">
            <input type="text" class="AccountNumber" v-model="loginOptions.loginNumber" placeholder="账号">
            <input type="password" class="password" v-model="loginOptions.loginPassword" placeholder="密码">
            <!--<span>正在加载验证码...</span>-->
          </div>
          <div class="loginPhoneNumber" v-show="showLoginPhoneNumber">
            <input type="text" class="AccountNumber" v-model="phone" placeholder="请输入电话号码">
            <input type="password" class="password" placeholder="动态密码" v-model="activePassword">
            <button class="verificationCode" @click="getNum">{{getName}}</button>
          </div>
          <div id="captcha">
            <!--<p id="wait">正在加载验证码...</p>-->
          </div>
          <div class="goRegister">未拥有账号?
            <router-link to="/Register">点击前往注册></router-link>
          </div>
          <button class="loginBtn" @click="loginSubmit">登录</button>
          <div id="forgetPassword" class="clearfix">
            <a href="javascript:;" @click="ForgetThePassword">忘记密码</a>
            <a href="javascript:;" @click="numLoginType(accountLoginType.value)">{{accountLoginType.label}}</a>
          </div>
        </div>
        <!--二维码登录-->
        <div class="QRCode" v-show="changeTypeIndex === 1" id="QRCode">
          <h5>扫码登录，更快，更安全</h5>
          <div class="QRCodeImgBox clearfix">
            <div class="QRCodeBox">
              <div class="QRCodeEwm" ref="ewm"></div>
              <!--扫码成功-->
              <div class="sweepSuc" v-show="isSweepSuc">
                <i></i>
                <strong>按照APP提示相关操作完成登录</strong>
              </div>
              <!--超时-->
              <div class="sweepOvertime" v-show="isSweepOvertime">
                <strong>二维码已失效</strong>
                <a href="javascript:;">点击刷新</a>
              </div>
            </div>
            <img src="../assets/img/qrTips.png" width="160" height="174" class="PromptImage">
          </div>
          <p>打开APP扫二维码登录</p>
          <div class="downloadAndRegister clearfix">
            <!--<a href="javascript:;" class="downloadAPP">下载APP</a>-->
            <!--<a href="javascript:;" class="register">立即注册></a>-->
            <!--<span>新用户送礼,</span>-->
          </div>
        </div>
        <!--其他方式登录-->
        <!--        <div class="other">
                  <p class="otherLogin">其他方式登录</p>
                  <ul class="otherLoginList clearfix">
                    <li>
                      <a href="javascript:;" class="weiXin">微信</a>
                    </li>
                    <li>
                      <a href="javascript:;" class="QQ">QQ</a>
                    </li>
                    <li>
                      <a href="javascript:;" class="weiBo">微博</a>
                    </li>
                    <li>
                      <a href="javascript:;" class="heZuoCard">合作卡</a>
                    </li>
                  </ul>
                </div>-->
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  //  import $ from 'jquery'
  import Login from '../assets/css/Login.css'
  import {postPromise, getNewStr} from '../assets/public'
  //  require('../../static/js/gt.js')

  export default {
    name: '',
    computed: mapGetters([]),
    data() {
      return {
        isSweepOvertime:false,
        value: '',
        phone: '',
        inputShow: true,
        QRCodeShow: false,
        LoginType: [
          '账户登录',
          '扫码登录'
        ],
        showLoginNumber: true,
        showLoginPhoneNumber: false,
        accountLoginType: {
          value: 1,
          label: '手机动态码登录?'
        },
        accountType: [
          {
            value: 0,
            label: '账号登录'
          },
          {
            value: 1,
            label: '手机动态码登录?'
          }
        ],
        getName: '获取动态密码',
        loginOptions: {
          loginNumber: '',
          loginPassword: '',
        },
        num: 60,
        activePassword: '',
        isSweepSuc:false,
        changeTypeIndex: 0,
        timer: null
      }
    },
    methods: {
      //忘记密码跳转
      ForgetThePassword() {
        const {href} = this.$router.resolve({
          name: 'ForgetThePassword',
        });
        window.open(href, '_blank')
      },
      //切换登录类型
      numLoginType(value) {
        if (value == 1) {
          this.accountLoginType = this.accountType[0];
          this.showLoginNumber = false;
          this.showLoginPhoneNumber = true;
        } else {
          this.accountLoginType = this.accountType[1];
          this.showLoginNumber = true;
          this.showLoginPhoneNumber = false;
        }
      },
      //获取动态密码
      getNum() {
        if (typeof this.num == 'number' && this.num != 60) {
          return;
        }
        if (this.phone == '') {
          this.$notify({
            message: '请输入电话号码！！',
            type: 'error'
          });
          return;
        }
        this.isColor = true;
        let timer = setInterval(() => {

          if (this.num == 0) {
            this.isDisabled = false;
            this.isColor = false;
            clearInterval(timer)
            this.getName = '重新获取';
            this.num = 60
          } else {
            this.num--;
            this.getName = this.num + 's后重新获取'
          }
        }, 1000)
        axios.post(getNewStr + '/UserInfo/SendMessage', JSON.stringify({
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "phone": this.phone,
          "sendType": 2
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then((data) => {
            var data = data.data;
            if (Number(data.resultcode) == 200) {
              this.$notify({
                message: data.resultcontent,
                type: 'success'
              });


            } else {
              this.$notify({
                message: data.resultcontent,
                type: 'error'
              });
              clearInterval(timer)
              this.isColor = false;
            }
          })
      },
      //登录方式切换
      changeType(index) {
        this.changeTypeIndex = index;
        if (index) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
          }
          this.$store.dispatch('getLoginQRcode', options)
            .then(str => {
              this.createdEwm(str);
            }, err => {
              this.$notify({
                message: err,
                type: 'error'
              })
            })
        }
      },
      createdEwm(str) {
        this.$refs.ewm.innerHTML = '';
        var qrcode = new QRCode(this.$refs.ewm, {
          width: 150,
          height: 150
        });
        qrcode.makeCode(str + '');
        this.timer = setInterval(()=>{
          this.getQRcodeState(str)
            .then((data) => {
//              clearInterval(this.timer);
              switch(Number(data.resultcode)){
                case 305:
                  console.log('305',data)
                  //已扫码
                  this.isSweepSuc = true;
                  break;
                case 200:
                  console.log('200',data)
                  this.loginOptions.loginNumber = data.sm_ui_UserCode
                  this.loginOptions.loginPassword = data.sm_ui_Password
                  this.loginSubmit()
                  //登录返回账号密码
                  break;
                case 304:
                  break;
              }

            },err=>{
              console.log(err)
            })
        },1000)
      },
      getQRcodeState(str) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "ts_vc_Verification": str,
        }
        return this.$store.dispatch('getQRcodeState', options)
      },
      //登录提交
      loginSubmit() {
        //用账号登录
        if (this.showLoginNumber) {
          if (this.loginOptions.loginNumber == '') {
            this.$notify({
              message: '请输入账号！！',
              type: 'error'
            });
            sessionStorage.setItem('user', JSON.stringify(data.data))
            this.$store.commit('showQuitButton')
            this.$router.push({name: 'HotelHomePage'})
          }
          var GetValidateByPassword = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "userID": this.loginOptions.loginNumber,
            "password": this.loginOptions.loginPassword
          }

          axios.post(getNewStr + '/UserInfo/Login', JSON.stringify(GetValidateByPassword), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(data => {
              var data = data.data;
              if (Number(data.resultcode) == 200) {
                clearInterval(this.timer);

                localStorage.setItem('username', this.loginOptions.loginNumber)
                localStorage.setItem('password', this.loginOptions.loginPassword)
                this.$notify({
                  message: '登录成功！！',
                  type: 'success'
                });
                sessionStorage.setItem('user', JSON.stringify(data.data))
                this.$store.commit('showQuitButton')
                this.$store.commit('setIsLoginShow', data.data.sm_ui_Name)
//                const {href} = this.$router.resolve({
//                  name: 'AgenciesHome',
//                });
                this.$router.push({name:'AgenciesHome'})
//                window.location.href = 'http://hly.1000da.com.cn/index.html#/Comment/agenciesHome';
//                window.
//                window.open('http://hly.1000da.com.cn/index.html#/Comment/agenciesHome', '_blank')
//                this.$router.go(-1);

//                this.$router.push({name: 'AgenciesHome'})
//                setTimeout(()=>{
//                  window.location.reload()
//                },200)
              } else {
                this.$notify({
                  message: data.resultcontent,
                  type: 'error'
                });
              }
            })
        }
        //用动态密码登录
        if (this.showLoginPhoneNumber) {
          let autoPasswordLogin = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "phone": this.phone,//38返回职业
            "validateNo": this.activePassword,//验证码
          };
          this.$store.dispatch('activePasswordLogin', autoPasswordLogin)
            .then(data => {
              sessionStorage.setItem('user', JSON.stringify(data))
              this.$store.commit('showQuitButton')
              this.$router.go(-1);
              this.$store.commit('setIsLoginShow', data.sm_ui_Name)
            }, err => {
              this.$notify({
                message: err,
                type: 'error'
              });
            })
        }
      },
    },
    mounted() {
      document.title = '全域惠乐游_登录';
      let loginSwitch = document.getElementById("loginSwitch");
      let as;
      if (loginSwitch.children) {
        as = loginSwitch.children;
        as[0].className = 'active';
      }
      document.addEventListener('keydown', (e) => {
        if (e.keyCode == 13) {
          this.loginSubmit()
        }
      })
    }
  }
</script>
<style scoped>
  #forgetPassword {
    margin: 10px 0 0 0;
  }

  #forgetPassword > a:nth-of-type(1) {
    float: left;
    margin-left: 35px;
    color: #999;
  }

  #forgetPassword > a:nth-of-type(1):hover {
    color: #f80;
  }

  #forgetPassword > a:nth-of-type(2) {
    float: right;
    margin-right: 35px;
    color: #999;
  }

  #forgetPassword > a:nth-of-type(2) img {
    margin-right: 3px;
  }

  #forgetPassword > a:nth-of-type(2):hover {
    color: #2dbb55;
  }

  .loginBox .inputBox .loginNumber,
  .loginBox .inputBox .loginPhoneNumber {
    margin-right: 0;
    text-align: center;
  }

  .loginPhoneNumber > .password {
    width: 228px;
  }

  .loginNumber > span {
    display: block;
    text-align: left;
    text-indent: 40px;
    font: 16px/2 "微软雅黑";
  }

  .verificationCode {
    width: 100px;
    border: 1px solid #ccc;
    font: 12px/3.1 "微软雅黑";
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .goRegister > a {
    display: inline-block;
  }

  .QRCodeImgBox {
    width: 340px;
    margin: 0 auto;
  }

  .QRCodeImgBox > img {
    float: right;
  }

  .QRCodeBox {
    float: left;
    width: 174px;
    height: 174px;
    border: 1px solid #ccc;
    padding: 12px;
    position: relative;
  }

  .sweepSuc,
  .sweepOvertime{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,.9);
  }

  .sweepSuc > i{
    display: block;
    width: 40px;
    height: 40px;
    background: url("../assets/img/sweepSucIcon.png") no-repeat;
    -webkit-background-size:  100% 100%;
    background-size:  100% 100%;
    margin: 40px auto 10px;
  }

  .sweepSuc > strong {
    font: 14px/20px "微软雅黑";
    padding: 0 20px;
    text-align: center;
    display: block;
    color: #999;
  }

  .sweepOvertime > strong {
    font: 14px/20px "微软雅黑";
    margin-top: 60px;
    display: block;
    color: #999;
  }

  .sweepOvertime > a {
    display: block;
    background-color: limegreen;
    width: 80px;
    text-align: center;
    font-size: 14px;
    line-height: 24px;
    font-family: "微软雅黑";
    color: #fff;
    margin: 20px auto 0;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
</style>
