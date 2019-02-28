<template>
  <div>
    <div class="continer clearfix">
      <ul>
        <!--菜单导航-->
        <div id="detail" :class="{show:isBlock}"  @mouseout="hideDetail"  @mouseover="showContentDetail">
          <div class="box" v-for="item in contentList">
            <div class="box_titel">
              <span style="font-weight: bold;">{{item.name}}:</span>
            </div>
            <div class="box_con">
              <a href="javascript:;" v-for="v in item.arr" @click="toHeelTourSearchMoreValue(v)">{{v}}</a>
            </div>
          </div>
        </div>
        <li @mouseover="showDetail"  @mouseout="hideNewDetail">
          <div class="menu">
            <h4>
              <div class="ico_1"></div>
              <span>热门目的地</span>
              <div class="pointer"></div>
            </h4>
            <div class="local">
              <a href="javascript:;" v-for="item in hotAgenciesCityList" @click="toHeelTourSearchMore(item)">{{item.sm_af_AreaName}}</a>
            </div>
          </div>
          <!--菜单详情-->
        </li>
        <li @mouseover="showOutLongDetail"  @mouseout="hideNewDetail">
          <div class="menu">
            <h4>
              <div class="ico_2"></div>
              <span>出境长线</span>
              <div class="pointer"></div>
            </h4>
            <div class="local">
              <a href="javascript:;" v-for="item in outLongAreaList" @click="toHeelTourSearchMoreOutLong(item)">{{item.ts_gi_Name}}</a>
            </div>
          </div>
          <!--菜单详情-->
        </li>
        <li @mouseover="showOutShortDetail"  @mouseout="hideNewDetail">
          <div class="menu">
            <h4>
              <div class="ico_3"></div>
              <span>出境短线</span>
              <div class="pointer"></div>
            </h4>
            <div class="local">
              <a href="javascript:;" v-for="item in outShortAreaList" @click="toHeelTourSearchMoreOutLong(item)">{{item.ts_gi_Name}}</a>
            </div>
          </div>
          <!--菜单详情-->
        </li>
        <li @mouseover="showContryDetail"  @mouseout="hideNewDetail">
          <div class="menu">
            <h4>
              <div class="ico_4"></div>
              <span>国内跟团</span>
              <div class="pointer"></div>
            </h4>
            <div class="local">
              <a href="javascript:;" v-for="item in contryAreaList" @click="toHeelTourSearchMoreOutLong(item)">{{item.ts_gi_Name}}</a>
            </div>
          </div>
        </li>
        <li @mouseover="showNearDetail" @mouseout="hideNewDetail">
          <div class="menu">
            <h4>
              <div class="ico_5"></div>
              <span>周边跟团</span>
              <div class="pointer"></div>
            </h4>
            <div class="local">
              <a href="javascript:;" v-for="item in nearAreaList" @click="toHeelTourSearchMoreOutLong(item)">{{item.ts_gi_Name}}</a>
            </div>
          </div>
        </li>
      </ul>
      <div class="carousel">
        <el-carousel style="height: 365px">
          <el-carousel-item v-for="item,index in topPageList" :key="index" style="height: 365px">
            <a href="javascript:;" v-for="item1,index1 in item">
              <img
                alt=""
                v-lazy="item1.ts_tsi_Image[0]"
                :class="{one:index1==0,two:index1==1,three:index1==2,four:index1==3,five:index1==4}"
                @click="toAgentAll(item1)"
              >
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!--国内游-->
    <div class="homePageDomesticTour">
      <div class="homePageDomesticTourTitle china clearfix">
        <h4 style="float: left;padding-right:120px ">国内旅游</h4>
        <div v-for="item,index in domesticDataList" @mouseover="mouseOverDomesticDataList(item,index)">
          <a href="javascript:;" :class="{active:index==n}">{{item.ts_ss_Key}}</a>
        </div>
        <a href="javascript:;" @click="searchAll(0)">查询更多</a>
      </div>
      <div class="clearfix">
        <div class="homePageDomesticTourLeft">
        </div>
        <div class="homePageDomesticTourContent">
          <div class="homePageHotPlaceTour">
          </div>
          <ul class="homePageDomesticTourContentList clearfix">
            <li @click="toDetail(item)" v-for="item,index in domesticGoodList">
              <a href="javascript:;">
                <img v-lazy="item.oneImg" width="220" height="125" :key="item.oneImg">
              </a>
              <div class="homePageImageContentBox">
                <div class="homePageImageMoneyAndSatisfied clearfix">
                  <span class="homePageImageMoney">￥<strong>{{item.ts_tg_lowestPrice?item.ts_tg_lowestPrice:0}}</strong> 起</span>
                  <span class="homePageImageSatisfied">满意度 96%</span>
                </div>
                <div class="homePageImageContent">
                  <a href="javascript:;">{{item.ta_tg_Title}}</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--周边游-->
    <div class="homePageDomesticTour">
      <div class="homePageDomesticTourTitle AroundTitle clearfix">
        <h4 style="float: left;padding-right:120px ">周边旅游</h4>
        <div v-for="item,index in aroundList" @mouseover="mouseOverNearAreaList(item,index)">
          <a href="javascript:;" :class="{active:index==m}">{{item.ts_ss_Key}}</a>
        </div>
        <a href="javascript:;" @click="searchAll(1)">查询更多</a>
      </div>
      <div class="clearfix">
        <div class="Around">
        </div>
        <div class="homePageDomesticTourContent">
          <div class="homePageHotPlaceTour">
          </div>
          <ul class="homePageDomesticTourContentList clearfix">
            <li v-for="item,index in nearAreaGoodList" @click="toAroundDetail(item)">
              <a href="javascript:;">
                <img v-lazy="item.oneImg" width="220" height="125" :key="item.oneImg">
              </a>
              <div class="homePageImageContentBox">
                <div class="homePageImageMoneyAndSatisfied clearfix">
                  <span class="homePageImageMoney">￥<strong>{{item.ts_tg_lowestPrice}}</strong> 起</span>
                  <span class="homePageImageSatisfied">满意度 96%</span>
                </div>
                <div class="homePageImageContent">
                  <a href="javascript:;">{{item.ta_tg_Title}}</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="allmap" style="display: none"></div>
    <!--境外短线-->
    <div class="homePageDomesticTour"  v-loading="newLoading">
      <div class="homePageDomesticTourTitle shortLongTitle clearfix">
        <h4 style="float: left;padding-right:120px ">境外短线旅游</h4>
        <div v-for="item,index in shortLineList" @mouseover="mouseOverShortLineList(item,index)">
          <a href="javascript:;" :class="{active:index==s}">{{item.ts_ss_Key}}</a>
        </div>
        <a href="javascript:;" @click="searchAll(3)">查询更多</a>
      </div>
      <div class="clearfix">
        <div class="shortLong">
        </div>
        <div class="homePageDomesticTourContent">
          <div class="homePageHotPlaceTour">
          </div>
          <ul class="homePageDomesticTourContentList clearfix">
            <li v-for="item,index in shortLineGoodList" @click="toShortLineDetail(item)">
              <a href="javascript:;">
                <img v-lazy="item.oneImg" width="220" height="125" :key="item.oneImg">
              </a>
              <div class="homePageImageContentBox">
                <div class="homePageImageMoneyAndSatisfied clearfix">
                  <span class="homePageImageMoney">￥<strong>{{item.ts_tg_lowestPrice}}</strong> 起</span>
                  <span class="homePageImageSatisfied">满意度 96%</span>
                </div>
                <div class="homePageImageContent">
                  <a href="javascript:;">{{item.ta_tg_Title}}</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--境外长线-->
    <div class="homePageDomesticTour" v-loading="newLoading">
      <div class="homePageDomesticTourTitle longtLongTitle clearfix">
        <h4 style="float: left;padding-right:120px ">境外长线旅游</h4>
        <div v-for="item,index in longLineList" @mouseover="mouseOverLongLineList(item,index)">
          <a href="javascript:;" :class="{active:index==q}">{{item.ts_ss_Key}}</a>
        </div>
        <a href="javascript:;" @click="searchAll(4)">查询更多</a>
      </div>
      <div class="clearfix">
        <div class="longtLong">
        </div>
        <div class="homePageDomesticTourContent">
          <div class="homePageHotPlaceTour">
          </div>
          <ul class="homePageDomesticTourContentList clearfix">
            <li v-for="item,index in longLineGoodList" @click="toLongLineDetail(item)">
              <a href="javascript:;">
                <img v-show="item.oneImg" v-lazy="item.oneImg" width="220" height="125" :key="item.oneImg">
              </a>
              <div class="homePageImageContentBox">
                <div class="homePageImageMoneyAndSatisfied clearfix">
                  <span class="homePageImageMoney">￥<strong>{{item.ts_tg_lowestPrice}}</strong> 起</span>
                  <span class="homePageImageSatisfied">满意度 96%</span>
                </div>
                <div class="homePageImageContent">
                  <a href="javascript:;">{{item.ta_tg_Title}}</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
