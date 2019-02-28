<template>
  <div>
    <h1 class="myCode">我的推荐二维码</h1>
    <div class="QRCodeBox">
      <div class="QRCode" ref="ewm"></div>
    </div>
    <p style="padding:20px 0;font-weight: bold;">推广ID:{{user.sm_ui_ID}}</p>
    <p>二维码分享PC地址:</p>
    <p style="padding: 20px;color: #f60">{{id}}</p>
    <!--<a :href="id" style="padding: 20px;color: #f60">{{id}}</a>-->
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        id:'',
        user:{}
      }
    },
    computed: mapGetters([]),
    created(){
     
      this.$nextTick(()=>{
         let user = JSON.parse(sessionStorage.getItem('user'));
         var qrcode = new QRCode(this.$refs.ewm, {
            width: 200,
            height: 200
          });
          if(user){
            this.user = user
            this.id = 'http://hly.1000da.com.cn/#/Register?id='+user.sm_ui_ID
            qrcode.makeCode('http://hly.1000da.com.cn/hlyLogin?id='+user.sm_ui_ID);
          }
      })
     
      
    },
    methods: {},
  }
</script>
<style scoped>
.myCode{
  font-size:20px;
  margin: 20px;
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
