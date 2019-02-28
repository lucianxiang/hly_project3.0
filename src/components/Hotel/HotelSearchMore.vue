<template>
  <div>
    <div class="searchHotelWrap">
      <div class="searchHotelWrapContent">
        <!--选择推荐-->
        <ul class="aboutTourism clearfix">
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
          <!--主题-->
          <li class="tartsTheCity" v-show="isThemeList">
            <strong><span></span>主题</strong>
            <div class="tartsTheCityList clearfix">
              <a href="javascript:;" v-for="item,index in themeTypeList" @click="changeThemeType(item)">{{item.ht_tt_Name}}</a>
            </div>
          </li>
          <li class="tartsTheCity" v-show="isRoomFacilities">
            <strong><span></span>房间设施</strong>
            <div class="tartsTheCityList clearfix">
              <a href="javascript:;" v-for="item,index in roomHardList" @click="changeRoomHard(item)">{{item.ht_rh_Name}}</a>
            </div>
          </li>

          <li class="tartsTheCity" v-show="isStar">
            <strong><span></span>档次</strong>
            <div class="tartsTheCityList clearfix">
              <a href="javascript:;" v-for="item,index in starList" @click="changeStarList(item)">{{item.name}}</a>
            </div>
          </li>

          <li class="tartsTheCity" v-for="item,index in introduceList" v-show="item.isIntroduceList">
            <strong><span></span>{{item.ht_it_Name}}</strong>
            <div class="tartsTheCityList clearfix">
              <a href="javascript:;" v-for="v,n in item.SubArray" @click="changeIntroduce(v,item)">{{v.ht_it_Name}}</a>
            </div>
          </li>
        </ul>
        <!--酒店推荐-->
        <div class="HotelRecommend clearfix">
          <!--酒店推荐详情-->
          <div class="HotelRecommendDetalis">
            <ul class="HotelRecommendDetalisNav clearfix">
              <li v-for="item,index in HotelRecommendDetalisNav" @click="changeType(index)" :class="{active:index==m}">
                {{item}}
              </li>
              <li>
                <el-checkbox>立即确认</el-checkbox>
              </li>
              <li>
                <el-checkbox>促销</el-checkbox>
              </li>
            </ul>
            <ul class="HotelRecommendDetalisList clearfix" v-loading="isLoading">
              <li v-for="item,index in searchData">
                <a href="javascript:;" class="HotelRecommendDetalisListImgBox">
                  <img width="262" height="175" v-lazy="item.ht_ht_OneImageUrl">
                  <em class="HotelRecommendDetalisListImgBoxsMask" @click="lookImages(item.ht_ht_ImageUrl)">查看更多图片</em>
                </a>
                <div class="HotelRecommendDetalisListIntroduceBox">
                  <div class="HotelRecommendDetalisListIntroduceBoxTitle clearfix">
                    <span class="HotelRecommendDetalisListIntroduceBoxTitleNum">{{index + 1}}</span>
                    <h4><a href="javascript:;" @click="goHotelDetails(item)">{{item.ht_ht_HotelName}}</a></h4>
                  </div>
                  <p class="HotelRecommendDetalisListIntroduceBoxDescribe">
                    {{item.ht_ht_HotelAddress}}
                  </p>
                  <!--<el-popover-->
                    <!--placement="right"-->
                    <!--trigger="click">-->
                    <!--<a href="javascript:;" slot="reference" style="padding: 10px 0 ;color: green;width: 60px"-->
                       <!--@click="lookMap(item)">查看地图</a>-->
                    <!--<div id="allmap"  slot="reference"></div>-->
                  <!--</el-popover>-->

                  <div class="HotelRecommendDetalisListIntroduceBoxIconList clearfix" style="padding-top: 10px">
                    <i :class="item.className" :title="item.title" v-for="item in item.ht_ht_newIcoArry"></i>
                  </div>
                </div>
                <div class="HotelRecommendPrice">
                  <strong class="HotelRecommendPriceMoney">¥<span>{{item.ht_ht_RecommendPrice}}</span>起</strong>
                  <div class="scoreDetails clearfix">
                    <span class="score">0/5分</span>
                    <div class="scoreDetailsContent">
                      <i></i>
                      <div class="clearfix">
                        <span>环境卫生 : <em>4.3</em></span>
                        <span>服务质量 : <em>4.3</em></span>
                        <span>设备设施 : <em>4.3</em></span>
                        <span>位置交通 : <em>4.3</em></span>
                      </div>
                    </div>
                  </div>
                  <span class="commentNumber">来自<em>0</em>条评论</span>
                  <a href="javascript:;" @click="goHotelDetails(item)">查看详情</a>
                </div>
              </li>
            </ul>
            <!--分页-->
            <div class="block" style="float: right;padding-top: 20px;padding-bottom: 25px">
              <el-pagination
                @current-change="handleCurrentChange"
                :page-size="20"
                background
                layout="total, prev, pager, next"
                :total="total"
                v-show="total"
              >
              </el-pagination>
            </div>
            <div v-show="!searchData.length" class="noValue">暂无数据</div>
          </div>
          <!--酒店所在地图-->
          <div class="HotelRecommendMap"></div>
        </div>
      </div>
    </div>
    <el-dialog
      title="酒店图片"
      :visible.sync="showHotelImage"
      width="1040px">
      <div class="clearfix">
        <div class="bigImageBox">
          <div class="topImage" @click="topImage">&lt;</div>
          <img :src="imgUrl">
          <div class="nextImage" @click="nextImage">&gt;</div>
        </div>
        <div class="hotelImageBox">
          <div class="imgType clearfix">
            <a href="javascript:;" v-for="item,index in hotelImage" @click="showHotelImageMethods(item,index)" :class="{active:index==n}">{{item.ht_hi_ImageTypeName}}({{item.newSubArray.length}})</a>
          </div>
          <div class="corImage">
            <a href="javascript:;" v-for="item,index in imgUrlList" :class="{active:index==m}" @click="clickImgUrlList(item,index)">
              <img :src="item">
            </a>
          </div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: mapGetters([
      'themeTypeList',
        'roomHardList',
      'introduceList',
      'hotelSearchMoreIcon',
      'searchData'
    ]),
    data() {
      return {
        hotelImage:[],
        m:0,
        n:0,
        showHotelImage:false,
        imgUrl:'',
        imgUrlList:[],
        starList:[
          {
            name:'不限',
            value:''
          },
          {
            name:'一星级/普通型',
            value:1
          },
          {
            name:'二星级/经济型',
            value:2
          },
          {
            name:'三星级/舒适型',
            value:3
          },
          {
            name:'四星级/高档型',
            value:4
          },
          {
            name:'五星级/豪华型',
            value:5
          },
        ],
        newStarList:[
          {
            name:'不限',
            value:''
          },
          {
            name:'一星级/普通型',
            value:1
          },
          {
            name:'二星级/经济型',
            value:2
          },
          {
            name:'三星级/舒适型',
            value:3
          },
          {
            name:'四星级/高档型',
            value:4
          },
          {
            name:'五星级/豪华型',
            value:5
          },
        ],
        tags:[],
        checkList: [],
        isSelectCityList:true,
        isRoomFacilities:true,
        isThemeList:true,
        isStar:true,
        total: 0,
        checked: false,
        isLoading: false,
        roomHardRadio: '',
        themeTypeRadio: '',
        IntroduceId: '',
        value1: '',
        value2: '',
        n: 0,
        destinationTypeList: [
          '热门',
          '港澳台',
          'ABC',
          'DEFG',
          'HJK',
          'LMN',
          'PQRS',
          'TWX',
          'YZ'
        ],
        hotCityList: [
          '北京',
          '上海',
          '广州',
          '深圳',
          '杭州',
          '南京',
          '厦门',
          '三亚',
          '香港',
          '苏州',
          '武汉',
          '西安',
          '成都',
          '青岛',
          '大连',
          '重庆',
          '无锡',
          '沈阳'
        ],
        AllCityList: [
          '阿坝',
          '阿克苏',
          '阿拉尔',
          '阿拉善',
          '阿勒泰',
          '阿里',
          '安康',
          '安庆',
          '鞍山',
          '安顺',
          '安阳'
        ],
        SubArray: [],
        AdministrativeArea: '',
        isAdministrativeArea: false,
        HotelRecommendDetalisNav: [
          '推荐',
          '口碑',
          '价格',
          '最近装修'
        ],
        m: 0,
        ht_it_IDList:[],
        searchOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ht_it_ID": "",//推荐类型
          "ht_tt_ID": "",//主题
          //"ht_hd_ID":"1",//设施
          //"ht_ht_HotelName":"乌镇",//模糊搜索酒店名称
          sm_af_AreaID: '',//城市
          ht_ht_Stars:'',
          "ht_rh_ID": "",//房间设施
          "page": "1", //页面编号  默认为 1
          "rows": "20",//单页显示数据数量
        }
      }
    },
    watch:{
//      ht_it_IDList(){
//        if(this.ht_it_IDList.length){
//          this.ht_it_IDList = [...new Set(this.ht_it_IDList)]
//          this.searchOptions.ht_it_ID = this.ht_it_IDList.join(',')
//          this.searchDataList(this.searchOptions)
//        }
//      }
    },
    created() {
      if(this.$route.query.cityId){
        let id = this.$route.query.cityId;
        this.searchOptions.sm_af_AreaID = id;
      }
      let name = this.$route.query.keycode;
      if (name) {
        this.searchOptions.ht_ht_HotelName = name;
      }
      //初始化数据
      this.$store.commit('showLoading')
      this.initData().then(() => {
        this.$store.commit('hideLoading')
        this.searchDataList(this.searchOptions)
      })
    },
    methods: {
      //上一张
      topImage(){
        if(this.m<=0){
          this.m = 0
          return;
        }
        this.m--;
        this.imgUrl = this.imgUrlList[this.m]
      },
      //下一张
      nextImage(){
        if(this.m>=this.imgUrlList.length-1){
          return;
        }
        this.m++;
        this.imgUrl = this.imgUrlList[this.m]

      },
      //查询更多图片
      lookImages(arr){
        let resulte =arr.slice();
        for(var i=0;i<resulte.length;i++){
          if(resulte[i].SubArray.length){
            resulte[i].newSubArray = resulte[i].SubArray[0].ht_hi_ImageURL.split(',')
          }
        }
        let obj = {
          ht_hi_ImageTypeName:'所有',
          newSubArray:[]
        }
        for(var i=0;i<resulte.length;i++){
          if(resulte[i].newSubArray.length){
            let newArr = resulte[i].SubArray[0].ht_hi_ImageURL.split(',')
            obj.newSubArray.push(...newArr)
          }
        }
        resulte.unshift(obj)
        this.hotelImage = resulte;
        this.imgUrl = '';
        this.imgUrlList=[];
        this.m = 0;
        this.n = 0;
        this.imgUrl = this.hotelImage[0].newSubArray[0];
        this.imgUrlList = this.hotelImage[0].newSubArray
        this.showHotelImage = true;
      },
      //点击弹窗导航
      showHotelImageMethods(item,index){
        this.m = 0;
        this.imgUrl = item.newSubArray[0]
        this.imgUrlList =  item.newSubArray
        this.n=index
      },
      //点击弹窗图片
      clickImgUrlList(item,index){
        this.m = index
        this.imgUrl = item
      },
      //查询地图
      searchMap(hotelModel) {
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(hotelModel.ht_ht_Longitude, hotelModel.ht_ht_Latitude);
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.centerAndZoom(point, 20);
        setTimeout(function () {
          map.setZoom(14);
        }, 2000);  //2秒后放大到14级
        map.enableScrollWheelZoom(true);
        var opts = {
          width: 200,     // 信息窗口宽度
          height: 100,     // 信息窗口高度
          title: hotelModel.ht_ht_HotelName, // 信息窗口标题
          enableMessage: true,//设置允许信息窗发送短息
          message: "亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
        };
        var infoWindow = new BMap.InfoWindow(`地址：${hotelModel.ht_ht_HotelAddress}`, opts);  // 创建信息窗口对象
        marker.addEventListener("click", function () {
          map.openInfoWindow(infoWindow, point); //开启信息窗口
        });
      },
      //查看地图
      lookMap(item) {
        this.searchMap(item)
      },
      //分页
      handleCurrentChange(num) {
        this.searchOptions.page = num;
        this.searchDataList(this.searchOptions)
      },
      //选中主题
      changeThemeType(item) {
        item.type = 'success';
        item.theID = 1;
        item.name = '主题:'+item.ht_tt_Name;
        this.isThemeList = false;
        this.tags.push(item);
        this.searchOptions.ht_tt_ID = item.ht_tt_ThemeID;
        this.searchDataList(this.searchOptions)
      },
      //选中房间设施
      changeRoomHard(item) {
        item.type = 'success';
        item.theID = 2;
        item.name = '房间设施:'+item.ht_rh_Name;
        this.isRoomFacilities = false;
        this.tags.push(item);
        this.searchOptions.ht_rh_ID = item.ht_rh_ID;
        this.searchDataList(this.searchOptions)
      },
      //选中档次
      changeStarList(item){
        item.type = 'success';
        item.theID = 3;
        item.name = '档次:'+item.name;
        this.isStar = false;
        this.tags.push(item);
        this.searchOptions.ht_ht_Stars = item.value;
        this.searchDataList(this.searchOptions)
      },
      handleClose(obj){
        switch (obj.theID) {
          case 1:
            //主题
            this.tags = this.tags.filter(item => {
              if (item.theID == obj.theID) {
                return false
              }
              return true;
            });
            this.isThemeList = true;
//            this.this.ht_it_IDList.filter(item=>{
//
//            })
            this.searchOptions.ht_tt_ID = '';
            this.searchDataList(this.searchOptions);
            this.initData()
            break;
          case 2:
            //房间设施
            this.tags = this.tags.filter(item => {
              if (item.theID == obj.theID) {
                return false
              }
              return true;
            });
            this.isRoomFacilities = true;
            this.searchOptions.ht_rh_ID = '';
            this.searchDataList(this.searchOptions);
            this.initData()
            break;
          case 3:
            //档次
            this.tags = this.tags.filter(item => {
              if (item.theID == obj.theID) {
                return false
              }
              return true;
            });
            this.isStar = true;
            this.searchOptions.ht_ht_Stars = '';
            this.starList = this.newStarList
            this.searchDataList(this.searchOptions);
            this.initData();
            break;
          default:
            this.tags = this.tags.filter(item => {
              if (item.theID == obj.theID) {
                return false
              }
              return true;
            });
            this.ht_it_IDList = this.ht_it_IDList.filter(item=>{
              if(item==obj.ht_it_ID){
                return false
              }
              return true
            })
            this.$store.commit('setIntroduceList',obj)
            this.ht_it_IDList = [...new Set(this.ht_it_IDList)]
            this.searchOptions.ht_it_ID =  this.ht_it_IDList.join(',');
            this.searchDataList(this.searchOptions);
            this.initData()
        }
      },
      //选中推荐类型
      changeIntroduce(item,obj) {
        item.type = 'success';
        item.theID = obj.index+3;
        item.name = obj.ht_it_Name+':'+item.ht_it_Name;
        this.$store.commit('setIntroduceList',obj)
        this.tags.push(item);
        this.ht_it_IDList.push(item.ht_it_ID);
        this.ht_it_IDList = [...new Set(this.ht_it_IDList)]
        this.searchOptions.ht_it_ID =  this.ht_it_IDList.join(',');
        this.searchDataList(this.searchOptions);
      },
      searchDataList(options) {
        this.isLoading = true;
        this.$store.dispatch('initSearchData', options)
          .then((total) => {
            this.total = total;
            this.isLoading = false;
          })
      },
      async initData() {
        //筛选条件
        let initHotelSearchFilterInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
        };
        await this.$store.dispatch('initHotelSearchFilterInfo', initHotelSearchFilterInfo)
      },
      goHotelDetails(item) {
        const {href} = this.$router.resolve({
          name: 'HotelDetalis',
          params: {id: item.ht_ht_hotelID}
        });
        window.open(href, '_blank')
//        this.$router.push({name: 'HotelDetalis', params: {id: item.ht_ht_hotelID}})
      },
      changeCity() {
      },
      changeClass(index) {
        this.n = index;
      },
      changeType(index) {
        this.m = index;
      }
    },
  }