//  import $ from 'jquery'
  import {postPromise} from '../../assets/public'
  //  agencies
  export default {
    name: '',
    computed: mapGetters([
      'domesticDataList',
      'domesticGoodList',
      'getTourSiteListImage',
      'aroundList',
      'shortLineList',
      'shortLineGoodList',
      'longLineList',
      'longLineGoodList',
      'topPageList',
      'hotAgenciesCityList',
      'outLongAreaList',
      'outShortAreaList',
      'contryAreaList',
      'nearAreaList',
      'nearAreaGoodList'
    ]),
    data() {
      return {
        newLoading:true,
        contentList:[],
        cityName: '',
        n: 0,
        m: 0,
        s: 0,
        q: 0,
        isBlock:false,
        //热门目的地右侧数据
        hotAgenciesList: [
          {
            name: '海南',
            arr: ['三亚', '蜈支洲', '亚龙湾', '海口', '天涯海角', '大东海', '大小洞天', '分界洲岛']
          },
          {
            name: '福建',
            arr: ['厦门', '鼓浪屿', '永定土楼', '武夷山', '云水谣古镇', '曾厝垵']
          },
          {
            name: '欧洲',
            arr: ['意大利', '法国', '瑞士', '英国', '德国', '希腊', '西班牙', '俄罗斯', '普罗旺斯']
          },
          {
            name: '东南亚',
            arr: ['泰国', '新加坡', '斯里兰卡', '越南', '菲律宾', '柬埔寨', '清迈']
          },
          {
            name: '海岛',
            arr: '普吉岛,巴厘岛,圣托里尼,塞班岛,苏梅岛,长滩岛,沙巴,鼓浪屿'.split(',')
          },
          {
            name: '云川贵',
            arr: '云南,大理,丽江,西双版纳,香格里拉,九寨沟,峨眉山,成都,稻城亚丁,黄果树,荔波,镇远,'.split(',')
          },
        ],
        //出境长线右侧数据
        outLongList: [
          {
            name: '欧洲',
            arr: '意大利,法国,瑞士,英国,德国,希腊,西班牙,俄罗斯,爱尔兰,普罗旺斯'.split(',')
          },
          {
            name: '美洲',
            arr: '美国,加拿大,夏威夷,黄石公园,美国西海岸,巴西,墨西哥,阿根廷'.split(',')
          },
          {
            name: '中东非',
            arr: '迪拜,土耳其,埃及,南非,肯尼亚,伊朗,坦桑尼亚,以色列'.split(',')
          },
          {
            name: '澳洲',
            arr: '新西兰,澳大利亚,墨尔本,悉尼,黄金海岸,奥克兰,皇后镇'.split(',')
          },
        ],
        //出境短线
        outShortList:[
          {
            name: '日本',
            arr: '东京,大阪,京都,冲绳,北海道,福冈,熊本,神户'.split(',')
          },
          {
            name: '泰国',
            arr: '普吉岛,苏梅岛,曼谷,清迈,甲米'.split(',')
          },
          {
            name: '港澳台',
            arr: '香港,香港迪士尼,海洋公园,九龙,氹仔,澳门,台北,高雄,香港岛,日月潭,阿里山'.split(',')
          },
          {
            name: '东南亚',
            arr: '越南,新加坡,泰国,沙巴,吉隆坡,尼泊尔,斯里兰卡,文莱,马来西亚,菲律宾,柬埔寨'.split(',')
          },
        ],
        contryList:[
          {
            name: '沿海',
            arr: '三亚,海口,厦门,深圳,大连,鼓浪屿'.split(',')
          },
          {
            name: '西南',
            arr: '云南,大理,丽江,香格里拉,西双版纳,四川,九寨沟,峨眉山,稻城亚丁,成都,贵州,黄果树,荔波,镇远'.split(',')
          },
          {
            name: '南方',
            arr: '广西,湖北,贵州,湖南,深圳,张家界,凤凰古城,桂林,长隆'.split(',')
          },
          {
            name: '北部',
            arr: '北京,山东,长白山,山西,西安,内蒙古,长城,泰山,东北,兵马俑'.split(',')
          },
          {
            name: '中东部',
            arr: '河南,江西,福建,三峡,武当山,少林寺'.split(',')
          },
          {
            name: '西北',
            arr: '西藏,拉萨,布达拉宫,林芝,珠峰大本营,新疆,乌鲁木齐,青海湖,甘肃,敦煌,西宁,张掖,魔鬼城'.split(',')
          },
        ],
        nearList:[
          {
            name: '乐园',
            arr: '中华恐龙园,方特欢乐世界,横店影视城,上海欢乐谷,常州动漫嬉戏谷,杭州宋城'.split(',')
          },
          {
            name: '山水',
            arr: '黄山,安吉,庐山,桐庐,天目湖,千岛湖,雁荡山'.split(',')
          },
          {
            name: '古镇',
            arr: '宏村,乌镇,西塘,婺源县,木渎古镇,周庄,唐模'.split(',')
          },
          {
            name: '城市',
            arr: '温州,嘉兴,无锡,常州,安吉,青岛,连云港'.split(',')
          },
        ],
        scroll:'',
        isScroll:true,
      }
    },
    mounted() {
      document.title="全域惠乐游"
      this.$store.commit('showLoading');
      let addComp = JSON.parse(sessionStorage.getItem('addComp'));
      if(!addComp){
        this.initCity()
        .then(name => {
          this.$store.commit('hideLoading')
          this.$store.commit('setText','拼命加载中');
          this.initData(name).then(() => {
            this.$store.commit('hideLoading');
            this.initCenterHomeData(name)
          })
        })
      }else{
        this.$store.commit('hideLoading')
        this.$store.commit('setText','拼命加载中');
        this.initData(addComp.province).then(() => {
          this.initCenterHomeData(addComp.province)
          this.$store.commit('hideLoading');
        })
      }
      if(this.isScroll){
        window.addEventListener('scroll', this.menu)
      }
    },
    methods: {
      initCenterHomeData(name){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "provice": name,
          "flag":"1"
        };
         this.$store.dispatch('initCenterHomeData', options);
      },
      menu() {
        this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
        let addComp = JSON.parse(sessionStorage.getItem('addComp'))
        if(this.scroll>=800){
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "provice": addComp.province,
            "flag":"2"//(0加载上半部分 1加载境外短线和境外长线)
          }
          if(this.isScroll){
            this.isScroll = false
            this.$store.dispatch('initNextHomeData', options).then(()=>{
              this.newLoading = false;
            });
          }
        }
//        if(this.scroll>=1100)
      },
      searchAll(id){
        //查询类型 0国内跟团  1周边跟团  2出境长线  3出境短线
        const {href} = this.$router.resolve({
          name: 'HeelTourSearchMore',
          query: {keycode:'',tourType:id}
        });
        window.open(href, '_blank')
      },
      //国内
      mouseOverDomesticDataList(item, index){
        this.n = index;
        this.$store.commit('setDomesticGoodList', item.goodList)
      },
      //周边
      mouseOverNearAreaList(item, index){
        this.m = index;
        this.$store.commit('setNearAreaList', item.goodList)
      },
      //短线
      mouseOverShortLineList(item, index){
        this.s = index;
        this.$store.commit('setShortLineGoodList', item.goodList)
      },
      //长线
      mouseOverLongLineList(item, index){
        this.q = index;
        this.$store.commit('setLongLineGoodList', item.goodList)
      },
      initCity() {
        console.log(1)
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
//              sessionStorage.setItem('addComp', JSON.stringify({
//                province:'',
//                city:'台州市'
//              }))
              relove(obj.province)
            } //map.setCenter(cityName); console.log
            var myCity = new BMap.LocalCity();
            myCity.get(sa);
          }
        })
      },
      async initData(name) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "provice": name,
          "flag":"0"
        };
        await this.$store.dispatch('initAllHomeData', options);

