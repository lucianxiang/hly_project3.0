<template>
  <div>

    <!--<div>-->
    <!--原数据： <el-input v-model="d1" placeholder="请输入内容"></el-input>-->
    <!--<el-button type="primary" @click="jiami" plain>加密</el-button>-->
    <!--<el-button type="primary" @click="jiemi" plain>解密</el-button>-->

    <!--加密数据： <el-input v-model="d2" placeholder="请输入内容"></el-input>-->

    <!--</div>-->

    <section class="commentTop">
      <!--Top导航-->
      <div class="operationNav">
        <div class="operationNavContent clearfix">
          <ul class="loginList">
            <li v-show="!user.isLoginShow && !loginName">
              <a href="javascript:;" @click="login">登录</a>
              <!--<router-link to="/adminLogin">登录</router-link>-->
            </li>
            <li>
              <router-link to="/Register">会员注册</router-link>
            </li>
            <!--<li>-->
            <!--<router-link to="/MerchantRegister">供应商注册</router-link>-->
            <!--</li>-->
            <!--<li>-->
            <!--<router-link to="/agents">代理商注册</router-link>-->
            <!--</li>-->
            <li v-show="user.isLoginShow || loginName">
              <a href="javascript:;" style="color: #f60;"
                 @click="toPersonalCenter">欢迎您:{{user.name ? user.name : loginName}}</a>
            </li>
            <li class="AdminLoginList">
              <a href="javascript:;">管理员登录</a>
              <ul>
                <!--<li><a href="http://hly.1000da.com.cn/user/#/" target="view_window">惠乐游后台管理系统</a></li>-->
                <li><a href="http://hly.1000da.com.cn/supplier/index.html" target="view_window">供应商管理系统</a></li>
                <!--<li><a href="http://tuniu.1000da.com.cn/agents" target="view_window">代理商管理系统</a></li>-->
                <li><a href="http://hly.1000da.com.cn/admin/index.html" target="view_window">惠乐游管理系统</a></li>
              </ul>
            </li>
            <li v-show="user.isLoginShow || loginName">
              <a href="javascript:;" @click="Quit">退出</a>
            </li>
          </ul>
        </div>
      </div>
      <!--TitleLogoAndQuery-->
      <div class="logoAndQuery">
        <div class="logoAndQueryContent clearfix">
          <!--图标-->
          <div class="websiteLogo">
            <a href="javascript:;">
              <img src="../../assets/img/huileyouLogo.jpg" alt="" width="230" height="60">
            </a>
          </div>
          <!--搜索框-->
          <div class="queryBox">
            <div class="queryAllType">
              <a href="javascript:;">{{smSiName}}<i></i></a>
              <ul class="queryAllTypeList">
                <li v-for="item,index in newNavList" @click="changeTaualType(item,index)">
                  <a href="javascript:;">{{item.name}}</a>
                </li>
              </ul>
            </div>
            <div class="queryTextInput">
              <input type="text" placeholder="马尔代夫" v-model="searchName">
              <div class="localRecommend">
                <a href="javascript:;" v-for="item in arr" @click="searchAll(item)">{{item}}</a>
              </div>
            </div>
            <div class="searchHistory">
              <div>
                <div class="latelySearch clearfix">
                  <strong>您最近在搜索</strong>
                  <a href="javascript:;" @click="clearHistory">
                    <i></i>
                    <span>清空记录</span>
                  </a>
                </div>
                <div class="historicalRecords clearfix">
                  <a
                    href="javascript:;"
                    v-for="item,index in searchArr"
                    @click="changeHistory(item)"
                  >{{item}}</a>
                </div>
              </div>
              <div>
                <strong>热门目的地</strong>
                <div class="historicalRecords clearfix">
                  <a
                    href="javascript:;"
                    v-for="item,index in hotAgenciesCityList"
                    @click="toHeelTourSearchMore(item)"
                  >{{item.sm_af_AreaName}}</a>
                </div>
              </div>
              <div>
                <strong>出境长线</strong>
                <div class="historicalRecords clearfix">
                  <a
                    href="javascript:;"
                    v-for="item,index in outLongAreaList"
                    @click="toHeelTourSearchMoreOutLong(item)"
                  >{{item.ts_gi_Name}}</a>
                </div>
              </div>
              <div>
                <strong>出境短线</strong>
                <div class="historicalRecords clearfix">
                  <a
                    href="javascript:;"
                    v-for="item,index in outShortAreaList"
                    @click="toHeelTourSearchMoreOutLong(item)"
                  >{{item.ts_gi_Name}}</a>
                </div>
              </div>
              <div>
                <strong>国内跟团</strong>
                <div class="historicalRecords clearfix">
                  <a
                    href="javascript:;"
                    v-for="item,index in contryAreaList"
                    @click="toHeelTourSearchMoreOutLong(item)"
                  >{{item.ts_gi_Name}}</a>
                </div>
              </div>
              <div>
                <strong>周边跟团</strong>
                <div class="historicalRecords clearfix">
                  <a
                    href="javascript:;"
                    v-for="item,index in nearAreaList"
                    @click="toHeelTourSearchMoreOutLong(item)"
                  >{{item.ts_gi_Name}}</a>
                </div>
              </div>
            </div>
            <div class="queryButton" @click="searchAll('')">
              <button></button>
            </div>
          </div>
          <!--客服-->
          <div class="customerService clearfix">
            <a href="javascript:;">
              <!--欢迎使用-->
              <!--<span>在线客服</span>-->
              <span></span>
            </a>
            <span>
              24h客户服务电话
              <strong>173-0908-1513</strong>
            </span>
            <em></em>
          </div>
        </div>
      </div>
      <!--主导航-->
      <div class="mainNavWrap">
        <nav class="mainNavWrapContent">
          <ul class="mainNavWrapContentList  clearfix" ref="mainNavWrapContentList">
            <li v-for="item,index in navList" @click="clickMainNavWrapContent(index,item)"
                :class="{active:index==n}">
              <router-link :to="item.to">{{item.name}}</router-link>
            </li>
            <!--<li>-->
              <!--<a href="http://hly.1000da.com.cn/vMovie/index.html" target="_blank">微电影</a>-->
            <!--</li>-->
            <!--<li>-->
              <!--<a href="http://hly.1000da.com.cn/education/index.html" target="_blank">教育</a>-->
            <!--</li>-->
          </ul>
        </nav>
      </div>
    </section>

    <div class="FixedComment" v-show="showFixedComment">

      <ul class="FixedCommentTop">

        <li class="App">

          <a href="javascript:;"></a>

          <img src="../../assets/img/APPImage.png" width="274" height="310">

        </li>

        <li class="goLogin">

          <a href="javascript:;"></a>
          <a href="javascript:;" @click="toLogin">前往登录</a>
          <!--<router-link to="/adminLogin">前往登录</router-link>-->
        </li>

        <li class="myFocusOn">

          <a href="javascript:;"></a>

          <router-link to="/personalCenter/myCollection">我的关注</router-link>

        </li>

        <li class="myOrder">

          <a href="javascript:;"></a>

          <router-link to="/personalCenter/myTourOrder">我的订单</router-link>

        </li>

        <li class="myGiftCertificates">

          <a href="javascript:;"></a>

          <router-link to="/404">我的礼券</router-link>

        </li>

        <li class="messageToRemind">

          <a href="javascript:;"></a>

          <router-link to="/404">消息提醒</router-link>

        </li>

        <li class="onlineCustomerService">

          <a href="javascript:;"></a>

          <router-link to="/404">在线客服</router-link>

        </li>

      </ul>

      <ul class="FixedCommentBottom">

        <li class="askTicketSurvey">

          <a href="javascript:;"></a>

          <router-link to="/404">问券调查</router-link>

        </li>

        <li class="opinionSuggestion">

          <a href="javascript:;"></a>

          <router-link to="/404">意见建议</router-link>

        </li>

        <li class="goTop" v-show="isTop">

          <a href="javascript:;" @click="goTop"></a>

          <a href="javascript:;" @click="goTop">返回顶部</a>

        </li>

      </ul>

    </div>
    <keep-alive>
      <router-view name="User"></router-view>
    </keep-alive>
    <!--底部-->
    <footer>
      <!--服务类型-->
      <div class="serviceType clearfix">
        <!--去旅游-->
        <dl class="goTourism">
          <dt><i></i>去旅游</dt>
          <dd v-for="item,index in goTourismList"><a href="javascript:;" @click="goErrorPage">{{item}}</a></dd>
        </dl>
        <!--寻优惠-->
        <dl class="seekPreferentialTreatment">
          <dt><i></i>寻优惠</dt>
          <dd><a href="javascript:;" @click="goErrorPage">特卖</a></dd>
          <dd><a href="javascript:;" @click="goErrorPage">订酒店 返现金</a></dd>
          <dd><a href="javascript:;" @click="goErrorPage">积分商城</a></dd>
          <dd><a href="javascript:;" @click="goErrorPage">银行特惠游</a></dd>
        </dl>
        <!--看攻略-->
        <dl class="lookAtTheOffensive">
          <dt><i></i>看攻略</dt>
          <dd><a href="javascript:;" @click="goErrorPage">攻略</a></dd>
          <dd><a href="javascript:;" @click="goErrorPage">惠乐游风向标</a></dd>
          <dd><a href="javascript:;" @click="goErrorPage">游记</a></dd>
          <dd><a href="javascript:;" @click="goErrorPage">达人玩法</a></dd>
        </dl>
        <!--查服务-->
        <dl class="lookupService">
          <dt><i></i>查服务</dt>
          <dd><a href="javascript:;" @click="goErrorPage">帮助中心</a></dd>
          <dd><a href="javascript:;" @click="goErrorPage">会员俱乐部</a></dd>
          <dd><a href="javascript:;" @click="goErrorPage">阳光保障</a></dd>
          <dd><a href="javascript:;" @click="goErrorPage">火车时刻表</a></dd>
          <dd><a href="javascript:;" @click="goErrorPage">航班查询</a></dd>
        </dl>
        <!--惠乐游APP-->
        <div class="huiLeYouApp">
          <strong><i></i>惠乐游APP</strong>
          <span>扫描下载惠乐游APP</span>
          <!--<img src="../../assets/img/huiLeYouAppQRCode.png" width="80" height="80">-->
        </div>
      </div>
      <!--关于服务-->
      <div class="aboutService">
        <a href="javascript:;" @click="goErrorPage">
          <span>
            <em>客户服务电话（免长途费）</em>
            <em>***</em>
          </span>
        </a>
      </div>
      <!--底部内容-->
      <div class="footerContent">
        <!--图片列表-->
        <!--<div class="footerImageList clearfix">-->
        <!--<a href="javascript:;"><img src="../../assets/img/tn_footer_042.jpg" width="238" height="58"></a>-->
        <!--<a href="javascript:;"><img src="../../assets/img/tn_footer_06.jpg" width="238" height="58"></a>-->
        <!--<a href="javascript:;"><img src="../../assets/img/superFreeLine.jpeg" width="238" height="58"></a>-->
        <!--<a href="javascript:;"><img src="../../assets/img/integralMall.jpeg" width="238" height="58"></a>-->
        <!--</div>-->
        <!--高品质跟团游img-->
        <!--<div class="footerImageBox">-->
        <!--<a href="javascript:;"><img src="../../assets/img/superiorQuality.jpeg" width="988" height="58"></a>-->
        <!--</div>-->
        <!--信息-->
        <div class="abouthuiLeYouInformation">
          <p>
            惠乐游客服中心位于*** 来电显示为 *** 、*** 、*** 、*** 、*** 、*** 或 ***</p>
          <p>***，旅行社业务经营许可证编号：***　　***，旅行社业务经营许可证编号：***</p>
          <div class="aboutWe">
            <a href="javascript:;" @click="goErrorPage">关于我们</a>
            <a href="javascript:;" @click="goErrorPage">Investor Relations</a>
            <a href="javascript:;" @click="goErrorPage">联系我们</a>
            <a href="javascript:;" @click="goErrorPage">投诉建议</a>
            <a href="javascript:;" @click="goErrorPage">广告服务</a>
            <a href="javascript:;" @click="goErrorPage">旅游券</a>
            <a href="javascript:;" @click="goErrorPage">隐私保护</a>
            <a href="javascript:;" @click="goErrorPage">免责声明</a>
            <a href="javascript:;" @click="goErrorPage">旅游度假资质</a>
            <a href="javascript:;" @click="goErrorPage">主题旅游</a>
            <a href="javascript:;" @click="goErrorPage">用户协议</a>
            <a href="javascript:;" @click="goErrorPage">网站地图</a>
            <a href="javascript:;" @click="goErrorPage">UEIP</a>
            <a href="javascript:;" @click="goErrorPage">帮助中心</a>
          </div>
          <!--营业执照-->
          <p class="businessLicense">
            <strong>Copyright © 2006-2018</strong>
            <a href="javascript:;" @click="goErrorPage">科技有限公司</a>
            <a href="javascript:;" @click="goErrorPage">HuiLeYou.com</a>|
            <a href="javascript:;" @click="goErrorPage">营业执照</a>
            <a href="javascript:;" @click="goErrorPage">ICP证：***</a>
            <a href="javascript:;" @click="goErrorPage">***</a>
            <a href="javascript:;" @click="goErrorPage">成都旅游网</a>
          </p>
          <!--供应商合作-->
          <div class="supplierCooperation">
            <a href="javascript:;"><img src="../../assets/img/footer_1.jpg" width="175" height="38"></a>
            <a href="javascript:;"><img src="../../assets/img/IndependentTravel.png" width="175" height="38"></a>
            <a href="javascript:;"><img src="../../assets/img/bottom.jpg" width="175" height="38"></a>
          </div>
          <!--旅游保障-->
          <!--<div class="tourismSecurity">-->
          <!--<a href="javascript:;"><img src="../../assets/img/chengxinOne.png" width="113" height="41"></a>-->
          <!--<a href="javascript:;"><img src="../../assets/img/buliang.png" width="109" height="47"></a>-->
          <!--<a href="javascript:;"><img src="../../assets/img/wangluo.png" width="110" height="47"></a>-->
          <!--<a href="javascript:;"><img src="../../assets/img/cata.png" width="110" height="47"></a>-->
          <!--<a href="javascript:;"><img src="../../assets/img/CouncilMembers.png" width="110" height="47"></a>-->
          <!--<a href="javascript:;"><img src="../../assets/img/3acomp.png" width="110" height="47"></a>-->
          <!--<a href="javascript:;"><img src="../../assets/img/chengxin.png" width="110" height="47"></a>-->
          <!--<a href="javascript:;"><img src="../../assets/img/ebsIcon.png" width="32" height="47"></a>-->
          <!--<a href="javascript:;"><img src="../../assets/img/pata.png" width="140" height="47"></a>-->
          <!--</div>-->
        </div>
      </div>
    </footer>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import '@/assets/css/comment.css'
  import {postPromise, getNewStr} from '@/assets/public'

  //AES加密解密
  import {Decrypt, Encrypt} from '@/assets/js/crypto'

  export default {
    name: '',
    computed: Object.assign({
      newNavList() {
        return this.navList.slice(0, 3)
      }
    }, mapGetters([
//        'navList',
      'lineScheduleObj',
      'isLoading',
      'showFixedComment',
      'user',
      'hotAgenciesCityList',
      'outLongAreaList',
      'outShortAreaList',
      'contryAreaList',
      'nearAreaList'
    ])),
    data() {
      return {
        navList: [
          {
            name: '跟团游',
            to: '/Comment/AgenciesHome'
          },
          {
            name: '酒店',
            to: '/Comment/HotelHomePage'
          },
          {
            name: '门票',
            to: '/Comment/AdmissionTicketHomePage'
          },
          {
            name: '美食',
            to: '/Comment/foodHome'
          },
//          {
//            name: '用车',
//            to: '/Comment/rentalCar'
//          }
        ],
        isTop: false,
        arr: ['日本', '三亚', '泰国'],
        showQuit: false,
        n: 0,
//        isLoginShow: false,
        isLogin: true,
        getName: '获取动态验证码',
        smSiName: '所有产品',
        isShowMask: false,
        UserLoadingShow: true,
        UserRegisterBoxShow: false,
        isDisabled: false,
        loginName: '',
        mainNavWrapContentList: [
          {
            name: '跟团游',
            to: '/Comment/AgenciesHome'
          },
          {
            name: '酒店',
            to: '/Comment/HotelHomePage',
            isOff: true
          },
          {
            name: '门票',
            to: '/Comment/AdmissionTicketHomePage',
          },
          {
            name: '美食',
            to: '/Comment/foodHome'
          },
//          {
//            name: '用车',
//            to: '/Comment/rentalCar'
//          },
        ],
        CityId: '',//当前位置城市ID
        goTourismList: [
          '跟团游',
          '牛人专线',
          '酒店',
          '自由行',
          '亲子游',
          '门票',
          '酒+景',
          '蜜月游',
          '邮轮',
          '公司旅游',
          '海岛游',
          '签证',
          '当地玩乐',
          '老于推荐',
          '机票',
          '首付出发',
          '机票+酒店',
          '旅拍'
        ],
        //搜索
        searchObj: {},
        searchName: '',//搜索名称
        d1: '',
        d2: '',
        searchArr: [],
        provinceID:''
      }
    },
    watch: {
      '$route'(to, from) {
        console.log(from)
      }
    },
    created() {
      let arr1 = JSON.parse(localStorage.getItem('searchArr'));
      if(arr1){
        this.searchArr = arr1
      }
      let href = window.location.href
      if (href.toLocaleLowerCase().includes('hotel')) {
        sessionStorage.setItem('commentNavNum', 1);
      } else if (href.toLocaleLowerCase().includes('ticket')) {
        sessionStorage.setItem('commentNavNum', 2);
      } else if (href.toLocaleLowerCase().includes('agencies')) {
        sessionStorage.setItem('commentNavNum', 0);
      }
      let user = JSON.parse(sessionStorage.getItem('user'));
      let username = localStorage.getItem('username')
      let password = localStorage.getItem('password')
      if (user && username) {
        this.showQuit = true;
        var InformetionObj = JSON.parse(sessionStorage.getItem('user'))
        this.isLogin = false;
        this.$store.commit('setIsLoginShow', InformetionObj.sm_ui_Name)
//        this.isLoginShow = true;
        this.loginName = InformetionObj.sm_ui_Name
      } else {
//        this.login(username,password)
      }
//      let selectTypeObj = JSON.parse(sessionStorage.getItem('selectTypeObj'))
//      if(selectTypeObj){
//        this.smSiName = selectTypeObj.name;
//        this.searchObj = selectTypeObj;
//      }
      if (localStorage.getItem('username') && localStorage.getItem('password')) {
        let userID = localStorage.getItem('username')
        let password = localStorage.getItem('password')
        this.loginSubmit(userID, password);
      }
      this.initData();
      //判断右边导航是否隐藏
      this.n = JSON.parse(sessionStorage.getItem('commentNavNum'));
      if (this.n == 1) {
        this.$store.commit('hideShowFixedComment')
      } else {
        this.$store.commit('showShowFixedComment')
      }
      sessionStorage.setItem('indexNumber', 0);

    },
    watch: {
      '$route'(to, from) {
        document.title = '全域惠乐游'
        let str = to.path;

//        console.log(to,from)
//        if (str.toLocaleLowerCase().includes('hotel')) {
//          sessionStorage.setItem('commentNavNum', 2);
//          window.location.reload()
//        } else if (str.toLocaleLowerCase().includes('ticket')) {
//          sessionStorage.setItem('commentNavNum', 1);
//          window.location.reload()
//        } else if (str.toLocaleLowerCase().includes('agencies')) {
//          sessionStorage.setItem('commentNavNum', 0);
//          window.location.reload()
//        } else if (str.toLocaleLowerCase().includes('car')) {
//          sessionStorage.setItem('commentNavNum', 4);
//          window.location.reload()
//        }else if (str.toLocaleLowerCase().includes('food')) {
//          sessionStorage.setItem('commentNavNum', 3);
//          window.location.reload()
//        }
      }
    },
    methods: {
      initHotData() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "provice": JSON.parse(sessionStorage.getItem('addComp')).province,
          "flag": "0"
        };
        this.$store.dispatch('initAllHomeData', options);
      },
      changeHistory(item) {
        this.searchName = item;
      },
      //清空搜索记录
      clearHistory() {
        this.searchArr = [];
        localStorage.setItem('searchArr', JSON.stringify(this.searchArr))
      },

      //热门目的地到跟团游列表
      toHeelTourSearchMore(item){
        const {href} = this.$router.resolve({
          name: 'HeelTourSearchMore',
          query: {keycode:item.sm_af_AreaName}
        });
        window.open(href, '_blank')
      },
      toHeelTourSearchMoreValue(cityName){
        const {href} = this.$router.resolve({
          name: 'HeelTourSearchMore',
          query: {keycode:cityName}
        });
        window.open(href, '_blank')
      },
      //出境长线到跟团游列表
      toHeelTourSearchMoreOutLong(item){
        const {href} = this.$router.resolve({
          name: 'HeelTourSearchMore',
          query: {keycode: item.ts_gi_Name}
        });
        window.open(href, '_blank')
      },


      loginSubmit(username, password) {
        var GetValidateByPassword = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "userID": username,
          "password": password
        }

        axios.post(getNewStr + '/UserInfo/Login', JSON.stringify(GetValidateByPassword), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data => {
            var data = data.data;
            if (Number(data.resultcode) == 200) {
              sessionStorage.setItem('user', JSON.stringify(data.data))
              this.$store.commit('showQuitButton')
              this.$store.commit('setIsLoginShow', data.data.sm_ui_Name)
            } else {
              this.$notify({
                message: data.resultcontent,
                type: 'error'
              });
            }
          })
      },
      login(username, password) {
        var GetValidateByPassword = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "userID": username,
          "password": password
        }

        axios.post(getNewStr + '/UserInfo/Login', JSON.stringify(GetValidateByPassword), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data => {
            var data = data.data;
            if (Number(data.resultcode) == 200) {
              localStorage.setItem('username', this.loginOptions.loginNumber)
              localStorage.setItem('password', this.loginOptions.password)
              sessionStorage.setItem('user', JSON.stringify(data.data))
              this.$store.commit('setIsLoginShow', data.data.sm_ui_Name)
            } else {
              this.$notify({
                message: data.resultcontent,
                type: 'error'
              });
            }
          })
      },
      jiami() {
        console.log("加密-----", this.d1);
        let dd = Encrypt(this.d1)
        console.log(dd)
        this.d2 = dd
      },
      jiemi() {
        console.log("解密-----", this.d2);
        this.d1 = Decrypt(this.d2)
      },
      toLogin() {
        const {href} = this.$router.resolve({
          name: 'AdminLogin',
        });
        window.open(href, '_blank')
      },
      //go404
      goErrorPage() {
        const {href} = this.$router.resolve({
          name: '404',
        });
        window.open(href, '_blank')
      },
      //登录
      login() {
//        this.$router.push({name:'AdminLogin'})
        const {href} = this.$router.resolve({
          name: 'AdminLogin',
        });
        console.log(href)
        window.open(href, '_blank')
      },
      clickMainNavWrapContent(index, item) {
        if (item) {
          this.toTab(item, index)
        } else {
          this.toTab('', index)
        }

      },
      //退出
      Quit() {
        //删除用户sessionStorage
        let user = JSON.parse(sessionStorage.getItem('user'))
        if (!user) {
          this.$store.commit('hideQuitButton')
          return
        }
        sessionStorage.removeItem('user');
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        window.location.reload()
      },
      initData() {
        //导航套自导航
//        var getSystemMenuInfo = {
//          "loginUserID": "huileyou",
//          "loginUserPass": "123",
//          "isDelete": 0
//        }
////        this.$store.commit('showLoading')
//        this.$store.dispatch('initNavList', getSystemMenuInfo)
//        .then(() => {
////          this.$store.commit('hideLoading')
//        })

      },
