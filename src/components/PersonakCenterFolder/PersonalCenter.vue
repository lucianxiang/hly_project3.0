<template>
  <div>
    <div class="personakCenterWrap">
      <!--头-->
      <div class="personakCenterWrapHeader">
        <div class="personakCenterWrapHeaderContent clearfix">
          <div class="personakCenterWrapHeaderContentLogo" @click="goHomePage">
            <img src="../../assets/img/center.png" width="60" height="60">
            <strong>惠乐游个人中心</strong>
          </div>
          <ul class="personakCenterWrapHeaderContentNav">
            <li>
              <router-link :to="{name:'MyTourOrder'}">会员首页</router-link>
            </li>
            <li>
              <router-link :to="{name:'MyTourOrder'}">个人中心</router-link>
            </li>
          </ul>
          <div class="goHomePage">
            <router-link to="/Comment/agenciesHome">返回首页</router-link>
          </div>
        </div>
      </div>
      <!--内容-->
      <div class="personakCenterContentWrapP">
        <div class="personakCenterContentWrap clearfix">
          <!--左边导航-->
          <div class="personakCenterContentWrapLeftNav">
            <ul>
              <li :class="item.iconClass" v-for="item,index in data">
                <a href="javascript:;" @click="toggle(index)"><strong>{{item.label}}</strong><i></i></a>
                <el-collapse-transition>
                  <ul class="MyOrderDetailsList" v-show="n==index">
                    <li v-for="v in item.children">
                      <router-link :to="{name:v.label.to}">{{v.label.name}}</router-link>
                    </li>
                    <!--<li><a href="javascript:;">旅游订单券</a></li>-->
                  </ul>
                </el-collapse-transition>

              </li>
              <!--<li class="personakCenterType">-->
              <!--<a href="javascript:;"><strong>个人中心</strong><i></i></a>-->
              <!--<ul class="MyOrderDetailsList">-->
              <!--<li>-->
              <!--<router-link :to="{name:'PersonalDataDetails'}">个人资料</router-link>-->
              <!--</li>-->
              <!--<li>-->
              <!--<router-link :to="{name:'UpdatePassword'}">修改密码</router-link>-->
              <!--</li>-->
              <!--&lt;!&ndash;<li><a href="javascript:;">安全设置</a></li>&ndash;&gt;-->
              <!--&lt;!&ndash;<li><a href="javascript:;">密码设置</a></li>&ndash;&gt;-->
              <!--&lt;!&ndash;<li><a href="javascript:;">我的提问</a></li>&ndash;&gt;-->
              <!--</ul>-->
              <!--</li>-->
            </ul>
          </div>
          <div class="personakCenterContentWrapRightContent">
            <router-view name="MyInformtion"></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import PersonalCenter from '@/assets/css/PersonalCenter.css'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        n: 6,
        data: [
          {
          label: '我的订单',
          iconClass: "personakCenterContentWrapLeftNavMyOrder",
          children: [{
            label: {
              name: '旅游订单',
              to: 'MyTourOrder'
            },
          }]
        },
          {
            label: '我的资产',
            iconClass: "personakCenterContentWrapLeftNavCash",
            children: [{
              label: {
                name: '我的积分',
                to: 'MyPoints'
              },
            }, {
              label: {
                name: '我的钱包',
                to: 'MyBalance'
              },
            }]
          },
          {
            label: '个人中心',
            iconClass: "personakCenterType",
            children: [{
              label: {
                name: '个人资料',
                to: 'PersonalDataDetails'
              },
            },
              {
                label: {
                  name: '修改密码',
                  to: 'UpdatePassword'
                },
              },
              {
                label: {
                  name: '收货地址',
                  to: 'ReceivingAddress'
                },
              },
              {
                label: {
                  name: '申请成为供应商',
                  to: 'MerchantRegister'
                },
              },
              {
                label: {
                  name: '我的推荐二维码',
                  to: 'MyTwoCode'
                },
              }
            ]
          },
          {
            label: '常用信息',
            iconClass: "personakCenterType",
            children: [{
              label: {
                name: '游客信息',
                to: 'TouristInfo'
              },
            }]
          },
          {
            label: '常用工具',
            iconClass: "commonTools",
            children: [{
              label: {
                name: '我的收藏',
                to: 'MyCollection'
              },
            }]
          }
        ],
        user:{},
      }
    },
    created(){
      this.user = JSON.parse(sessionStorage.getItem('user'))
      if (!this.user) {
        this.$notify({
          message: '请先登录!',
          type: 'error'
        });
        const {href} = this.$router.resolve({
          name: 'AdminLogin',
        });
        window.open(href, '_blank')
        return
      }
      this.$nextTick(()=>{
        document.title = '惠乐游_个人中心'
      })
    },
    methods: {
      toggle(index){
        if (this.n == index) {
          this.n = 100
        } else {
          this.n = index;
        }
      },
      goHomePage(){
        this.$store.commit('showQuitButton')
        this.$router.go(-1);
        this.$store.commit('setIsLoginShow', this.user.sm_ui_Name);
        this.$router.push({name:'AgenciesHome'})
      }
    },
  }
</script>
<style scoped>
  .commonTools > a {
    background: url("../../assets/img/commonTools.png") no-repeat 35px 10px;
  }
  .personakCenterWrapHeaderContentLogo {
    cursor: pointer;
  }
</style>