//        let options = {
//          "loginUserID": "huileyou",
//          "loginUserPass": "123",
//          "operateUserID": "",
//          "operateUserName": "",
//          "pcName": "",
//          "provice": name,
//          "flag":"1"
//        };
//        this.$store.dispatch('initCenterHomeData', options);
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
      toAgentAll(item){
        const {href} = this.$router.resolve({
          name: 'HeelTourSearchMore',
          query: {keycode:item.ts_tsi_Key}
        });
        window.open(href, '_blank')
      },
      //点击跳转到产品线路详情
      toDetail(obj) {
        let arr = this.domesticGoodList.filter(item => {
          if (item.ta_tg_ID == obj.ta_tg_ID) {
            return true;
          }
          return false;
        });
        sessionStorage.setItem('money', obj.ts_tg_lowestPrice)
        let images = JSON.stringify(arr[0].ta_tg_ShowImage);
        sessionStorage.setItem('images', images);
        const {href} = this.$router.resolve({
          name: 'AgenciesDetail',
          params: {id: obj.ta_tg_ID}
        });
        sessionStorage.setItem('GTYtitle',obj.ta_tg_Title)
        window.open(href, '_blank')
      },
      //周边游跳转到产品线路详情ta_tg_Title
      toAroundDetail(obj) {
        let arr = this.nearAreaGoodList.filter(item => {
          if (item.ta_tg_ID == obj.ta_tg_ID) {
            return true;
          }
          return false;
        });
        sessionStorage.setItem('money', obj.ts_tg_lowestPrice)
        let images = JSON.stringify(arr[0].ta_tg_ShowImage);
        sessionStorage.setItem('images', images);
        const {href} = this.$router.resolve({
          name: 'AgenciesDetail',
          params: {id: obj.ta_tg_ID}
        });
        sessionStorage.setItem('GTYtitle',obj.ta_tg_Title)
        window.open(href, '_blank')
      },
      //境外短线跳转到产品线路详情
      toShortLineDetail(obj) {
        let arr = this.shortLineGoodList.filter(item => {
          if (item.ta_tg_ID == obj.ta_tg_ID) {
            return true;
          }
          return false;
        });
        sessionStorage.setItem('money', obj.ts_tg_lowestPrice)
        let images = JSON.stringify(arr[0].ta_tg_ShowImage);
        sessionStorage.setItem('images', images);
        const {href} = this.$router.resolve({
          name: 'AgenciesDetail',
          params: {id: obj.ta_tg_ID}
        });
        sessionStorage.setItem('GTYtitle',obj.ta_tg_Title)
        window.open(href, '_blank')
      },
      //境外长线跳转到产品线路详情
      toLongLineDetail(obj) {
        let arr = this.longLineGoodList.filter(item => {
          if (item.ta_tg_ID == obj.ta_tg_ID) {
            return true;
          }
          return false;
        });
        sessionStorage.setItem('money', obj.ts_tg_lowestPrice)
        let images = JSON.stringify(arr[0].ta_tg_ShowImage);
        sessionStorage.setItem('images', images);
        const {href} = this.$router.resolve({
          name: 'AgenciesDetail',
          params: {id: obj.ta_tg_ID}
        });
        sessionStorage.setItem('GTYtitle',obj.ta_tg_Title)
        window.open(href, '_blank')
      },
      showContentDetail(){
        this.isBlock = true;
      },
      showDetail(){
        this.contentList = this.hotAgenciesList;
        this.isBlock = true;
      },
      //出境长线
      showOutLongDetail(){
        this.contentList = this.outLongList;
        this.isBlock = true;
      },
      //出境短线
      showOutShortDetail(){
        this.contentList = this.outShortList;
        this.isBlock = true;
      },
      //国内跟团
      showContryDetail(){
        this.contentList = this.contryList;
        this.isBlock = true;
      },
      //周边跟团
      showNearDetail(){
        this.contentList = this.nearList;
        this.isBlock = true;
      },
      hideDetail(){
        this.isBlock = false;
      },
      hideNewDetail(){

      }
    },
  }
