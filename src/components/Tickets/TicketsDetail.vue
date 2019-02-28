<template>
  <div>
    <section id="wrapBoxa">
      <div class="scenicSpotInformation clearfix">
        <div class="pictureBox">
          <div class="block">
            <el-carousel height="398px">
              <p class="numPic" @click="clickNumPic(ticketsDetailData.tm_ts_ShowImage)">当前有{{numLength}}张图</p>
              <el-carousel-item v-for="item,index in ticketsDetailData.tm_ts_ShowImage" :key="index">
                <img v-lazy="item" alt="" height="100%" width="100%">
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="scenicSpotInformationContent">
          <h1>{{ticketsDetailData.tm_ts_Name}}</h1>
          <p class="money">
            <span>价格: ￥</span>
            <strong>{{ticketsDetailData.tm_ts_SuggestPrice}}</strong>
            起
          </p>
          <ul class="describe">
            <li @click="lookMap"><span>具体地址：</span>{{ticketsDetailData.tm_ts_Address}}<a href="javascript:;" style="width: 70px">查看地图</a>
            </li>
            <li><span>开放时间：</span>
              <p style="display: inline-block" v-html="ticketsDetailData.tm_ts_Opentime"></p></li>
            <li><span>建议游玩时长：</span>
              <p style="display: inline-block">{{ticketsDetailData.tm_ts_Time}}小时</p></li>
            <li>
              <span>服务承诺：</span>
              <button>入园保障</button>
              <strong>预订此门票无法入园且千里达旅游网10分钟内未解决完，可买门市价入园，千里达旅游网赔偿<i>门市价</i>与<i>千里达旅游网价</i>的差价</strong>
            </li>
          </ul>
          <div class="scoreContent">
            <div class="score clearfix">
              <span>满意度:<strong>100%</strong></span>
              <em></em>
              <span>来自<strong>5680</strong>名游客的点评</span>
            </div>
            <div class="evaluateContent clearfix">
              <img src="../../assets/img/Symbol.png" width="31" height="28">
              <p class="evaluate"><【惠乐游旅游网】{{ticketsDetailData.tm_ts_Name}}>▼</p>
              <img src="../../assets/img/Symbol.png" width="31" height="28" class="imgRotate">
            </div>
          </div>
        </div>
      </div>
      <div class="admissionTicketType">
        <div class="admissionTicketTypeContent">
          <ul class="titleList clearfix">
            <li class="admissionTicketName">产品名称</li>
            <li class="reserveTime">提前预订时间</li>
            <li class="marketValue">市场价</li>
            <li class="myPrice">惠乐游旅游网价</li>
            <li class="discount">优惠</li>
            <li class="paymentMethod">支付方式</li>
          </ul>
          <div class="productType">
            <h5>门票</h5>
            <div class="admissionTicketContent clearfix" v-for="item,index in ticketType_PriceMXList">
              <a href="javascript:;" class="widthCommentA"
                 @click="showBookKnowBox(index)"><i></i>{{item.tm_tt_Name}}</a>
              <span class="reserveTime">{{item.tm_tt_BeforeTime}}	</span>
              <span class="marketMoney marketValue">¥{{item.tm_tt_TicketPrice}}</span>
              <span class="myMoney myPrice">¥{{item.tm_tt_RealPrice}}起</span>
              <span class="quan discount">优惠券</span>
              <p class="payment paymentMethod" style="cursor: pointer" @click="clickPayment(item)">
                <span>网上支付</span>
                <a href="javascript:;">预订</a>
              </p>
              <div class="bookKnow" v-show="showBookKnow && index == showNum">
                <div class="bookKnowCon clearfix">
                  <strong>预订须知</strong>
                  <div class="bookKnowConList">
                    <p v-show="item.Notice.tm_tt_typeName">门票类型： {{item.Notice.tm_tt_typeName}}</p>
                    <p v-show="item.Notice.tm_tt_BeforeTime">提前预订时间： {{item.Notice.tm_tt_BeforeTime }}</p>
                    <p v-show="item.Notice.tm_tt_ReturnRule">退改规则：{{item.Notice.tm_tt_ReturnRule}}</p>
                    <p v-show="item.Notice.tm_tt_UseMethod">使用方法：{{item.Notice.tm_tt_UseMethod}}</p>
                    <p v-show="item.Notice.tm_tt_GetTime">取票时间：{{item.Notice.tm_tt_GetTime}}</p>
                    <p v-show="item.Notice.tm_tt_GetAddress">取票地址：{{item.Notice.tm_tt_GetAddress}}</p>
                    <p v-show="item.Notice.tm_tt_AddRemarks">补充说明：{{item.Notice.tm_tt_AddRemarks}}</p>
                    <p v-show="item.Notice.tm_tt_PriceInclude">费用包含：{{item.Notice.tm_tt_PriceInclude}}</p>
                    <p v-show="item.Notice.tm_tt_ImportantCause">重要条款：{{item.Notice.tm_tt_ImportantCause}}</p>
                    <p v-show="item.Notice.tm_tt_EffectiveTime">预订生效时间：{{item.Notice.tm_tt_EffectiveTime}}</p>
                    <p v-show="item.Notice.tm_tt_SuitableCrowd">适用人群：{{item.Notice.tm_tt_SuitableCrowd}}</p>
                    <p v-show="item.Notice.tm_tt_SpecialNotice">特别提示：{{item.Notice.tm_tt_SpecialNotice}}</p>
                  </div>
                </div>
                <div class="otherExplain">
                  <strong>其他说明</strong>
                  <div class="otherExplainCon">
                    <p v-show="item.Other.tm_tt_BookLimit">预订限制：{{item.Other.tm_tt_BookLimit}}</p>
                    <p v-show="item.Other.tm_tt_HappyNotice">温馨提示：{{item.Other.tm_tt_HappyNotice}}</p>
                    <p v-show="item.Other.tm_tt_PreferentialPolicy">优待政策：{{item.Other.tm_tt_PreferentialPolicy}}</p>
                    <p v-show="item.Other.tm_tt_ByeNotice">购票须知：{{item.Other.tm_tt_ByeNotice}}</p>
                  </div>
                </div>
                <!--<a href="javascript:;" @click="closeBookKnowBox">收起</a>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--主体部分-->
      <div id="infrometionWrap">
        <!--主体导航-->
        <ul id="infrometionWrapNav" ref="infrometionWrapNav" class="infrometionWrapNav clearfix">
          <li v-for="item,index in idName">
            <a href="javascript:;" @click="changeType(index)" :class="{active:index==n}">{{item.name}}</a>
          </li>
        </ul>
        <!--预定需知-->
        <div id="reserveContent" class="reserveContent clearfix" v-show="showList[0].isShow">
          <div class="discountIcon">
            <h3>预定须知</h3>
          </div>
          <div class="reservations">
            <div class="openingHours" v-show="bookKnowObj.tm_bk_OpenTime">
              <div class="couponsActive clearfix">
                <span></span>
                <h5>景区开放时间：</h5>
              </div>
              <div class="openingHoursContent">
                <p v-html="bookKnowObj.tm_bk_OpenTime"></p>
              </div>
            </div>
            <div class="openingHours" v-show="bookKnowObj.tm_bk_SpecialPolicy">
              <div class="couponsActive clearfix">
                <span></span>
                <h5>特殊人群政策：</h5>
              </div>
              <div class="openingHoursContent">
                <p v-html="bookKnowObj.tm_bk_SpecialPolicy"></p>
              </div>
            </div>
            <div class="openingHours" v-show="bookKnowObj.tm_bk_Remind">
              <div class="couponsActive clearfix">
                <span></span>
                <h5>预订提醒：</h5>
              </div>
              <div class="openingHoursContent">
                <p v-html="bookKnowObj.tm_bk_Remind"></p>
              </div>
            </div>
            <div class="openingHours" v-show="bookKnowObj.tm_bk_HappyNotice">
              <div class="couponsActive clearfix">
                <span></span>
                <h5>温馨提示：</h5>
              </div>
              <div class="openingHoursContent">
                <p v-html="bookKnowObj.tm_bk_HappyNotice"></p>
              </div>
            </div>
            <div class="openingHours" v-show="bookKnowObj.tm_bk_TicketSay">
              <div class="couponsActive clearfix">
                <span></span>
                <h5>发票说明：</h5>
              </div>
              <div class="openingHoursContent">
                <p v-html="bookKnowObj.tm_bk_TicketSay"></p>
              </div>
            </div>
            <div class="openingHours" v-show="bookKnowObj.tm_bk_ReturnRule">
              <div class="couponsActive clearfix">
                <span></span>
                <h5>退改规则：</h5>
              </div>
              <div class="openingHoursContent">
                <p v-html="bookKnowObj.tm_bk_ReturnRule"></p>
              </div>
            </div>
            <div class="openingHours" v-show="bookKnowObj.tm_bk_SpecialMessage">
              <div class="couponsActive clearfix">
                <span></span>
                <h5>特殊信息：</h5>
              </div>
              <div class="openingHoursContent">
                <p v-html="bookKnowObj.tm_bk_SpecialMessage"></p>
              </div>
            </div>
          </div>
        </div>
        <!--景点介绍-->
        <div id="introductionOfScenicSpots" class="introductionOfScenicSpots clearfix" v-show="showList[1].isShow">
          <div class="discountIcon">
            <h3>景点介绍</h3>
          </div>
          <div class="introductionOfScenicSpotsContent" v-show="ticketsDetailData.tm_ts_Detailedintroduction">
            <div class="couponsActive clearfix">
              <span></span>
              <h5> 景点简介</h5>
            </div>
            <div class="detailsOfTheScenicSpots">
              <div v-html="ticketsDetailData.tm_ts_Introduce" style="text-indent: 20px"></div>
            </div>
            <div class="couponsActive clearfix">
              <span></span>
              <h5>景点介绍</h5>
            </div>
            <div class="detailsOfTheScenicSpots">
              <div v-html="ticketsDetailData.tm_ts_Detailedintroduction" style="text-indent: 20px"></div>
            </div>
            <div class="couponsActive clearfix" v-show="ticketScenicSpot.length">
              <span></span>
              <h5>小景点详情</h5>
            </div>
            <div class="detailsOfTheScenicSpots">
              <div class="ticketDetailsContent" v-for="item in ticketScenicSpot">
                <strong>{{item.tm_se_Name}}</strong>
                <p>
                  {{item.tm_se_Intro}}
                </p>
                <div class="clearfix">
                  <img v-lazy="v" v-for="v in item.tm_se_Image">
                </div>
              </div>
              <!--<div v-html="ticketsDetailData.tm_ts_Detailedintroduction"></div>-->
            </div>
          </div>
        </div>
        <!--交通信息-->
        <div id="trafficInformation" class="trafficInformation clearfix" v-show="showList[2].isShow">
          <div class="discountIcon">
            <h3>交通指南</h3>
          </div>
          <div class="trafficInformationContent">
            <div class="couponsActive clearfix">
              <span></span>
              <h5>交通信息</h5>
            </div>
            <div class="trafficGuide">
              <div class="recommendRoute">
                <ul>
                  <li class="clearfix">
                    <strong>自驾线路 : </strong><span>{{transportMessage.tm_tm_Drive}}</span>
                  </li>
                  <li class="clearfix">
                    <strong>公交线路 : </strong><span>{{transportMessage.tm_tm_Bus}}</span>
                  </li>
                  <li class="clearfix">
                    <strong>景点地址 : </strong><span>{{transportMessage.tm_tm_Address}}</span>
                  </li>
                </ul>
              </div>
              <!--地图-->
              <div class="mapBoxWrap">
                <div id="allmap"></div>
                <!--<div class="mapJW">-->
                <!--<div id="allmap"></div>-->
                <!--</div>-->
              </div>
            </div>
          </div>
        </div>
        <!--地图导览-->
        <div class="MapNavigation clearfix" v-show="showList[3].isShow">
          <img v-lazy="ticketTourSiteImg" alt="" style="width: 1135px">
          <!--小景点弹出框-->
          <div v-for="its in ticketScenicSpot" :style="{top:its.tm_se_HandY + 'px',left:its.tm_se_HandX + 'px'}">
            <el-button class="el-icon-location" @click="show(its)">
              {{its.tm_se_Name}}
            </el-button>
          </div>


        </div>
        <!--游客点评-->
        <div class="commentsOnTourists clearfix" id="h6" v-show="showList[4].isShow">
          <div class="discountIcon">
            <h3>游客点评</h3>
          </div>
          <!--右边内容-->
          <div class="commentsOnTouristsContentWrap">
            <div class="commentsOnTouristsStatistics">
              <!--点评统计-->
              <div class="commentsOnTouristsStatisticsContent clearfix">
                <div class="satisfaction">
                  <span>满意度</span>
                  <strong>{{allTicketCommendList.goodrate}}%</strong>
                  <span>来自{{total}}名游客的点评</span>
                </div>
                <div class="statisticalChart">
                  <div class="statisticalChartLeft">
                    <ul>
                      <li class="clearfix">
                        <span>满意</span>
                        <div class="statisticalChartLeftBar">
                          <div class="statisticalChartLeftBarChild"
                               :style="{width: allTicketCommendList.goodrate + '%'}"></div>
                        </div>
                        <span>{{allTicketCommendList.goodrate}}%</span>
                      </li>
                      <li class="clearfix">
                        <span>一般</span>
                        <div class="statisticalChartLeftBar">
                          <div class="statisticalChartLeftBarChild"
                               :style="{width: allTicketCommendList.middlerate + '%'}"></div>
                        </div>
                        <span>{{allTicketCommendList.middlerate}}%</span>
                      </li>
                      <li class="clearfix">
                        <span>不满意</span>
                        <div class="statisticalChartLeftBar">
                          <div class="statisticalChartLeftBarChild"
                               :style="{width: allTicketCommendList.poorrate + 'px'}"></div>
                        </div>
                        <span>{{allTicketCommendList.poorrate}}%</span>
                      </li>
                    </ul>
                  </div>
                  <ul class="statisticalChartRight">
                    <li v-for="item,index in allTicketCommendList.data">
                      <strong>{{item.ts_ct_Name}}</strong>
                      <span><i>{{item.score}}</i>/5</span>
                    </li>
                  </ul>
                </div>
                <div class="commentOnAComment">
                  <!--<strong>出游归来发点评返现金,<br>-->
                  <!--本产品已累计发放<i>19012</i>元</strong>-->
                  <a href="javascript:;" @click="goOutComment">发表点评</a>
                </div>
              </div>
              <!--点评类型-->
              <ul class="commentsOnTouristsStatisticsTypeList clearfix">
                <li v-for="item,index in typeList">
                  <a href="javascript:;">{{item.name}}</a>
                </li>
              </ul>
            </div>
            <!--评论列表-->
            <ul class="evaluationContent">
              <li class="clearfix" v-for="item,index in ticketCommentDataList">
                <!--游客信息-->
                <div class="touristInfromation">
                  <div class="headerImage">
                    <img v-lazy="item.sm_ui_HeadImage" v-show="item.sm_ui_HeadImage" width="60" height="60">
                  </div>
                  <span class="touristInfromationName">{{item.ts_ct_userName}}</span>
                  <!--<strong class="touristInfromationType">家庭出游</strong>-->
                </div>
                <!--点评内容-->
                <div class="touristComment">
                  <ul class="touristCommentList clearfix">
                    <li><span>总体评价:{{item.satisfaction}}</span></li>
                    <li v-for="ite,index in item.typeScore"><span>{{ite.ts_ct_Name}}：{{ite.ts_cs_Score}}分</span></li>
                  </ul>
                  <p class="touristCommentContent">
                    {{item.ts_ct_Content}}
                  </p>
                  <ul class="uploadPictureList clearfix" v-show="item.imgData">
                    <li v-for="ite,index in item.imgData">
                      <img width="100" height="100" v-lazy="ite">
                    </li>
                  </ul>
                  <div class="touristCommentTime">{{item.ts_ct_CreateTime}}</div>
                </div>
                <!--点评赠送-->
                <!--<div class="commentGive">-->
                <!--<strong>点评赠送</strong>-->
                <!--<span>返现<em>￥12</em></span>-->
                <!--<span>抵用券<em>￥100</em></span>-->
                <!--</div>-->
              </li>
            </ul>
            <p v-show="!ticketCommentDataList.length"
               style="font: 16px/2 '微软雅黑';padding:  40px 0;text-align: center;border-bottom: 1px dashed #ccc;"
            >暂无评论</p>
            <!--分页-->
            <div class="block" style="float: right;margin-top: 20px;">
              <el-pagination
                background
                @current-change="handleCurrentChange"
                :page-size="5"
                layout="total, prev, pager, next"
                :total="total"
                v-show="total"
              >
              </el-pagination>
            </div>
          </div>
        </div>
        <el-dialog
          :visible.sync="showDialog"
          width="32%">
          <img :src="Img.split(',')[0]" style="width: 450px; height: 270px;">
          <div>{{Detail}}</div>
          <div>{{Remark}}</div>
          <audio :src="Audio" controls autoplay style="margin-top: 10px"></audio>
          <video :src="Video" controls autoplay style="width: 450px; margin-top: 20px"></video>
        </el-dialog>
      </div>
    </section>
    <el-dialog
      :title="ticketsDetailData.tm_ts_Name"
      :visible.sync="showTicketImage"
      width="1040px">
      <div class="clearfix">
        <div class="bigImageBox">
          <div class="topImage" @click="topImage">&lt;</div>
          <img :src="imgUrl">
          <div class="nextImage" @click="nextImage">&gt;</div>
        </div>
        <div class="hotelImageBox">
          <div class="imgType clearfix">
            <a href="javascript:;" class="active">所有</a>
          </div>
          <div class="corImage">
            <a href="javascript:;" v-for="item,index in imgUrlList" :class="{active:index==m}"
               @click="clickImgUrlList(item,index)">
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
  import '@/assets/css/comment.css'
  import '@/assets/css/AdmissionTicket.css';
  import {setScrollTop} from '@/assets/public'

  export default {
    name: '',
    computed: Object.assign({
    }, mapGetters([
      'pictureList',
      'bookKnowObj',
      'ticketsDetailData',
      'numLength',
      'getTourSiteList',
      'transportMessage',
      'ticketType_PriceMXList',
      'ticketTourSiteImg',    //手绘图提取
      'ticketScenicSpot',  //  景区小景点
      'ticketCommentDataList',
      'allTicketCommendList',
    ])),
    data() {
      return {
        imgUrl:'',
        imgUrlList:[],
        showTicketImage:false,
        typeList: [
          {name: '全部', id: 1},
//          {name: '一般', id: 2},
//          {name: '满意', id: 3},
//          {name: '不满意', id: 4}
        ],//点评类型
        showDialog: false,
        showBookKnow: false,
        showNum: 0,
        isNum: 0,
        showList: [
          {
            id: 0,
            isShow: true
          },
          {
            id: 1,
            isShow: false
          },
          {
            id: 2,
            isShow: false
          },
          {
            id: 3,
            isShow: false
          },
          {
            id: 4,
            isShow: false
          }
        ],
        n: 0,
        swiperOptionTop: {
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction'
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        form: {
          x: '105.44397029',
          y: '24.8959298'
        },
        idName: [
          {
            name: '预定需知',
            id: 'reserveContent'
          },
          {
            name: '景点介绍',
            id: 'introductionOfScenicSpots'
          },
          {
            name: '交通指南',
            id: 'trafficInformation'
          },
          {
            name: '地图导览',
            id: 'MapNavigation'
          },
          {
            name: '游客点评',
            id: 'VisitorReviews'
          }
        ],
        Img: "",
        Detail: "",
        Remark: "",
        Audio: "",
        Video: "",
        userInfo: {},
        ticketId: '',
        total: 0,
        totalN: 0,
        m:0,
      }
    },
    created() {
      this.ticketId = this.$route.params.id;  //跳转的编号
      if (sessionStorage.getItem('user')) {
        this.userInfo = JSON.parse(sessionStorage.getItem('user'))
      }
      this.initData(this.ticketId).then((data) => {
        this.$nextTick(() => {
          document.title = '门票_' + this.ticketsDetailData.tm_ts_Name
        })
        this.initScenicSpot(data.tm_ts_Code);
        this.searchMap(this.ticketsDetailData)
      }, err => {
        this.$notify({
          message: err,
          type: 'error'
        });
      });
      this.initTourSiteImg();
      this.initCommentData()
        .then(total => {
          this.total = total;
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          })
        })
      this.allTicketCommend();
    },
    methods: {
      //点击查看地图
      lookMap(){
        this.n = 2;
        for(var i=0;i<this.showList.length;i++){
          this.showList[i].isShow = false
        }
        this.showList[2].isShow = true;
        setScrollTop(800)
      },
      topImage() {
        if (this.m <= 0) {
          this.m = 0
          return;
        }
        this.m--;
        this.imgUrl = this.imgUrlList[this.m]

      },
      nextImage() {
        if (this.m >= this.imgUrlList.length - 1) {
          return;
        }
        this.m++;
        this.imgUrl = this.imgUrlList[this.m]
      },
      clickImgUrlList(item, index) {
        this.m = index
        this.imgUrl = item
      },
      clickNumPic(arr){
        this.imgUrl = arr[0]
        this.imgUrlList = arr;
        this.showTicketImage = true
      },
      //分页
      handleCurrentChange(num) {
        this.initCommentData(num)
      },
      showBookKnowBox(index) {
        this.showNum = index;
        if (this.showNum === index) {
          this.showBookKnow = !this.showBookKnow
        }
      },
      closeBookKnowBox() {
        this.showBookKnow = false;
      },
      show(its) {
        this.showDialog = true;
        this.Img = its.tm_se_Image;
        this.Detail = its.tm_se_Intro;
        this.Remark = its.tm_se_Remark;
        this.Audio = its.tm_se_Sound;
        this.Video = its.tm_se_Vedio;
      },
      //点击立即预订
      clickPayment(item) {
        sessionStorage.setItem('bookKnowObj', JSON.stringify(item))
        item.Address = this.ticketsDetailData.tm_ts_Address;
        sessionStorage.setItem('ticketsReserveDetail', JSON.stringify(item));
        this.$router.push({name: 'TicketsReserve', params: {id: item.tm_tt_ID}})
      },
      async initData(id) {
        //景点详情
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_ts_ID": id,
        }
        return await this.$store.dispatch('initTicketsDetailData', options)
      },
      //查询地图
      searchMap(ticketsDetailData) {
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(ticketsDetailData.tm_ts_Longitude, ticketsDetailData.tm_ts_Latitude);
        // 创建标注
        map.centerAndZoom(point, 12);
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);// 将标注添加到地图中

        map.offsetX = -100
        var opts = {
          width: 200,     // 信息窗口宽度
          height: 100,     // 信息窗口高度
          title: ticketsDetailData.tm_ts_Name, // 信息窗口标题
          enableMessage: true,//设置允许信息窗发送短息
          message: "亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
        }
        var infoWindow = new BMap.InfoWindow(`地址：${ticketsDetailData.tm_ts_Address}`, opts);  // 创建信息窗口对象
        marker.addEventListener("click", function () {
          map.openInfoWindow(infoWindow, point); //开启信息窗口
        });
      },
      changeType(index) {
//        document.documentElement.scrollTop = this.$refs.infrometionWrapNav.offsetTop;
        this.n = index;
        for (var i = 0; i < this.showList.length; i++) {
          if (this.showList[i].id == index) {
            this.showList[i].isShow = true;
          } else {
            this.showList[i].isShow = false;
          }
        }
      },
      //景区小景点
      initScenicSpot(code) {
        let ScenicSpotOption = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_se_ID": '',//景区小景点编码
          "tm_se_Code": code,//景点编号
          "tm_se_Name": "",//小景点名称
          // "page": 1,//页码
          // "rows": 5//条数
        }
        this.$store.dispatch('initTicketScenicSpot', ScenicSpotOption)
      },
      //手绘图提取
      initTourSiteImg() {
        let initImgOption = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",  //操作员编码
          "operateUserName": "",  //操作员名称
          "pcName": "",  //机器码
          "tm_ts_ID": this.ticketId,//景点编码(主键)
          // "tm_ts_Name": "",//景点名称
          // "tm_ts_TradeInfoID": "",//供应商编码
          // "tm_ts_ThemeTypeID": "",//主题编码
          // "tm_ts_IsHot": "",//是否热门景点（0普通1热门）
          // "tm_ts_ShowTop": "",//是否展示首页（0否，1是）
          // "tm_ts_ShowTopIsAgree": "1",//惠乐游审核是否首页显示(0审核中1通过审核2未通过审核)
          // "tm_ts_IsPass": "",//是否通过审核(0审核中1通过审核2未通过审核)
          // "tm_ts_IsDelete": 0,//是否删除(0不删除1删除)
          // "page": 1,  //页码
          // "rows": 5  //条数
        }
        this.$store.dispatch('initTicketTourSiteImg', initImgOption)
      },
