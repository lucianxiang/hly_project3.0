<template>
  <div>
    <div class="UpdatePasswordContent">
      <h4><span></span>密码修改</h4>
      <div class="UpdatePasswordContentDetails">
        <ul class="UpdatePasswordContentDetailsList">
          <li>
            <span>账号:</span>
            <el-input size="small" style="width: 200px" v-model="options.data.ui_UserCode"></el-input>
          </li>
          <li>
            <span>旧密码:</span>
            <el-input size="small" style="width: 200px" type="password" v-model="options.data.oldPassword"></el-input>
          </li>
          <li>
            <span>新密码:</span>
            <el-input size="small" style="width: 200px" type="password" v-model="options.data.newPassword"></el-input>
          </li>
          <li>
            <span>确认新密码:</span>
            <el-input size="small" style="width: 200px" type="password"  v-model="checkPaddword"></el-input>
          </li>
        </ul>
        <div class="UpdatePasswordContentDetailsSubmit">
          <el-button @click="submit">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        checkPaddword:'',
        options:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data":
            {
              "ui_UserCode": "",     //当前用户的账号
              "oldPassword": "",//原来密码
              "newPassword": "",//新密码
            }
        }
      }
    },
    created(){
//      this.id = JSON.parse(sessionStorage.getItem('user'))
    },
    methods: {
      submit(){
        if(this.options.data.newPassword!=this.checkPaddword){
          this.$notify({
            message: '两次输入的密码不一致!',
            type: 'error'
          });
          return
        }
        this.$store.dispatch('UpdateUserPassword',this.options)
        .then((suc)=>{
          sessionStorage.removeItem('user');

          this.$notify({
            message: suc,
            type: 'success'
          });
          const {href} = this.$router.resolve({
            name: 'AdminLogin',
          });
          window.open(href, '_blank')
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      }
    },
  }
</script>
<style scoped>
  .UpdatePasswordContent > h4 {
    font: bold 16px/30px "微软雅黑";
    color: #000;
  }

  .UpdatePasswordContent > h4 > span {
    display: inline-block;
    height: 15px;
    width: 4px;
    background-color: #37c249;
    vertical-align: middle;
    margin-right: 5px;
  }

  .UpdatePasswordContentDetails {
    margin-top: 20px;
  }

  .UpdatePasswordContentDetailsList > li {
    margin-top: 20px;
  }

  .UpdatePasswordContentDetailsList > li > span {
    display: inline-block;
    width: 120px;
    text-align: right;
    margin-right: 20px;
  }

  .UpdatePasswordContentDetailsSubmit {
    margin-top: 30px;
    margin-left: 300px;
  }
</style>
