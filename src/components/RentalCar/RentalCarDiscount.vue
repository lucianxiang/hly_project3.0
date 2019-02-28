<template>
  <div id="wrapBox">
    <div class="container">

      <div class="crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>国内租车</el-breadcrumb-item>
          <el-breadcrumb-item>{{pickCarCity.CityName}}租车</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="searchbox clearfix">
        <div class="clearfix">
          <!--取车-->
          <div class="pickInCar">
            <strong>取车城市</strong>
            <div class="cityListWrap">
              <i></i>
              <div class="input1" @click.stop="showChangeCity">{{pickCarCity.CityName?pickCarCity.CityName: '请选择城市'}}</div>
              <div class="cityList" v-show="showPickCarCity" @click.stop="clickWhite">
                <ul class="cityLetterList clearfix">
                  <li
                    v-for="item,index in rentalCarCityList"
                    :class="{active:activeNum == index}"
                    @click.stop="changeLetter(item,index)"
                  >{{item.letter}}
                  </li>
                </ul>
                <ul class="cityListContent">
                  <li
                    v-for="item,index in carCityList" class="clearfix"
                    v-show="item.cityName[0]"
                  >
                    <strong>{{item.cityLetter}}</strong>
                    <div class="cityListDetails">
                      <span
                        v-for="item,index in item.cityName"
                        @click.stop="changeCity(item)"
                      >{{item.CityName}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="cityListWrap">
              <i></i>
              <div class="input1" @click.stop="showChangePlace">{{pickCarPlace.MarkName?pickCarPlace.MarkName: '请选择地点'}}</div>
              <div class="cityList" v-show="showPickCarPlace" @click.stop="clickWhite">
                <ul class="placeList clearfix">
                  <li
                    v-for="item,index in cityPlaceList"
                    :class="{active:placeNum == index}"
                    @click.stop="changePlaceType(item,index)"
                  >{{item.AttrName}}
                  </li>
                </ul>
                <div class="placeListContent clearfix">
                    <span
                      v-for="item,index in cityPlaceHomeList"
                      @click.stop="changePlace(item)"
                    >{{item.MarkName}}</span>
                </div>
              </div>
            </div>
            <el-date-picker
              style="width:140px;"
              v-model="carInformationObj.pickCarData"
              type="date"
              @change="changeReturnDate"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>

            <el-time-select
              v-model="carInformationObj.pickCarTime"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '23:59'
              }"
              style="width: 120px;"
              @change="changeReturnDate"
              placeholder="选择时间">
            </el-time-select>

          </div>
          <!--还车-->
          <div class="pickInCar">
            <strong>还车城市</strong>
            <div class="cityListWrap">
              <i></i>
              <div class="input1" @click.stop="showChangeReturnCity">{{returnCarCity.CityName?returnCarCity.CityName: '请选择城市'}}</div>
              <div class="cityList" v-show="showReturnCarCity" @click.stop="clickWhite">
                <ul class="cityLetterList clearfix">
                  <li
                    v-for="item,index in rentalCarCityList"
                    :class="{active:activeNum == index}"
                    @click.stop="changeReturnLetter(item,index)"
                  >{{item.letter}}
                  </li>
                </ul>
                <ul class="cityListContent">
                  <li
                    v-for="item,index in carCityList" class="clearfix"
                    v-show="item.cityName[0]"
                  >
                    <strong>{{item.cityLetter}}</strong>
                    <div class="cityListDetails">
                      <span
                        v-for="item,index in item.cityName"
                        @click.stop="changeReturnCity(item)"
                      >{{item.CityName}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="cityListWrap">
              <i></i>
              <div class="input1" @click.stop="showChangeReturnPlace">{{returnCarPlace.MarkName?returnCarPlace.MarkName: '请选择地点'}}</div>
              <div class="cityList" v-show="showReturnCarPlace" @click.stop="clickWhite">
                <ul class="placeList clearfix">
                  <li
                    v-for="item,index in cityPlaceList"
                    :class="{active:placeNum == index}"
                    @click.stop="changeReturnPlaceType(item,index)"
                  >{{item.AttrName}}
                  </li>
                </ul>
                <div class="placeListContent clearfix">
                    <span
                      v-for="item,index in cityPlaceHomeList"
                      @click.stop="changeReturnPlace(item)"
                    >{{item.MarkName}}</span>
                </div>
              </div>
            </div>
            <el-date-picker
              style="width:140px;"
              @change="changeReturnDate"
              v-model="carInformationObj.returnCarData"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>


            <el-time-select
              v-model="carInformationObj.returnCarTime"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '23:59'
              }"
              style="width: 120px;"
              @change="changeReturnDate"
              placeholder="选择时间">
            </el-time-select>
          </div>
        </div>
        <!--去选车-->
        <div class="submit">
          <span>共{{dayLong}}天</span>
          <button @click="changeSearch">重新搜索</button>
        </div>
      </div>

      <div class="clearfix">
        <div class="sideboxes">
          <strong>筛选</strong>
          <div class="clean" @click="clearAll">清除全部</div>
          <!--手自排-->
          <div class="carBlockTypeList">
            <strong>手自排</strong>
            <a href="javascript:;"
               v-for="item,index in carBlockTypeList"
               :class="{active:carBlockTypeNumber==index}"
               @click="changeCarBlockType(index,item)"
            >{{item.VariableSpeedName}}</a>
          </div>
          <!--车型组-->
          <div class="carModelList">
            <strong>车型组</strong>
            <a href="javascript:;"
               v-for="item,index in carModelList"
               ref="carType"
               :class="{active:index==0}"
               @click="changeCarModel(index,item)"
            >
              <i></i>
              <span>{{item.cr_cra_Name}}</span>
            </a>
          </div>
          <!--车型品牌-->
          <div class="carBrandList">
            <strong>车型品牌</strong>
            <a href="javascript:;"
               v-for="item,index in carBrandList"
               ref="carBrand"
               :class="{active:index==0}"
               @click="changeCarBrandList(index,item)"
            >{{item.cr_cra_Name}}</a>
          </div>
          <!--租车公司-->
          <div class="carCompanyList">
            <strong>租车公司</strong>
            <a href="javascript:;"
               v-for="item,index in carCompanyList"
               ref="carCompany"
               :class="{active:index==0}"
               @click="changeCarCompanyList(index,item)"
            >{{item.cr_h_Name}}</a>
          </div>

        </div>
        <div class="mainbox">
          <div class="carsort">

            <!--<span class="">价格从低到高</span>&emsp;|&emsp;-->
            <!--<span class="">距离从近到远</span>-->

            <div class="carsortTip">
              为您查到 {{placeName}} 附近共
              <strong>{{carArray.StoreCount ? carArray.StoreCount : 0}}</strong>家门店，
              <strong>{{carArray.CarCount ? carArray.CarCount : 0}}</strong>个车型
            </div>
          </div>

          <!--  carbox  -->
          <!--别克凯越1.6L-->
          <div class="carbox">
            <ul class="carList" v-if="carInformationList.length">
              <li v-for="item,dataIndex in carInformationList">
                <!--车图片-->
                <div class="carDataListTop clearfix ">
                  <img v-lazy="item.cr_crc_ImagePath" width="160" height="100">
                  <div class="carName">
                    <strong>{{item.cr_crc_Name}}</strong>
                    <span>{{item.cr_crc_VariableSpeed}} / {{item.cr_crc_StructureName}} / {{item.cr_crc_Displacement}} / {{item.cr_crc_SeatNumber}}座</span>
                  </div>
                  <div class="priceAndNum">
                    <strong><em>￥</em>{{item.MinPrice}}<span>/天 起</span></strong>
                    <span>{{item.StoreArry.length}}家门店提供此车型</span>
                  </div>
                </div>
                <!--车信息分类-->
                <div class="informationNav clearfix">
                  <span class="reserveCompany">租车公司</span>
                  <span class="carStore">门店</span>
                  <span class="discount">享受优惠</span>
                  <span class="everyDayPrice">日均价</span>
                  <span class="reserveSubmit"></span>
                </div>
                <!--车信息-->
                <ul class="carInformationList">
                  <li class="clearfix" v-for="sItem,index in item.StoreArry">
                    <div class="carStoreImage reserveCompany">
                      <img v-lazy="sItem.cr_h_Logo" width="100" height="32">
                    </div>
                    <div class="carPlace carStore">
                    <span>
                      <strong>{{sItem.StoreName}}</strong>
                    </span>
                    </div>
                    <div class="fracture discount">
                      <strong v-show="i" v-for="i,index in sItem.NameArry">
                        <em>减</em>
                        <span>{{i}}</span>
                      </strong>
                    </div>
                    <div class="carPrice everyDayPrice">
                      <span>¥</span>
                      <strong>{{sItem.nPrice}}</strong>
                      <em>¥{{sItem.Price}}</em>
                    </div>
                    <div class="carReserve reserveSubmit">
                      <button @click="carReserve(dataIndex,sItem,index)">预定</button>
                    </div>
                    <div id="reserveBox" v-show="showNumber==dataIndex && carNumber==index && user">
                      <div class="horn"></div>
                      <!--预订信息-->
                      <div class="reserveInformation">
                        <div class="title clearfix">
                          <strong>预订信息</strong>
                          <a href="javascript:;" @click="closeReserve(dataIndex)">×</a>
                        </div>
                        <div class="rentInformation clearfix">
                          <div class="pickCar">
                            <strong class="clearfix">
                              <em>取车</em>
                              <span>{{TakeStoreObj.cr_crs_Name}}</span>
                              <!--<a href="javascript:;">地图</a>-->
                            </strong>
                            <span
                              class="pickCarTime">{{carInformationObj.pickCarData}}-{{carInformationObj.pickCarTime}}</span>
                            <span class="pickCarAddress">地址: <em>{{TakeStoreObj.cr_crs_Address}}</em></span>
                            <span class="pickCarNum">门店电话：<em>{{TakeStoreObj.cr_crs_Telephone}}</em></span>
                          </div>
                          <div class="returnCar">
                            <strong class="clearfix">
                              <em>还车</em>
                              <span>{{GiveBackStoreObj.cr_crs_Name}}</span>
                              <!--<a href="javascript:;">地图</a>-->
                            </strong>
                            <span
                              class="returnCarTime">{{carInformationObj.returnCarData}}-{{carInformationObj.returnCarTime}}</span>
                            <span class="returnCarAddress">地址: <em>{{GiveBackStoreObj.cr_crs_Address}}</em></span>
                            <span class="returnCarNum">门店电话：<em>{{GiveBackStoreObj.cr_crs_Telephone}}</em></span>
                          </div>
                          <div class="leaseTerm">
                            <strong>租期：共 <span>{{dayLong}}</span> 天</strong>
                          </div>
                        </div>
                      </div>
                      <!--驾驶员信息-->
                      <div class="driverInformation">
                        <strong>驾驶员信息</strong>
                        <ul class="informationList clearfix">
                          <li>
                            <strong>驾驶员</strong>
                            <input type="text" placeholder="与证件号本人一致" v-model="driverName">
                          </li>
                          <li>
                            <strong>手机号</strong>
                            <input type="text" placeholder="驾驶员本人手机号" v-model="driverNum">
                          </li>
                          <li class="cardType">
                            <strong>证件类型</strong>
                            <el-select v-model="typeValue" clearable placeholder="请选择" style="width: 120px;">
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                            <input type="text" placeholder="驾驶员本人证件号" v-model="driverCerNum">
                          </li>
                        </ul>
                      </div>
                      <!--附加服务-->
                      <div class="additionalServices">
                        <strong>附加服务</strong>
                        <ul class="servicesList clearfix">
                          <li>
                            <el-checkbox v-model="checked1" disabled>基本保险费</el-checkbox>
                            <i title="悟空租车基本保险费，包含车辆损失险、
