<template>
  <!--首页-->
  <div class="FoodPage">
    <!--顶部logo部分,header-->
    <div class="FoodLogo">
      <!--返回首页-->
      <div class="BackPage">
        <el-carousel indicator-position="outside"  height="400px">

          <el-carousel-item v-for="item,index in topTurnLlist" :key="index" style="cursor: pointer">
            <img width="1200" height="400" v-lazy="item.fd_st_ImageURL" @click="jump(item)">
          </el-carousel-item>

        </el-carousel>
      </div><!--美食天堂Gourmet Paradise-->
    </div>
    <div class="MoreMerchant"><span @click="toMerchantList">更多商家&gt;&gt;</span></div>
    <div class="content">
      <!--推荐美食,aside-->
      <div class="RecommendFood">
        <!--推荐的商家-->
        <div class="RecommendMerchant" v-for="item in RecommendMerchants" @click="jump(item)">
          <!--商家美食图片-->
          <img  alt="" v-lazy="item.fd_gi_GoodImage">
          <!--商家推荐的美食-->
          <div class="MerchantRencomendFood">
            <p style="padding-bottom: 10px;font-size: 16px;font-weight: bold;">{{item.fd_sfp_Name}}</p>
            <p>{{item.fd_sf_ProductName}}</p>
          </div>
        </div>
      </div>
      <!--美食商家,article-->
      <div class="FoodMerchant">
        <!--商家信息-->
        <div class="MerchantCont" v-for="item in RecommendMerchantsShopList" @click="jump(item)">
          <!--商家图片-->
          <img src="" alt="" v-lazy="item.fd_pi_ImageUrl">
          <!--商家描述-->
          <div class="MerchantContDescribe">
            <p style="font-size: 18px;padding: 15px 0;font-weight: bold;">{{item.fd_sf_ProductName}}</p>
            <p>{{item.fd_sf_Introduce}}</p>
          </div>
          <!--进入商家店铺和商家详情的页面-->
          <div class="InMerchant">
            <p><button>查看详情</button></p>
            <p><button>立即预定</button></p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed:mapGetters([
      'RecommendMerchantsShopList',
      'RecommendMerchants',
      'RecommendMerchantsObj',
      'topTurnLlist'
    ]),
    data(){
      return{}
    },
    created(){
      this.init()
    },
    methods:{
      toMerchantList(){
        const {href} = this.$router.resolve({
          name: 'FoodMerchantList',
          params:""
        });
        window.open(href,'_blank')
      },
      //跳转
      jump(item){

         if(item.fd_sfp_Name){
           sessionStorage.setItem('MStitle','美食_'+ item.fd_sfp_Name)

         }else{
           sessionStorage.setItem('MStitle','美食_'+ item.fd_sf_ProductName)
         }
         const {href} = this.$router.resolve({
          name: 'FoodDetail',
          params: {id: item.fd_sf_ID}
        });
        window.open(href, '_blank')
      },
      //首页
      init(page){
        let Recommends={
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
        }
        this.$store.dispatch('initRecommendMerchants',Recommends)
      },
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  .FoodPage {
    width: 100%;
    height: 100%;
    padding-bottom: 30px;
    //顶部Logo部分
    .FoodLogo {
      width: 1200px;
      height: 400px;
      margin: 20px auto;
      /*background-color: hsla(0, 90%, 50%, .5);*/
      font-family: 华文隶书;
      .BackPage {
        width: 1200px;
        height: 400px;
        margin: 20px auto;
      }
    }
    //更多商家
    .MoreMerchant{
      width: 1200px;
      height: 40px;
      margin: 0px auto;
      position: relative;
      font-weight: bold;
      line-height: 40px;
      span{
        position: absolute;
        right: 10px;
        &:hover{
          color: #f00;
          cursor: pointer;
        }
      }
    }
    //内容
    .content {
      width: 1200px;
      /*height: 900px;*/
      margin: 0px auto;
      display: flex;
      overflow: hidden;
      //侧栏=>推荐美食
      .RecommendFood {
        text-align: center;
        width: 200px;
        height: 100%;
        background-color: hsla(0, 100%, 100%, 1);
        //推荐的商家
        .RecommendMerchant {
          width: 180px;
          height: 150px;
          margin: 10px 0px 0px 10px;
          /*background-color: hsla(0, 90%, 90%, .7);*/
          display: flex;
          border-bottom: 1px solid #c8c8c8;
          img {
            width: 100px;
            height: 100px;
            margin: 20px 0px 0px 5px;
            /*background-color: hsla(0,0%,0%,0);*/
          }
          .MerchantRencomendFood{
            margin: 20px 0px 0px 6px;
          }
        }
      }
    }
    //美食商家
    .FoodMerchant {
      width: 1000px;
      height: 100%;
      /*border: 2px solid #c8c8c8;*/
      background-color: hsla(0, 100%, 100%, 1);
      //商家信息
      .MerchantCont {
        width: 960px;
        height: 190px;
        display: flex;
        margin: 30px 0px 0px 20px;
        border-bottom: 2px solid #c8c8c8;
        &:hover{
          border-color: rgba(255,0,0,.3);
        }
        //商家图片
        img{
          width: 180px;
          height: 170px;
          margin: 10px 0px 0px 10px;
        }
        //商家描述
        .MerchantContDescribe{
          margin: 12px 0px 0px 20px;
          width: 600px;
          height: 170px;
          p:nth-of-type(2){
            letter-spacing: 1px;
            text-indent: 2.12em;
            line-height: 20px;
            overflow: hidden;
            text-overflow:ellipsis;
            display: -webkit-box;
             -webkit-box-orient: vertical;
             -webkit-line-clamp: 5;
          }
        }
        //进入商家店铺和商家详情
        .InMerchant{
          margin: 32px 0px 0px 20px;
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
  }
</style>






