</script>
<style scoped>
  .tartsTheCityList > a{
    float: left;
    margin-right: 10px;
    padding: 0 7px;
    color: #333;
  }
  .tartsTheCityList{
    height: 42px;
  }

  .tartsTheCityList > a:hover{
    color: #f60;
    background-color: #fffff5;
  }

  .tartsTheCity > strong > span {
    top: 10px;
    width: 22px;
    height: 23px;
    background-position-y: -165px;
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
  .noValue {
    line-height: 60px;
    font-size: 20px;
    text-align: center;
    font-weight: bold;
  }

  .el-radio.is-bordered + .el-radio.is-bordered {
    margin-top: 5px;
  }

  .searchHotelWrap {
    width: 100%;
    /*background-color: #f9f9f9;*/
  }

  .searchHotelWrapContent {
    width: 1200px;
    margin: 0 auto;
    padding-top: 20px;
    background-color: #fff;
  }

  .searchHotel {
    padding: 14px 0;
    background-color: #38414c;
    margin-top: 20px;
  }

  .searchHotel > li {
    float: left;
    margin-left: 15px;
  }

  .searchHotel > li span {
    color: #fff;
  }

  .destinationBox {
    width: 719px;
    position: absolute;
    top: 40px;
    left: 45px;
    background-color: #fff;
    padding: 13px;
    border: 1px solid #b9bcbe;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    display: none;
  }

  .destinationBox > strong {
    font: 15px/25px "微软雅黑";
    color: #000;
  }

  /*目的地类型*/

  .destinationTypeList {
    margin-bottom: 14px;
    margin-top: 9px;
  }

  .destinationTypeList li {
    font: 15px/2 "微软雅黑";
    float: left;
  }

  .destinationTypeList li a {
    text-align: center;
    width: 75px;
    color: #5e5d5d;
    background-color: #e3e3e3;
    margin-right: 1px;
  }

  .destinationTypeList li .active {
    background-color: #2dbb55;
    color: #fff;
  }

  .hotCityList {
    display: none;
    font: 15px/2 "微软雅黑";
  }

  /*热门城市*/

  .hotCityList a {
    width: 75px;
    text-align: center;
    float: left;
    color: #404040;
  }

  .hotCityList a:hover {
    color: #f60;
  }

  .HongKongMacaoAndTaiwan {
    font: 15px/2 "微软雅黑";
    margin-left: 10px;
    display: none;
  }

  .HongKongMacaoAndTaiwan > strong {
    font-weight: bold;
    color: #666;
  }


  .HongKongMacaoAndTaiwan > a {
    color: #404040;
    width: 75px;
  }

  .HongKongMacaoAndTaiwan > a:hover {
    color: #f60;
  }

  .taiwan li > * {
    float: left;
  }

  .taiwan li > a {
    width: 75px;
    color: #404040;
  }

  .taiwan li > a:hover {
    color: #f60;
  }

  .taiwan li > strong {
    margin-right: 14px;
    color: #808080;
  }

  .allCityList {
    position: relative;
    font: 15px/2 "微软雅黑";
  }

  .allCityList li:first-of-type {
    position: absolute;
    top: 0;
    left: 0;
    color: #f60;
  }

  .allCityList li {
    float: left;
  }

  .allCityList li a {
    width: 75px;
    text-align: center;
    color: #404040;
  }

  .allCityList li a:hover {
    color: #f60;
  }

  /*条件查询*/

  .searchOptionWrap {
    padding: 20px;
    border: 1px solid #ccc;
    padding-bottom: 0;
    border-bottom: 1px solid #e6e6e6;
  }

  .searchOption {
    border-bottom: 1px solid #f3f3f3;
  }

  .searchOption > li {
    float: left;
    width: 100%;
    padding: 10px 0;
  }

  .searchOption > li > strong {
    font-size: 14px;
    color: #aaa;
    display: inline-block;
    text-align: left;
    float: left;
  }

  .searchOption > li > div {
    float: right;
  }

  .searchOption > li > a {
    width: 117px;
    display: inline-block;
    position: relative;
    padding-right: 17px;
    color: #666;
    margin-right: 55px;
    padding-bottom: 3px;
    font: 14px/2 "微软雅黑";
    text-indent: 10px;
    margin-left: 20px;
  }

  .searchOption > li > .active {
    background-color: #f0f4fb;
    color: #34c05c;
  }

  .searchOption > li > .active > i {
    background: url("../../assets/img/hotelDatelisIcon.png") no-repeat -131px -61px;
  }

  .searchOption a i {
    position: absolute;
    left: 70px;
    top: 13px;
    width: 7px;
    height: 4px;
    background: url("../../assets/img/hotelDatelisIcon.png") no-repeat -141px -61px;
  }

  .moreCheckbox {
    background-color: #f0f4fb;
    padding: 10px;
    margin-left: 60px;
  }

  .moreCheckbox > * {
    width: 150px;
    margin-left: 0;
  }

  .searchNumber {
    font: 12px/40px "微软雅黑";
    color: #666;
  }

  .searchNumber em {
    color: green;
    font-weight: bold;
    padding: 0 5px;
  }

  /*酒店推荐*/

  .HotelRecommend {
    margin-top: 20px;
  }

  .HotelRecommendDetalis {
    float: left;
    width: 910px;
  }

  .HotelRecommendDetalisNav {
    border: 1px solid #e6e6e6;
    font: 12px/40px "微软雅黑";
  }

  .HotelRecommendDetalisNav li:hover {
    cursor: pointer;
  }

  .HotelRecommendDetalisNav li {
    width: 80px;
    float: left;
    border-right: 1px solid #f5f5f5;
    text-align: center;
  }

  .HotelRecommendDetalisNav .active {
    color: #2dbb55;
    font-weight: bold;
  }

  .HotelRecommendDetalisNav li:nth-of-type(5),
  .HotelRecommendDetalisNav li:nth-of-type(6) {
    float: right;
    border: none;
    margin-right: 20px;
  }

  .HotelRecommendDetalisList li {
    margin-top: 15px;
    float: left;
    width: 100%;
    border: 1px solid #e6e6e6;
  }

  .HotelRecommendDetalisList > li:hover {
    box-shadow: 0 0 5px #f60;
  }

  .HotelRecommendDetalisList > li:hover .HotelRecommendDetalisListIntroduceBoxTitle a {
    color: #f60;
  }

  .HotelRecommendDetalisList > li:hover .HotelRecommendDetalisListIntroduceBoxTitleNum {
    background-position-x: -322px;
  }

  .HotelRecommendDetalisListImgBox {
    float: left;
    position: relative;
    margin-right: 40px;
  }

  .HotelRecommendDetalisListImgBoxsMask {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 24px;
    font: 12px/2 "微软雅黑";
    text-align: center;
    color: #fff;
    background-color: rgba(0, 0, 0, .5);
  }

  /*.HotelRecommendDetalisListIntroduceBoxIconList > i {*/
  /*float: left;*/
  /*width: 24px;*/
  /*height: 24px;*/
  /*background: url("../../assets/img/hotel-facility.png") no-repeat;*/
  /*margin-right: 5px;*/
  /*}*/

  .HotelRecommendDetalisListIntroduceBox {
    width: 426px;
    float: left;
    margin-top: 9px;
  }

  .HotelRecommendDetalisListIntroduceBoxTitle > * {
    float: left;
  }

  .HotelRecommendDetalisListIntroduceBoxTitle {
    line-height: 22px;
    margin-bottom: 8px;
    font-family: "微软雅黑";
  }

  .HotelRecommendDetalisListIntroduceBoxTitleNum {
    width: 18px;
    height: 21px;
    background: url("../../assets/img/hotelDatelisIcon.png") no-repeat -298px -40px;
    color: #fff;
    text-align: center;
    font: 12px/21px "microsoft yahei";
  }

  .HotelRecommendDetalisListIntroduceBoxTitle > h4 > a {
    font-size: 16px;
    font-weight: bold;
    color: #4c5a65;
    margin-left: 5px;
  }

  .HotelRecommendDetalisListIntroduceBoxTitleType {
    font-size: 14px;
    color: #999999;
    margin: 0 15px;
  }

  .HotelRecommendDetalisListIntroduceBoxTitleRenovation {
    font-size: 14px;
    color: #666;
  }

  .HotelRecommendDetalisListIntroduceBoxDescribe {
    font: 14px/21px "微软雅黑";
    color: #666666;
  }

  .HotelRecommendDetalisListIntroduceBox > a {
    font: 12px/26px "微软雅黑";
    color: #2dbb55;
    margin-bottom: 8px;
  }

  /*spa*/

  /*.HotelRecommendDetalisListIntroduceBoxIconList > .spa {*/
  /*background-position: -72px 0;*/
  /*}*/

  /*!*公交*!*/

  /*.HotelRecommendDetalisListIntroduceBoxIconList > .transit {*/
  /*background-position: -408px 0;*/
  /*}*/

  .HotelRecommendPrice {
    padding-top: 3px;
    float: left;
    width: 179px;
    border-left: 1px dashed #ccc;
    margin-top: 10px;
    height: 140px;
  }

  .HotelRecommendPriceMoney {
    font: 14px/38px "微软雅黑";
    color: #f60;
    display: block;
    text-align: center;
  }

  .HotelRecommendPriceMoney > span {
    font-size: 25px;
    font-weight: bold;
  }

  .HotelRecommendPrice > .scoreDetails {
    transform: translateX(65px);
  }

  .HotelRecommendPrice > .scoreDetails > span {
    float: left;
    font: 12px/20px "微软雅黑";
    color: #999;
  }

  .scoreDetailsContent {
    float: left;
    position: relative;
    margin-left: 3px;
  }

  .scoreDetailsContent:hover div {
    display: block;
  }

  .scoreDetailsContent:hover i {
    cursor: pointer;
  }

  .scoreDetailsContent > div {
    display: none;
    position: absolute;
    left: -7px;
    top: 20px;
    width: 280px;
    font: 16px/30px "微软雅黑";
    padding: 8px 22px;
    background-color: #fff;
    border: 1px solid #ffdbb2;
    color: #999999;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .scoreDetailsContent > div::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-left: 1px solid #ffdbb2;
    border-top: 1px solid #ffdbb2;
    top: -5px;
    left: 10px;
    transform: rotate(45deg);
    background-color: #fff;
  }

  .scoreDetailsContent > div em {
    color: #fe9010;
  }

  .scoreDetailsContent > div > span {
    float: left;
  }

  .scoreDetailsContent > div > span:nth-of-type(2n) {
    margin-left: 30px;
  }

  .scoreDetailsContent > i {
    display: block;
    width: 15px;
    height: 16px;
    background: url("../../assets/img/hotelDatelisIcon.png") no-repeat -75px -49px;
  }

  .commentNumber {
    display: block;
    text-align: center;
    font: 14px/22px "微软雅黑";
    color: #cccccc;
    margin-bottom: 4px;
  }

  .commentNumber > em {
    color: #2dbb55;
  }

  .HotelRecommendPrice > a {
    width: 100px;
    font: bold 14px/2.3 "微软雅黑";
    background-color: #f60;
    color: #fff;
    text-align: center;
    margin: 0 auto;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  /*酒店地图*/
  .HotelRecommendMap {
    float: right;
  }
  .bigImageBox {
    float: left;
    position: relative;
  }

  .bigImageBox > img {
    width: 480px;
    height:320px;
  }

  .bigImageBox > .topImage {
    position: absolute;
    left: 0;
    top: 50%;
    font: bold 25px/2 "微软雅黑";
    color: #fff;
    background-color: rgba(0,0,0,.5);
    padding: 0 20px;
    transform: translateY(-50%);
  }

  .bigImageBox > .topImage:hover,
  .bigImageBox > .nextImage:hover{
    cursor: pointer;
  }

  .bigImageBox > .nextImage {
    position: absolute;
    right: 0;
    top: 50%;
    font: bold 25px/2 "微软雅黑";
    color: #fff;
    background-color: rgba(0,0,0,.5);
    padding: 0 20px;
    transform: translateY(-50%);
  }

  .hotelImageBox {
    float: left;
    margin-left: 20px;
    width: 500px;
  }

  .imgType {
    font: 12px/30px "微软雅黑";
    margin-bottom: 10px;
  }

  .imgType > a {
    float: left;
    width: 95px;
    margin-right: 5px;
    text-align: center;
    background-color: #eee;
    margin-bottom: 5px;
  }

  .imgType > a.active {
    color: #fff;
    background-color: #f80;
  }

  .corImage {
    height: 288px;
    overflow: auto;
  }

  .corImage > a {
    float: left;
    width: 153px;
    height: 88px;
    margin: 0 8px 8px 0;
  }

  .corImage > a.active {
    border: 3px solid #f80;
  }

  .corImage img{
    width:100%;
    height: 100%;
  }

</style>