//     评论
      goOutComment() {
        let SelectAllComment = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": this.userInfo.token ? this.userInfo.token : '',
          "ID": "",       //产品评论编码
          "UserInfoID": this.userInfo.sm_ui_ID,  // 用户信息编码
          "GoodID": this.ticketId,       //产品编码
          "IsDelete": "0",     //是否有效
          "ts_ct_SysID": "2",     //系统编码  0旅行社 1车票 2门票 3美食 4酒店 5租车
          "page":  1,
          "rows": 5,
        }
        this.$store.dispatch('initFoodUserCommend', SelectAllComment)
          .then(total => {
            this.totalN = total;
            if (total) {
              this.$notify({
                message: '您已评论!!',
                type: 'error'
              })
            }
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
        let getOrderInfo = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",  //操作员编码
          "operateUserName": "",  //操作员名称
          "pcName": "",  //机器码
          "token": this.userInfo.token ? this.userInfo.token : '',
          "tm_or_UserID": this.userInfo.sm_ui_ID ? this.userInfo.sm_ui_ID : '', //用户编码
          "tm_or_TourSiteCode": this.ticketId ? this.ticketId : '', //景点编号
          "tm_or_PayState": 1
        }
        this.$store.dispatch('ticketPayOrderState', getOrderInfo)
          .then(data => {
            if (!data.length) {
              this.$notify({
                message: '您未购买此类门票或订单未支付!!',
                type: 'error'
              })
            } else if (data.length && !this.totalN) {
              this.$router.push({name: 'CommentOnAComment', params: {id: this.ticketId, typeId: 2}})
            }
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
//     初始化评论
      initCommentData(num) {
        let SelectAllComment = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": this.userInfo.token ? this.userInfo.token : '',
          "ID": "",       //产品评论编码
          "UserInfoID": '',  // 用户信息编码
          "GoodID": this.ticketId,       //产品编码
          "IsDelete": "0",     //是否有效
          "ts_ct_SysID": "2",     //系统编码  0旅行社 1车票 2门票 3美食 4酒店 5租车
          "page": num ? num : 1,
          "rows": 5,
        }
        return this.$store.dispatch('initTicketCommentData', SelectAllComment)

      },
      //总体评论
      allTicketCommend() {
        let SelectAllCommentFixed = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": this.userInfo.token,
          "GoodID": this.ticketId,       //产品编码
          "ts_ct_SysID": "2",     //系统编码  0旅行社 1车票 2门票 3美食 4酒店 5租车
        }
        this.$store.dispatch('allTicketCommend', SelectAllCommentFixed)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })

      },
    },
    mounted() {
      let title = sessionStorage.getItem('MPtitle');
      if (title) {
        document.title = title
      }
    },
    update() {
    }
  }