</script>
<style lang="scss" scoped type="text/less">
  /*.movebox{*/
          /*position: relative;*/
           /*background-color: #e8e8e8;*/
           /*width: 300px;*/
           /*height: 34px;*/
           /*line-height: 34px;*/
           /*text-align: center;*/
         /*.txt{*/
         /*position: absolute;*/
           /*top: 0px;*/
           /*width: 300px;*/
           /*-moz-user-select: none;*/
          /*-webkit-user-select: none;*/
           /*user-select: none;*/
           /*-o-user-select: none;*/
           /*-ms-user-select: none;*/
           /*}*/
       /*.movego{*/
         /*background-color: #7ac23c;*/
         /*height: 34px;*/
         /*width: 0px;*/
       /*}*/
         /*.move{*/
           /*position: absolute;*/
       /*top: 0px;*/
       /*left: 0px;*/
       /*width: 40px;*/
       /*height: 34px;*/
       /*border: 1px solid #ccc;*/
       /*cursor: move;*/
         /*}*/
         /*.moveBefore{*/
        /*background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==") no-repeat center;*/


         /*}*/
         /*.moveSuccess{*/
           /*background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==") no-repeat center;*/


         /*}*/
       /*}*/

  .continer > ul > .show{
    opacity: 1 !important;
    width: 500px !important;
    overflow: visible;
  }
  /*.el-carousel__container{*/
  /*height: 365px !important;*/
  /*}*/
  .two {
    width: 246px;
  }

  .one {
    width: 493px;
  }

  .three {
    width: 246px;
    height: 182px;
  }

  .four {
    width: 493px;
    height: 182px;
  }

  .five {
    width: 247px;
    height: 366px;
  }

  .Around {
    width: 220px;
    height: 483px;
    background: url("../../assets/img/zhoubian.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    float: left;
    margin: 0 20px 0 -20px;
  }

  .shortLong {
    width: 220px;
    height: 483px;
    background: url("../../assets/img/duanxian.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    float: left;
    margin: 0 20px 0 -20px;
  }

  .longtLong {
    width: 220px;
    height: 483px;
    background: url("../../assets/img/changxian.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    float: left;
    margin: 0 20px 0 -20px;
  }

  .homePageDomesticTour {
    width: 1188px;
    margin: 20px auto;
    background-color: #fff;
  }

  .homePageDomesticTourTitle {
    font: bold 18px/28px "微软雅黑";
    color: #333;
    border-bottom: 3px solid #e694a6;
    border-bottom: 3px solid #e694a6;
  }

  .homePageDomesticTourTitle > h4 {
    margin-left: 10px;
    float: left;
  }

  .homePageDomesticTourTitle > a {
    font: 14px/2 "微软雅黑";
    color: #ccc;
    float: right;
    margin-right: 10px;
  }

  .homePageDomesticTourLeft {
    width: 220px;
    height: 483px;
    background: url("../../assets/img/guonei.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    float: left;
    margin: 0 20px 0 -20px;
    padding-top: 10px;
  }

  .homePageDomesticTourContent {
    width: 968px;
    float: left;
  }

  .homePageDomesticTourContentList {
    display: inline-block;
    vertical-align: middle;
  }

  .homePageDomesticTourContentList > li {
    vertical-align: top;
    width: 220px;
    position: relative;
    margin: 20px 11px 0;
    float: left;
  }

  .homePageDomesticTourContentList > li:hover {
    box-shadow: 1px 1px 3px #f60;
  }

  .homePageImageContentBox {
    background-color: #fff;
    padding: 0 5px 5px;
    height: 100%;
  }

  .homePageImageContent {
    height: 40px;
    width: 100%;
    overflow: hidden;
    font: bold 12px/20px "微软雅黑";
  }

  .homePageImageContent:hover a {
    color: #f60;
  }

  .homePageImageContent > a {
    color: #333;
  }

  .homePageImageMoneyAndSatisfied {
    font: 12px/42px "微软雅黑";
  }

  .homePageImageMoneyAndSatisfied > .homePageImageMoney {
    float: left;
    color: #f60;
  }

  .homePageImageMoneyAndSatisfied > .homePageImageMoney > strong {
    font-size: 18px;
    font-weight: bold;
  }

  .homePageImageMoneyAndSatisfied > .homePageImageSatisfied {
    float: right;
    color: #999;
    margin-right: 5px;
  }

  .AroundTitle {
    border-bottom: 3px solid #66d1d2;
  }

  .shortLongTitle {
    border-bottom: 3px solid #7fd3a8;
  }

  .longtLongTitle {
    border-bottom: 3px solid #7fc7ef;
  }

  .body, ul, li, h4 {
    margin: 0;
    padding: 0;
  }

  /*初始化*/
  .continer {
    width: 1190px;
    height: 365px;
    margin: 20px auto 0;
  }

  /*总容器*/
  .continer ul {
    height: 365px;
    width: 200px;
    position: relative;
    z-index: 999;
    list-style: none;
  }

  .continer ul li a {
    display: inline-block;
  }

  .continer ul li {
    width: 200px;
    height: 73px;
    background-color: #575757;
    position: relative;
  }

  .continer ul li:hover {
    background-color: #292929;
  }

  .continer ul li .menu {
    width: 200px;
  }

  .continer ul li .menu h4 {
    color: #fff;
    font-size: 15px;
    font-weight: normal;
    padding-left: 20px;
    padding-top: 6px;
    padding-bottom: 3px;
    box-sizing: content-box;
    /*background-color: aquamarine;*/
    height: 23px;
    position: relative;
  }

  .continer ul li .menu h4 .ico_1 {
    width: 14px;
    height: 16px;
    background-image: url("../../assets/img/ico_mark.png");
    background-repeat: no-repeat;
    background-position: 2px -607px;
    position: absolute;
    top: 12px;
  }

  .continer ul li .menu h4 .ico_2 {
    width: 14px;
    height: 16px;
    background: url("../../assets/img/ico_mark.png") no-repeat -12px -607px;
    position: absolute;
    top: 8px;
  }

  .continer ul li .menu h4 .ico_3 {
    width: 14px;
    height: 16px;
    background: url("../../assets/img/ico_mark.png") no-repeat -28px -607px;
    position: absolute;
    top: 8px;
  }

  .continer ul li .menu h4 .ico_4 {
    width: 14px;
    height: 16px;
    background: url("../../assets/img/ico_mark.png") no-repeat -44px -607px;
    position: absolute;
    top: 8px;
  }

  .continer ul li .menu h4 .ico_5 {
    width: 14px;
    height: 16px;
    background: url("../../assets/img/ico_mark.png") no-repeat -60px -607px;
    position: absolute;
    top: 8px;
  }

  .continer ul li .menu h4 span {
    display: block;
    height: 16px;
    width: 150px;
    margin-left: 22px;
    padding-top: 5px;
  }

  .continer ul li .menu h4 .pointer {
    width: 6px;
    height: 6px;
    border-left: 1px solid #fff;
    border-top: 1px solid #fff;
    position: absolute;
    top: 18px;
    right: 10px;
    transform: rotate(135deg);
  }

  .continer ul li .menu .local {
    width: 180px;
    height: 50px;
    padding-left: 20px;
  }

  .continer ul li .menu .local a {
    height: 20px;
    font-size: 12px;
    color: rgb(187, 187, 187);
    font-weight: normal;
    margin-right: 4px;
    text-decoration: none;
  }

  .continer ul li .menu .local a:hover {
    color: #f60;
  }

  .box_con a:hover {
    color: #f60;
  }

  #detail {
    opacity: 0;
    width: 0;
    height: 365px;
    background-color: #fff;
    position: absolute;
    left: 200px;
    overflow: hidden;
    transition: .5s;
  }

  #detail1 {
    top: 0px;
  }

  #detail2 {
    top: 0px;
  }

  #detail3 {
    top: 0px;
  }

  #detail4 {
    top: 0px;
  }

  #detail5 {
    top: 0px;
  }

  .continer ul {
    float: left;
  }
  .box {
    border: none
  }

   #detail .box {
    width: 250px;
    height: 122px;
    float: left;
  }

  .box_titel {
    width: 250px;
    height: 30px;
    padding-top: 10px;
  }

  .box_titel span {
    display: block;
    margin-left: 20px;
  }

  .box_con {
    width: 230px;
    height: 92px;
    padding-left: 20px;
  }

  .box_con a {
    color: rgb(187, 187, 187);
    font-size: 13px;
    font-weight: normal;
    text-decoration: none;
    margin-right: 6px;
    margin-top: 8px;
    display: block;
    float: left;
    line-height: 13px;
  }

  /*轮播板块*/
  .carousel {
    width: 990px;
    float: left;
    height: 100%;
    position: relative;
  }

  .carousel a {
    position: absolute;
    top: 0;
    left: 0;
  }

  .carousel a:nth-of-type(1) {
    top: 0;
    left: 2px;
  }

  .carousel a:nth-of-type(2) {
    top: 0;
    left: 496px;
  }

  .carousel a:nth-of-type(3) {
    top: 183px;
    left: 2px;
  }

  .carousel a:nth-of-type(4) {
    top: 183px;
    left: 249px;
  }

  .carousel a:nth-of-type(5) {
    top: 0;
    left: 743px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #fff;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #fff;
  }

  .homePageDomesticTourTitle {
    position: relative;
  }

  .homePageDomesticTourTitle > div {
    padding-left: 20px;
    float: left;
  }

  .homePageDomesticTourTitle > div > a {
    float: left;
    padding: 0 10px;
    color: #666;
    font: 14px/22px "微软雅黑";
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .china > div > a.active {
    background-color: #e694a6;
    color: #fff;
  }

  .AroundTitle > div > a.active {
    background-color: #85cecf;
    color: #fff;
  }

  .shortLongTitle > div > a.active {
    background-color: #a8d1a5;
    color: #fff;
  }

  .longtLongTitle > div > a.active {
    background-color: #90cbed;
    color: #fff;
  }

  .homePageDomesticTourLeft > a {
    margin-bottom: 10px;
    width: 140px;
    box-sizing: content-box;
    padding: 10px;
    background-color: #fff;
    margin-left: 40px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    transition: .5s;
    color: #666;
  }

  .homePageDomesticTourLeft > a:hover {
    margin-left: 30px;
  }

  .homePageDomesticTourLeft > a > strong {
    float: left;
  }

  .homePageDomesticTourLeft > a > span {
    float: right;
    position: relative;
  }

  .homePageDomesticTourLeft > a i {
    position: absolute;
    left: -14px;
    top: 0;
    width: 14px;
    height: 13px;
    background: url("../../assets/img/heart.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
  }


</style>
