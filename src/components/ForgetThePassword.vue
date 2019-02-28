<template>
  <div id="bgBox">
    <div id="hearder">
      <div class="hearderContent clearfix">
        <router-link to="/"><img src="../assets/img/huileyouLogo.jpg" width="286" height="75"></router-link>
        <strong>找回密码</strong>
      </div>
    </div>
    <div id="content1">
      <div class="forgetThePassworldContent">
        <div class="goLogin">已有账号?
          <router-link to="/AdminLogin">登录</router-link>
        </div>
        <div class="passwordContent">
          <h5>密码找回<i></i></h5>
          <div class="passwordInput">
            <input type="text" placeholder="请输入电话号码" v-model="phone">
            <div class="inputBox">
              <input type="text" placeholder="请输入验证码" v-model="verificationCode">
              <input type="button" :value="getName" @click="getNum">
            </div>
            <input type="password" placeholder="请输入新密码" v-model="newPassword">
            <input type="password" placeholder="确认密码" v-model="repeatNewPassword">
            <button @click="submit">提交</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/public'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        num: 59,
        getName: '获取动态密码',
        phone: '',
        verificationCode: '',
        newPassword: '',
        repeatNewPassword: '',
      }
    },
    methods: {
      //获取动态密码
      getNum() {
        if (typeof this.num == 'number' && this.num != 59) {
          return;
        }
        if (this.phone == '') {
          this.$notify({
            message: '请输入电话号码！！',
            type: 'error'
          });
          return;
        }
        axios.post(getNewStr+'/UserInfo/SendMessage', JSON.stringify({
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "phone": this.phone,
          "sendType": 1
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then((data) => {
            var data = data.data;
            if (Number(data.resultcode) == 200) {
              this.isColor = true;
              let timer = setInterval(() => {
                this.getName = this.num + 's后重新获取'
                this.num--;
                if (this.num == 0) {
                  this.isDisabled = false;
                  this.isColor = false;
                  clearInterval(timer)
                  this.getName = '重新获取';
                  this.num = 59
                }
              }, 1000)
            } else {
              this.$notify({
                message: data.resultcontent,
                type: 'error'
              });
            }
          })
      },
      //找回密码提交
      submit() {
        if( this.newPassword != this.repeatNewPassword ){
          this.$notify({
            message: '两次输入的密码不一致!!!',
            type: 'error'
          })
          return
        }
        let forgetPassword = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "phone": this.phone,//38返回职业
          "validateNo": this.verificationCode,//验证码
          "password": this.newPassword,//新密码
        };
        this.$store.dispatch('nwePassword', forgetPassword)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.$router.push({name:'AdminLogin'})
          },err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      }
    },
    mounted(){
      document.addEventListener('keydown', (e) => {
        if (e.keyCode == 13) {
          this.submit()
        }
      })
    }
  }
</script>
<style scoped>
  #hearder {
    width: 100%;
    background-color: #fff;
    padding: 10px 0;
    border-bottom: 3px solid #2dbb55;
  }

  .hearderContent {
    width: 1200px;
    margin: 0px auto;
  }

  .hearderContent > a {
    float: left;
    border-right: 1px solid #ccc;
    padding-right: 10px;
  }

  .hearderContent > strong {
    float: left;
    font: 30px/1 "微软雅黑";
    margin: 40px 0 0 20px;
  }

  #content1{
    position: absolute;
    top: 99px;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    width: 100%;
    background: url("../assets/img/register_bg.jpg") no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    padding-bottom: 20px;
  }

  .goLogin {
    font: 14px/2 "微软雅黑";
    padding: 20px 0;
    color: #fff;
    text-align: right;
  }

  .goLogin > a {
    display: inline-block;
    color: #fff;
    border: 1px solid #fff;
    padding: 0 20px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .forgetThePassworldContent {
    width: 1200px;
    margin: 0 auto;
  }

  .passwordContent {
    width: 1200px;
    margin: 0 auto;
  }

  .passwordContent > h5 {
    font: 20px/3 "微软雅黑";
    background-color: #2dbb55;
    text-align: center;
    color: #fff;
    position: relative;
  }

  .passwordContent > h5 i {
    position: absolute;
    bottom: -30px;
    left: 50%;
    border-top: 15px solid #2dbb55;
    border-left: 5px solid transparent;
    border-bottom: 15px solid transparent;
    border-right: 5px solid transparent;
    transform: translateX(-50%);
  }

  .passwordInput {
    padding: 50px 0;
    width: 100%;
    background-color: #fff;
    text-align: center;
  }

  .inputBox > input {
    font: 14px/2 "微软雅黑";
  }

  .inputBox > input:nth-of-type(1) {
    width: 170px;
  }

  .inputBox > input:nth-of-type(2) {
    width: 125px;
    background-color: #fff;
    color: #666;
  }

  .passwordInput > * {
    display: block;
    margin: 10px auto 0;
    font: 14px/2 "微软雅黑";
    width: 300px;
  }

  .passwordInput input {
    outline: none;
    border: 1px solid #ccc;
    text-align: center;
    padding: 5px 10px;
    -webkit-border-radius: 24px;
    -moz-border-radius: 24px;
    border-radius: 24px;
  }

  .passwordInput > button {
    padding: 5px 0;
    border: 1px solid #ccc;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    background-color: #f80;
    color: #fff;
    outline: none;
  }
</style>