</script>
<style scoped>
  .bigImageBox {
    float: left;
    position: relative;
  }

  .bigImageBox > img {
    width: 480px;
    height: 320px;
  }

  .bigImageBox > .topImage {
    position: absolute;
    left: 0;
    top: 50%;
    font: bold 25px/2 "微软雅黑";
    color: #fff;
    background-color: rgba(0, 0, 0, .5);
    padding: 0 20px;
    transform: translateY(-50%);
  }

  .bigImageBox > .topImage:hover,
  .bigImageBox > .nextImage:hover {
    cursor: pointer;
  }

  .bigImageBox > .nextImage {
    position: absolute;
    right: 0;
    top: 50%;
    font: bold 25px/2 "微软雅黑";
    color: #fff;
    background-color: rgba(0, 0, 0, .5);
    padding: 0 20px;
    transform: translateY(-50%);
  }
  .hotelImageBox {
    float: left;
    margin-left: 20px;
    width: 500px;
  }

  .hotelImageBox > span {
    font: bold 16px/30px "微软雅黑";
    color: #f80;
    margin-bottom: 5px;
    display: block;
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

  .corImage img {
    width: 100%;
    height: 100%;
  }


  .numPic{
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    z-index: 222;
    color: #fff;
    background-color: rgba(0,0,0,.5);
    padding: 10px 0;
  }
  /*游客点评*/
  .commentsOnTourists {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px;
    border: 1px solid #ccc;
  }

  .commentsOnTouristsContentWrap {
    width: 1028px;
    float: left;
  }

  .commentsOnTouristsStatistics {
    border: 1px solid #ccc;
  }

  .commentsOnTouristsStatisticsContent {
    padding: 20px 0;
  }

  .commentsOnTouristsStatisticsContent > * {
    float: left;
  }

  .commentsOnTouristsStatistics .satisfaction {
    width: 200px;
    text-align: center;
  }

  .commentsOnTouristsStatistics .satisfaction strong {
    font: 40px/2 "微软雅黑";
    color: #ff8800;
  }

  .commentsOnTouristsStatistics .satisfaction span {
    font: 14px/1 "微软雅黑";
    display: block;
    color: #999;
  }

  .statisticalChart {
    width: 600px;
    margin-top: 10px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }

  .statisticalChartLeft {
    float: left;
    font: 14px/2 "微软雅黑";
    margin-left: 10px;
  }

  .statisticalChartLeft li * {
    float: left;
  }

  .statisticalChartLeft span:nth-of-type(1) {
    width: 90px;
    color: #999;
    text-align: left;
  }

  .statisticalChartLeft span:nth-of-type(2) {
    color: #f80;
  }

  .statisticalChartLeft .statisticalChartLeftBar {
    width: 112px;
    height: 13px;
    background-color: #ddd;
    margin-top: 7px;
    margin-right: 10px;
  }

  .statisticalChartLeftBarChild {
    background-color: #ff8800;
    height: 13px;
  }

  .statisticalChartRight {
    width: 288px;
    float: left;
    margin-left: 50px;
    color: #999;
    margin-top: 15px;
  }

  .statisticalChartRight i {
    color: #ff8800;
  }

  .statisticalChartRight > * {
    float: left;
    width: 144px;
    margin-top: 10px;
  }

  .commentOnAComment {
    text-align: center;
    width: 200px;
    padding: 0 20px;
    font: 13px/1.5 "微软雅黑";
    color: #999;
    margin-top: 20px;
  }

  .commentOnAComment i {
    color: #f80;
  }

  .commentOnAComment a {
    width: 80px;
    display: block;
    font: 14px/2 "微软雅黑";
    background-color: #22c233;
    color: #fff;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    margin: 20px auto 0;
  }

  .commentsOnTouristsStatisticsTypeList {
    border-top: 1px solid #ccc;
    padding: 0 20px 15px;
    font: 14px/1.5 "微软雅黑";
  }

  .commentsOnTouristsStatisticsTypeList li {
    float: left;
    margin: 15px 12px 0;
  }

  .commentsOnTouristsStatisticsTypeList li .active {
    background-color: #22c233;
    color: #fff;
  }

  .commentsOnTouristsStatisticsTypeList a {
    display: block;
    padding: 0 15px;
    border: 1px solid #22c233;
    color: #22c233;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .evaluationContent > li > * {
    float: left;
  }

  .touristInfromation {
    width: 130px;
    margin-top: 30px;
  }

  .touristInfromation img {
    margin: 0 auto;
    display: block;
    border-radius: 50%;
  }

  .touristInfromation span {
    font: 15px/2 "微软雅黑";
    display: block;
    text-align: center;
    color: #333;
  }

  .touristInfromation strong {
    font: 16px/2 "微软雅黑";
    text-align: center;
    display: block;
    color: #ff8800;
  }

  .touristComment {
    width: 898px;
    padding: 18px 0;
  }

  .touristCommentList {
    padding: 5px 0;
    font: 13px/20px "微软雅黑";
    color: #999;
    background-color: #f0f2f5;
  }

  .touristCommentList li:nth-of-type(1) {
    border-left: none;
    color: #ff7733;
  }

  .touristCommentList li {
    border-left: 1px solid #d4dae2;
    float: left;
    padding: 0 20px;
  }

  .touristCommentContent {
    font: 14px/2 "微软雅黑";
    margin: 10px 0;
  }

  .TypeCommentList {
    font: 14px/24px "微软雅黑";
  }

  .TypeCommentList li {
    margin-top: 5px;
  }

  .TypeCommentList li > strong {
    float: left;
    color: #999;
  }

  .TypeCommentList li > span {
    float: left;
    max-width: 680px;
    margin-left: 5px;
  }

  .uploadPictureList {
    margin-top: 10px;
  }

  .uploadPictureList li {
    float: left;
    margin-right: 10px;
    margin-top: 10px;
  }

  .touristCommentTime {
    font: 12px/5 "微软雅黑";
    color: #ccc;
  }

  .evaluationContent .commentGive {
    float: right;
    width: 120px;
    margin-top: 18px;
    border-radius: 5px;
    overflow: hidden;
    font: 14px/37px "微软雅黑";
  }

  .commentGive strong {
    text-align: center;
    display: block;
    width: 100%;
    color: #fff;
    background-color: #ffac4c;
  }

  .commentGive span {
    display: block;
    text-align: center;
    background-color: #fdfaf1;
    border-bottom: 1px dotted #fdfaf1;
  }

  .evaluationContent > li {
    border-bottom: 1px dashed #dddddd;
  }

  .swiper-slide {
    background-size: cover;
    background-position: center;
  }

  .gallery-top {
    height: 100% !important;
    width: 100%;
  }

  .bookKnow {
    background-color: #f6f6f6;
    width: 100%;
    padding: 15px;
    position: relative;
  }

  .bookKnowCon > strong,
  .otherExplain > strong {
    font: bold 12px/2 "微软雅黑";
    float: left;
    width: 10%;
  }

  .otherExplain {
    margin-top: 10px;
  }

  .bookKnowConList,
  .otherExplainCon {
    float: left;
    font: 12px/2 "微软雅黑";
    color: #666;
    width: 70%;
  }

  .bookKnowConList p,
  .otherExplainCon p {
    text-align: left;
  }

  .bookKnow > a {
    font: 12px/2 "微软雅黑";
    position: absolute;
    bottom: 15px;
    right: 15px;
    color: #f80;
  }

  .widthCommentA {
    position: relative;
  }

  .widthCommentA i {
    position: absolute;
    content: '';
    left: 10px;
    top: 30px;
    border: 4px solid transparent;
    border-top-color: green;
    transform-origin: 4px 2px;
    transform: rotateZ(0);
  }

  .ticketDetailsContent strong {
    font: bold 20px/40px "微软雅黑";
    color: #333;
  }

  .ticketDetailsContent p {
    font: 12px/1.5 "微软雅黑";
    text-indent: 2em;
    margin: 10px 0;
  }

  .ticketDetailsContent img {
    float: left;
    width: 460px;
    height: 300px;
    margin: 10px;
  }

  .headerImage {
    width: 60px;
    height: 60px;
    margin: 0 auto;
    background: url("../../assets/img/center.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
  }

</style>