第三者责任险、车上人员责任险（驾驶
员和乘客）、不计免赔险（客户无须承
担1500元以内的车险损失，但会按车辆
定损状况收取一定天数的停运损失费）。"
                            >?</i>
                            <strong><span>¥{{ProductModelObj.cr_cp_Insurance}}.00</span>/全程</strong>
                          </li>
                          <li>
                            <el-checkbox v-model="checked2" disabled>手续费</el-checkbox>
                            <i title="租车公司手续费">?</i>
                            <strong><span>¥{{ProductModelObj.cr_cp_ServiceCharge}}.00</span>/全程</strong>
                          </li>
                          <li>
                            <el-checkbox v-model="checked3" @change="changeMoney(sItem)">不计免赔险 </el-checkbox>
                            <i title="">?</i>
                            <strong><span>¥{{ProductModelObj.cr_cp_DeductibleInsurance}}.00</span>/全程</strong>
                          </li>
                          <li>
                            <el-checkbox v-model="checked4" @change="changeMoneyTwo(sItem)">第三责任险 </el-checkbox>
                            <i title="">?</i>
                            <strong><span>¥{{ProductModelObj.cr_cp_ThirdPartyInsurance}}.00</span>/全程</strong>
                          </li>
                        </ul>
                      </div>
                      <!--可享优惠-->
                      <div class="enjoyThePrivilege">
                        <strong>可享优惠</strong>
                        <div class="enjoyThePrivilegeContent">
                          <div class="preferentialActivities">
                            <strong>特惠活动</strong>
                            <span v-show="!IncentivesList[0]">暂无</span>
                            <span v-for="item,index in IncentivesList"><el-checkbox v-model="checked1"
                                                                                    disabled>{{item.cr_i_Name}}</el-checkbox>
                      <i title="即日起至2018年6月30日还车期间，预订悟空租
                      车的新客户，租2天及以上即可立减50元/100元
                      （根据城市不同，优惠不同）车辆租金，减免费
                      用仅针对车辆租金，不包括基本保险费、服务费
                      等其他费用，每个客户只可享受一次。"
                      >?</i>已省¥ {{item.cr_i_FavorablePrice}}</span>
                          </div>
                          <!--<div class="coupon">-->
                          <!--<strong>优惠券<span>0张可用</span></strong>-->
                          <!--<span>无可享优惠券</span>-->
                          <!--</div>-->
                        </div>
                      </div>
                      <div class="payType">
                        <strong>支付方式</strong>
                        <div>
                          <el-radio disabled v-model="payType" label="选中且禁用">在线支付</el-radio>
                          <span>￥ {{payMoney}}</span>
                          <em>取车前免费取消（除节假日）</em>
                        </div>
                      </div>
                      <!--提交订单-->
                      <div class="submitOrder clearfix">
                      <span>
                        <el-checkbox v-model="agree">我已阅读并同意</el-checkbox>
                        <a href="javascript:;" @click="lookReserve(item)">《预订条款》</a>
                      </span>
                        <em>
                          订单金额：
                          <span>¥ {{payMoney}}</span>
                          <!--已省¥ 100-->
                          <a href="javascript:;">费用明细<i>?</i>
                            <span class="detailsOfCharges">
                            <span class="ordinary clearfix">
                              <span><em>租车费</em><em>{{dayLong * sItem.nPrice}}.00</em></span>
                              <span><em>保险费</em><em>{{ProductModelObj.cr_cp_Insurance}}.00</em></span>
                              <span><em>手续费</em><em>{{ProductModelObj.cr_cp_ServiceCharge}}.00</em></span>
                              <span
                                v-show="checked3"><em>免赔险</em><em>{{ProductModelObj.cr_cp_DeductibleInsurance}}.00</em></span>
                              <span
                                v-show="checked4"><em>第三责任险</em><em>{{ProductModelObj.cr_cp_ThirdPartyInsurance}}.00</em></span>
                                <span v-show="IncentivesList.length"
                                      v-for="item,index in IncentivesList"><em>{{item.cr_i_Name}}</em><em>-{{item.cr_i_FavorablePrice}}.00</em></span>
                              </span>
                          </span>
                          </a>
                          <button @click="submitOrder(item,sItem)">提交订单</button>
                        </em>
                      </div>
                      <!--租车须知-->
                      <div class="carRentalNotice">
                        <span><i>!</i>租车须知</span>
                        <p>
                          <span>1. 取车时，会刷取信用卡一定金额作为租车预授权；还车时结算订单费用，解冻租车预授权，并重新刷取一定的金额作为违章预授权；</span>
                          <span>2. 用车完毕后可申请发票，并由快递寄送；</span>
                          <em>3. 取车时，请您携带预订时所填写的驾驶员本人两证一卡（身份证，驾驶员正副本，足够额度信用卡）</em>
                          <a href="javascript:;" @click="lookAll">查看完整取还须知&gt;</a>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
                <!--查看更多-->
                <!--<div class="carListSearMore" v-show="item.StoreArry.length>2">-->
                <!--<a href="javascript:;" @click="searchMore(dataIndex)">查看更多门店报价<i></i></a>-->
                <!--</div>-->
              </li>
            </ul>
            <div v-else style="padding: 20px;text-align: center;font-size: 20px;font-weight: bold;background: #fff">
              暂无数据
            </div>
            <!--分页-->
            <el-pagination
              style="margin-top: 10px;text-align: right"
              background
              :page-size="5"
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :total="total"
              v-show="total"
            >
            </el-pagination>
          </div>

        </div>
      </div>
    </div>
    <!--预订条款-->
    <el-dialog
      title="预订条款"
      :visible.sync="lookReserveDialog"
      width="60%">
      <div class="lookReserve">
        <p>
          惠乐游旅游网（以下简称惠乐游）为客户提供代为预订自驾租车服务。在预订开始前，请仔细阅读本须知，本须知及产品页面中的重要条款也做为双方协议的补充内容。当您开始预订自驾租车产品时，已表明您仔细阅读并接受协议的所有条款。</p>
        <p>1．相关概念注解</p>
        <p>1.1国内自驾租车产品：国内自驾租车产品是指惠乐游为其客户代为预订车辆使用的租车服务。本产品仅在惠乐游租车服务已经开通该项业务的国家/城市预定。</p>
        <p>1.2国内自驾租车产品开始和结束时间：开始时间以订单上预订的用车时间为准，结束时间以实际结束时间为准，超时部分请客人根据不同车型选项说明中的具体标准在还车时直接与供应商结算。</p>
        <p>1.3国内自驾租车产品最晚可提前距用车时间2个小时预定，具体视车辆资源而定。</p>
        <p>1.4国内自驾租车租金基本计费单位：1天（24小时），租期不满24小时的按24小时计算。</p>
        <p>1.5费用中不含路桥费、停车费以及因违反交通法规产生的罚款等费用。</p>
        <p>1.6以下所说的承租人是指：使用惠乐游国内自驾租车服务的人员；预订人是指：在惠乐游预订国内自驾租车产品的人员。</p>
        <p>2．租车产品价格</p>
        <p>2.1惠乐游保留在不事先知会的情况下随时更改其网站上已公布的国内自驾租车产品价格的权利。</p>
        <p>
          2.2您预订的国内自驾租车产品价格，以惠乐游给您的确认单（邮件、传真或手机短信）上约定的金额作为参考，最终价格请以当地租车门店为准。惠乐游给您的确认单上约定的价格，只包括确认单中注明的费用包含项中的内容，其它均不含。</p>
        <p>2.3如果您超过确认信息中用车所限定的使用时间或公里数，请您参考具体产品中相应车型中有关超时超公里的收费标准在还车时直接与供应商结算，如您提出需要，供应商会在还车结算后提供您相应的收据。</p>
        <p>3．订单生效</p>
        <p>订单生效的定义：产品预订成功后，惠乐游给您发送确认信息，该订单即生效并产生法律效力。</p>
        <p>订单生效后，您应按订单中约定的有效时间或时段准时到达约定地点。如您未在约定时间内到达约定地点则视为您主动解约。惠乐游有权按照本须知第四条的约定要求赔偿。</p>
        <p>4．您主动解除已生效订单</p>
        <p>订单生效后，您可以在自驾租车活动开始前通知惠乐游解除您所做预订，但还须承担惠乐游处理该订单已经支付的其他必要费用。</p>
        <p>5．更改已生效订单</p>
        <p>订单生效后，客户需要更改订单内的任何项目时，请务必在取车前通过惠乐游旅游网取消订单，再重新下订单。</p>
        <p>6．租车产品使用权变更</p>
        <p>如您需要将车辆使用权转与他人，请务必取消原有订单，再重新下订单。未经惠乐游认同的使用权转让，我们对可能发生的任何问题不承担任何责任。</p>
        <p>7．您应履行的义务</p>
        <p>
          7.1您提供给惠乐游的个人信息均为真实有效的，并请在约定时间持确认短信/邮件、本人两证一卡（中国居民第二代身份证原件、中华人民共和国机动车驾照、有足够余额的本人的国内信用卡）前往门店办理租车手续，并与车辆租赁商家签署租车协议。</p>
        <p>7.2如果您的驾照为国际或外国驾照，根据中国法律需换领中国驾照后方可租车自驾。</p>
        <p>
          7.3在您取车时，车辆租赁商家将刷取一笔您的信用卡预授权作为租车保证金（不同供应商刷取金额不同），如果您租车期间没有违章，在您还车一个月后，这笔费用将自动解冻，归还您信用卡中；如果您租车期间发生违章，车辆租赁商家将会把违章记录提供给您，同时在您的保证金中按违章金额扣去费用，余额归还信用卡中。</p>
        <p>7.4如因客户自身原因导致不能按时取车或还车，应按照提车时与车辆租赁商家签订的协议执行。</p>
        <p>7.5所有的承租人保护服务应在承租人遵守租车协议的前提下提供。</p>
        <p>7.6诚实守信，按照约定进行使用权转让；不按照要求，所发生的任何责任，预订人将承担连带责任。</p>
        <p>8．惠乐游应履行的义务</p>
        <p>8.1惠乐游保证您按照约定的时间能够准时使用车辆，并保证您在使用车辆中不因为车辆的原因产生安全问题。</p>
        <p>8.2惠乐游应告知您用车的具体接洽办法。</p>
        <p>8.3国内自驾租车产品组成要素，均为经过惠乐游严格考评筛选出的具备相关资质的供应商提供。惠乐游对订单中已经确认的用车车组描述和相关服务和承诺承担责任。</p>
        <p>
          8.4惠乐游不直接从事汽车租赁营运，订车人与租车服务商建立汽车租赁合同关系，汽车租赁商家为合法从事汽车租赁业务的汽车租赁商。惠乐游仅负责租车产品因预订环节产生的相关事宜，租车期间发生的各种纠纷，包括但不限于交通事故、第三者责任、车辆急修援助、保险理赔罚金、延期还车等其他事宜，由客户（承租人） 和租车公司（出租人）按照其双方签署的书面租车协议协商解决，惠乐游不承担租赁车辆因任何事故造成的任何后果。</p>
        <p>9．不可抗力</p>
        <p>
          您和惠乐游双方因不可抗力(包括地震、台风、雷击、水灾、火灾等自然原因，以及战争、政府行为、黑客攻击、电信部门技术管制等原因)不能履行或不能继续履行已生效订单约定内容的，双方均不承担违约责任，但法律另有规定的除外。</p>
        <p>&nbsp;</p>
        <p>因惠乐游延迟履行已生效订单约定内容后发生不可抗力的，不能免除责任。</p>
        <p>10．争议解决</p>
        <p>
          惠乐游可根据国家法律法规变化及维护交易秩序、保护消费者权益需要，不时修改本协议，在您的预订生效后，如果在本须知或订单约定内容履行过程中，您对相关事宜的履行发生争议，您同意按照中华人民共和国颁布的相关法律法规来解决争议，并同意接受南京市人民法院的管辖。</p>
        <p>11．其它</p>
        <p>本须知未尽的其他事项，由双方协商解决。</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="lookReserveDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--查看完整取还须知-->
    <el-dialog
      title="租车须知"
      :visible.sync="lookAllDialog"
      width="60%">
      <p>{{HertzModelObj.cr_h_Notice}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="lookAllDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {isPhone, isCardNo} from '@/assets/public'

  export default {
    computed: mapGetters([
      'rentalCarCityList',
      'cityPlaceList',
      'returnCityPlaceList',
      'carBlockTypeList',
      'carModelList',
      'carBrandList',
      'carCompanyList',
      'GiveBackStoreObj',
      'TakeStoreObj',
      'ProductModelObj',
      'HertzModelObj',
      'IncentivesList',
      'rentalCarCityList',
      'cityPlaceList',
      'carCityList',
      'cityPlaceHomeList'
    ]),

    data() {
      return {
        pickCarCity: '',
        activeNum: 0,
        showPickCarCity: false,
        pickCarPlace: '',
        placeNum: 0,
        showPickCarPlace: false,
        returnCarCity: '',
        showReturnCarCity: false,
        returnCarPlace: '',
        showReturnCarPlace: false,
        showReserve: false,
        agree: true,
        payType: '选中且禁用',
        typeValue: 1,
        carBlockTypeNumber: 0,
        carModelNumber: [],
        carBrandNumber: [],
        carCompanyNumber: [],
        showNumber: 999,
        carNumber: 888,
        lookAllDialog: false,
        carInformationObj: {},
        submitArr: [],
        id: '',
        total: 0,
        dayLong: 0,
        lookReserveDialog: false,
        payMoney: 0,
        options: [
          {
            value: 1,
            label: '二代身份证'
          },
          {
            value: 2,
            label: '护照'
          },
          {
            value: 3,
            label: '回乡证'
          },
          {
            value: 4,
            label: '台胞证'
          }
        ],
        checked1: true,
        checked2: true,
        checked3: false,
        checked4: false,
        driverName: '',
        driverNum: '',
        driverCerNum: '',
        user: {},
        carArray: [],
        carInformationList: [],
        carInfoList: [],
        indexNum: Infinity,
        placeName: '',
        discountPrice: 0,
      }
    },
    created() {
      if (sessionStorage.getItem('Cartitle')) {
        document.title = sessionStorage.getItem('Cartitle')
      }
      this.user = JSON.parse(sessionStorage.getItem('user'))
      this.id = this.$route.params.id;

      this.carInformationObj = JSON.parse(sessionStorage.getItem('carInformation'));
      this.initData(
        this.carInformationObj,
        this.carBlockTypeNumber,
        this.carModelNumber,
        this.carBrandNumber,
        this.carCompanyNumber
      );
      this.initCity();
      this.initSearchCondition()
        .then(() => {
          for (let i = 0; i < this.carBrandList.length; i++) {
            this.carBrandList[i].index = i
          }
          let obj = this.carBrandList.filter(item => {
            if (item.cr_cra_Id == this.id) {
              return true;
            }
            return false;
          })[0];
          setTimeout(() => {
            this.changeCarBrandList(obj.index, obj)
          }, 1000)
        });
      this.pickCarCity = this.carInformationObj.selectedCity;
      this.pickCarPlace = this.carInformationObj.selectedPlace;
      this.returnCarCity = this.carInformationObj.selectedReturnCity;
      this.returnCarPlace = this.carInformationObj.selectedReturnPlace;
      this.initDayLong();
      this.changeCity(this.pickCarCity)
      this.changeReturnCity(this.returnCarCity)
    },
    methods: {
      //点击空白
      clickWhite(){},
      //选择首字母导航
      changeLetter(item, index) {
        this.activeNum = index;
        this.$store.commit('initCarCityList', item.city);
      },
      //初始化城市数据
      initCity() {
        let GetCarRentCityInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
        };
        this.$store.dispatch('initRentalCarCity', GetCarRentCityInfo)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: "error"
            })
          })
      },
      //显示城市列表
      showChangeCity() {
        this.showPickCarCity = true;
        this.showPickCarPlace = false;
        this.showReturnCarCity = false;
        this.showReturnCarPlace = false;
      },
      //选择城市
      changeCity(item) {
        this.carInformationObj.selectedCity = item;
        this.pickCarCity = item;
        this.showPickCarCity = false;
        this.activeNum = 0;
        this.initCityPlace(item.CityId);
      },
      //初始化地点名称
      initCityPlace(id) {
        let GetCityLandmarkInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "CityId": id,
        };
        this.$store.dispatch('initCityPlace', GetCityLandmarkInfo)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: "error"
            })
          })
      },
      //显示城市地点列表
      showChangePlace() {
        this.showPickCarPlace = true;
        this.showPickCarCity = false;
        this.showReturnCarCity = false;
        this.showReturnCarPlace = false;
      },
      //选择城市地点
      changePlaceType(item, index) {
        this.placeNum = index;
        this.$store.commit('initCityPlaceHome', item.MarkArry)
      },
      //选择地点
      changePlace(item) {
        this.carInformationObj.selectedPlace = item;
        this.placeNum = 0;
        this.pickCarPlace = item;
        this.showPickCarPlace = false;
      },
      //显示还车城市
      showChangeReturnCity() {
        this.showReturnCarCity = true;
        this.showPickCarCity = false;
        this.showPickCarPlace = false;
        this.showReturnCarPlace = false;
      },
      //选择首字母导航
      changeReturnLetter(item, index) {
        this.activeNum = index;
        this.$store.commit('initCarCityList', item.city);
      },
      //选择还车城市
      changeReturnCity(item) {
        this.carInformationObj.selectedReturnCity = item;
        this.returnCarCity = item;//CityName
        this.showReturnCarCity = false;
        this.activeNum = 0;
        this.initCityPlace(item.CityId);
      },
      //显示还车地点
      showChangeReturnPlace() {
        this.showReturnCarPlace = true;
        this.showPickCarCity = false;
        this.showPickCarPlace = false;
        this.showReturnCarCity = false;
      },
      //选择城市地点
      changeReturnPlaceType(item, index) {
        this.placeNum = index;
        this.$store.commit('initCityPlaceHome', item.MarkArry);
      },
      //选择还车地点
      changeReturnPlace(item) {
        this.carInformationObj.selectedReturnPlace = item;
        this.placeNum = 0;
        this.returnCarPlace = item;
        this.showReturnCarPlace = false;
      },
      //初始化还车地点
      initReturnCityPlace(id) {
        let GetCityLandmarkInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "CityId": id,
        };
        this.$store.dispatch('initReturnCityPlace', GetCityLandmarkInfo)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: "error"
            })
          })
      },
      //初始化地点名称
      initCityPlace(id) {
        let GetCityLandmarkInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "CityId": id,
        };
        this.$store.dispatch('initCityPlace', GetCityLandmarkInfo)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: "error"
            })
          })
      },
      //城市点击
      clickCarRental(index, item) {
        this.n = index;
        this.$store.commit('updateCarRentalIndexInfoObj', item)
      },
      //搜索条件
      initSearchCondition() {
        let CarSearchFilterInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
        };
        return this.$store.dispatch('initSearchCondition', CarSearchFilterInfo)
      },
      //选择操作类型
      changeCarBlockType(index, item) {
        this.carBlockTypeNumber = item.VariableSpeedId;
        this.initData(
          this.carInformationObj,
          this.carBlockTypeNumber,
          this.carModelNumber,
          this.carBrandNumber,
          this.carCompanyNumber
        );
      },
      //选择车型
      changeCarModel(index, item) {
        if (index != 0) {
          this.carModelNumber.push(item.cr_cra_Id)
          if (this.$refs.carType[index].className) {
            this.$refs.carType[index].className = '';
            this.carModelNumber = this.carModelNumber.filter(n => {
              if (item.cr_cra_Id != n) {
                return true;
              }
              return false;
            })
          } else {
            this.$refs.carType[index].className = 'active';
          }
          this.$refs.carType[0].className = '';
          if (!this.carModelNumber[0]) {
            this.$refs.carType[0].className = 'active';
          }
        }
        if (index == 0) {
          for (let i = 0; i < this.$refs.carType.length; i++) {
            this.$refs.carType[i].className = '';
          }
          this.$refs.carType[0].className = 'active';
          this.carModelNumber = [];
        }
        this.initData(
          this.carInformationObj,
          this.carBlockTypeNumber,
          this.carModelNumber,
          this.carBrandNumber,
          this.carCompanyNumber
        );
      },
      //选择车型品牌
      changeCarBrandList(index, item) {
        if (this.$refs.carBrand) {
          if (index != 0) {
            this.carBrandNumber.push(item.cr_cra_Id)
            if (this.$refs.carBrand[index].className) {
              this.$refs.carBrand[index].className = '';
              this.carBrandNumber = this.carBrandNumber.filter(n => {
                if (item.cr_cra_Id != n) {
                  return true;
                }
                return false;
              })
            } else {
              this.$refs.carBrand[index].className = 'active';
            }
            this.$refs.carBrand[0].className = '';
            if (!this.carBrandNumber[0]) {
              this.$refs.carBrand[0].className = 'active';
            }
          }
          if (index == 0) {
            for (let i = 0; i < this.$refs.carBrand.length; i++) {
              this.$refs.carBrand[i].className = '';
            }
            this.$refs.carBrand[0].className = 'active';
            this.carBrandNumber = [];
          }
          this.initData(
            this.carInformationObj,
            this.carBlockTypeNumber,
            this.carModelNumber,
            this.carBrandNumber,
            this.carCompanyNumber
          );
        }

      },
      //选择租车公司
      changeCarCompanyList(index, item) {
        if (index != 0) {
          this.carCompanyNumber.push(item.cr_h_Id);
          if (this.$refs.carCompany[index].className) {
            this.$refs.carCompany[index].className = '';
            this.carCompanyNumber = this.carCompanyNumber.filter(n => {
              if (item.cr_h_Id != n) {
                return true;
              }
              return false;
            })
          } else {
            this.$refs.carCompany[index].className = 'active';
          }
          this.$refs.carCompany[0].className = '';
          if (!this.carCompanyNumber[0]) {
            this.$refs.carCompany[0].className = 'active';
          }
        }
        if (index == 0) {
          for (let i = 0; i < this.$refs.carCompany.length; i++) {
            this.$refs.carCompany[i].className = '';
          }
          this.$refs.carCompany[0].className = 'active';
          this.carCompanyNumber = [];
        }
        this.initData(
          this.carInformationObj,
          this.carBlockTypeNumber,
          this.carModelNumber,
          this.carBrandNumber,
          this.carCompanyNumber
        );
      },
      //初始化汽车数据
      initData(obj, carBlockTypeNumber, carModelNumber, carBrandNumber, carCompanyNumber, num) {
        let carSearchInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": this.user.token,
          "page": num ? num : 1,
          "rows": 5,
          "TakeCityMarkId": obj.selectedPlace.MarkId,
          "GiveBackCityMarkId": obj.selectedReturnPlace.MarkId,
          "TakeDate": obj.pickCarData,
          "GiveBackDate": obj.returnCarData,
          "VariableSpeedId": carBlockTypeNumber ? carBlockTypeNumber : '0',
          "CarModelId": carModelNumber ? carModelNumber.join(',') : '0',
          "CarBrandId": carBrandNumber ? carBrandNumber.join(',') : '0',
          "CompanyId": carCompanyNumber ? carCompanyNumber.join(',') : '0',
        };
        this.$store.dispatch('initCarInformation', carSearchInfo)
          .then(data => {
            this.total = Number(data.totalrows);
            this.carArray = data.data;
            this.placeName = this.carArray.CityMark.cr_cl_Name;
            this.carInformationList = this.carArray.CarArray;
//            for (let i = 0; i < this.carInformationList.length; i++) {
//              if (this.carInformationList[i].StoreArry.length >= 3) {
//                this.carInformationList[i].StoreArry = this.carInformationList[i].StoreArry.slice(0, 3);
//              }
//            }
          }, err => {
            this.$notify({
              message: err,
              type: "error"
            })
          })
      },
      //查看完整取还须知
      lookAll() {
        this.$store.commit('setTranstionFalse');
        this.lookAllDialog = true;
      },
      //查看预订条款
      lookReserve() {
        this.$store.commit('setTranstionFalse');
        this.lookReserveDialog = true;
      },
      //重新搜索
      changeSearch() {
        this.initData(
          this.carInformationObj,
          this.carBlockTypeNumber,
          this.carModelNumber,
          this.carBrandNumber,
          this.carCompanyNumber
        );
      },
      //清楚搜索条件
      clearAll() {
        this.changeCarModel(0);
        this.changeCarBrandList(0);
        this.changeCarCompanyList(0);
        this.changeCarBlockType(0, {
          VariableSpeedId: 0,
          VariableSpeedName: "未知"
        });
      },
      //预定
      carReserve(dataIndex, item, index) {
        this.showNumber = dataIndex;
        this.carNumber = index;
        if (!this.user) {
          this.$notify({
            message: '请先登录！',
            type: 'error'
          })
          this.$router.push({name: 'AdminLogin'})
          return
        }

        let GetGenerateOrderInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "StoreId": item.StoreId,
          "TakeDate": this.carInformationObj.pickCarData + ' ' + this.carInformationObj.pickCarTime,
          "GiveBackDate": this.carInformationObj.returnCarData + ' ' + this.carInformationObj.returnCarTime,
          "TakeCityMarkId": this.carInformationObj.selectedPlace.MarkId,
          "GiveBackCityMarkId": this.carInformationObj.selectedReturnPlace.MarkId,
          "HertzId": item.HertzId,
          "ProductId": item.ProductId,
        }
        this.$store.dispatch('carReserveInformation', GetGenerateOrderInfo)
          .then(data => {
            for (let i = 0; i < data.IncentivesList.length; i++) {
              this.discountPrice += data.IncentivesList[i].cr_i_FavorablePrice
            }
            this.payMoney = Number(this.dayLong * item.Price) +
              Number(data.ProductModel.cr_cp_Insurance) +
              Number(data.ProductModel.cr_cp_ServiceCharge) -
              Number(this.discountPrice)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //计算价格
      changeMoney(item) {
        if (this.checked3 && !this.checked4) {
          this.payMoney = Number(this.dayLong * item.Price) +
            Number(this.ProductModelObj.cr_cp_Insurance) +
            Number(this.ProductModelObj.cr_cp_ServiceCharge) +
            Number(this.ProductModelObj.cr_cp_DeductibleInsurance) -
            Number(this.discountPrice)
        } else if (this.checked3 && this.checked4) {
          this.payMoney = Number(this.dayLong * item.Price) +
            Number(this.ProductModelObj.cr_cp_Insurance) +
            Number(this.ProductModelObj.cr_cp_ServiceCharge) +
            Number(this.ProductModelObj.cr_cp_DeductibleInsurance) +
            Number(this.ProductModelObj.cr_cp_ThirdPartyInsurance) -
            Number(this.discountPrice)
        } else if (!this.checked3 && this.checked4) {
          this.payMoney = Number(this.dayLong * item.Price) +
            Number(this.ProductModelObj.cr_cp_Insurance) +
            Number(this.ProductModelObj.cr_cp_ServiceCharge) +
            Number(this.ProductModelObj.cr_cp_ThirdPartyInsurance) -
            Number(this.discountPrice)
        } else {
          this.payMoney = Number(this.dayLong * item.Price) +
            Number(this.ProductModelObj.cr_cp_Insurance) +
            Number(this.ProductModelObj.cr_cp_ServiceCharge) -
            Number(this.discountPrice)
        }
      },
      //计算价格
      changeMoneyTwo(item) {
        if (this.checked3 && this.checked4) {
          this.payMoney = Number(this.dayLong * item.Price) +
            Number(this.ProductModelObj.cr_cp_Insurance) +
            Number(this.ProductModelObj.cr_cp_ServiceCharge) +
            Number(this.ProductModelObj.cr_cp_DeductibleInsurance) +
            Number(this.ProductModelObj.cr_cp_ThirdPartyInsurance) -
            Number(this.discountPrice)
        } else if (!this.checked3 && this.checked4) {
          this.payMoney = Number(this.dayLong * item.Price) +
            Number(this.ProductModelObj.cr_cp_Insurance) +
            Number(this.ProductModelObj.cr_cp_ServiceCharge) +
            Number(this.ProductModelObj.cr_cp_ThirdPartyInsurance) -
            Number(this.discountPrice)
        } else if (this.checked3 && !this.checked4) {
          this.payMoney = Number(this.dayLong * item.Price) +
            Number(this.ProductModelObj.cr_cp_Insurance) +
            Number(this.ProductModelObj.cr_cp_ServiceCharge) +
            Number(this.ProductModelObj.cr_cp_DeductibleInsurance) -
            Number(this.discountPrice)
        } else {
          this.payMoney = Number(this.dayLong * item.Price) +
            Number(this.ProductModelObj.cr_cp_Insurance) +
            Number(this.ProductModelObj.cr_cp_ServiceCharge) -
            Number(this.discountPrice)
        }
      },
      //关闭预定
      closeReserve(dataIndex) {
        if (this.showNumber == dataIndex) {
          this.showNumber = 111;
          this.carNumber = 111;
          this.checked3 = false;
        }
      },
      //分页
      handleCurrentChange(val) {
        this.initData(
          this.carInformationObj,
          this.carBlockTypeNumber,
          this.carModelNumber,
          this.carBrandNumber,
          this.carCompanyNumber,
          val
        );
      },
      //初始化租车时间长度
      initDayLong() {
        let returnDate = new Date(this.carInformationObj.returnCarData + ' ' + this.carInformationObj.returnCarTime);
        let pickDate = new Date(this.carInformationObj.pickCarData + ' ' + this.carInformationObj.pickCarTime);
        if (
          this.carInformationObj.returnCarData
          && this.carInformationObj.returnCarTime
          && this.carInformationObj.pickCarData
          && this.carInformationObj.pickCarTime
        ) {
          if (Math.ceil((returnDate.getTime() - pickDate.getTime()) / 86400000) <= 0) {
            this.$notify({
              message: '请选择有效日期',
              type: 'error'
            })
            return
          }
          this.dayLong = Math.ceil((returnDate.getTime() - pickDate.getTime()) / 86400000);
        } else {
          this.dayLong = '';
        }

      },
      //选择日期计算天数
      changeReturnDate() {
        this.initDayLong();
      },
      //提交订单
      submitOrder(item, sItem) {
        if (!this.driverName || !this.driverNum || !this.driverCerNum) {
          this.$notify({
            message: '请把信息填写完整！',
            type: 'error'
          })
          return
        }

        if (!isPhone(this.driverNum)) {
          this.$notify({
            message: '手机号码输入格式不正确!',
            type: 'error'
          });
          return;
        }

        if (!isCardNo(this.driverCerNum)) {
          this.$notify({
            message: '身份证号码输入格式不正确!',
            type: 'error'
          });
          return;
        }


        let CarRentalMakeOrderInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": this.user.sm_ui_ID,
          "operateUserName": "",
          "pcName": "",
          "token": this.user.token,
          "data": {
            "cr_cro_Telephone": this.driverNum,//电话
            "cr_cro_UserName": this.user.sm_ui_Name,//用户名称
            "cr_cro_UserCode": this.user.sm_ui_ID,//用户编号
            "cr_cro_CompanyCarId": "0",//公司汽车ID
            "cr_cro_CarProductId": sItem.ProductId,//汽车产品ID
            "cr_cro_HertzId": sItem.HertzId,//租车公司ID
            "cr_cro_TakeStoreId": this.TakeStoreObj.cr_crs_Id,//取车门店ID
            "cr_cro_GiveBackStoreId": this.GiveBackStoreObj.cr_crs_Id,//还车门店ID
            "cr_cro_AgentId": this.HertzModelObj.cr_h_AgentId,//供应商编号
            "cr_cro_AgentName": this.HertzModelObj.cr_h_Name,//供应商名称
            "cr_cro_DriverName": this.driverName,//驾驶员名称
            "cr_cro_IDType": this.typeValue,//1二代身份证  2护照  3回乡证  4台胞证
            "cr_cro_IDCode": this.driverCerNum,//证件号
            "cr_cro_Phone": this.driverNum,//手机号
            "cr_cro_CarName": item.cr_crc_Name,//车型名称
            "cr_cro_CarRentalFee": this.dayLong * sItem.nPrice,//租车费用
            "cr_cro_ServiceCharge": this.ProductModelObj.cr_cp_ServiceCharge,//手续费
            "cr_cro_Insurance": this.ProductModelObj.cr_cp_Insurance,//保险费
            "cr_cro_TotalPrice": this.payMoney,//总价格
            "cr_cro_DeductibleInsurance": "0",//不计免赔
            "cr_cro_ThirdPartyInsurance": "0",// 第三方责任险
            "cr_cro_GetTime": this.carInformationObj.pickCarData + ' ' + this.carInformationObj.pickCarTime,//取车时间
            "cr_cro_BackTime": this.carInformationObj.returnCarData + ' ' + this.carInformationObj.returnCarTime,//还车时间
          }
        }
        if (this.checked3) {
          CarRentalMakeOrderInfo.data.cr_cro_DeductibleInsurance = this.ProductModelObj.cr_cp_ServiceCharge;
        }
        if (this.checked4) {
          CarRentalMakeOrderInfo.data.cr_cro_ThirdPartyInsurance = this.ProductModelObj.cr_cp_ThirdPartyInsurance;
        }
        this.$store.dispatch('submitCarOrder', CarRentalMakeOrderInfo)
          .then(data => {
            let newData = data;
            newData.title = newData.cr_cro_CarName;
            newData.orderID = newData.cr_cro_OrderId;
            newData.adultNumber = 0;
            newData.adultPrice = 0;
            newData.childNumber = 0;
            newData.childPrice = 0;
            newData.oi_OrderName = newData.cr_cro_Name;
            newData.oi_OrderTypeID = 5;
            newData.oi_SellMoney = newData.cr_cro_TotalPrice;
            newData.OrderID = newData.cr_cro_OrderId
            sessionStorage.setItem('orderInfo', JSON.stringify(newData))
            this.$router.push({name: 'PaymentPlatform'})
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })

      },
      //查询更多门店报价
      searchMore(index) {
        this.indexNum = index;
        console.log(1, index)
        console.log(2, this.indexNum)
        if (this.indexNum = index + 1) {
          console.log(3, index)
        }
//        if (this.indexNum == index) {
//          this.carInformationList[index].StoreArry = this.carInformationList[index].carInfoArray;
//        }

      },
    },
    mounted() {
      document.addEventListener('click', () => {
        this.showPickCarCity = false;
        this.showPickCarPlace = false;
        this.showReturnCarCity = false;
        this.showReturnCarPlace = false;
      })
    }
  }