//      //获取当前所在城市
//      getCity(){
//        return new Promise((relove, reject) => {
//          $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip=' + returnCitySN["cip"], () => {
//            relove(remote_ip_info.city + '市')
//          })
//        })
//      },
      getCity() {
        return new Promise((relove, reject) => {
          this.$store.commit('showLoading')
          this.$store.commit('setText', '获取当前位置中!请稍后...');
          var geolocation = new BMap.Geolocation();
// 创建地理编码实例
          var myGeo = new BMap.Geocoder();
          geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              var pt = r.point;
// 根据坐标得到地址描述
              myGeo.getLocation(pt, function (result) {
                if (result) {
                  var addComp = result.addressComponents;
                  sessionStorage.setItem('addComp', JSON.stringify(addComp))
                  relove(addComp.city)
                }
              });
            }
          });
        })
      },
      getCityID(cityName) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "CityName": cityName
        };
        return postPromise(getNewStr + '/HotelWebPage/SelectCity', options)
      },
      //选择旅游类型
      changeTaualType(obj, index) {
        let addComp = JSON.parse(sessionStorage.getItem('addComp'))
        obj.index = index;
        this.searchObj = obj;
        sessionStorage.setItem('selectTypeObj', JSON.stringify(obj))
        switch (obj.name) {
          case '酒店':
            if (addComp) {
              this.getCityID(addComp.city).then(data => {
                var data = JSON.parse(data);
                if (Number(data.resultcode) == 200) {
                  this.CityId = data.CityId
                } else {
                }
              })
            } else {
              this.getCity().then(cityName => {
                this.$store.commit('hideLoading')
                this.$store.commit('setText', '拼命加载中');
                this.getCityID(cityName).then(data => {
                  var data = JSON.parse(data);
                  if (Number(data.resultcode) == 200) {
                    this.CityId = data.CityId
                  } else {
                  }
                })
              });
            }
            break;
          case '门票':
            if (addComp) {
              console.log(addComp)
              this.getCityID(addComp.province).then(data => {
                var data = JSON.parse(data);
                if (Number(data.resultcode) == 200) {
                  this.provinceID = data.CityId
                } else {
                }
              })
            } else {
              this.getCity().then(cityName => {
                this.$store.commit('hideLoading')
                this.$store.commit('setText', '拼命加载中');
                this.getCityID(cityName).then(data => {
                  var data = JSON.parse(data);
                  if (Number(data.resultcode) == 200) {
                    this.CityId = data.CityId
                  } else {
                  }
                })
              });
            }

            break;
        }
        this.smSiName = obj.name;
      },
      //跳转个人中心
      toPersonalCenter() {
        const {href} = this.$router.resolve({
          name: 'MyTourOrder',
        });
        window.open(href, '_blank')
//        setTimeout(() => {
//          window.location.reload()
//        }, 100)
      },
      //返回顶部
      goTop() {
        this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (this.scroll > 300) {
          let timer = setInterval(() => {
//            $(document).scrollTop($(document).scrollTop() - 100)
            document.documentElement.scrollTop = this.scroll-100
            if (this.scroll <= 0) {
              clearInterval(timer)
            }
          }, 10)
          this.isTop = false
        }
      },
      toTab(item, index) {
        let commentNavNum = JSON.parse(sessionStorage.getItem('indexNumber'));
        sessionStorage.setItem('commentNavNum', index);
        this.n = JSON.parse(sessionStorage.getItem('commentNavNum'));
        if (item) {
          if (item.isOff) {
            this.$store.commit('hideShowFixedComment')
          } else {
            this.$store.commit('showShowFixedComment')
          }
        }
      },
      //模糊搜索
      searchAll(name) {
        if (this.searchName&&this.searchArr) {
          this.searchArr = this.searchArr.filter(item=>{
            if(item==this.searchName){
              return false
            }
            return true
          })
          this.searchArr.unshift(this.searchName);
          localStorage.setItem('searchArr', JSON.stringify(this.searchArr))
        }
        if (!this.searchName && !name) {
          const {href} = this.$router.resolve({
            name: 'HeelTourSearchMore',
            query: {keycode: this.searchName}
          });
          window.open(href, '_blank')
          return
        } else {
          if (this.searchObj.index) {
            this.toTab(this.searchObj, this.searchObj.index)
          }
          switch (this.searchObj.name) {
            case '酒店':
              if (name) {
                const {href} = this.$router.resolve({
                  name: 'HotelSearchMore',
                  query: {keycode: name, cityId: ''}
                });
                window.open(href, '_blank')
              } else {
//                this.CityId
                const {href} = this.$router.resolve({
                  name: 'HotelSearchMore',
                  query: {keycode: this.searchName, cityId: ''}
                });
                window.open(href, '_blank')
              }
              break;
            case '门票':
              if (name) {
                const {href} = this.$router.resolve({
                  name: 'AdmissionTicketMore',
                  query: {proviceID: this.provinceID, keycode: name}
                });
                window.open(href, '_blank')
              } else {
                const {href} = this.$router.resolve({
                  name: 'AdmissionTicketMore',
                  query: {proviceID: this.provinceID, keycode: this.searchName}
                });
                window.open(href, '_blank')
              }
              break;
            case '跟团游':
              if (name) {
                const {href} = this.$router.resolve({
                  name: 'HeelTourSearchMore',
                  query: {keycode: name}
                });
                window.open(href, '_blank')
              } else {
                const {href} = this.$router.resolve({
                  name: 'HeelTourSearchMore',
                  query: {keycode: this.searchName}
                });
                window.open(href, '_blank')
              }
              break;
            default:
              if (name) {
                const {href} = this.$router.resolve({
                  name: 'HeelTourSearchMore',
                  query: {keycode: name}
                });
                window.open(href, '_blank')
              } else {
                const {href} = this.$router.resolve({
                  name: 'HeelTourSearchMore',
                  query: {keycode: this.searchName}
                });
                window.open(href, '_blank')
              }
          }
          setTimeout(() => {
            window.location.reload()
          }, 100);
          return
        }
//        if(this.searchObj.index){
//          this.toTab(this.searchObj,this.searchObj.index)
//        }
      },
      menu() {
        this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (this.scroll < 300) {
          this.isTop = false;
        } else {
          this.isTop = true;
        }
      },
      initCity() {
        return new Promise((relove, reject) => {
          this.$store.commit('showLoading')
          this.$store.commit('setText','获取当前位置中!请稍后...');
          if(returnCitySN.cname.indexOf('省')){
            let n = returnCitySN.cname.indexOf('省')+1;
            let obj = {
              province:returnCitySN.cname.substring(0,n),
              city:returnCitySN.cname.substring(n)
            }
            function sa(result) {
              var cityName = result.name;
              obj.city = cityName;
              sessionStorage.setItem('addComp', JSON.stringify(obj))
              relove(obj.province)
            } //map.setCenter(cityName); console.log
            var myCity = new BMap.LocalCity();
            myCity.get(sa);
          }
        })
      },
    },

    mounted() {
      if (this.scroll < 300) {
        this.isTop = false;
      } else {
        this.isTop = true;
      }
      window.addEventListener('scroll', this.menu)

      let addComp = JSON.parse(sessionStorage.getItem('addComp'));
      if(!addComp){
        this.initCity()
        .then(name => {
          this.$store.commit('hideLoading')
//          this.initHotData();
        })
      }else{
//        this.initHotData();
      }
    },
  }
