<template>
  <div>
    <div class="HeelTourSearchMoreWrap clearfix">
      <!--左边-->
      <div class="HeelTourSearchMoreWrapContent">
        <!--选择推荐-->
        <ul class="aboutTourism clearfix" v-loading="isLoading">
          <!--热门推荐-->
          <!--<li class="hotRecommend">-->
          <!--<strong><span></span>热门推荐</strong>-->
          <!--<div class="hotRecommendList clearfix">-->
          <!--<a href="javascript:;" v-for="item,index in hotRecommendData">{{item}}</a>-->
          <!--</div>-->
          <!--</li>-->
          <!--游玩路线-->
          <li class="playRoute">
            <strong><span></span>游玩路线</strong>
            <!--<div class="playRouteList active clearfix">-->
            <!--<a href="javascript:;" v-for="item,index in playRouteData">{{item}}</a>-->
            <!--</div>-->
            <div class="operationBox">
              <a href="javascript:;" class="searchMore"></a>
              <a href="javascript:;" class="multiSelect">多选</a>
            </div>
            <div class="selectMore">
              <el-checkbox-group v-model="checkList" @change="changeType">
                <el-checkbox v-for="item,index in playRouteData" :label="item" :key="index"></el-checkbox>
              </el-checkbox-group>
              <div class="selectMoreSubmitBox">
                <el-button size="mini">确定</el-button>
                <el-button size="mini">取消</el-button>
              </div>
            </div>
          </li>
          <!--已选-->
          <li class="tartsTheCity" v-show="tags.length">
            <strong><span></span>您已选择</strong>
            <div class="tartsTheCityList clearfix">
              <el-tag
                      v-for="tag in tags"
                      :key="tag.name"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag)"
                      style="margin-right: 10px"
                      :type="tag.type">
                {{tag.name}}
              </el-tag>
            </div>
          </li>

          <!--出发城市-->
          <li class="tartsTheCity" v-show="isSelectCityList">
            <strong><span></span>出发城市</strong>
            <div class="tartsTheCityList clearfix">
              <a href="javascript:;" v-for="item,index in agenciesSearchCityList" @click="selectCityList(item)">{{item.sm_af_AreaName}}</a>
            </div>
            <div class="selectMore">
              <el-checkbox-group v-model="checkList" @change="changeType">
                <el-checkbox v-for="item,index in tartsTheCityData" :label="item" :key="index"></el-checkbox>
              </el-checkbox-group>
              <div class="selectMoreSubmitBox">
                <el-button size="mini">确定</el-button>
                <el-button size="mini">取消</el-button>
              </div>
            </div>
          </li>
          <!--行程天数-->
          <li class="numberOfTravelDays" v-show="isSelectTravelDays">
            <strong><span></span>行程天数</strong>
            <div class="numberOfTravelDaysList clearfix">
              <a href="javascript:;" v-for="item,index in numberOfTravelDaysData" @click="selectTravelDaysData(item)">{{item}}天</a>
            </div>

          </li>

          <!--推荐景点-->
          <li class="recommendScenicSpot" v-show="isSelectTourSite">
            <strong><span></span>推荐景点</strong>
            <div class="recommendScenicSpotList clearfix">
              <a href="javascript:;" v-for="item,index in agenciesSearchTourSiteList" @click="selectSearchTourSite(item)">{{item.tm_ts_Name}}</a>
            </div>
            <div class="selectMore">
              <el-checkbox-group v-model="checkList" @change="changeType">
                <el-checkbox v-for="item,index in recommendScenicSpotData" :label="item" :key="index"></el-checkbox>
              </el-checkbox-group>
              <div class="selectMoreSubmitBox">
                <el-button size="mini">确定</el-button>
                <el-button size="mini">取消</el-button>
              </div>
            </div>
          </li>
          <!--成团地点-->
          <li class="placeOfFormation" v-show="isSelectGroupCity">
            <strong><span></span>成团地点</strong>
            <div class="placeOfFormationList clearfix">
              <a href="javascript:;" v-for="item,index in agenciesSearchGroupCityList" @click="selectSearchGroupCity(item)">{{item.sm_af_AreaName}}</a>
            </div>
            <div class="selectMore">
              <el-checkbox-group v-model="checkList" @change="changeType">
                <el-checkbox v-for="item,index in placeOfFormationData" :label="item" :key="index"></el-checkbox>
              </el-checkbox-group>
              <div class="selectMoreSubmitBox">
                <el-button size="mini">确定</el-button>
                <el-button size="mini">取消</el-button>
              </div>
            </div>
          </li>

        </ul>
        <!--展示推荐选择-->
        <div class="screeningRecommend">
          <div class="screeningRecommendType clearfix">
            <a href="javascript:;"
               v-for="item,index in screeningRecommendTypeList"
               :class="{ active: index == changeScreeningRecommendTypeNum}"
               @click="changeScreeningRecommendType(index)"
            >{{item}}</a>
          </div>
          <div class="searchType">
            <el-checkbox-group v-model="searchTypeList">
              <el-checkbox v-for="item,index in searchType" :label="item" :key="index"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <!--旅游展示-->
        <ul class="accordingToData clearfix" v-loading="isLoading">
          <li v-for="item,index in heelTourSearchMoreList">
            <div class="accordingToDataBox">
              <img width="200" height="112" v-lazy="item.oneImage" @click="toAgenciesDetail(item,index)">
              <span>{{item.ts_tg_Type | getHeelType}}</span>
            </div>
            <div class="accordingToDataContent">
              <!--title-->
              <h4>
                <strong  @click="toAgenciesDetail(item,index)" :class="{active:index==n}">{{item.ta_tg_Title}}</strong>
              </h4>
              <!--出游地点和描述-->
              <div class="describeWrap">
                <p>
                  <strong class="goPlace">{{item.ts_tg_GroupSite}}</strong>
                  <span class="describe">{{item.ta_tg_Describe}}</span>
                </p>
                包含景点: <span class="containsAttractions" v-for="v in item.introSiteList" style="color: green">{{v.ts_it_Name}} | </span>
                <span class="goTimeA">出发日期: {{item.ts_tg_DepartDate}}</span>
                <span class="supplier">供应商: {{item.ta_tg_TradeName}}</span>
              </div>
            </div>
            <div class="priceRecommend">
              <strong>￥<em>{{item.ts_tg_lowestPrice}}</em><span>起</span></strong>
              <div class="satisfactionBox clearfix">
                <div class="satisfactionNumber">
                  满意度<strong>100</strong>%
                </div>
                <div>
                  <span><em>2000</em>人以出游</span>
                  <span><em>400</em>人点评</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div v-show="!heelTourSearchMoreList.length" class="noValue">暂无数据</div>
        <!--分页-->
        <div class="block" style="float: right;padding-top: 20px;margin-bottom: 20px">
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
      <!--右边-->
      <div class="HeelTourSearchMoreWrapRecommend" style="display: none">
        <div class="recommendSatisfaction">
          <strong class="satisfaction">满意度<span><em>96</em>%</span></strong>
          <strong class="focusOn">已关注人数:<span>105万人</span></strong>
        </div>
        <div class="recommendList">
          <h4>清仓特卖</h4>
          <ul>
            <li v-for="item,index in recommendList">
              <div class="recommendListImgBox">
                <strong>{{item.logoTitle}}</strong>
                <img src="../../assets/img/homePageImage.jpg" width="225" height="125">
                <p>剩余:{{item.remainingTime}}</p>
              </div>
              <h5>{{item.title}}</h5>
              <div class="priceBox">
                <strong>￥{{item.price}}起</strong>
                <span>{{item.discount}}折</span>
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

    export default {
        computed: mapGetters([
            'agenciesSearchCityList',
            'agenciesSearchTourSiteList',
            'agenciesSearchGroupCityList',
            'heelTourSearchMoreList'
        ]),
        created(){
            for (var i = 1; i < 18; i++) {
                this.numberOfTravelDaysData.push(i)
            }
            //关键字搜索
            let keycode = this.$route.query.keycode;
            if(keycode){
                this.options.keycode = keycode;
            }
            //查询类型 0国内跟团  1周边跟团  2出境长线  3出境短线
            let tourType = this.$route.query.tourType;
            if(tourType){
                this.options.tourType = tourType;
            }
            let addComp = JSON.parse(sessionStorage.getItem('addComp'))
            if(addComp){
                this.options.departCity = addComp.city;
            }
            //出发城市
            let cityName = this.$route.query.cityName;
            if(cityName){
                this.options.departCity = cityName;
            }
            this.isLoading = true;
            this.initSearchData().then(() => {
                this.isLoading = false;
                this.$nextTick(()=>{
                    document.title = '跟团游_列表'
                })
                this.initData()
            }, err => {
                console.log(err)
            })
        },
        data() {
            return {
                isLoading:false,
                n:0,
                tags: [
//          { name: '标签一', type: '' },
//          { name: '标签二', type: 'success' },
//          { name: '标签三', type: 'info' },
//          { name: '标签四', type: 'warning' },
//          { name: '标签五', type: 'danger' }
                ],
                hotRecommendData: [
                    '途牛自营',
                    '惠乐游专线',
                    '三亚全程品牌五星酒店',
                    '途牛自营无购物',
                    '经典5日',
                    '三亚全程连住海景房'
                ],//热门推荐
                playRouteData: [
                    '三亚一地+全程连住海景房（47%选择）',
                    '三亚一地+全程品牌五星酒店（37%选择）',
                    '三亚+蜈支洲（6%选择）',
                    '三亚一地',
                    '三亚+海口',
                    '三亚+兴隆+海口',
                    '三亚+岛屿+雨林+南山+天涯',
                    '东线全景+海口+三亚',
                    '三亚一地+1-2天跟团',
                    '三亚+兴隆',
                    '广西+海南',
                    '三亚+定制小包团',
                    '三亚湾+亚龙湾',
                    '三亚+其他',
                    '三亚+西沙群岛',
                    '三亚+南山+天涯',
                    '海棠湾区域',
                    '海口一地',
                    '三亚湾+大小东海',
                    '广西+越南',
                    '三亚一线海景',
                    '广西+贵州',
                    '三亚+南山',
                    '三亚+双岛',
                    '三亚湾区域',
                    '亚龙湾区域',
                    '桂林+阳朔'
                ],//游玩路线
                tartsTheCityData: [
                    '成都 （90%选择）',
                    '重庆',
                    '海口',
                    '三亚',
                    '上海',
                    '贵阳',
                    '广州',
                    '济南',
                    '杭州',
                    '石家庄',
                    '南京',
                    '哈尔滨',
                    '西安',
                    '福州',
                    '长春',
                    '沈阳',
                    '青岛',
                    '宁波',
                    '武汉',
                    '南昌',
                    '深圳',
                    '北京',
                    '揭阳',
                    '呼和浩特',
                    '济宁',
                    '宜宾',
                    '昆明',
                    '湛江',
                    '南宁',
                    '黄山',
                    '南通',
                    '温州',
                    '珠海',
                    '桂林',
                    '郑州',
                    '无锡',
                    '徐州',
                    '扬州',
                    '天津',
                    '泉州',
                    '厦门',
                    '长沙',
                    '包头',
                    '烟台',
                    '常州',
                    '北海',
                    '东莞',
                    '太原',
                    '合肥',
                    '银川',
                    '兰州',
                    '苏州',
                    '大连',
                    '广元',
                    '金华',
                    '保定',
                    '承德',
                    '邯郸',
                    '衡水',
                    '廊坊',
                    '秦皇岛',
                    '邢台',
                    '张家口',
                    '大庆',
                    '鸡西',
                    '牡丹江',
                    '齐齐哈尔',
                    '伊春',
                    '鹤壁',
                    '开封',
                    '漯河',
                    '洛阳',
                    '南阳',
                    '濮阳',
                    '商丘',
                    '新乡',
                    '信阳',
                    '许昌',
                    '黄石',
                    '十堰',
                    '宜昌',
                    '常德',
                    '衡阳',
                    '怀化',
                    '娄底',
                    '邵阳',
                    '湘潭',
                    '益阳',
                    '岳阳',
                    '永州',
                    '张家界',
                    '萍乡',
                    '鞍山',
                    '朝阳',
                    '丹东',
                    '抚顺',
                    '铁岭',
                    '营口',
                    '滨州',
                    '菏泽',
                ],//出发城市
                numberOfTravelDaysData: [],//行程天数
                recommendScenicSpotData: [
                    '天涯海角',
                    '蜈支洲岛',
                    '南山佛教文化苑',
                    '大东海',
                    '亚龙湾热带天堂森林公园',
                    '亚龙湾',
                    '椰田古寨',
                    '槟榔谷',
                    '呀诺达雨林',
                    '分界洲岛 ',
                    '亚龙湾玫瑰谷',
                    '三亚湾 ',
                    '南山文化旅游区',
                    '大小洞天',
                    '三亚千古情',
                    '海口观澜湖度假区',
                    '观澜湖水上乐园',
                    '南湾猴岛',
                    '亚龙湾爱立方滨海乐园',
                    '亚龙湾海底世界',
                    '观澜湖新城'
                ],//推荐景点
                placeOfFormationData: [
                    '三亚',
                    '海口',
                    '海南',
                    '桂林',
                    '天涯区',
                    '海棠区',
                    '美兰区',
                    '青秀区',
                    '吉阳区',
                    '北京',
                    '阳朔县',
                    '贵阳',
                    '博鳌镇'
                ],//成团地点
                productBrandData: [
                    '乐游专线',
                    '云南五洲国旅 ',
                    '春雪旅游总社',
                    '海南康泰',
                    '海岛之约',
                    '游好海南',
                    '海语18度 ',
                    '网营服务中心',
                    '航空国际旅行社 ',
                    '北京海南椰晖',
                    '精致假期 ',
                    '海南同行 ',
                    '椰岛之旅 ',
                    '美途假期',
                    '罗马假期 ',
                    '中国康辉 ',
                    '斑马旅游',
                    '好客 ',
                    '五只蜗牛',
                    '浪漫天涯 ',
                    '乐途国旅',
                    '新狮国旅 ',
                    '金椰风 ',
                    '怡乐游 ',
                    '星海假期',
                    '海南心旅途 ',
                    '天天欢乐旅途',
                    '昆明国旅永胜分公司 ',
                    '百事国旅 ',
                    '良品旅行 ',
                    '七彩欢乐游',
                    '乐游旅行社'
                ],//产品品牌
                uitableCrowdData: [
                    '情侣蜜月',
                    '亲子游',
                    '爸妈游',
                    '毕业旅行',
                ],//适合人群
                lineCharacteristicsData: [
                    '有自由活动',
                    '纯玩无购物',
                    '无自费',
                    '半自助',
                ],//线路特色
                groupModeData: [
                    '小团出游(10人左右)',
                    '私家团(1单1团)'
                ],//组团方式
                themeOfPlayData: [
                    '海滨/岛屿',
                    '潜水',
                    '美食',
                    '水上运动 ',
                    '民俗风情 ',
                    '亲子活动',
                    '宗教祈福',
                    '湖光山色',
                    '自然遗产',
                    '温泉'
                ],//游玩主题
                hotelGradeData: [
                    '五星级/豪华',
                    '四星级/高档',
                    '三星级/舒适',
                    '二星级及以下/经济'
                ],//酒店等级
                startTime: '',//开始时间
                endTime: '',//结束时间
                checkList: [],
                searchTypeList: [],
                screeningRecommendTypeList: [
                    '推荐',
                    '综合',
                    '销量',
                    '满意度',
                    '价格',
                    '价格区间'
                ],
                changeScreeningRecommendTypeNum: 0,
                searchType: [
                    '惠乐游专线',
                    '瓜果亲子游',
                    '乐开花爸妈游',
                    '朋派定制游',
                    '一路之上'
                ],
                recommendList: [
                    {
                        logoTitle: '尾货',//小标题
                        title: '<海南三亚山海天万豪酒店双飞3-8日自由行>大东海国际五星品牌，无边泳池，900',//标题
                        price: '2616',//价格
                        discount: '5.8',//折扣
                        remainingTime: '',//剩余时间
                    }
                ],
                total:0,
                isSelectCityList:true,
                isSelectTravelDays:true,
                isSelectTourSite:true,
                isSelectGroupCity:true,
                options:{
                    "loginUserID": "huileyou",
                    "loginUserPass": "123",
                    "operateUserID": "",
                    "operateUserName": "",
                    "pcName": "",
                    "keycode": "",//关键字
                    tourType:'',
                    "tourdays": "",//行程天数
                    "groupCity": "",//成团地点
                    "topTourSite": "",//推荐景点
                    "departCity":"",//出发城市
                    "page": "1",
                    "rows":"5"
                }
            }
        },
        methods: {
            //分页
            handleCurrentChange(num){
                this.initData(num)
            },
            initData(page){

                this.options.page = page?page:1;
                this.$store.dispatch('initHeelTourSearchMoreList',this.options)
                    .then((total)=>{
                        this.total = total;
                        this.isLoading = false
                    },err=>{
                        console.log(err)
                    })
            },
            //初始化搜索条件
            initSearchData(){
                let options = {
                    "loginUserID": "huileyou",
                    "loginUserPass": "123",
                    "operateUserID": "",
                    "operateUserName": "",
                    "pcName": "",
                };
                return this.$store.dispatch('initAgenciesSearchList', options)
            },
            //点击出发城市
            selectCityList(item){
                item.type = 'success';
                item.theID = 1;
                item.name = '出发城市:'+item.sm_af_AreaName;
                this.isSelectCityList = false;
                this.tags.push(item);
                this.options.departCity = item.sm_af_AreaName;
                this.initData(1)
            },
            //点击行程天数
            selectTravelDaysData(item){
                let obj = {};
                obj.type = 'success';
                obj.theID = 2;
                obj.name = '行程天数:'+item+'天';
                obj.day = item;
                this.isSelectTravelDays = false;
                this.tags.push(obj);
                this.options.tourdays = item;
                this.initData(1)
            },
            //点击推荐景点
            selectSearchTourSite(item){
                item.type = 'success';
                item.theID = 3;
                item.name = '推荐景点:'+item.tm_ts_Name;
                this.isSelectTourSite = false;
                this.tags.push(item);
                this.options.topTourSite = item.tm_ts_Code;
                this.initData(1)
            },
            //点击成团地点
            selectSearchGroupCity(item){
                item.type = 'success';
                item.theID = 4;
                item.name = '成团地点:'+item.sm_af_AreaName;
                this.isSelectGroupCity = false;
                this.tags.push(item);
                this.options.groupCity = item.sm_af_AreaName;
                this.initData(1)
            },
            //跳转到详情
            toAgenciesDetail(obj,index){
                this.n = index
                sessionStorage.setItem('money', obj.ts_tg_lowestPrice)
                sessionStorage.setItem('GTYtitle',obj.ta_tg_Title)
                let images = JSON.stringify(obj.ta_tg_ShowImage);
                sessionStorage.setItem('images', images);

                const {href} = this.$router.resolve({
                    name: 'AgenciesDetail',
                    params: {id: obj.ta_tg_ID}
                });
                window.open(href, '_blank')
//        this.$router.push({name: 'AgenciesDetail', params: {id: obj.ta_tg_ID}})
            },
            //关闭
            handleClose(obj){
                switch (obj.theID){
                    case 1:
                        //出发城市
                        this.tags = this.tags.filter(item=>{
                            if(item.theID==obj.theID){
                                return false
                            }
                            return true;
                        });
                        this.isSelectCityList = true;
                        this.options.departCity = '';
                        this.initData(1);
                        break;
                    case 2:
                        //行程添加
                        this.tags = this.tags.filter(item=>{
                            if(item.theID==obj.theID){
                                return false
                            }
                            return true;
                        });
                        this.isSelectTravelDays = true;
                        this.options.tourdays = '';
                        this.initData(1);
                        break;
                    case 3:
                        //推荐景点
                        this.tags = this.tags.filter(item=>{
                            if(item.theID==obj.theID){
                                return false
                            }
                            return true;
                        });
                        this.isSelectTourSite = true;
                        this.options.topTourSite = '';
                        this.initData(1);
                        break;
                    case 4:
                        //成团地点
                        this.tags = this.tags.filter(item=>{
                            if(item.theID==obj.theID){
                                return false
                            }
                            return true;
                        });
                        this.isSelectGroupCity = true;
                        this.options.groupCity = '';
                        this.initData(1);
                        break;
                }
            },
            changeType() {
                console.log(this.checkList)
            },
            changeScreeningRecommendType(index) {
                this.changeScreeningRecommendTypeNum = index;
            }
        },
        mounted() {
            let title = sessionStorage.getItem('GTYtitle');
            if(title){
                document.title = title
            }
        }
    }