</script>


<style lang="scss" scoped type="text/scss">

  .placeListContent > span {
    float: left;
    margin: 0 10px;
    font: 14px/2 "微软雅黑";
    color: #999;
  }

  .placeListContent > span:hover {
    cursor: pointer;
    color: #f80;
  }

  .cityListWrap {
    display: inline-block;
    position: relative;
  }

  .cityListWrap i {
    position: absolute;
    right: 10px;
    top: 15px;
    content: '';
    width: 8px;
    height: 8px;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    z-index: 60;
    transform: rotateZ(-135deg);
  }

  .cityList {
    width: 540px;
    padding: 12px;
    background-color: #fff;
    border: 1px solid #ccc;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    position: absolute;
    top: 40px;
    left: 0;
    z-index: 80;
  }

  .cityLetterList > li {
    float: left;
    width: 16.5%;
    text-align: center;
    font: 14px/2 "微软雅黑";
    border-bottom: 1px solid #ccc;
  }

  .cityLetterList > li:hover {
    cursor: pointer;
  }

  .cityLetterList > li.active {
    border-color: #f80;
    color: #f80;
  }

  .cityListContent {
    font: 14px/2 "微软雅黑";
    margin-top: 10px;
  }

  .cityListContent > li > strong {
    float: left;
    color: #f80;
  }

  .cityListContent > li > div {
    width: 470px;
    float: right;
  }

  .cityListContent > li span {
    float: left;
    white-space: nowrap;
    color: #999;
    margin: 0 20px;
  }

  .cityListContent > li span:hover {
    color: #f80;
    cursor: pointer;
  }

  .placeList {
    border-bottom: 1px solid #ccc;
  }

  .placeList > li {
    font: 14px/2 "微软雅黑";
    float: left;
    padding: 0 10px;
    margin-bottom: -1px;
    border-bottom: 1px solid #ccc;
  }

  .placeList > li.active {
    border-color: #f80;
    color: #f80;
  }

  .placeList > li:hover {
    cursor: pointer;
  }

  #wrapBox {
    background-color: #f6f6f6;
  }

  .container {

    position: relative;
    width: 1190px;
    margin: 0 auto;
  }

  ;
  .crumbs {
    height: 30px;
    width: 1190px;
    padding: 10px;
    margin: 10px 0;
    font-size: 12px !important;
  }

  ;

  /*dgfdf*/
  .searchbox {
    position: relative;
    margin-bottom: 20px;
    padding: 20px;
    background-color: white;
    font-size: 14px;
  }

  ;
  //<!--mainbox-->
  .mainbox {
    float: right;
    width: 900px;
  }

  ;
  .carsort {
    background-color: white;
    height: 40px;
    line-height: 18px;
    padding: 10px 20px;
    color: #666;
    zoom: 1;
    font-size: 11pt;
  }

  ;
  .carsortTip {
    float: right;
  }

  .carList > li {
    margin-top: 10px;
    background-color: #fff;
    padding: 20px;
  }

  .carList .carDataListTop > * {
    float: left;
  }

  .carDataListTop .carName {
    margin: 10px 0 0 30px;
  }

  .carDataListTop .carName strong {
    font: 20px/2 "微软雅黑";
    color: #333;
    display: block;
  }

  .carDataListTop .carName span {
    font: 14px/2 "微软雅黑";
    color: #999;
  }

  .carDataListTop .priceAndNum {
    float: right;
    text-align: right;
    margin-top: 20px;
  }

  .priceAndNum strong {
    font: 24px/1 "微软雅黑 ";
    color: #f80;
    display: block;
  }

  .priceAndNum strong em {
    font-size: 18px;
  }

  .priceAndNum strong span {
    font-size: 12px;
    color: #999;
  }

  .priceAndNum span {
    font: 14px/2 "微软雅黑";
    color: #999;
  }

  .informationNav {
    margin-top: 10px;
    background-color: #f0f4fb;
    border-bottom: 1px solid #ccc;
    font: 12px/26px "微软雅黑";
  }

  .informationNav > span {
    float: left;
  }

  .reserveCompany {
    width: 140px;
    padding: 0 10px;
  }

  .carStore {
    width: 188px;
    padding: 0 10px;
  }

  .discount {
    width: 230px;
    padding: 0 10px;
  }

  .everyDayPrice {
    width: 180px;
    padding: 0 10px;
  }

  .reserveSubmit {
    width: 122px;
  }

  .carInformationList > li {
    position: relative;
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
  }

  .carInformationList > li > * {
    float: left;
  }

  .carPlace > span > strong {
    display: block;
    height: 20px;
    font-size: 16px;
    color: #333;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .carPlace > span > span {
    font-size: 12px;
    color: #999;
  }

  .carPlace > span > span > a {
    display: inline;
    color: #22c223;
    margin-left: 5px;
  }

  .fracture {
    margin-top: 10px;
  }

  .fracture > strong {
    border: 1px solid red;
    font: 12px/16px "微软雅黑";
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    margin: 0 10px;
  }

  .fracture > strong > em {
    background-color: red;
    color: #fff;
    padding: 0 2px;
  }

  .fracture > strong > span {
    color: red;
    padding: 0 3px;
  }

  .carPrice {
    color: #f80;
  }

  .carPrice > span {
    font-size: 18px;
  }

  .carPrice > strong {
    font-size: 24px;
  }

  .carPrice > em {
    font-size: 12px;
    color: #999;
    text-decoration: line-through;
    margin-left: 10px;
  }

  .carReserve {
    text-align: center;
  }

  .carReserve > button {
    outline: none;
    background-color: #f80;
    font: 16px/2 "微软雅黑";
    color: #fff;
    padding: 0 30px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .carListSearMore {
    text-align: center;
    padding-top: 20px;
    font: 14px/21px "微软雅黑";
  }

  .carListSearMore a {
    color: #666;
  }

  .carListSearMore a:hover {
    color: #22c233;
  }

  .carListSearMore a:hover i {
    transform: rotate(180deg);
  }

  .carListSearMore i {
    transform-origin: 4px 2px;
    transition: .5s;
    display: inline-block;
    border-top: 4px solid #ccc;
    border-bottom: 4px solid transparent;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    margin-left: 5px;
  }

  #reserveBox {
    background-color: #fff;
    position: absolute;
    left: -20px;
    top: 70px;
    width: 900px;
    box-shadow: 0 0 10px 3px #ccc;
    z-index: 999;
  }

  #reserveBox > .horn {
    position: absolute;
    top: -9px;
    right: 70px;
    background-color: #fff;
    width: 15px;
    height: 15px;
    border-top: 2px solid #ccc;
    border-left: 2px solid #ccc;
    border-right: none;
    border-bottom: none;
    padding: 0;
    transform: rotate(45deg);
  }

  #reserveBox > div > strong {
    font-size: 18px;
    margin-bottom: 10px;
    display: block;
  }

  #reserveBox > div {
    padding: 20px;
    border-bottom: 2px solid #eee;
  }

  /*预订信息*/

  .reserveInformation > .title > strong {
    float: left;
    font-size: 18px;
    color: #000;
  }

  .reserveInformation > .title > a {
    float: right;
    font-size: 24px;
    color: #ccc;
  }

  .rentInformation {
    margin-top: 10px;
  }

  .rentInformation > div {
    float: left;
  }

  .rentInformation > div > * {
    display: block;
  }

  .pickCar {
    width: 381px;
    border-right: 1px solid #ccc;
  }

  .returnCar {
    width: 380px;
  }

  .pickCar > strong,
  .returnCar > strong {
    margin-bottom: 5px;
  }

  .pickCar > strong > *,
  .returnCar > strong > * {
    float: left;
  }

  .pickCar > strong > em,
  .returnCar > strong > em {
    padding: 0 3px;
    border: 1px solid #f80;
    color: #f80;
    border-radius: 2px;
    margin-right: 5px;
    font-size: 12px;
    line-height: 14px;
  }

  .pickCar > strong > span,
  .returnCar > strong > span {
    font-size: 14px;
    color: #000;
    margin-right: 5px;
  }

  .pickCar > strong > a,
  .returnCar > strong > a {
    font-size: 12px;
    color: #22c233;
  }

  .pickCarTime,
  .returnCarTime {
    font: 14px/26px "微软雅黑";
  }

  .pickCarAddress,
  .pickCarNum,
  .returnCarAddress,
  .returnCarNum {
    font: 12px/26px "微软雅黑";
    color: #666;
  }

  .pickCarAddress > em,
  .pickCarNum > em,
  .returnCarAddress > em,
  .returnCarNum > em {
    color: #999;
  }

  .returnCar {
    padding-left: 30px;
  }

  .returnCar > strong > em {
    color: #22c233;
    border-color: #22c233;
  }

  .rentInformation .leaseTerm {
    float: right;
    font: 14px/2 "微软雅黑";
    color: #666;
  }

  .leaseTerm > strong > span {
    color: #f80;
  }

  /*预定信息结束*/

  /*驾驶员信息*/

  .informationList > li {
    width: 50%;
    float: left;
    font: 14px/21px "微软雅黑";
  }

  .informationList > li > strong {
    display: inline-block;
    width: 60px;
  }

  .informationList > li > input {
    outline: none;
    width: 320px;
    padding: 10px;
    line-height: 21px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .informationList .cardType {
    width: 100%;
  }

  .informationList .cardType > input {
    width: 200px;
    padding: 8px 10px;
    margin-top: 10px;
  }

  /*驾驶员信息结束*/

  /*附加服务*/

  .servicesList > li {
    width: 50%;
    float: left;
    margin: 5px 0;
  }

  .servicesList > li i,
  .submitOrder > em > a > i,
  .preferentialActivities > span > i {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: #ccc;
    color: #fff;
    text-align: center;
    line-height: 16px;
    font-size: 16px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin: 0 5px;
  }

  .servicesList > li strong {
    font: 14px/21px "微软雅黑";
    color: #999;
  }

  .servicesList > li span {
    color: #f80;
  }

  /*附加服务结束*/

  /*可享优惠*/

  .enjoyThePrivilegeContent {
    font: 14px/2 "微软雅黑";
  }

  .enjoyThePrivilegeContent > div > strong {
    color: #999;
    display: inline-block;
    width: 150px;
  }

  .enjoyThePrivilegeContent > div {
    padding: 5px 0;
  }

  .preferentialActivities > span {
    color: #f80;
  }

  .coupon > strong > span {
    font: 12px/14px "微软雅黑";
    padding: 0 5px;
    border: 1px solid #f80;
    margin-left: 10px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    color: #f80;
  }

  .coupon > span {
    color: #ccc;
  }

  /*可享优惠结束*/

  /*支付方式*/

  .payType > div {
    font: 14px/21px "微软雅黑";
    padding-top: 10px;
  }

  .payType > div > span {
    color: #f80;
  }

  .payType > div > em {
    margin-left: 10px;
    color: #999;
  }

  /*支付方式结束*/

  /*提交订单*/

  .submitOrder {
    font: 14px/21px "微软雅黑";
    color: #666;
  }

  .submitOrder > span {
    float: left;
    margin-top: 10px;
  }

  .submitOrder > span > a {
    color: #22c233;
    display: inline;
  }

  .submitOrder > em {
    float: right;
  }

  .submitOrder > em > * {
    display: inline-block;
  }

  .submitOrder > em > span {
    color: #f80;
  }

  .submitOrder > em > a {
    position: relative;
    color: #22c233;
  }

  .submitOrder > em > a:hover .detailsOfCharges {
    display: block;
  }

  .submitOrder > em > button {
    outline: none;
    font: 18px/40px "微软雅黑";
    color: #fff;
    background-color: #f80;
    padding: 0 60px;
    border-radius: 5px;
  }

  .detailsOfCharges {
    color: #999;
    position: absolute;
    bottom: 30px;
    right: -50%;
    width: 200px;
    border: 1px solid #f80;
    font: 12px/18px "微软雅黑";
    background-color: #fff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    box-shadow: 0 0 10px #f80;
    display: none;
  }

  .detailsOfCharges:before {
    display: block;
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: rgb(254, 254, 230);
    border-bottom: 1px solid #f80;
    border-right: 1px solid #f80;
    transform: rotate(45deg);
    bottom: -6px;
    left: 50%;
  }

  .ordinary {
    display: block;
    background-color: rgb(254, 254, 230);
    padding: 5px;
    border-bottom: 1px solid #f0c78a;
  }

  .ordinary > span {
    float: left;
    width: 100%;
  }

  .ordinary > span > em:nth-of-type(1) {
    float: left;
  }

  .ordinary > span > em:nth-of-type(2) {
    float: right;
  }

  /*提交订单结束*/

  /*租车须知*/

  .carRentalNotice {
    border-top: 1px solid #ccc;
    margin-top: -2px;
    background-color: #f9f9f9;
  }

  .carRentalNotice > span {
    font: 14px/3 "微软雅黑";
  }

  .carRentalNotice > span > i {
    line-height: 15px;
    text-align: center;
    color: #fff;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    font-weight: bold;
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: dodgerblue;
    margin-right: 5px;
  }

  .carRentalNotice > p {
    font: 12px/1.5 "微软雅黑";
    color: #999;
  }

  .carRentalNotice > p > * {
    display: block;
  }

  .carRentalNotice > p > em {
    color: #fa4a4a;
  }

  .carRentalNotice > p > a {
    color: #22c233;
  }

  /*租车须知结束*/

  /**
  sideboxes
   */
  .sideboxes {
    width: 272px;
    font: 14px/2 "微软雅黑";
    float: left;
    border: 1px solid #ccc;
    border-bottom: none;
    position: relative;
  }

  .sideboxes > strong {
    display: block;
    font: 16px/2 "微软雅黑";
    text-align: center;
    color: #000;
    background-color: #f6f6f6;
  }

  .sideboxes > div {
    padding: 12px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
  }

  .sideboxes > div > a {
    display: inline-block;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .sideboxes > div > a:hover {
    color: #f80;
  }

  .sideboxes > div > a.active {
    color: #f80;
  }

  .sideboxes > div > strong {
    color: #000;
    display: block;
  }

  .carBlockTypeList > a {
    width: 33%;
    color: #999;
  }

  .carBlockTypeList > a:hover {
    color: #f80;
  }

  .carModelList > a {
    width: 33%;
    margin-top: 5px;
  }

  .carModelList > a > i {
    display: block;
    width: 60px;
    height: 24px;
    background-image: url("../../assets/img/cx.png");
    background-repeat: no-repeat;
  }

  .carModelList > a:nth-of-type(n).active > i {
    background-position-x: 0px;
  }

  .carModelList > a:nth-of-type(n):hover > i {
    background-position-x: 0px;
  }

  .carModelList > a:nth-of-type(1) > i {
    background-position: -100px 0px;
  }

  .carModelList > a:nth-of-type(2) > i {
    background-position: -100px -40px;
  }

  .carModelList > a:nth-of-type(3) > i {
    background-position: -100px -80px;
  }

  .carModelList > a:nth-of-type(4) > i {
    background-position: -100px -120px;
  }

  .carModelList > a:nth-of-type(5) > i {
    background-position: -100px -160px;
  }

  .carModelList > a:nth-of-type(6) > i {
    background-position: -100px -200px;
  }

  .carModelList > a:nth-of-type(7) > i {
    background-position: -100px -240px;
  }

  .carModelList > a:nth-of-type(8) > i {
    background-position: -100px -280px;
  }

  .carBrandList > a,
  .carCompanyList > a {
    width: 25%;
  }

  .sideboxes > .clean {
    position: absolute;
    right: 5px;
    top: 3px;
    border: 1px solid grey;
    font-size: 12px;
    line-height: 24px;
    padding: 0 6px;
    color: #666;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .clean:hover {
    cursor: pointer;
    color: #f80;
  }

  .brand {
    margin-top: 4px;
    width: 270px;
    background-color: seashell;
  }

  .carRentalCompany {
    margin-top: 4px;
    width: 270px;
    background-color: seashell;
  }

  .pickInCar {
    margin: 10px 0;
  }

  .searchbox > div {
    float: left;
  }

  .searchbox > .submit {
    float: right;
    margin-top: 30px;
  }

  .searchbox > .submit > span {
    font: 14px/1 "微软雅黑";
    color: #f80;
    vertical-align: top;
  }

  .searchbox > .submit > button {
    font: 20px/2 "微软雅黑";
    color: #fff;
    background-color: #f80;
    padding: 0 40px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    outline: none;
  }

  .lookReserve > p {
    text-indent: 2em;
    font: 16px/2 "微软雅黑";
    color: #999;
  }

  .input1 {
    display: inline-block;
    width: 200px;
    font: 14px/20px "微软雅黑";
    border: 1px solid #dcdfe6;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    padding: 10px 10px;
    color: #606266;
  }
</style>