</script>
<style scoped>
  .active {
    background-color: orange;
  }

  .active a {
    color: #fff;
  }

  .FixedComment {
    width: 40px;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    background-color: #000;
    z-index: 999;
  }

  .FixedComment li {
    position: relative;
    overflow: hidden;
  }

  .FixedComment li > a:first-of-type {
    height: 40px;
    background-image: url("../../assets/img/rc_icon_all.png");
    background-repeat: no-repeat;
    border-top: 1px solid #3c3c3c;
  }

  .FixedComment li > a:nth-of-type(2) {
    position: absolute;
    right: 50px;
    top: 0;
    transition: .3s linear;
    width: 100px;
    text-align: center;
    font: 16px/40px "微软雅黑";
    color: #ff8800;
    background-color: #333333;
    border-left: 4px solid #ff8800;
    box-sizing: content-box;
    opacity: .1;
  }

  .FixedCommentTop > .App > a {
    background-position: 6px 14px;
  }

  .FixedCommentTop {
    margin-top: 100px;
  }

  .FixedComment li:hover > a:nth-of-type(2) {
    right: 39px;
    opacity: 1;
  }

  .FixedComment li:hover {
    overflow: visible;
  }

  .FixedCommentTop > .App:hover > a {
    background-position: -62px 14px;
  }

  .FixedCommentTop > .App:hover > img {
    right: 40px;
    opacity: 1;
  }

  .FixedCommentTop > .App > img {
    position: absolute;
    right: 50px;
    top: 0px;
    transition: .3s linear;
    opacity: .1;
  }

  .FixedCommentTop > .goLogin > a:first-of-type {
    background-position: 5px -36px;
  }

  .FixedCommentTop > .goLogin:hover > a:first-of-type {
    background-position: -64px -36px;
  }

  .FixedCommentTop > .myFocusOn > a:first-of-type {
    background-position: 6px -97px;
  }

  .FixedCommentTop > .myFocusOn:hover > a:first-of-type {
    background-position: -61px -97px;
  }

  .FixedCommentTop > .myOrder > a:first-of-type {
    background-position: 8px -224px;
  }

  .FixedCommentTop > .myOrder:hover > a:first-of-type {
    background-position: -61px -224px;
  }

  .FixedCommentTop > .myGiftCertificates > a:first-of-type {
    background-position: 10px -288px;
  }

  .FixedCommentTop > .myGiftCertificates:hover > a:first-of-type {
    background-position: -58px -288px;
  }

  .FixedCommentTop > .messageToRemind > a:first-of-type {
    background-position: 8px -785px;
  }

  .FixedCommentTop > .messageToRemind:hover > a:first-of-type {
    background-position: -60px -785px;
  }

  .FixedCommentTop > .onlineCustomerService > a:first-of-type {
    background-position: 8px -728px;
  }

  .FixedCommentTop > .onlineCustomerService:hover > a:first-of-type {
    background-position: -60px -728px;
  }

  .FixedCommentBottom {
    margin-top: 100px;
  }

  .FixedCommentBottom > .askTicketSurvey > a:first-of-type {
    background-position: 8px -846px;
  }

  .FixedCommentBottom > .askTicketSurvey:hover > a:first-of-type {
    background-position: -60px -846px;
  }

  .FixedCommentBottom > .opinionSuggestion > a:first-of-type {
    background-position: 9px -544px;
  }

  .FixedCommentBottom > .opinionSuggestion:hover > a:first-of-type {
    background-position: -60px -544px;
  }

  .FixedCommentBottom > .goTop > a:first-of-type {
    background-position: 9px -600px;
  }

  .FixedCommentBottom > .goTop:hover > a:first-of-type {
    background-position: -60px -600px;
  }

  /*底部*/

  footer {
    padding-top: 30px;
    background-color: #f5f5f5;
  }

  .serviceType {
    width: 990px;
    padding: 20px 0;
    margin: 0 auto;
  }

  .serviceType > * {
    float: left;
  }

  .serviceType > dl {
    margin-right: 25px;
    padding-bottom: 20px;
    border-right: 1px dotted #d8d8d8;
    padding-left: 45px;
  }

  /*去旅游*/

  .goTourism {
    width: 250px;
  }

  .serviceType > dl > dt,
  .huiLeYouApp > strong {
    font: bold 14px/35px "宋体";
    display: block;
    color: #666666;
    margin-left: -45px;
    margin-bottom: 10px;
  }

  .goTourism > dt i {
    display: inline-block;
    width: 35px;
    height: 35px;
    background: url('../../assets/img/common_foot_2.png') no-repeat 0 0;
    vertical-align: top;
    margin-right: 10px;
  }

  .goTourism > dd {
    font: 12px/1.5 "宋体";
    display: inline-block;
    width: 65px;
  }

  .goTourism > dd > a {
    color: #999;
  }

  /*寻优惠*/

  .seekPreferentialTreatment {
    width: 150px;
  }

  .seekPreferentialTreatment > dt > i {
    display: inline-block;
    width: 35px;
    height: 35px;
    background: url('../../assets/img/common_foot_2.png') no-repeat -40px 0;
    vertical-align: top;
    margin-right: 10px;
  }

  .seekPreferentialTreatment > dd {
    font: 12px/1.5 "宋体";
  }

  .seekPreferentialTreatment > dd > a {
    color: #999;
  }

  /*看攻略*/

  .lookAtTheOffensive {
    width: 150px;
  }

  .lookAtTheOffensive > dt > i {
    display: inline-block;
    width: 35px;
    height: 35px;
    background: url('../../assets/img/common_foot_2.png') no-repeat -80px 0;
    vertical-align: top;
    margin-right: 10px;
  }

  .lookAtTheOffensive > dd {
    font: 12px/1.5 "宋体";
  }

  .lookAtTheOffensive > dd > a {
    color: #999;
  }

  /*查服务*/

  .lookupService {
    width: 150px;

  }

  .lookupService > dt > i {
    display: inline-block;
    width: 35px;
    height: 35px;
    background: url('../../assets/img/common_foot_2.png') no-repeat -120px 0;
    vertical-align: top;
    margin-right: 10px;
  }

  .lookupService > dd {
    font: 12px/1.5 "宋体";
  }

  .lookupService > dd > a {
    color: #999;
  }

  /*下载app*/

  .huiLeYouApp {
    width: 150px;
    padding-left: 45px;
  }

  .huiLeYouApp > strong > i {
    display: inline-block;
    width: 35px;
    height: 35px;
    background: url('../../assets/img/common_foot_2.png') no-repeat -160px 0;
    vertical-align: top;
    margin-right: 10px;
  }

  .huiLeYouApp > span {
    display: block;
    font: 12px/1.5 "宋体";
    color: #999;
    padding-bottom: 10px;
  }

  .aboutService {
    width: 100%;
    height: 62px;
    background-color: #60ca6e;
  }

  .aboutService > a {
    width: 990px;
    height: 100%;
    margin: 0 auto;
    background: url("../../assets/img/thr_sun.jpg") no-repeat 0 0;
  }

  .aboutService span {
    float: right;
    margin-top: 10px;
  }

  .aboutService span > em {
    text-align: center;
    display: block;
  }

  .aboutService span > em:nth-of-type(1) {
    color: #fff;
    font: normal 12px/20px arial, sans-serif;
  }

  .aboutService span > em:nth-of-type(2) {
    color: #fff;
    font: normal bold 20px/32px arial, sans-serif;
    margin-top: -5px;
  }

  .footerContent {
    width: 990px;
    margin: 0 auto;
  }

  .footerImageList {
    margin: 10px 0;
  }

  .footerImageList > a {
    float: left;
    border: 1px solid #ccc;
    margin-right: 10px;
  }

  .footerImageList > a:last-of-type {
    margin-right: 0;
  }

  .abouthuiLeYouInformation {
    margin-top: 15px;
  }

  .abouthuiLeYouInformation > p {
    text-align: center;
    font: 13px/19px "宋体";
    color: #777777;
  }

  .aboutWe {
    text-align: center;
  }

  .aboutWe > a {
    display: inline-block;
    font: 13px/19px "宋体";
    color: #777777;
    margin: 0 3px;
  }

  .businessLicense {
    margin-top: 10px;
  }

  .businessLicense > a {
    color: #777;
  }

  .supplierCooperation {
    text-align: center;
    margin-top: 10px;
  }

  .supplierCooperation > a {
    display: inline-block;
    border: 1px solid #ccc;
  }

  .tourismSecurity {
    text-align: center;
    margin-top: 20px;
  }

  .tourismSecurity > a {
    display: inline-block;
  }

  footer {
    padding-bottom: 10px;
  }

  .queryBox {
    position: relative;
  }

  .searchHistory {
    position: absolute;
    top: 34px;
    left: -3px;
    background-color: #fff;
    padding: 15px;
    width: 486px;
    z-index: 9998;
    box-shadow: 0 0 20px 3px #ccc;
    display: none;
  }

  .searchHistory > div > strong {
    font: bold 14px/3 "微软雅黑";
    color: #333;
  }

  .latelySearch {
    font: 14px/3 "微软雅黑";
  }

  .latelySearch strong{
    float: left;
    color: #333;
    font-weight: bold;
  }


  .latelySearch a {
    float: right;
    color: #999999;
  }

  .latelySearch i {
    float: left;
    width: 16px;
    height: 17px;
    background: url("../../assets/img/deleteIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 13px;
    margin-right: 3px;
  }

  .latelySearch span {
    float: left;
  }

  .historicalRecords {
    font: 14px/2.5 "微软雅黑";
  }

  .historicalRecords a {
    color: #666666;
    float: left;
    margin-right: 10px;
  }

  .historicalRecords a:hover {
    color: #f80;
  }

  .queryTextInput:hover + .searchHistory {
    display: block;
  }

  .searchHistory:hover {
    display: block;
  }

</style>