</script>
<style scoped>
  .noValue{
    line-height:60px;
    font-size:20px;
    text-align: center;
    font-weight:bold;
  }
  .HeelTourSearchMoreWrap {
    width: 1190px;
    margin: 20px auto 0;
  }

  .HeelTourSearchMoreWrapContent {
    width: 916px;
    float: left;
  }

  .aboutTourism {
    font: 14px/40px "微软雅黑";
    border: 1px solid #f2f4f3;
  }

  .aboutTourism > li {
    border: 1px solid #eaeceb;
    margin-top: -1px;
    float: left;
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .aboutTourism > li > div {
    margin-left: 140px;
    width: 650px;
    max-height: 40px;
    overflow: hidden;
  }

  .aboutTourism > li > div.active {
    max-height: 120px;
    overflow: auto;
    padding-right: 125px;
    box-sizing: content-box;
  }

  .aboutTourism > li > strong {
    display: block;
    width: 120px;
    border-right: 1px solid #e0eaf6;
    background-color: #f0f5fb;
    height: 3000px;
    position: absolute;
    text-indent: 40px;
    color: #333333;
  }

  .aboutTourism > li > strong > span {
    position: absolute;
    left: 10px;
    background-image: url(../../assets/img/list_xin_icon.png);
    background-repeat: no-repeat;
  }

  .hotRecommend > strong > span {
    top: 12px;
    width: 16px;
    height: 17px;
  }

  .hotRecommendList {
    padding: 8px 0;
  }

  .hotRecommendList > a {
    float: left;
    padding: 0 5px;
    font: 12px/22px "微软雅黑";
    color: #333333;
    background-color: #f6f6f6;
    border: 1px solid #dddddd;
    margin-right: 10px;
  }

  .hotRecommendList > a:hover {
    background-color: #fffff5;
    color: #f60;
  }

  .playRoute > strong > span {
    top: 16px;
    width: 18px;
    height: 7px;
    background-position-y: -106px;
  }

  .playRouteList > a {
    float: left;
    margin-right: 10px;
    color: #333333;
    padding: 0 8px;
  }

  .playRouteList > a:hover {
    background-color: #fffff5;
    color: #f60;
  }

  .tartsTheCity > strong > span {
    top: 10px;
    width: 22px;
    height: 23px;
    background-position-y: -165px;
  }

  .numberOfTravelDays > strong > span {
    top: 15px;
    width: 21px;
    height: 18px;
    background-position-y: -135px;
  }

  .goTime > strong > span {
    top: 15px;
    width: 21px;
    height: 18px;
    background-position-y: -135px;
  }

  .recommendScenicSpot > strong > span {
    top: 11px;
    width: 21px;
    height: 18px;
    background-position-y: -266px;
  }

  .placeOfFormation > strong > span,
  .productBrand > strong > span {
    top: 11px;
    width: 21px;
    height: 18px;
    background-position-y: -233px;
  }

  .uitableCrowd > strong > span,
  .groupMode > strong > span,
  .themeOfPlay > strong > span,
  .hotelGrade > strong > span {
    top: 14px;
    width: 21px;
    height: 18px;
    background-position-y: -729px;
  }

  .lineCharacteristics > strong > span {
    top: 10px;
    width: 21px;
    height: 18px;
    background-position-y: -794px;
  }

  .tartsTheCityList > a,
  .numberOfTravelDaysList > a,
  .recommendScenicSpotList > a,
  .placeOfFormationList > a,
  .productBrandList > a,
  .uitableCrowdList > a,
  .lineCharacteristicsList > a,
  .groupModeList > a,
  .themeOfPlayList > a,
  .hotelGradeList > a {
    float: left;
    margin-right: 10px;
    padding: 0 7px;
    color: #333;
  }

  .tartsTheCityList > a:hover,
  .numberOfTravelDaysList > a:hover,
  .recommendScenicSpotList > a:hover,
  .placeOfFormationList > a:hover,
  .productBrandList > a:hover,
  .uitableCrowdList > a:hover,
  .lineCharacteristicsList > a:hover,
  .groupModeList > a:hover,
  .themeOfPlayList > a:hover,
  .hotelGradeList > a:hover {
    color: #f60;
    background-color: #fffff5;
  }

  .aboutTourism .operationBox {
    width: 100px;
    position: absolute;
    top: 10px;
    right: 5px;
  }

  .aboutTourism .operationBox > a {
    float: left;
  }

  .operationBox .searchMore {
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: url("../../assets/img/icon (1).png") no-repeat 0 -303px;
  }

  .operationBox .searchMore.active {
    background-position: 0 -323px;
  }

  .operationBox .multiSelect {
    font: 12px/18px "微软雅黑";
    border: 1px solid #ccc;
    padding: 0 5px 0 15px;
    margin-left: 20px;
    border-radius: 5px;
    color: #626262;
    background: url("../../assets/img/add.png") no-repeat 4px 4px;
  }

  .operationBox .multiSelect:hover {
    color: #F60;
    background-position: 4px -16px;
  }

  .aboutTourism .selectMore {
    max-height: 125px;
    overflow: auto;
    padding-right: 122px;
    box-sizing: content-box;
    display: none;
  }

  .selectMoreSubmitBox {
    text-align: center;
  }

  .screeningRecommend {
    margin-top: 20px;
    border: 1px solid #eee;
  }

  .screeningRecommendType {
    font: 14px/35px "微软雅黑";
    border-bottom: 1px solid #eee;
  }

  .screeningRecommendType > a {
    float: left;
    width: 100px;
    text-align: center;
    border-right: 1px solid #eee;
    color: #666;
  }

  .screeningRecommendType > a.active {
    background-color: #38c249;
    color: #fff;
    font-weight: bold;
  }

  .searchType {
    padding: 10px 0 10px 30px;
  }

  .accordingToData {
    margin-top: 20px;
  }

  .accordingToData > li {
    float: left;
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
  }

  .accordingToData > li > div {
    float: left;
  }

  .accordingToDataBox {
    width: 200px;
    position: relative;
    margin-top: 5px;
  }

  .accordingToDataBox > span {
    position: absolute;
    top: 0;
    left: 0;
    font: 12px/18px "微软雅黑";
    padding: 0 3px;
    background-color: #2dbb55;
    color: #fff;
  }

  .accordingToDataContent {
    width: 450px;
    margin-left: 15px;
  }

  .accordingToDataContent > h4 {
    font: 16px/24px "微软雅黑";
  }

  .accordingToDataContent > h4 > span {
    color: #ff0000;
  }

  .accordingToDataContent > h4 > strong {
    color: #2e9700;
  }
  .accordingToDataContent > h4 > strong.active {
    color: #ff0000;
  }
  .activeTypeList {
    font: 12px/16px "微软雅黑";
    margin: 5px 0;
  }

  .activeTypeList > li {
    float: left;
    border: 1px solid #ffb622;
    padding: 0 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    margin-right: 10px;
    color: #ff8800;
  }

  .accordingToData > li:hover {
    cursor: pointer;
    background-color: #fffff5;
  }

  .accordingToData > li:hover h4 strong {
    color: #ff0000;
  }

  .priceRecommend {
    width: 200px;
  }

  .describeWrap {
    overflow: hidden;
    font: 14px/20px "微软雅黑";
  }
  .describeWrap p{
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .describeWrap span{
    margin: 5px 0;
  }
  .goPlace {
    color: #2e9700;
  }

  .describe {
    color: #666;
  }

  .containsAttractions {
    white-space: nowrap;
  }

  .goTimeA {
    display: block;
    white-space: nowrap;
  }

  .priceRecommend {
    margin-left: 20px;
  }

  .priceRecommend > strong {
    font: 12px/3 "微软雅黑";
    text-align: right;
    display: block;
    color: #f80;
  }

  .priceRecommend > strong > em {
    font-size: 20px;
  }

  .priceRecommend > strong > span {
    color: #666666;
  }

  .satisfactionBox {
    background-color: #f6f6f6;
    border: 1px solid #eeeeee;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .satisfactionBox > div {
    float: left;
    padding: 10px;
    font: 14px/1.3 "微软雅黑";
  }

  .satisfactionBox > div:first-of-type {
    width: 70px;
    border-right: 1px dashed #dddddd;
  }

  .satisfactionBox > div:nth-of-type(2) {
    width: 128px;
    color: #999999;
  }

  .satisfactionNumber {
    color: #999999;
  }

  .satisfactionNumber > strong {
    color: #666666;
    font-weight: bold;
  }

  .satisfactionBox > div:nth-of-type(2) em {
    color: #666666;
  }

  .HeelTourSearchMoreWrapRecommend {
    float: right;
    width: 255px;
  }

  .recommendSatisfaction {
    font: 12px/2 "微软雅黑";
    color: #666;
  }

  .satisfaction {
    color: #f80;
  }

  .satisfaction em {
    font-size: 20px;
    font-weight: bold;
  }


</style>
