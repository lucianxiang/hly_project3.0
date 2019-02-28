<template>
  <div>
    <!--主体-->
    <section id="wrap" v-show="iswrap">
      <!--旅游内容-->
      <div class="productBody">
        <h3>{{productDetailsObj.ta_tg_Title }}</h3>
        <div class="tourismType clearfix">
          <strong>跟团游</strong>
          <!--本产品由云南乐视国际旅行社有限公司直售，并提供咨询/预订/售后服务，合同需与商家直接签-->
          <!--<span><i>编号：{{$route.params.id}}</i></span>-->
        </div>
        <div class="productBodyIntroduce clearfix">
          <div class="pictureShowAndTime">
            <div class="pictureShow">
              <div class="pictureShowList">
                <div class="block">
                  <el-carousel height="280px" :autoplay="isCarouselAutoplay">
                    <el-carousel-item v-for="item,index in pictureList" :key="index">
                      <img height="280" width="500" v-lazy="item">
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </div>
              <!--日历和城市选择-->
              <div class="calendarWrap">
                <ul class="monthSelecte clearfix">
                  <li v-for="(item,i) in searchMonth" @click="changeSearchMonth(item)">
                    <a href="javascript:;" :class="{active:n==i}">
                      <strong>{{item.name}}</strong>
                      <span>￥{{productDetailsObj.ts_tg_lowestPrice}}起</span>
                    </a>
                  </li>
                </ul>
                <div class="calendarList">
                  <ul class="weekList clearfix">
                    <li>日</li>
                    <li>一</li>
                    <li>二</li>
                    <li>三</li>
                    <li>四</li>
                    <li>五</li>
                    <li>六</li>
                  </ul>
                  <ul class="calendarContentList clearfix" id="calendarContentList" v-loading="isSalendar">
                    <li v-for="item,index in lastDateArr" style="color: #ccc;">{{item}}</li>
                    <li v-for="item,index in monthArr" @click="changeTime(item)">
                      {{item.day ? item.day : item}}
                      <div v-show="item.ts_pp_Price">
                        <span>充足</span>
                        <strong>￥{{item.ts_pp_Price}}起</strong>
                        <div class="mask">
                          <i></i>
                          <div class="maskContent clearfix">
                            <div>
                              <strong>成人票:</strong>
                              <span>￥{{item.ts_pp_Price}}起</span>
                            </div>
                            <div>
                              <strong>日期:</strong>
                              <span>{{item.ts_pp_Date}}</span>
                            </div>
                            <div>
                              <strong>儿童票:</strong>
                              <span>￥{{item.ts_pp_ChildPrice}}起</span>
                            </div>
                            <div>
                              <strong>出发城市:</strong>
                              <span>{{item.cityName}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li v-for="item,index in nextDateArr" style="color: #ccc;">{{item}}</li>
                  </ul>
                </div>
              </div>
              <p class="prompt">* 日历上显示的价格为当日最低成人优惠价，您可在下单时选择可用的优惠</p>
            </div>
          </div>
          <!--价格和评价-->
          <div class="pictureShowAndTimeDetails">
            <div class="ticketPrice">
              <i></i>
              <div class="ticketPriceContent clearfix">
                <span>促销价:<span>￥</span><strong>{{productDetailsObj.ts_tg_lowestPrice}}</strong>起
                  <!--<a href="javascript:;">起价说明</a>-->
                </span>
                <div class="evaluate">
                  <div class="satisfaction">
                    <span>满意度</span>
                    <a
                            href="javascript:;">{{Math.round(commentMXObj.satisfyCount / commentMXObj.totalCount * 100) ?
                        Math.round(commentMXObj.satisfyCount / commentMXObj.totalCount * 100) : '0'}}<i>%</i></a>
                  </div>
                  <div class="comment">
                    <span>出游人数：<a href="javascript:;">70437</a></span>
                    <span>点评人数：<a href="javascript:;">{{commentMXObj.userCount}}</a></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="ticketType">
              <div class="ticketTypeOK">
                <div class="Lately clearfix">
                  <span>150人出游</span>
                  <strong>最近30天8人出游</strong>
                </div>
                <div class="Characteristic clearfix">
                  <span>产品亮点:</span>
                  <ul>
                    <li><i></i>无自费</li>
                    <li><i></i>高性价比</li>
                    <li><i></i>接送机</li>
                  </ul>
                </div>
                <div class="ticketTypeTwoOK clearfix">
                  <span>二次确认: </span>
                  <strong>此商品需商家确认后可出行</strong>
                </div>
                <div class="tourOperator clearfix">
                  <div>
                    <img src="../../assets/img/tourOperator.png" height="50" width="81">
                    <strong>丽江旅游</strong>
                  </div>
                  <div class="customerSer">
                    <el-popover
                            placement="top-start"
                            title="客服电话"
                            width="200"
                            trigger="hover"
                            content="173-0908-1513">
                      <a href="javascript:;" class="phone" slot="reference"><span></span>客服电话</a>
                      <!--<el-button slot="reference">hover 激活</el-button>-->
                    </el-popover>

                    <!--<a href="javascript:;" class="inPhone"><span></span>在线咨询</a>-->
                  </div>
                </div>
              </div>

              <div class="setOut">
                <ul>
                  <li>
                    <div class="startTheCity clearfix">
                      <strong>出发城市:</strong>
                      <div class="startAddess clearfix" :class="{active: showCityList}">
                        <!--<strong>{{outCityName}}（{{productDetailsObj.cityName}}成团）</strong>-->
                        <strong>{{ startAddress }}（{{ startAddress }}成团）</strong>
                        <span :class="{active: showCityList}"
                              @click.stop="showCity">{{lineCityLength}}个城市可选<i></i></span>
                      </div>
                      <div class="allRecommendCity" v-show="showCityList">
                        <div class="regionClassification clearfix">
                          <a href="javascript:;"
                             :class="{active: index == AIndex}"
                             v-for="item,index in regionType"
                             @click.stop="changeCityA(item,index)"
                          >{{item.letter}}</a>
                        </div>
                        <ul class="cityList clearfix">
                          <li v-for="item,index in outCityList" @click.stop="getSearchCity(item,index)"
                              :class="{active:index==h}">
                            <strong>{{item.ts_cc_Name}}</strong>
                            <!--<span><em>¥9983</em>起</span>-->
                          </li>
                          <li v-show="!outCityList.length"
                              style="background-color: #fff;width: 100%;text-align: center;border: none;">暂无对应城市
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="block">
                      <span class="demonstration">出发日期: </span>
                      <el-date-picker
                              v-model="addOrderOptions.DayValue"
                              :disabled="isDisabled"
                              type="date"
                              placeholder="日期"
                              size=small>
                      </el-date-picker>
                    </div>
                  </li>
                  <li>
                    <span>选择数量:</span><i style="margin-left: 20px">成人:</i>
                    <div class="bottom">
                      <el-tooltip class="item" effect="light" content="此价格根据机票有浮动，详情请咨询客服." placement="bottom-start">
                        <i class="icon-info22"></i>
                      </el-tooltip>
                      <span style="color: #f60;font-weight: bold;"
                            v-show="addOrderOptions.adultPrice">¥{{addOrderOptions.adultPrice}}</span>
                    </div>
                    <el-input-number
                            v-model="addOrderOptions.adultNumber"
                            @change="handleChange"
                            size="small"
                            :min="0"
                            :disabled="addOrderOptions.adultYu==0"
                            :max="addOrderOptions.adultYu"
                            label="描述文字"
                    ></el-input-number>
                    <span style="color: #f60;font-weight: bold;"
                          v-show="addOrderOptions.adultYu">余{{addOrderOptions.adultYu}}</span>
                  </li>
                  <li>
                    <i style="margin-left:70px;margin-right: 12px">儿童:</i>
                    <span style="color: #f60;font-weight: bold;"
                          v-show="addOrderOptions.childPrice">¥{{addOrderOptions.childPrice}}</span>
                    <el-input-number
                            v-model="addOrderOptions.childNumber"
                            @change="handleChange"
                            size="small"
                            :min="0"
                            :disabled="addOrderOptions.childYu==0"
                            :max="addOrderOptions.childYu"
                            label="描述文字"
                    ></el-input-number>
                    <span style="color: #f60;font-weight: bold;"
                          v-show="addOrderOptions.childYu">余{{addOrderOptions.childYu}}</span>
                  </li>
                </ul>
                <div class="button clearfix">
                  <a href="javascript:;" @click="immediatelyReserveSubmit">立即预订</a>
                  <!--<a href="javascript:;">APP优惠<i></i></a>-->
                  <a href="javascript:;" @click="collection" :class="{active:collectionClass}"><i
                          class="icon"></i>收藏</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header id="headerNavWrap">
        <nav class="headerNav clearfix" ref="headerNav">
          <span @click="changeType(index,item)" v-for="item,index in lineMenuList" :class="{active:index==0}"><a
                  href="javascript:;">{{item.ts_mu_Name}}</a></span>
        </nav>
      </header>
      <section id="content">
        <!--产品详情-->
        <div class="productDetailsWrap" id="h1" v-show="showList[0].isShow" style="padding-bottom: 100px">
          <div class="productDetails clearfix">
            <div class="discountIcon">
              <h3>产品详情</h3>
            </div>
            <div class="productDetailsContent">
              <div class="clearfix">
                <div v-show="lineScheduleObj.ts_pt_IntroReason">
                  <div class="couponsActive clearfix">
                    <span></span>
                    <h5>推荐理由</h5>
                  </div>
                  <div class="reason">
                    <div v-html="lineScheduleObj.ts_pt_IntroReason"></div>
                    <!--<p v-html="lineScheduleObj">{{item.ts_gi_Name}}</p>-->
                  </div>
                </div>
                <div v-show="lineScheduleObj.ts_pt_Describe">
                  <div class="couponsActive clearfix">
                    <span></span>
                    <h5>线路介绍</h5>
                  </div>
                  <div class="reason" style="padding-top: 20px">
                    <div v-html="lineScheduleObj.ts_pt_Describe"></div>
                    <!--<p v-for="item in introList">{{item.ts_gi_Name}}</p>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--线路日程-->
        <div class="LineSchedule clearfix" id="h2" v-show="showList[1].isShow">
          <ul class="scheduleList" :class="{active: navFix}" ref="navBox">
            <li v-for="item,index in  lineScheduleObj.prepareList">
              <strong :class="{active:index==p}" @click="clickLeftDay(index,item)">第{{item.ts_pt_Day}}天<i></i></strong>
              <ul class="spotList" v-show="item.showTour">
                <li v-for="v,i in item.tourList" :class="{active:i==s}" @click="clickTourList(i,v,index)"><span
                        v-show="v.ts_ts_TourName!='无'">{{v.ts_ts_TourName}}</span><i></i></li>
              </ul>
            </li>
          </ul>
          <div class="discountIcon">
            <h3>行程线路</h3>
          </div>
          <div class="LineScheduleContent">
            <div class="dayDetails" v-show="lineScheduleObj.ts_pt_LineDetail">
              <div class="dayDetailsNav clearfix">
                <strong>行程明细</strong>
                <span>* 以下行程仅供参考，最终行程可能会根据实际情况进行微调，敬请以签约行程为准。</span>
                <a href="javascript:;" @click="print">打印行程</a>
              </div>
              <div class="dayDetailsAll">
                <strong>沿途景点：</strong>
                <ul class="dayDetailsList">
                  <li class="clearfix">
                    <!--<strong>第{{item.ts_pt_Day}}天</strong>-->
                    <div class="innnerHtmlBox" v-for="item,index in lineScheduleObj.prepareList">
                      <span style="font-weight: bold;margin-right: 20px"> 第{{item.ts_pt_Day}}天</span>
                      {{item.ts_pt_Describe?item.ts_pt_Describe:'暂无'}}
                    </div>
                    <!--<span v-html="item.ts_pt_Content">{{item.ts_pt_Content}}</span>-->
                  </li>
                </ul>
              </div>
            </div>
            <!--日程安排-->
            <ul class="lineLsitDetails" ref="leftDay">
              <li v-for="item,index in lineScheduleObj.prepareList" :data-num="item.ts_pt_ID" class="prepareListClass">
                <!--每天的Title-->
                <div class="dayTitle clearfix">
                  <div class="dayIcon">D{{item.ts_pt_Day}}</div>
                  <strong>第{{item.ts_pt_Day}}天</strong>
                  <div class="toPlace" v-for="v in item.titleList">
                    <span>{{v.ts_dtp_FromSite}}</span>
                    <!--plane   car 火车train 轮船ship-->
                    <i
                            :class="{car:v.ts_dtp_GoWay==0,train:v.ts_dtp_GoWay==1,plane:v.ts_dtp_GoWay==2,ship:v.ts_dtp_GoWay==3}"
                            v-show="!v.ts_dtp_ReachSite"></i>
                  </div>
                </div>
                <!--温馨提示-->
                <div class="reminder" v-show="item.ts_pt_HappyNotice&&item.ts_pt_HappyNotice!='无'">
                  <div class="reminderIcon overviewTravelIcon clearfix classStorng">
                    <i></i>
                    <strong>温馨提示</strong>
                  </div>
                  <p class="reminderEdtor overviewTravelEdtor">
                    {{item.ts_pt_HappyNotice}}
                  </p>
                </div>
                <!--行程概览-->
                <div class="overviewTravel" v-show="item.ts_pt_TourShow">
                  <div class="overviewTravelIcon clearfix classStorng">
                    <i></i>
                    <strong>行程概览</strong>
                  </div>
                  <p class="overviewTravelEdtor">
                    {{item.ts_pt_TourShow}}
                  </p>
                </div>
                <!--自由活动-->
                <div class="freeActive" v-show="item.ts_pt_FreeTitle&&item.ts_pt_FreeTitle!='无'">
                  <div class="freeActiveIcon clearfix classStorng">
                    <i></i>
                    <strong>自由活动</strong>
                  </div>
                  <!--smallTitle 小标题-->
                  <strong class="smallTitle">{{item.ts_pt_FreeTitle}}</strong>
                  <p class="freeActiveEdtor overviewTravelEdtor">
                    {{item.ts_pt_FreeDes}}
                  </p>
                  <!--lineImageBox lineImageBox1-->
                  <ul class="clearfix"
                      :class="{lineImageBox1:item.ts_pt_FreeImage.length>=5||item.ts_pt_FreeImage.length==3,lineImageBox:item.ts_pt_FreeImage.length<=2&&item.ts_pt_FreeImage.length%2!=0,lineImageBox:item.ts_pt_FreeImage.length%2===0&&item.ts_pt_FreeImage.length<5}">
                    <!--lineImageBox1:val.ts_fd_Image.length>=5||val.ts_fd_Image.length==3,lineImageBox:val.ts_fd_Image.length<=2&&val.ts_fd_Image.length%2!=0,lineImageBox:val.ts_fd_Image.length%2===0&&val.ts_hl_HotelImage<5-->
                    <li v-for="i in item.ts_pt_FreeImage">
                      <img v-lazy="i" alt="">
                    </li>
                  </ul>
                </div>
                <div v-for="val,n in item.getSortList">
                  <!--早餐-->
                  <div class="dayFoodDetails" v-show="val.ts_fd_UseType==0">
                    <div class="dayFoodDetailsIcon clearfix classStorng">
                      <i></i>
                      <span class="activetime">{{val.ts_fd_Time}}</span>
                      <strong>早餐: {{val.ts_fd_Include}}</strong>
                    </div>
                    <!--foodTime  用餐时间-->
                    <strong class="foodTime">{{val.ts_fd_Time}} {{val.ts_fd_WasteMinute}}</strong>
                    <p class="dayFoodDetailsEdtor overviewTravelEdtor">
                      {{val.ts_fd_Des}}
                    </p>
                    <ul class=" clearfix" v-show="val.ts_fd_Image.length"
                        :class="{lineImageBox1:val.ts_fd_Image.length>=5||val.ts_fd_Image.length==3,lineImageBox:val.ts_fd_Image.length<=2&&val.ts_fd_Image.length%2!=0,lineImageBox:val.ts_fd_Image.length%2===0&&val.ts_fd_Image.length<5}">
                      <!--lineImageBox1:val.ts_fd_Image.length>=5||val.ts_fd_Image.length==3,lineImageBox:val.ts_fd_Image.length<=2&&val.ts_fd_Image.length%2!=0,lineImageBox:val.ts_fd_Image.length%2===0&&val.ts_hl_HotelImage<5-->
                      <li v-for="i in val.ts_fd_Image">
                        <img v-lazy="i" alt="">
                      </li>
                    </ul>
                  </div>
                  <!--景点-->
                  <div class="scenicSpot" v-show="val.ts_ts_ID && val.ts_ts_TourName!='无'" :data-tourNum="val.ts_ts_ID">
                    <div class="scenicSpotIcon clearfix classStorng">
                      <i></i>
                      <strong v-show="val.ts_ts_TourName!='无'">{{val.ts_ts_TourName}}</strong>
                      <em v-show="val.ts_ts_Fee!='无'">{{val.ts_ts_Fee}}</em>
                      <span class="activetime" v-show="val.ts_ts_Time!='无'">{{val.ts_ts_Time}}</span>
                    </div>
                    <strong class="foodTime" v-show="val.ts_ts_Time!='无'">{{val.ts_ts_Time}}</strong>
                    <strong class="foodTime" v-show="val.ts_ts_Address!='无'">{{val.ts_ts_Address}}</strong>
                    <span class="playTime clearfix" v-show="val.ts_ts_NeedMinute!='无'"><i></i>游玩时长：{{val.ts_ts_NeedMinute}}</span>
                    <p class="scenicSpotEdtor overviewTravelEdtor" v-show="val.ts_ts_Des!='无'">
                      {{val.ts_ts_Des}}
                    </p>
                    <ul class="clearfix" v-show="val.ts_ts_Image.length"
                        :class="{lineImageBox1:val.ts_ts_Image.length>=5||val.ts_ts_Image.length==3,lineImageBox:val.ts_ts_Image.length<=2&&val.ts_ts_Image.length%2!=0,lineImageBox:val.ts_ts_Image.length%2===0&&val.ts_ts_Image.length<5}">
                      <!--lineImageBox1:val.ts_fd_Image.length>=5||val.ts_fd_Image.length==3,lineImageBox:val.ts_fd_Image.length<=2&&val.ts_fd_Image.length%2!=0,lineImageBox:val.ts_fd_Image.length%2===0&&val.ts_hl_HotelImage<5-->
                      <li v-for="i in val.ts_ts_Image">
                        <img v-lazy="i" alt="">
                      </li>
                    </ul>
                    <!--{{-n-item.foodList.length}}-->
                    <!--{{n-item.foodList.length}}-->
                    <!--{{item.tourList.length-1}}-->
                    <!--{{allNum}}-->
                    <!--{{item.tourList.length}}-->
                    <!--{{item.tourList.length-1+allNum}}-->ts_ts_Prompt
                    <div class="reminder" v-show="val.ts_ts_Prompt">
                      <div class="reminderIcon overviewTravelIcon clearfix classStorng">
                        <i></i>
                        <strong>温馨提示</strong>
                      </div>
                      <p class="reminderEdtor overviewTravelEdtor">
                        {{val.ts_ts_Prompt}}
                      </p>
                    </div>
                    <!--景点温馨提示-->
                    <div class="reminder" v-show="n==item.num&&item.tourList.length">
                      <div class="reminderIcon overviewTravelIcon clearfix classStorng">
                        <i></i>
                        <strong>景点温馨提示</strong>
                      </div>
                      <p class="reminderEdtor overviewTravelEdtor">
                        {{item.ts_pt_TicketHappyNotice}}
                      </p>
                    </div>
                  </div>

                  <!--中餐-->
                  <div class="dayFoodDetails" v-show="val.ts_fd_UseType==1">
                    <div class="dayFoodDetailsIcon clearfix classStorng">
                      <i></i>
                      <span class="activetime">{{val.ts_fd_Time}}</span>
                      <strong v-show="val.ts_fd_Include!='无'">中餐: {{val.ts_fd_Include}}</strong>
                    </div>
                    <!--foodTime  用餐时间-->
                    <strong class="foodTime">{{val.ts_fd_Time}} {{val.ts_fd_WasteMinute}}</strong>
                    <p class="dayFoodDetailsEdtor overviewTravelEdtor">
                      {{val.ts_fd_Des}}
                    </p>
                    <ul class="clearfix" v-show="val.ts_fd_Image"
                        :class="{lineImageBox1:val.ts_fd_Image.length>=5||val.ts_fd_Image.length==3,lineImageBox:val.ts_fd_Image.length<=2&&val.ts_fd_Image.length%2!=0,lineImageBox:val.ts_fd_Image.length%2===0&&val.ts_fd_Image.length<5}">
                      <!--lineImageBox1:val.ts_fd_Image.length>=5||val.ts_fd_Image.length==3,lineImageBox:val.ts_fd_Image.length<=2&&val.ts_fd_Image.length%2!=0,lineImageBox:val.ts_fd_Image.length%2===0&&val.ts_hl_HotelImage<5-->
                      <li v-for="i in val.ts_fd_Image">
                        <img v-lazy="i" alt="">
                      </li>
                    </ul>
                  </div>
                  <!--晚餐-->
                  <div class="dayFoodDetails" v-show="val.ts_fd_UseType==2">
                    <div class="dayFoodDetailsIcon clearfix classStorng">
                      <i></i>
                      <span class="activetime">{{val.ts_fd_Time}}</span>
                      <strong>晚餐: {{val.ts_fd_Include}}</strong>
                    </div>
                    <!--foodTime  用餐时间-->
                    <strong class="foodTime">{{val.ts_fd_Time}} {{val.ts_fd_WasteMinute}}</strong>
                    <p class="dayFoodDetailsEdtor overviewTravelEdtor" v-show="val.ts_fd_Des!='无'">
                      {{val.ts_fd_Des}}
                    </p>
                    <ul class="clearfix" v-show="val.ts_fd_Image.length"
                        :class="{lineImageBox1:val.ts_fd_Image.length>=5||val.ts_fd_Image.length==3,lineImageBox:val.ts_fd_Image.length<=2&&val.ts_fd_Image.length%2!=0,lineImageBox:val.ts_fd_Image.length%2===0&&val.ts_fd_Image.length<5}">
                      <!--lineImageBox1:val.ts_fd_Image.length>=5||val.ts_fd_Image.length==3,lineImageBox:val.ts_fd_Image.length<=2&&val.ts_fd_Image.length%2!=0,lineImageBox:val.ts_fd_Image.length%2===0&&val.ts_hl_HotelImage<5-->
                      <li v-for="i in val.ts_fd_Image">
                        <img v-lazy="i" alt="">
                      </li>
                    </ul>
                  </div>

                  <!--住宿-->
                  <div class="putUp" v-show="val.ts_hl_ID && val.ts_hl_HotelName!='无'">
                    <div class="putUpIcon clearfix classStorng">
                      <i></i>
                      <strong>住宿 · 基础参考客栈：{{val.ts_hl_HotelName}}</strong>
                      <span class="activetime" v-show="val.ts_hl_Time!='无'">{{val.ts_hl_Time}}</span>
                    </div>
                    <p class="putUpEdtor overviewTravelEdtor" v-show="val.ts_hl_HotelDes!='无'">
                      {{val.ts_hl_HotelDes}}
                    </p>
                    <ul class="recommendHotelList">
                      <li>
                        <span v-show="val.ts_hl_LookHotel!='无'&&val.ts_hl_LookHotel">参考酒店：{{val.ts_hl_LookHotel}}</span>
                        <span v-show="val.ts_hl_StandardRoom!='无'&&val.ts_hl_StandardRoom">标准间：{{val.ts_hl_StandardRoom}}</span>
                        <span v-show="val.ts_hl_BedType!='无'&&val.ts_hl_BedType">床型：{{val.ts_hl_BedType}}</span>
                        <span v-show="val.ts_hl_Good!='无'&&val.ts_hl_Good">设施：{{val.ts_hl_Good}} </span>
                        <span v-show="val.ts_hl_Address!='无'&&val.ts_hl_Address">酒店地址：{{val.ts_hl_Address}} </span>
                        <span v-show="val.ts_hl_HappyNotice!='无'&&val.ts_hl_HappyNotice">温馨提示：{{val.ts_hl_HappyNotice}} </span>
                      </li>
                    </ul>
                    <ul class="clearfix" v-show="val.ts_hl_HotelImage.length"
                        :class="{lineImageBox1:val.ts_hl_HotelImage.length>=5||val.ts_hl_HotelImage.length==3,lineImageBox:val.ts_hl_HotelImage.length<=2&&val.ts_hl_HotelImage.length%2!=0,lineImageBox:val.ts_hl_HotelImage.length%2===0&&val.ts_hl_HotelImage.length<5}">
                      <li v-for="i in val.ts_hl_HotelImage">
                        <img v-lazy="i" alt="">
                      </li>
                    </ul>
                  </div>
                  <!--酒店温馨提示-->
                  <div class="reminder"
                       v-show="n==((item.tourList.length+item.hotelList.length-1+allNum))&&item.hotelList.length">
                    <div class="reminderIcon overviewTravelIcon clearfix classStorng">
                      <i></i>
                      <strong>酒店温馨提示</strong>
                    </div>
                    <p class="reminderEdtor overviewTravelEdtor">
                      {{item.ts_pt_HotelHappyNotice}}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--套餐说明-->
        <div class="packageDescription clearfix" id="h3" v-show="showList[2].isShow">
          <div class="discountIcon">
            <h3>费用说明</h3>
          </div>
          <div class="packageDescriptionContent">
            <!--费用包含-->
            <div class="wrapMoney" v-show="lineScheduleObj.ts_pt_FeeIn">
              <div class="couponsActive clearfix">
                <span></span>
                <h5>费用包含</h5>
              </div>
              <div class="wrapMoneyContent">
                <div v-html="lineScheduleObj.ts_pt_FeeIn"></div>
                <!--<div v-for="item in IncludeList">-->
                <!--&lt;!&ndash;<strong>【费用包含】</strong>&ndash;&gt;-->
                <!--<p style="padding-left: 20px;">{{item.ts_gi_Name}}</p>-->
                <!--</div>-->
              </div>
            </div>
            <!--费用不包含-->
            <div class="noWrapMoney" v-show="lineScheduleObj.ts_pt_FeeNotIn">
              <div class="couponsActive clearfix">
                <span></span>
                <h5>费用不包含</h5>
              </div>
              <div class="noWrapMoneyContent">
                <div v-html="lineScheduleObj.ts_pt_FeeNotIn"></div>
                <!--<div v-for="item in noWrapMoneyList">-->
                <!--&lt;!&ndash;<strong>【{{item.ts_fi_Item}}】</strong>&ndash;&gt;-->
                <!--<p style="padding-left: 20px;">{{item.ts_gi_Name}}</p>-->
                <!--</div>-->
              </div>
            </div>
            <!--退订政策-->
            <div class="unsubscribePolicy" style="padding-bottom: 30px;padding-top: 20px"
                 v-show="lineScheduleObj.ts_pt_ReturnRule">
              <div class="couponsActive clearfix">
                <span></span>
                <h5>退订政策</h5>
              </div>
              <div class="unsubscribePolicyContent">
                <div v-html="lineScheduleObj.ts_pt_ReturnRule"></div>
                <!--<p v-for="item in lineScheduleObj.backList">{{item.ts_gi_Name}}</p>-->
              </div>
            </div>
          </div>
        </div>
        <!--预定须知-->
        <div class="packageDescription clearfix" id="h4" v-show="showList[3].isShow">
          <div class="buyNeedToKnow">
            <div class="discountIcon">
              <h3>预定须知</h3>
            </div>
            <div>
              <div class="couponsActiveWrap" v-show="lineScheduleObj.ts_pt_BookKnow">
                <div class="couponsActive clearfix">
                  <span></span>
                  <h5>出行须知</h5>
                </div>
                <div class="buyNeedToKnowContent" style="padding-bottom: 30px;padding-top: 20px">
                  <div v-html="lineScheduleObj.ts_pt_BookKnow"></div>
                  <!--<p v-for="item in lineScheduleObj.bookList">{{item.ts_gi_Name}}</p>-->
                </div>
              </div>
              <div class="couponsActiveWrap" v-show="lineScheduleObj.ts_pt_PayWay">
                <div class="couponsActive clearfix">
                  <span></span>
                  <h5>付款方式</h5>
                </div>
                <div class="buyNeedToKnowContent" style="padding-bottom: 30px;padding-top: 20px">
                  <div v-html="lineScheduleObj.ts_pt_PayWay"></div>
                  <!--<p v-for="item in lineScheduleObj.bookList">{{item.ts_gi_Name}}</p>-->
                </div>
              </div>

              <div class="couponsActiveWrap" v-show="lineScheduleObj.ts_pt_LimitDuty">
                <div class="couponsActive clearfix">
                  <span></span>
                  <h5>违约责任</h5>
                </div>
                <div class="buyNeedToKnowContent" style="padding-bottom: 30px;padding-top: 20px">
                  <div v-html="lineScheduleObj.ts_pt_LimitDuty"></div>
                  <!--<p v-for="item in lineScheduleObj.bookList">{{item.ts_gi_Name}}</p>-->
                </div>
              </div>

              <div class="couponsActiveWrap" v-show="lineScheduleObj.ts_pt_SafetyLimit">
                <div class="couponsActive clearfix">
                  <span></span>
                  <h5>特殊限制</h5>
                </div>
                <div class="buyNeedToKnowContent" style="padding-bottom: 30px;padding-top: 20px">
                  <div v-html="lineScheduleObj.ts_pt_SpecialLimit"></div>
                  <!--<p v-for="item in lineScheduleObj.bookList">{{item.ts_gi_Name}}</p>-->
                </div>
              </div>


              <div class="couponsActiveWrap" v-show="lineScheduleObj.ts_pt_SpecialLimit">
                <div class="couponsActive clearfix">
                  <span></span>
                  <h5>安全提示</h5>
                </div>
                <div class="buyNeedToKnowContent" style="padding-bottom: 30px;padding-top: 20px">
                  <div v-html="lineScheduleObj.ts_pt_SafetyLimit"></div>
                  <!--<p v-for="item in lineScheduleObj.bookList">{{item.ts_gi_Name}}</p>-->
                </div>
              </div>
            </div>

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
                  <strong>{{searchTravelObj.goodrate}}%</strong>
                  <span>来自{{searchTravelObj.totalRows}}名游客的点评</span>
                </div>
                <div class="statisticalChart">
                  <ul class="statisticalChartLeft">
                    <li class="clearfix">
                      <span>满意</span>
                      <div class="statisticalChartLeftBar">
                        <div class="statisticalChartLeftBarChild"
                             :style="{width:searchTravelObj.goodrate +'%'}"></div>
                      </div>
                      <span>{{searchTravelObj.goodrate}}%</span>
                    </li>
                    <li class="clearfix">
                      <span>一般</span>
                      <div class="statisticalChartLeftBar">
                        <div class="statisticalChartLeftBarChild"
                             :style="{width: searchTravelObj.middlerate+'%'}"></div>
                      </div>
                      <span>{{searchTravelObj.middlerate}}%</span>
                    </li>
                    <li class="clearfix">
                      <span>不满意</span>
                      <div class="statisticalChartLeftBar">
                        <div class="statisticalChartLeftBarChild"
                             :style="{width: searchTravelObj.poorrate+'%'}"></div>
                      </div>
                      <span>{{searchTravelObj.poorrate}}%</span>
                    </li>
                  </ul>
                  <ul class="statisticalChartRight">
                    <li v-for="item,index in searchTravelObj.data">
                      <strong>{{item.ts_ct_Name}}</strong>
                      <span><i>{{item.score}}</i>/5分</span>
                    </li>
                  </ul>
                </div>
                <div class="commentOnAComment">
                  <!--<strong>出游归来发点评返现金,<br>-->
                  <!--本产品已累计发放<i>19012</i>元</strong>-->
                  <a href="javascript:;" @click="addComment">发表点评</a>
                  <!--<router-link to="/CommentOnAComment">发表点评</router-link>-->
                </div>
              </div>
              <!--点评类型-->
              <ul class="commentsOnTouristsStatisticsTypeList clearfix">
                <li v-for="item,index in typeList">
                  <a href="javascript:;" :class="{active:a==index}">{{item.name}}</a>
                </li>
              </ul>
            </div>
            <!--评论列表-->
            <ul class="evaluationContent" v-loading="commentLoading" v-show="travelCommendList.length">
              <li class="clearfix" v-for="item,index in travelCommendList">
                <!--游客信息-->
                <div class="touristInfromation">
                  <div class="headerImage">
                    <img v-lazy="item.sm_ui_HeadImage" v-show="item.sm_ui_HeadImage" width="60" height="60">
                  </div>
                  <span class="touristInfromationName">{{item.ts_ct_userName}}</span>
                </div>
                <!--点评内容-->
                <div class="touristComment">
                  <ul class="touristCommentList clearfix">
                    <li><span>总体评价: {{item.satisfaction}}</span></li>
                    <li v-for="v in item.typeScore"><span>{{v.ts_ct_Name}}:{{v.ts_cs_Score}}分</span></li>
                  </ul>
                  <p class="touristCommentContent">
                    {{item.ts_ct_Content}}
                  </p>
                  <ul class="uploadPictureList clearfix" v-show="item.imgData.length">
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
            <p v-show="!travelCommendList.length"
               style="font: 16px/2 '微软雅黑';padding:  40px 0;text-align: center;border-bottom: 1px dashed #ccc;"
            >暂无评论</p>
            <!--分页-->
            <div class="block" style="float: right;">
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
      </section>
    </section>
    <el-dialog
            title="温馨提示"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
      <span style="color: #f60">请先登录!</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisibleSubmit">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>
<script>
    import cityOptions from '../../assets/js/data'
    import '@/assets/css/comment.css'
    import '@/assets/css/HeelTour.css'
    import {mapGetters} from 'vuex'
    import {getViewPortWidth, setScrollTop} from '@/assets/public'

    export default {
        name: '',
        components: {},
        computed:Object.assign({
            allNum(){
                let arr = this.productDetailsObj.prepareList
                let num = 0;
                for(var i=0;i<arr.length;i++){
                    let newArr = arr[i].getSortList
                    for(var j=0;j<newArr.length;j++){
                        if(newArr[j].ts_fd_UseType){
                            num++
                        }
                    }
                }
                return num+1
            }
        }, mapGetters([
            'productDetailsObj',
            'lineScheduleObj',
            'IncludeList',
            'noWrapMoneyList',
            'lineMenuList',
            'timesPriceList',
            'priceObj',
            'newPriceDetail',
            'getProvinceList',
            'getCityList',
            'getCountyList',
            'commentMXObj',
            'commentData',
            'newCommentData',
            'introList',
            'reasonList',
            'outCityObj',
            'outCityName',
            'travelCommendList',
            'searchTravelObj',
        ])),
        data() {
            return {
                startAddress:'',
                isDisabled: true,
                h: 20,
                showCityList: false,
                lineCityLength: 0,
                isCarouselAutoplay: true,
                isControls: true,
                isAutoplay: false,
                day: {},
                commentLoading: false,//用户评论loading
                typeList: [
                    {name: '全部', id: 1},
//          {name: '一般', id: 2},
//          {name: '满意', id: 3},
//          {name: '不满意', id: 4}
                ],//点评类型
                total: 0,
                price: '',
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
                a: 0,
                isCollection: true,
                collectionClass: false,
                centerDialogVisible: false,//登录弹窗
                showCalendar: false,
                pictureList: [],
                isActiveSearchMonth: false,
                isActive: false,
                isSalendar: true,
                iswrap: true,
                data: [],
                arr1: [],
                arr2: [],
                arr3: [],//今天
                arr4: [],
                arr5: [],//显示价格
                selectMonth: [],
                city: '',
                p: 0,
                s: 0,
                isScheduleList: false,
                positions: {
                    left: 0,
                    top: 0
                },
                searchMonth: [],
                date: '',
                userSearch: {
                    name: ''
                },
                id: '',
                changeDate: '',//选中日期
                cityValue: '',
                submitCity: '',
                m: '',//月份
                countyValue: '',
                addOrderOptions: {
                    ts_pp_ID: '',
                    provinceValue: '',
                    DayValue: '',
                    adultNumber: 0,//成人
                    adultYu: 0,//成人余票
                    adultPrice: '',//成人价格
                    childPrice: '',//儿童价格
                    childYu: 0,//儿童余票
                    childNumber: 0,//儿童
                },
                picAutoPaly: true,
                regionType: [],
                AIndex: 0,
                outCityList: [],
                cityName: '',
                lastDateArr: [],
                monthArr: [],
                nextDateArr: [],
                tradeID: '',
                userInfo: {},
                navFix: false
            }
        },
        created() {
            this.userInfo = JSON.parse(sessionStorage.getItem('user'))
            this.day.m = new Date().getMonth()
            this.day.d = new Date().getDate()
            //获取评论list
            this.getTypeList()
            this.price = sessionStorage.getItem('money');

            this.initData().then((id) => {
                this.initOutCity(id);
                let images = [];
                if (this.productDetailsObj.ta_tg_ShowImage) {
                    images = this.productDetailsObj.ta_tg_ShowImage.split(',');
                }
                if (!images[images.length - 1]) {
                    images.pop()
                }
                this.pictureList = images;

                this.$nextTick(() => {
                    document.title = '跟团游_' + this.productDetailsObj.ta_tg_Title
                })

                this.id = id;
                let date = new Date()
                let str = date.getFullYear() + '-' + this.getNum(date.getMonth() + 1) + '-01';
                this.getCitySearch(id, '', true, str, date.getMonth());
                this.$nextTick(() => {
                    if (!this.navFix) {
                        this.scrollPage();
                    }
                })
            });
            this.data = cityOptions;

        },
        methods: {
            //点击左面的景点
            clickTourList(index, item, i){
                this.s = index;
                this.getTourElement(index, item.ts_ts_ID, i)
            },
            getTourElement(index, id, i){
                let leftDay = this.$refs.leftDay;
                let liOne = leftDay.getElementsByClassName('prepareListClass')[i];
                let divs = liOne.getElementsByClassName('scenicSpot');
                for (var i = 0; i < divs.length; i++) {
                    if (divs[i].getAttribute('data-tourNum') == id) {
                        setScrollTop(divs[i].offsetTop + liOne.offsetTop + 1050)
                    }
                }
            },
            //点击左面的day
            clickLeftDay(index, item){
                this.p = index;
                this.s = 0;
                this.$store.commit('updateLineScheduleObj', index);
                this.getElement(item.ts_pt_ID)
            },
            getElement(id){
                let leftDay = this.$refs.leftDay;
                let lis = leftDay.getElementsByClassName('prepareListClass');
                for (var i = 0; i < lis.length; i++) {
                    if (lis[i].getAttribute('data-num') == id) {
                        setScrollTop(lis[i].offsetTop + 1050)
                    }
                }
            },
            scrollPage() {
                window.addEventListener('scroll', () => {
                    if (document.documentElement.scrollTop > 1200) {
                        this.navFix = true;
                        this.$refs.navBox.style.left = (getViewPortWidth() - 1188) / 2 + 20 + 'px'
                    } else {
                        this.navFix = false;
                        this.$refs.navBox.style.left = '20px'
                    }
                })
            },
            //鼠标移出出发城市
            mouseAllRecommendCity() {
                this.showCityList = false
            },
            showCity() {
                if (this.showCityList) {
                    this.showCityList = false;
                } else {
                    this.showCityList = true;
                }
            },
            changeCityA(item, index) {
                this.AIndex = index;
                this.outCityList = item.GroupCityList;
            },
            //评分类型点击
//      typeClick(item) {
//        this.a = item.id - 1;
//        this.$store.commit('updateCommentData', item.name)
//        this.total = this.newCommentData.length
//      },
            //评论分页
            handleCurrentChange(num) {
                this.initTravelCommend(num)
            },
            //发表评论
            addComment() {
                this.goAddComment()
                    .then(totalArr => {
                        if (totalArr[0]) {
                            this.$notify({
                                message: '您已评论!!!',
                                type: 'warning'
                            })
                        } else if (!totalArr[0] && totalArr[1]) {
                            this.$router.push({name: 'CommentOnAComment', params: {id: this.tradeID, typeId: 6}})
                        } else if (!totalArr[0] && !totalArr[1]) {
                            this.$notify({
                                message: '您还未到此产品游玩!!!',
                                type: 'warning'
                            })
                        }
                    }, err => {
                        this.$notify({
                            message: err,
                            type: 'error'
                        })
                    })
            },
            async goAddComment() {

                let SelectAllComment = {
                    "loginUserID": "huileyou",
                    "loginUserPass": "123",
                    "operateUserID": "",
                    "operateUserName": "",
                    "pcName": "",
                    "token": this.userInfo.token,
                    "ID": "",       //产品评论编码
                    "UserInfoID": this.userInfo.sm_ui_ID ? this.userInfo.sm_ui_ID : '',  // 用户信息编码
                    "GoodID": this.tradeID,       //产品编码
                    "IsDelete": "0",     //是否有效
                    "ts_ct_SysID": "6",     //系统编码  6旅行社 1车票 2门票 3美食 4酒店 5租车
                }
                let commentTotal = await this.$store.dispatch('initFoodUserCommend', SelectAllComment)


                let getOrderInfo = {
                    "loginUserID": "huileyou",
                    "loginUserPass": "123",
                    "operateUserID": "",
                    "operateUserName": "",
                    "pcName": "",
                    "token": this.userInfo.token,
                    "ts_to_GoodsListID": this.tradeID,//
                    "ts_to_OutStatus": "1",//出票状态
                    "ts_to_UserID": this.userInfo.sm_ui_ID ? this.userInfo.sm_ui_ID : '',//用户编码
                }
                let orderTotal = await this.$store.dispatch('agenciesOrderInfo', getOrderInfo)

                return [commentTotal, orderTotal]
            },
            //查询旅行社评论
            initTravelCommend(num) {
                let SelectAllComment = {
                    "loginUserID": "huileyou",
                    "loginUserPass": "123",
                    "operateUserID": "",
                    "operateUserName": "",
                    "pcName": "",
                    "token": this.userInfo.token,
                    "ID": "",       //产品评论编码
                    "UserInfoID": "",  // 用户信息编码
                    "GoodID": this.tradeID,       //产品编码
                    "IsDelete": "0",     //是否有效
                    "ts_ct_SysID": "6",     //系统编码  6旅行社 1车票 2门票 3美食 4酒店 5租车
                    "page": num ? num : 1,
                    "rows": 5,
                }
                this.$store.dispatch('initTravelCommend', SelectAllComment)
                    .then(total => {
                        this.total = total;
                    }, err => {
                        this.$notify({
                            message: err,
                            type: 'error'
                        })
                    })
            },
            //选中日历,item日历信息
            changeTime(item) {
                console.log(item)
                if (!item.cityName) {
                    this.$notify({
                        message: '请选择出发城市！',
                        type: 'error'
                    });
                    return
                }
                if (!item.day) {
                    this.$notify({
                        message: '当前日期没价格！',
                        type: 'error'
                    });
                    return
                }
                //获取余票
                let options = {
                    "loginUserID": "huileyou",
                    "loginUserPass": "123",
                    "operateUserID": "",
                    "operateUserName": "",
                    "pcName": "",
                    "productPriceID": item.ts_pp_ID
                };
                this.addOrderOptions.ts_pp_ID = item.ts_pp_ID;
                this.addOrderOptions.DayValue = item.ts_pp_Date;
                this.addOrderOptions.adultPrice = item.ts_pp_Price
                this.addOrderOptions.childPrice = item.ts_pp_ChildPrice

                this.$store.dispatch('GetFreeSeat', options)
                    .then((data) => {
                        this.addOrderOptions.adultYu = data.fullNo
                        this.addOrderOptions.childYu = data.childNo
                    }, err => {
                        this.$notify({
                            message: err,
                            type: 'error'
                        });
                    })
            },
            //日历选项卡
            changeSearchMonth(item) {
                this.lastDateArr = [];
                this.monthArr = [];
                this.nextDateArr = [];
                if ((this.day.m + 1) == item.m) {
                    this.day.d = new Date().getDate()
                } else {
                    this.day.d = '今天'
                }
                this.n = item.i;
                this.changeDate = item.date;
                this.m = item.m
                if (this.cityName) {
                    this.getCitySearch(this.id, this.cityName, '', item.date, item.m - 1)
                } else {
                    this.$notify({
                        message: '请选择出发出发城市!',
                        type: 'error'
                    });
                }
            },
            //获取地址
            getAddress(point) {
                var gc = new BMap.Geocoder();

                gc.getLocation(point, function (rs) {
                    var addComp = rs.addressComponents;
                    return addComp.city
                });
            },
            initCity() {
                return new Promise((relove, reject) => {
                    this.$store.commit('showLoading')
                    this.$store.commit('setText', '获取当前位置中!请稍后...');
                    if (returnCitySN.cname.indexOf('省')) {
                        let n = returnCitySN.cname.indexOf('省') + 1;
                        let obj = {
                            province: returnCitySN.cname.substring(0, n),
                            city: returnCitySN.cname.substring(n)
                        }
                        sessionStorage.setItem('addComp', JSON.stringify(obj))
                        relove(obj.province)
                    }
                })
            },
            initCityData(id, city, isOne, date, m, obj) {
                this.userSearch.name = obj.city;
                if (isOne) {
                    this.addOrderOptions.provinceValue = obj.city
                }
                this.submitCity = obj.city
                let options = {
                    "loginUserID": "huileyou",
                    "loginUserPass": "123",
                    "operateUserID": "",
                    "operateUserName": "",
                    "pcName": "",
                    "lineID": id,
                    monthChose: date ? date : '',
                    "city": city ? city : obj.city//remote_ip_info.city +
                };
                this.isSalendar = true;
                this.$store.dispatch('initTimesPrice', options)
                    .then((data) => {
                        this.isSalendar = false;
                        var calendarContentList = document.getElementById("calendarContentList");
                        var str = '';
                        var year = new Date().getFullYear();
                        var month = new Date().getMonth();
                        this.showCalendar = true;
                        if (!date) {
                            this.getDateA(year, month, data)
                        } else {
                            this.getDateA(year, m, data)
                        }

                        let index = Infinity;
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].ts_pp_Price < index) {
                                index = data[i].ts_pp_Price
                            }
                        }
                        for (var i = 0; i < 4; i++) {
                            this.selectMonth.push({
                                year,
                                month: month + 1 + i,
                                index
                            })
                        }
                    })
            },
            //获取搜索城市
            getCitySearch(id, city, isOne, date, m) {
//        $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip='+returnCitySN["cip"], () => {
                let obj = JSON.parse(sessionStorage.getItem('addComp'))
                if (obj) {
                    this.initCityData(id, city, isOne, date, m, obj)
                } else {
                    this.initCity()
                        .then(obj => {
                            this.initCityData(id, city, isOne, date, m, obj)
                        })
                }


//        });
            },
            //选中出发城市
            getSearchCity(obj, index) {
                this.startAddress=obj.ts_cc_Name;
                console.log(obj,index)
                this.h = index
                this.$store.commit('setOutName', obj.ts_cc_Name)
                this.lastDateArr = [];
                this.monthArr = [];
                this.nextDateArr = [];
                this.cityName = obj.ts_cc_Code;
                if ((this.day.m + 1) == new Date().getMonth() + 1) {
                    this.day.d = new Date().getDate()
                } else {
                    this.day.d = '今天'
                }
                let date = new Date()
                let str = date.getFullYear() + '-' + this.getNum(date.getMonth() + 1) + '-01';
                if (this.changeDate) {
                    //选中日历
                    this.getCitySearch(this.id, obj.ts_cc_Code, '', this.changeDate, this.m - 1);
                } else {
                    this.getCitySearch(this.id, obj.ts_cc_Code, '', str, date.getMonth());
                }
                this.addOrderOptions.DayValue = '';
                this.addOrderOptions.adultNumber = 0;//成人
                this.addOrderOptions.adultYu = 0;//成人余票
                this.addOrderOptions.adultPrice = 0;//成人价格
                this.addOrderOptions.childPrice = 0;//儿童价格
                this.addOrderOptions.childYu = 0;//儿童余票
                this.addOrderOptions.childNumber = 0//儿童
            },
            //补0
            getNum(num) {
                return num < 10 ? '0' + num : '' + num;
            },
            //初始化数据
            async initData() {
                let date = new Date()
                let m = date.getMonth() + 1;
                let y = date.getFullYear()
                for (var i = 0; i < 4; i++) {
                    this.searchMonth.push({
                        i,
                        date: y + '-' + this.getNum(m + i) + '-01',
                        name: y + '年' + this.getNum(m + i) + '月',
                        m: m + i
                    })
                }
                this.tradeID = this.$route.params.id;
                //产品详情
                var getTradeGoodInfo = {
                    "loginUserID": "huileyou",
                    "loginUserPass": "123",
                    "operateUserID": "",
                    "operateUserName": "",
                    "goodID": this.tradeID,
                };
                //获取产品线路id
                let id = await this.$store.dispatch('initProductDetails', getTradeGoodInfo)

//        //线路数据
//        var getLineInfo = {
//          "loginUserID": "huileyou",
//          "loginUserPass": "123",
//          "operateUserID": "",
//          "operateUserName": "",
//          "goodID": this.tradeID,
//        };
//        await this.$store.dispatch('initLineSchedule', getLineInfo)

                //线路菜单
                var getLineMenuInfo = {
                    "loginUserID": "huileyou",
                    "loginUserPass": "123",
                    "operateUserID": "",
                    "operateUserName": "",
                    "lineID": id
                };
                await this.$store.dispatch('initLineMenu', getLineMenuInfo)
                return id
            },
            //选中线路菜单
            changeType(index, item) {
                if (item.ts_mu_Name == '游客点评') {
                    this.initTravelCommend();
                    this.searchTravelData();
                }
                let spans = this.$refs.headerNav.querySelectorAll('span');
                let len = spans.length;

                for (let i = 0; i < len; i++) {
                    spans[i].className = ''
                }
                spans[index].className = 'active'
                if (index == 1) {
                    this.isScheduleList = true
                } else {
                    this.isScheduleList = false
                }

                for (var i = 0; i < this.showList.length; i++) {
                    if (this.showList[i].id == index) {
                        this.showList[i].isShow = true
                    } else {
                        this.showList[i].isShow = false
                    }
                }

            },
            //获取周数
            getWeek(year, month) {
                return new Date(year, month, 1, 0, 0, 0).getDay();
            },
            //获取一个月中的所有天数
            getDates(year, month) {
                return new Date(year, month + 1, 1, -1, 0, 0).getDate();
            },
            //累加器
            handleChange(value) {

            },
            //登录确定
            centerDialogVisibleSubmit() {
                this.centerDialogVisible = false;
                this.$router.push({name: 'AdminLogin'});
            },
            //立即预订
            immediatelyReserveSubmit() {
                let user = JSON.parse(sessionStorage.getItem('user'));
                if (!user) {
                    this.centerDialogVisible = true;
                    return;
                }
                if (this.addOrderOptions.DayValue == '') {
                    this.$notify({
                        message: '请选择出发日期!',
                        type: 'error'
                    });
                    return
                }
                if (this.addOrderOptions.DayValue == '' || this.addOrderOptions.adultPrice == '') {
                    this.$notify({
                        message: '请选择左侧可选出发日期!',
                        type: 'error'
                    });
                    return
                }
                if (!this.addOrderOptions.adultNumber) {
                    this.$notify({
                        message: '请选择人数!',
                        type: 'error'
                    });
                    return
                }
                this.addOrderOptions.title = this.productDetailsObj.ts_pt_Name
                sessionStorage.setItem('orderInfo', JSON.stringify(this.addOrderOptions))
                this.$router.push({name: 'FillInOrder'});
            },
            //收藏
            collection() {
                if (this.isCollection) {
                    let user = JSON.parse(sessionStorage.getItem('user'))
                    if (!user) {
                        this.$router.push({name: 'AdminLogin'})
                        return false;
                    } else {
                        let options = {
                            "loginUserID": "huileyou",
                            "loginUserPass": "123",
                            "operateUserID": "",
                            "operateUserName": "",
                            "pcName": "",
                            "data": {
                                "sm_mc_UserInfoID": user.sm_ui_ID,
                                "sm_mc_ProductID": this.$route.params.id,
                                "sm_mc_ProductTitle": this.productDetailsObj.ts_pt_Name,
                                "sm_mc_ProductPrice": this.price,
                                "sm_mc_Image": this.pictureList[0],
                                sm_mc_FromCity: this.submitCity,
                                sm_mc_SysID: '0'
                            }
                        }
                        this.$store.dispatch('addCollection', options)
                            .then(resultcontent => {
                                this.collectionClass = true;
                                this.$notify({
                                    message: resultcontent,
                                    type: 'success'
                                });
                                this.isCollection = false;
                            }, err => {
                                this.$notify({
                                    message: err,
                                    type: 'error'
                                });
                                this.collectionClass = true;
                            })
                    }
                }
            },
            //初始化评论
            initComment(page) {
                //用户评论list
                let userOptions = {
                    "loginUserID": "huileyou",
                    "loginUserPass": "123",
                    "operateUserID": "",
                    "operateUserName": "",
                    "pcName": "",
                    "ID": "",
                    "UserInfoID": "",
                    "GoodID": this.$route.params.id,
                    "createFrom": "",
                    "createTo": "",
                    "IsDelete": 0,
                    "page": page ? page : 1,
                    "rows": 5
                };
                this.commentLoading = true;
                this.$store.dispatch('initCommentData', userOptions)
                    .then((total) => {
                        this.commentLoading = false;
                        this.total = total;
                    }, err => {
                    });
            },
            getTypeList() {
                //获取评论信息
                let options = {
                    "loginUserID": "huileyou",
                    "loginUserPass": "123",
                    "operateUserID": "",
                    "operateUserName": "",
                    "pcName": "",
                    "GoodID": this.$route.params.id,
                    "IsDelete": 0
                };
                this.$store.dispatch('initCommentMX', options)
                    .then(() => {
                    }, err => {
                    });
            },
            //打印
            print(e) {
                let subOutputRankPrin = document.querySelector('#h2');
                document.body.innerHTML = subOutputRankPrin.innerHTML;
                window.print();
                window.location.reload();
                return false;
            },
            //出发城市
            initOutCity(id) {
                let getFirstAreaInfo = {
                    "loginUserID": "huileyou",
                    "loginUserPass": "123",
                    "lineID": id
                };
                this.$store.dispatch('initOutCity', getFirstAreaInfo)
                    .then(num => {
                        this.lineCityLength = num;
                        let arr = [];
                        for (let attr in this.outCityObj) {
                            if (this.outCityObj[attr].GroupCityList[0]) {
                                arr.push(this.outCityObj[attr].GroupCityList[0]);
                            }
                        }
                        this.regionType.push({
                            "letter": "推荐城市",
                            "GroupCityList": arr,
                        })
                        for (let attr in this.outCityObj) {
                            this.regionType.push(this.outCityObj[attr]);
                        }
                        this.outCityList = this.regionType[0].GroupCityList;
                    }, err => {
                        this.$notify({
                            message: err,
                            type: 'error'
                        })
                    })
            },

            getDateA(year, month, data) {
                for (var n = 0; n < data.length; n++) {
                    data[n].day = Number(data[n].ts_pp_Date.split('-')[2])
                }
                let newArr = [];
                let today = 0;
                let s = 0;
                for (var i = 1; i <= 42; i++) {
                    var v = i - this.getWeek(year, month);
                    if (v < 1) {
//            上个月天数
                        var topMonth = this.getDates(year, month - 1);
                        this.lastDateArr.push(topMonth - (this.getWeek(year, month) - i))
                    } else if (v > this.getDates(year, month)) {
//            下个月
                        let value = v - this.getDates(year, month)
                        this.nextDateArr.push(value)
                    } else {
                        newArr.push(v)
                    }
                }
                for (var i = 0; i < newArr.length; i++) {
                    for (var j = 0; j < data.length; j++) {
                        if (newArr[i] == data[j].day) {
                            newArr[i] = data[j]
                        }
                    }
                }
                for (var i = 0; i < newArr.length; i++) {
                    if (newArr[i].day == new Date().getDate() && month == (new Date().getMonth())) {
                        newArr[i].day = '今天'
                    } else {
                        newArr[i] = newArr[i]
                    }
                    if (newArr[i] == new Date().getDate() && month == (new Date().getMonth()) && year == new Date().getFullYear()) {
                        newArr[i] = '今天'
                    } else {
                        newArr[i] = newArr[i]
                    }
                }
                this.monthArr = newArr;
            },
            //查询统计数据
            searchTravelData() {
                let SelectAllCommentFixed = {
                    "loginUserID": "huileyou",
                    "loginUserPass": "123",
                    "operateUserID": "",
                    "operateUserName": "",
                    "pcName": "",
                    "token": this.userInfo.token,
                    "GoodID": this.tradeID,       //产品编码
                    "ts_ct_SysID": "6",     //系统编码  6旅行社 1车票 2门票 3美食 4酒店 5租车
                }
                this.$store.dispatch('searchTravelData', SelectAllCommentFixed)
            },
        },

        mounted() {
            document.onclick = () => {
                this.showCityList = false
            }
        }
    }
