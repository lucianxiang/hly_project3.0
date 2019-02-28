<template>
  <div>
    <div class="AdmissionTicketMoreWrap clearfix">
      <!--LeftCity-->
      <div class="ScenicSpotList">
        <!--景点分类-->
        <div class="ScenicSpotType">
          <strong>景点分类</strong>
          <dl>
            <dt>当前搜索城市<a href="javascript:;">[{{regionClassificationList.tm_ts_ProviceName}}]</a></dt>
            <dd v-for="item,index in regionClassificationList.cityList"><a :class="{typeActive:cityIdActive == index}"
                                                                           href="javascript:;"
                                                                           @click="addCityActive(item,index)">{{item.cityName}}({{item.count}})</a>
            </dd>
            <dt>按主题</dt>
            <dd
              v-for="item,index in themeList"
            >
              <a
                :class="{typeActive:themeTypeIdActive == index}"
                href="javascript:;"
                @click="addThemeTypeActive(item,index)

              ">{{item.tm_tt_Name}}</a>
            </dd>
          </dl>
        </div>
        <!--&lt;!&ndash;景点大全&ndash;&gt;-->
        <!--<div class="AllScenicSpotType">-->
        <!--<strong>景点大全</strong>-->
        <!--<dl>-->
        <!--<dt>华东</dt>-->
        <!--<dd v-for="item,index in cityList.eastChinaList"><a href="javascript:;">{{item}}</a></dd>-->
        <!--<dt>华北</dt>-->
        <!--<dd v-for="item,index in cityList.northChinaList"><a href="javascript:;">{{item}}</a></dd>-->
        <!--<dt>华中</dt>-->
        <!--<dd v-for="item,index in cityList.centralChinaList"><a href="javascript:;">{{item}}</a></dd>-->
        <!--<dt>华南</dt>-->
        <!--<dd v-for="item,index in cityList.southChinaList"><a href="javascript:;">{{item}}</a></dd>-->
        <!--<dt>东北</dt>-->
        <!--<dd v-for="item,index in cityList.northeastList"><a href="javascript:;">{{item}}</a></dd>-->
        <!--<dt>西南</dt>-->
        <!--<dd v-for="item,index in cityList.southwestList"><a href="javascript:;">{{item}}</a></dd>-->
        <!--<dt>西北</dt>-->
        <!--<dd v-for="item,index in cityList.northwestList"><a href="javascript:;">{{item}}</a></dd>-->
        <!--<dt>港澳</dt>-->
        <!--<dd v-for="item,index in cityList.hongKongAndMacaoList"><a href="javascript:;">{{item}}</a></dd>-->
        <!--<dt>境外</dt>-->
        <!--<dd v-for="item,index in cityList.abroadList"><a href="javascript:;">{{item}}</a></dd>-->
        <!--</dl>-->
        <!--</div>-->
      </div>
      <!--RightRecommend-->
      <div class="RecommendScenicSpot">
        <div class="propList">

          <div class="aboutScenicSpot clearfix">
            <strong>景点主题:</strong>
            <ul class="propListScenicSpotList">
              <li v-for="item,index in themeList">
                <a
                  href="javascript:;"
                  :class="{cityActive:themeTypeIdActive == index}"
                  @click="addThemeActive(item,index)"
                >{{item.tm_tt_Name}}</a>
              </li>
            </ul>
          </div>
          <div class="aboutScenicSpot clearfix">
            <strong>景点地区:</strong>
            <ul class="propListScenicSpotList">
              <li v-for="item,index in seleteShowProvinceList">
                <a
                  :class="{cityActive:ticketActive == index}"
                  href="javascript:;"
                  @click="changeProvince(item,index)"
                >{{item.sm_af_AreaName}}</a></li>
            </ul>
          </div>
          <div class="aboutScenicSpot clearfix">
            <strong>所属城市:</strong>
            <ul class="propListScenicSpotList">
              <li v-for="item,index in seleteShowCtiyList">
                <a
                  href="javascript:;"
                  :class="{cityActive:cityActive == index}"
                  @click="addProvinceCityActive(item,index)"
                >{{item.sm_af_AreaName}}</a>
              </li>
            </ul>
          </div>
        </div>
        <!--条件筛选-->
        <div class="screenAdmissionTicketType clearfix">
          <!--<div class="salesVolume"><a href="javascript:;" title="按销量排序">销量</a></div>-->
          <!--<div class="comment"><a href="javascript:;" title="按点评数排序">点评</a></div>-->
          <!--<div class="satisfied"><a href="javascript:;" title="按满意度排序">满意</a></div>-->
          <!--<div class="price"><a href="javascript:;" title="按价格排序">价格</a></div>-->
          <!--<div class="priceRange clearfix">-->
          <!--<input type="text" placeholder="请输入价格"><em>-</em><input type="text" placeholder="请输入价格">-->
          <!--<button>确定</button>-->
          <!--</div>-->
          <div class="block">
            <el-pagination
              @current-change="changeTotal"
              :page-size="5"
              layout="total, prev, pager, next"
              :total="total"
              v-show="total"
            >
            </el-pagination>
          </div>
        </div>
        <!--数据-->
        <p v-show="!admissionTicketMoreList[0]" class="noData">暂无数据</p>
        <ul class="admissionTicketList" v-loading="isLoading">
          <li v-for="item in admissionTicketMoreList">
            <div class="scenicSpotDetils clearfix">
              <img width="90" height="50" v-lazy="item.imgArray[0]">

              <div class="scenicSpotAddress">
                <h6 class="clearfix">
                  <a href="javascript:;"
                                        @click="goDetils(item)">{{item.tm_ts_Name}}</a><span><em>[</em><a
                  href="javascript:;">{{item.tm_ts_ProviceName.substring(0, item.tm_ts_ProviceName.length - 1)}}</a><a
                  href="javascript:;">.{{item.tm_ts_CityName.substring(0, item.tm_ts_CityName.length - 1)}}</a><em>]</em></span>
                </h6>
                <div><strong>游客满意度：</strong><i>100%</i><span>,游客点评<em>132321</em>条</span></div>
                <p>景点地址:{{item.tm_ts_Address}}</p>
              </div>
              <div class="priceAndReserve">
                <strong>￥<span>129</span>起</strong>
                <!--<div class="QRCodeBtn">-->
                  <!--<a href="javascript:;">扫码预定<i></i></a>-->
                  <!--<div class="QRCodeReserve">-->
                    <!--<strong>惠乐游APP扫码预定</strong>-->
                    <!--<img src="../../assets/img/yii.png" width="187" height="187">-->
                  <!--</div>-->
                <!--</div>-->
              </div>
            </div>
            <div class="productNav clearfix">
              <strong>产品名称</strong>
              <span>景点报价</span>
              <span>乐游价</span>
            </div>
            <ul class="reserveInformationList">
              <li class="clearfix" v-for="v in item.tourSite_TicketTypeMXList">
                <div><a href="javacript:;" @click="goDetils(item)">{{v.tm_tt_Name}}</a></div>
                <span>¥{{v.tm_tt_TicketPrice}}</span>
                <strong>¥{{v.tm_tt_RealPrice}}</strong>
                <a href="javascript:;" @click="goDetils(item)">预订</a>
              </li>
            </ul>
            <!--<div class="reserveMore">-->
            <!--<a href="javascript:;">更多</a>-->
            <!--</div>-->
          </li>
        </ul>
        <!--分页-->
        <el-pagination
          style="text-align: right; margin-top: 20px;"
          background
          @current-change="changeTotal"
          layout="prev, pager, next"
          :total="total"
          :page-size="5"
          v-show="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/public'

  export default {
    computed: mapGetters([
      'admissionTicketMoreList',
      'regionClassificationList',
      'themeList',
      'seleteShowCtiyList',
      'seleteShowProvinceList'
    ]),
    data() {
      return {
        isLoading: false,
        total: 0,
        themeTypeID: '',
        proviceID: '',
        cityID: '',
        cityIdActive: 10000,
        themeTypeIdActive: 10000,
        ticketActive: 10000,
        cityActive: 10000,
      }
    },
    created() {
      if (this.$route.query.proviceID) {
        this.proviceID = this.$route.query.proviceID;
        let keycode = this.$route.query.keycode;
        this.themeTypeID = this.$route.query.themeTypeID
        this.initRegionClassification(this.proviceID);
        this.seleteShowCtiy(this.proviceID);
        if(this.themeTypeID){
          this.initData(this.themeTypeID, this.proviceID, this.cityID, 1)
        }
        if (keycode) {
          this.initData(this.themeTypeID, this.proviceID, this.cityID, 1, keycode);
        }
        if(!keycode&&!this.themeTypeID){
          this.initData(this.themeTypeID, this.proviceID, this.cityID, 1)
        }
      }  else {
        let addComp = JSON.parse(sessionStorage.getItem('addComp'));
        if(!addComp){
          this.getCity().then(cityName => {
            this.getCityID(cityName).then(data => {
              this.$store.commit('setText','拼命加载中');
              var data = data.data;
              if (Number(data.resultcode) == 200) {
                this.initRegionClassification(data.CityId);
                this.seleteShowCtiy(data.CityId);
              } else {
              }
            })
          });
        }else{
            this.getCityID(addComp.city).then(data => {
              this.$store.commit('setText','拼命加载中');
              var data = data.data;
              if (Number(data.resultcode) == 200) {
                this.initRegionClassification(data.CityId);
                this.seleteShowCtiy(data.CityId);
              } else {
              }
            })
        }

      }

//      else {
//        this.initData(this.themeTypeID, this.proviceID, this.cityID, 1);
//      }
//      主题
      this.initTheme();

      this.seleteShowProvince();
    },
    methods: {
      addCityActive(item, index) {
        this.cityIdActive = index;
        this.initData(this.themeTypeID, this.proviceID, item.cityID, 1);
      },
      addThemeTypeActive(item, index) {
        this.themeTypeIdActive = index;
        this.initData(item.tm_tt_ID, this.proviceID, this.cityID, 1);
      },
      addThemeActive(item, index) {
        this.themeTypeIdActive = index;
        this.initData(item.tm_tt_ID, this.proviceID, this.cityID, 1)
      },
      addProvinceCityActive(item,index){
        this.cityActive = index;
        this.initData(this.themeTypeID,this.proviceID,item.sm_af_AreaID,1)
      },
      //获取当前所在城市
      getCity() {
        return new Promise((relove, reject) => {
          this.$store.commit('showLoading')
          this.$store.commit('setText','获取当前位置中!请稍后...');
          var geolocation = new BMap.Geolocation();
// 创建地理编码实例
          var myGeo = new BMap.Geocoder();
          geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
              var pt = r.point;
// 根据坐标得到地址描述
              myGeo.getLocation(pt, function(result){
                if (result){
                  var addComp = result.addressComponents;
                  relove(addComp.city)
//                  alert(addComp.province + "," + addComp.city);
                }
              });
            }
          });
//          $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip=' + returnCitySN["cip"], () => {
//            relove(remote_ip_info.city + '市')
//          })
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
        return this.$http.post(getNewStr+'/HotelWebPage/SelectCity', JSON.stringify(options), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
      },
      //中国的所有省
      seleteShowProvince() {
        let options = {
          "areaPid": 3337
        };
        this.$store.dispatch('seleteShowProvince', options)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //选择的省下的市
      seleteShowCtiy(id) {
        let options = {
          "areaPid": id
        };
        this.$store.dispatch('seleteShowCtiy', options)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //分页
      changeTotal(num) {
        this.initData(this.themeTypeID, this.proviceID, this.cityID, num ? num : 1)
      },
      //按主题
      initTheme() {
        let getThemeTypeList = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ttID": "",
          "ttName": "",
          "isDelete": 0,
        };
        this.$store.dispatch('initTheme', getThemeTypeList)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //初始化地区分类
      initRegionClassification(id) {
        let getListPageAreaFullPlace = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_af_AreaID": id ? id : ''  //省ID
        };
        this.$store.dispatch('initRegionClassification', getListPageAreaFullPlace)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //初始化数据
      initData(themeTypeID, proviceID, cityID, page, keycode) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_ts_Name": keycode ? keycode : '',//景点名称中的关键字
          "tm_ts_ThemeTypeID": themeTypeID ? themeTypeID : '',//主题编码
          "tm_ts_ProviceID":  '',//省编码
          "tm_ts_CityID": cityID ? cityID : '',//市编码
          "page": page ? page : 1,
          "rows": 5
        };
        this.isLoading = true;
        this.$store.dispatch('initAdmissionTicketMore', options)
          .then(total => {
            this.isLoading = false;
            this.total = total;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //前往详情
      goDetils(item) {
        let id=item.tm_ts_ID

        let getTourSite = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_ts_ID": id,
          "tm_ts_Name": "",
          "tm_ts_TradeInfoID": "",
          "tm_ts_ThemeTypeID": "",
          "tm_ts_IsHot": "",
          "tm_ts_ShowTop": "",
          "tm_ts_ShowTopIsAgree": "",
          "tm_ts_IsPass": "",
          "tm_ts_IsDelete": 0,
          "page": 1,
          "rows": 5
        };
        this.$store.dispatch('searchTourSite', getTourSite)
          .then(supplierId => {

           sessionStorage.setItem('MPtitle','门票_'+item.tm_ts_Name)
           sessionStorage.setItem('supplierId', supplierId)

          this.$router.push({name: 'TicketsDetail', params: {id: id}})


          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })

      },
      //通过省筛选
      changeProvince(item, index) {
        this.cityActive = 10000;
        this.ticketActive = index;
        this.cityID = '';
        this.proviceID = item.sm_af_AreaID;
        this.initData(this.themeTypeID, item.sm_af_AreaID, this.cityID, 1);
        this.seleteShowCtiy(item.sm_af_AreaID)
      }
    },
  }
</script>
<style scoped>
  .typeActive {
    color: #f80;
  }

  .propList .cityActive {
    background: #ffae2c;
    color: #fff;
  }

  .noData {
    font: 16px/4 "微软雅黑";
    color: #ccc;
    text-align: center;
  }

  .AdmissionTicketMoreWrap {
    background-color: #fff;
    width: 1190px;
    margin: 20px auto 0;
  }

  .ScenicSpotList {
    float: left;
    width: 190px;
    margin-right: 10px;
  }

  .ScenicSpotType {
    border: 1px solid #eaeaea;
    font: 12px/26px "宋体";
  }

  .ScenicSpotType dt a {
    display: inline-block;
    color: #4e9700;
    font-weight: bold;
    margin-left: 5px;
  }

  .ScenicSpotType dt:first-of-type {
    padding: 0;
    border: none;
  }

  .ScenicSpotType dt {
    padding-top: 10px;
    border-top: 1px dashed #ccc;
  }

  .ScenicSpotType a:hover {
    color: #f60;
  }

  .ScenicSpotType dl {
    padding: 0 10px 10px;
  }

  .ScenicSpotType dd {
    height: 25px;
    display: inline-block;
    width: 84px;
    overflow: hidden;
  }

  .ScenicSpotType dd a {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ScenicSpotList > div > strong {
    display: block;
    font: bold 14px/2 "宋体";
    background: url("../../assets/img/o_pro_icon.png") repeat-x 0 -48px;
    text-indent: 5px;
    margin-bottom: 8px;
  }

  .AllScenicSpotType {
    margin-top: 10px;
    border: 1px solid #ccc;
  }

  .AllScenicSpotType a {
    color: #404040;
  }

  .AllScenicSpotType a:hover {
    color: #f60;
  }

  .AllScenicSpotType dl {
    padding: 0 10px 10px;
    font: 12px/22px "宋体";
  }

  .AllScenicSpotType dt:first-of-type {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }

  .AllScenicSpotType dt {
    color: #888888;
    margin-top: 10px;
    padding-top: 5px;
    border-top: 1px dashed #ccc;
  }

  .AllScenicSpotType dd {
    display: inline-block;
    margin-right: 18px;
  }

  /*RightRecommend*/

  .RecommendScenicSpot {
    float: left;
    width: 990px;
  }

  .propList {
    padding: 10px;
    border: 1px solid #ccc;
  }

  .aboutScenicSpot {
    margin-top: 15px;
    font: bold 14px/ 24px "宋体";
  }

  .aboutScenicSpot > strong {
    color: #404040;
    width: 90px;
    float: left;
    text-align: center;
  }

  .propListScenicSpotList {
    float: left;
    width: 878px;
  }

  .propListScenicSpotList > li {
    float: left;
  }

  .propListScenicSpotList > li > a:hover,
  .propListScenicSpotList > li > a.active {
    background: #ffae2c;
    color: #fff;
  }

  .propListScenicSpotList > li > a {
    color: #404040;
    padding: 0 10px;
  }

  .screenAdmissionTicketType {
    padding: 10px 0 10px 20px;
    margin-bottom: 10px;
    margin-top: -1px;
    border: 1px solid #ccc;
  }

  .screenAdmissionTicketType a {
    color: #404040;
  }

  .screenAdmissionTicketType > .salesVolume > a,
  .screenAdmissionTicketType > .comment > a,
  .screenAdmissionTicketType > .satisfied > a {
    background: url("../../assets/img/ticketMore.png") no-repeat 20px -87px;
  }

  .screenAdmissionTicketType > .salesVolume.active > a,
  .screenAdmissionTicketType > .comment.active > a,
  .screenAdmissionTicketType > .satisfied.active > a {
    background: url("../../assets/img/ticketMore.png") no-repeat 20px -110px;
  }

  .screenAdmissionTicketType > div {
    text-align: right;
    font: 12px/28px "宋体";
  }

  .screenAdmissionTicketType > div.active {
    font-weight: bold;
  }

  .screenAdmissionTicketType > .price > a {
    background: url("../../assets/img/ticketMore.png") no-repeat 20px -135px;
  }

  .screenAdmissionTicketType > div.active > a {
    color: #ff6600;
  }

  .screenAdmissionTicketType > .priceRange {
    width: 300px;
  }

  .priceRange > * {
    float: left;
  }

  .priceRange > input {
    width: 100px;
    border: 1px solid #ccc;
    padding: 3px 5px;
  }

  .priceRange > em {
    margin: 0 5px;
  }

  .priceRange > button {
    font: 12px/1.3 "微软雅黑";
    border: 1px solid #ccc;
    margin-left: 10px;
    padding: 3px 5px;
  }

  /*门票数据*/

  .admissionTicketList > li {
    padding: 10px;
    border: 1px solid #eaeaea;
    border-top: 2px solid #ffc550;
    margin-bottom: 10px;
  }

  .scenicSpotDetils > * {
    float: left;
  }

  .scenicSpotDetils > img {
    margin-top: 10px;
  }

  .scenicSpotAddress {
    margin-left: 20px;
  }

  .scenicSpotAddress > h6 * {
    float: left;
  }

  .scenicSpotAddress > h6 > a {
    font: bold 16px/24px "宋体";
    color: #4e9700;
  }

  .scenicSpotAddress > h6 > a:hover {
    color: #f00;
  }

  .scenicSpotAddress > h6 > span {
    font: 12px/18px "宋体";
    color: #666;
    margin: 5px 0 0 10px;
  }

  .scenicSpotAddress > h6 > span > a {
    color: #666;
  }

  .scenicSpotAddress > h6 > span > a:hover {
    color: #f60;
  }

  .scenicSpotAddress > div {
    font: 12px/2 "宋体";
  }

  .scenicSpotAddress > div > strong {
    color: #666;
  }

  .scenicSpotAddress > div > i {
    color: #c30;
    font-weight: bold;
    font-family: "微软雅黑";
  }

  .scenicSpotAddress > div > span {
    color: #4e9700;
  }

  .scenicSpotAddress > div em {
    color: #f60;
    font-weight: bold;
    font-family: "微软雅黑";
  }

  .scenicSpotAddress > p {
    font: 12px/2 "宋体";
    color: #999;
    width: 500px;
  }

  .priceAndReserve {
    float: right;
  }

  .priceAndReserve > strong {
    display: block;
    width: 90px;
    text-align: center;
    font: 14px/30px "微软雅黑";
    color: #f60;
    background-color: #fdfbee;
    border: 1px solid #fae1bb;
  }

  .priceAndReserve > strong > span {
    font-size: 18px;
  }

  .QRCodeBtn {
    width: 90px;
    border: 1px solid #ccc;
    margin-top: 10px;
    position: relative;
    font: 12px/28px "微软雅黑";
    text-align: center;
    padding-bottom: 10px;
  }

  .QRCodeBtn::before {
    position: absolute;
    bottom: 5px;
    left: 50%;
    content: '';
    width: 5px;
    height: 5px;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    transform: rotateZ(45deg);
    transition: .5s;
  }

  .QRCodeBtn:hover {
    border-bottom-color: transparent;
  }

  .QRCodeBtn:hover::before {
    transform: rotateZ(225deg);
  }

  .QRCodeBtn:hover .QRCodeReserve {
    z-index: 999;
    display: block;
  }

  .QRCodeBtn > a {
    color: #666;
  }

  .QRCodeBtn > a > i {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url("../../assets/img/u_order_qrcode.png") no-repeat -8px -3px;
    vertical-align: middle;
    margin-left: 5px;
  }

  .QRCodeReserve {
    position: absolute;
    bottom: 0;
    right: -1px;
    transform: translateY(100%);
    border: 1px solid #ccc;
    padding: 20px;
    display: none;
    background-color: #fff;
  }

  .QRCodeReserve > strong {
    font: 14px/22px "微软雅黑";
    color: #999;
  }

  .productNav {
    font: 12px/2 "微软雅黑";
    color: #999;
    margin-top: 20px;
    border-bottom: 1px solid #f90;
  }

  .productNav > strong {
    float: left;
    width: 600px;
    text-indent: 10px;
  }

  .productNav > span {
    float: left;
    width: 120px;
    text-align: center;
  }

  .reserveInformationList > li {
    border-bottom: 1px solid #eee;
    padding: 20px 0;
  }

  .reserveInformationList > li > * {
    float: left;
    font: 14px/2 "微软雅黑";
  }

  .reserveInformationList div {
    width: 600px;
  }

  .reserveInformationList div > a {
    display: inline-block;
    color: #0053aa;
  }

  .reserveInformationList div > a:hover {
    color: #f80;
  }

  .reserveInformationList > li > span {
    width: 120px;
    text-align: center;
    text-decoration: line-through;
  }

  .reserveInformationList > li > strong {
    width: 120px;
    text-align: center;
    font-weight: bold;
    color: #f60;
  }

  .reserveInformationList > li > a {
    background-color: #f60;
    padding: 0 20px;
    color: #fff;
    float: right;
    margin-right: 20px;
    border-radius: 5px;
  }

  .reserveMore {
    width: 100%;
    padding: 10px 20px 0 0;
    text-align: right;
  }

  .reserveMore > a {
    font: 14px/2 "微软雅黑";
    display: inline-block;
    padding: 0 20px;
    background-color: #ccc;
    color: #fff;
    border-radius: 5px;
  }


</style>