</script>
<style scoped>
  .couponsActive>h5{
    font-size: 20px;
  }
  .classStorng > strong {
    float: left;
    font: normal 18px/2 "微软雅黑";
    color: #333;
  }

  .lineLsitDetails {
    margin-left: 35px;
    margin-top: 20px;
  }

  .lineLsitDetails > li {
    border-left: 3px solid #eee;
    padding-left: 35px;
    position: relative;
    padding-top: 6px;
    padding-bottom: 10px;
  }

  .lineLsitDetails > li:last-of-type {
    padding-bottom: 0;
  }

  .lineLsitDetails > li:last-of-type:before {
    position: absolute;
    content: '';
    bottom: -15px;
    left: -10px;
    width: 15px;
    height: 15px;
    border: 1px solid #ccc;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background-color: #fff;
  }

  .lineLsitDetails > li > div {
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }

  .dayTitle > * {
    float: left;
    font: bold 20px/26px "微软雅黑";
  }

  .dayTitle > strong {
    margin-right: 10px;
  }

  .dayIcon {
    width: 40px;
    height: 47px;
    background: url("../../assets/img/lineIcon.png") no-repeat -103px -173px;
    position: absolute;
    left: -21px;
    top: 0;
    font: bold 16px/40px "微软雅黑";
    text-align: center;
    color: #fff;
  }

  .toPlace > span {
    float: left;
  }

  .toPlace > i {
    float: left;
    margin: 0 7px;
  }

  .toPlace > .car {
    width: 16px;
    height: 16px;
    background: url("../../assets/img/lineIcon.png") no-repeat -178px -287px;
    margin-top: 5px;
  }

  .toPlace > .plane {
    width: 19px;
    height: 14px;
    background: url("../../assets/img/lineIcon.png") no-repeat -443px -259px;
    margin-top: 7px;
  }

  .toPlace > .train {
    width: 12px;
    height: 14px;
    background: url("../../assets/img/lineIcon.png") no-repeat -122px -308px;
    margin-top: 7px;
  }

  .toPlace > .ship {
    width: 17px;
    height: 18px;
    background: url("../../assets/img/lineIcon.png") no-repeat -0px -308px;
    margin-top: 4px;
  }

  .overviewTravel {
    margin: 20px 0 10px 0;
    position: relative;
  }

  .overviewTravelIcon > i {
    position: absolute;
    left: -49px;
    top: 7px;
    width: 25px;
    height: 25px;
    background: url("../../assets/img/lineIcon.png") no-repeat -157px -259px;
  }

  .overviewTravelEdtor {
    font: 14px/24px "微软雅黑";
    color: #666;
  }

  .freeActive {
    margin: 20px 0 10px 0;
    position: relative;
  }

  .freeActiveIcon > i {
    position: absolute;
    width: 25px;
    height: 25px;
    left: -49px;
    top: 7px;
    background: url("../../assets/img/lineIcon.png") no-repeat -257px -259px;
  }

  .lineImageBox {
    padding: 0 20px;
  }

  .lineImageBox > li {
    float: left;
    width: 450px;
    margin-right: 15px;
    margin-top: 15px;
  }

  .lineImageBox > li:nth-of-type(2n) {
    margin-right: 0;
  }

  .lineImageBox img {
    height: 300px;
    width: 100%;
  }

  .lineImageBox1 {
    padding: 0 20px;
  }

  .lineImageBox1 > li {
    float: left;
    width: 295px;
    margin-right: 15px;
    margin-top: 15px;
  }

  .lineImageBox1 > li:nth-of-type(3n) {
    margin-right: 0;
  }

  .lineImageBox1 img {
    width: 295px;
    height: 200px;
  }

  .scenicSpot {
    margin: 20px 0 10px 0;
    position: relative;
  }

  .scenicSpotIcon > i {
    position: absolute;
    width: 25px;
    height: 25px;
    left: -49px;
    top: 7px;
    background: url("../../assets/img/lineIcon.png") no-repeat -82px -259px;
  }

  .scenicSpotIcon > em {
    float: left;
    font: 12px/16px "微软雅黑";
    padding: 0 5px;
    border: 1px solid #2dbb55;
    color: #2dbb55;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    margin-top: 10px;
    margin-left: 10px;
  }

  .dayFoodDetails {
    margin: 20px 0 10px 0;
    position: relative;
  }

  .dayFoodDetailsIcon > i {
    position: absolute;
    width: 25px;
    height: 25px;
    left: -49px;
    top: 7px;
    background: url("../../assets/img/lineIcon.png") no-repeat -232px -259px;
  }

  .putUp {
    margin: 20px 0 10px 0;
    position: relative;
  }

  .putUpIcon > i {
    position: absolute;
    width: 25px;
    height: 25px;
    left: -49px;
    top: 7px;
    background: url("../../assets/img/lineIcon.png") no-repeat -207px -259px;
  }

  .reminder {
    margin: 20px 0 10px 0;
    position: relative;
  }

  /*--------------------------------*/

  .fold-box-inner {
    height: 100% !important;
  }

  /*li, ol, ul {*/
  /*list-style: disc outside none!important;*/
  /*}*/
  .productDetailsContent ul, .productDetailsContent li {
    list-style: square !important;
  }

  .bottom {
    clear: both;
    display: inline-block;
    text-align: center;
  }

  .item {
    margin: 4px;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .setOut .button > a:nth-of-type(3) {
    font: 14px/2 "微软雅黑";
    color: #999999;
    float: left;
    margin-top: 10px;
    margin-left: 10px;
  }

  .setOut .button > a:last-of-type i {
    display: inline-block;
    width: 14px;
    height: 12px;
    background: url("../../assets/img/dinei00w200.png") no-repeat -429px -302px;
    margin-right: 5px;
  }

  .setOut .button > a:nth-of-type(3):hover {
    color: #f60;
  }

  .setOut .button > a:nth-of-type(3):hover i {
    color: #000;
    background: url("../../assets/img/dinei00w200.png") no-repeat -415px -302px;
  }

  .setOut .button > a:nth-of-type(3).active {
    color: #f60;
  }

  .setOut .button > a:nth-of-type(3).active i {
    color: #000;
    background: url("../../assets/img/dinei00w200.png") no-repeat -415px -302px;
  }

  .dayDetails {
    margin-top: 10px;
  }

  .dayDetailsNav > strong {
    float: left;
    font: 14px/2 "微软雅黑";
    color: #fff;
    padding: 0 20px;
    background-color: #22c233;
  }

  .dayDetailsNav > span {
    float: left;
    margin-left: 35px;
    font: 14px/2 "微软雅黑";
    color: #666;
  }

  .dayDetailsNav > a {
    float: right;
    font: 14px/1.5 "微软雅黑";
    border: 1px solid #22c233;
    color: #22c233;
    padding: 0 20px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }

  .dayDetailsAll {
    border: 1px solid #ccc;
    margin: 20px 0 0 20px;
    padding: 10px 20px;
  }

  dayDetailsAll {
    font: 14px/2 "微软雅黑";
  }

  .dayDetailsAll > strong {
    display: block;
    color: #333;
  }

  .dayDetailsList div {
    padding-left: 20px;
  }

  .startTheCity {
    position: relative;
  }

  .startTheCity > strong {
    float: left;
  }

  .startAddess {
    float: left;
    margin-left: 3px;
    margin-top: 5px;
    font: 15px/30px "微软雅黑";
    padding: 0 20px 0 10px;
    position: relative;
    background-color: #fff;
    z-index: 100;
  }

  .startAddess > strong {
    float: left;
    margin-right: 30px;
    cursor: pointer;
    color: #f80;
  }

  .startAddess > span {
    float: left;
    cursor: pointer;
  }

  .startAddess > span > i {
    float: right;
    width: 8px;
    height: 8px;
    clip-path: polygon(0% 0, 50% 70%, 100% 0);
    background-color: #333;
    margin-top: 13px;
    margin: 13px 0 0 5px;
    transform-origin: 50% 25%;
    transition: .3s;
  }

  .startAddess > span.active i {
    transform: rotateZ(-180deg);
  }

  .startAddess.active {
    border: 1px solid #ccc;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom: 1px solid #fff;
  }

  .allRecommendCity {
    position: absolute;
    background-color: #fff;
    width: 482px;
    z-index: 99;
    top: 35px;
    left: 54px;
    border: 1px solid #ccc;
    padding: 10px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border-top-left-radius: 0;
  }

  .regionClassification {
    font: 12px/2 "微软雅黑";
    border-bottom: 1px solid #ccc;
  }

  .regionClassification > a {
    float: left;
    padding: 1px 10px 0;
    margin-right: 5px;
    border: 1px solid #ccc;
    border-bottom-color: transparent;
    margin-bottom: -1px;
  }

  .regionClassification > a.active {
    border-top: 2px solid #f80;
    padding-top: 0;
    border-bottom: 1px solid #fff;
    color: #f80;
  }

  .cityList {
    margin-top: 5px;
  }

  .cityList > li {
    float: left;
    margin: 5px;
    /*width: 80px;*/
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .cityList > li.active {

    background-color: #2dbb55;
  }

  .cityList > li.active strong {
    color: #fff;
  }

  .cityList > li:hover {
    background-color: #f6f6f6;
    border-color: #f6f6f6;
  }

  .cityList strong {
    display: block;
    font: 12px/18px "微软雅黑";
    text-align: center;
    color: #666;
    padding: 5px 6px;
  }

  .cityList span {
    display: block;
    text-align: center;
    font: 12px/18px "微软雅黑";
    color: #ccc;
  }

  .cityList span > em {
    color: #f80;
  }

  .dayImage {
    width: 100%;
  }

  .dayImage > img {
    width: 300px;
    height: 180px;
    margin: 9px;
    float: left;
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

  .smallTitle {
    font: bold 16px/30px "微软雅黑";
    padding-top: 10px;
    display: block;
    color: #333;
  }

  .foodTime {
    font: 16px/30px "微软雅黑";
    padding-top: 10px;
    display: block;
    color: #333;
  }

  .activetime {
    position: absolute;
    width: 40px;
    left: -57px;
    top: 50px;
    background-color: #ccc;
    color: #fff;
    font: 12px/20px "微软雅黑";
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    text-align: center;
  }

  .playTime {
    color: #666;
  }

  .playTime > i {
    float: left;
    width: 14px;
    height: 14px;
    background: url("../../assets/img/lineIcon.png") no-repeat -406px -287px;
    margin: 9px 10px 0 0;
  }

  .recommendHotelList {
    padding: 20px 0;
  }

  .recommendHotelList > li {
    border-bottom: 1px dashed #ccc;
    font: 14px/22px "微软雅黑";
    color: #666;
    padding: 10px;
  }

  .recommendHotelList > li:last-of-type {
    border-bottom: none;
  }

  .recommendHotelList > li > span {
    display: block;
  }

  .scheduleList {
    position: absolute;
    top: 240px;
    left: 20px;
    width: 90px;
    border-right: 2px solid #f6f6f6;
    padding-right: 20px;
  }

  .scheduleList.active {
    position: fixed;
    top: 50px;
    z-index: 999;
    background-color: #fff;
  }

  .scheduleList > li {
    margin-bottom: 10px;
  }

  .scheduleList > li > strong {
    font: bold 14px/25px "微软雅黑";
    width: 60px;
    background-color: #eee;
    color: #666;
    display: block;
    text-align: center;
    position: relative;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }

  .scheduleList > li > strong > i,
  .spotList > li > i {
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: rgb(238, 238, 238);
    right: -32px;
    top: 9px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .scheduleList > li > strong.active {
    color: #fff;
    background-color: rgb(78, 207, 91);
  }

  .scheduleList > li > strong.active > i,
  .spotList > li.active > i {
    background-color: rgb(78, 207, 91);
    box-shadow: 0 0 0 5px #dcf5de;
  }

  .spotList {
    padding: 10px 0;
  }

  .spotList > li {
    position: relative;
    width: 60px;
  }

  .spotList > li > span {
    display: block;
    font: 12px/2 "微软雅黑";
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #999;
    text-align: right;
  }

  .spotList > li.active span {
    color: rgb(78, 207, 91);
  }


</style>
