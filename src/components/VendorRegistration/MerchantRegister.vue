<template>
  <div>
    <div id="MerchantRegisterWrap">
      <!--注册头部-->
      <div class="MerchantRegisterWrapHeader clearfix" @click="toHome">
        <div class="MerchantRegisterWrapHeaderLogoBox">
          <img src="../../assets/img/huileyouLogo.jpg" width="300" height="70">
        </div>
        <div class="MerchantRegisterWrapHeaderHomePage">
          <router-link to="AgenciesHome">返回首页</router-link>
        </div>
      </div>
      <!--注册导航-->
      <div class="MerchantRegisterNavWrap">
        <div class="MerchantRegisterNav">
          <div class="MerchantRegisterNavContent clearfix">
            <a href="javascript:;" v-for="item,index in options" :class="{active:index==n}"
               @click="changeOption(index)">{{item.name}}</a>
          </div>
        </div>
      </div>
      <!--注册表单-->
      <div class="MerchantRegisterTabel" v-show="off">
        <!--供应商信息-->
        <div class="ContactsContent">
          <h5>供应商信息</h5>
          <div class="ContactsBox clearfix">
            <!--<el-col :span="24" class="formSearch">-->
              <!--<el-form :inline="true">-->
                <!--<el-form-item label="姓名:" :required="isOff">-->
                  <!--<el-input type="text" size="mini" v-model="insertAgentInfo.data.sm_ai_Name"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-form>-->
            <!--</el-col>-->
            <!--<el-col :span="24" class="formSearch">-->
              <!--<el-form :inline="true">-->
                <!--<el-form-item label="QQ:" :required="isOff">-->
                  <!--<el-input type="text" size="mini" v-model="insertAgentInfo.data.sm_ai_QQ"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-form>-->
            <!--</el-col>-->

            <el-col :span="24" class="formSearch" v-show="showT">
              <el-form :inline="true">
                <el-form-item label="推广员ID:">
                  <el-input type="text" size="mini" v-model="insertAgentInfo.data.sm_ai_ParentID"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="24" class="formSearch">
              <el-form :inline="true">
                <el-form-item label="手机号码:" :required="isOff">
                  <el-input type="text" size="mini" v-model="insertAgentInfo.data.sm_ai_Telephone"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <!--<el-col :span="24" class="formSearch">-->
              <!--<el-form :inline="true">-->
                <!--<el-form-item label="供应商密码:" :required="isOff">-->
                  <!--<el-input type="password" size="mini" v-model="insertAgentInfo.data.sm_ai_Password"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-form>-->
            <!--</el-col>-->
            <!--<el-col :span="24" class="formSearch">-->
              <!--<el-form :inline="true">-->
                <!--<el-form-item label="电子邮箱:" :required="isOff">-->
                  <!--<el-input type="text" size="mini"  v-model="insertAgentInfo.data.sm_ai_Email"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-form>-->
            <!--</el-col>-->
            <!--<el-col :span="24" class="formSearch">-->
              <!--<el-form :inline="true">-->
                <!--<el-form-item label="性别:" :required="isOff">-->
                  <!--<el-radio-group v-model="insertAgentInfo.data.sm_ai_Sex">-->
                    <!--<el-radio :label="0">男</el-radio>-->
                    <!--<el-radio :label="1">女</el-radio>-->
                  <!--</el-radio-group>-->
                <!--</el-form-item>-->
              <!--</el-form>-->
            <!--</el-col>-->
          </div>
        </div>
        <!--公司信息-->
        <div class="companyContent clearfix">
          <h5>公司信息</h5>
          <el-col :span="24" class="formSearch">
            <el-form :inline="true">
              <el-form-item label="品牌名:" :required="isOff">
                <el-input type="text" size="mini" v-model="insertAgentInfo.data.sm_ai_GoodName"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="24" class="formSearch">
            <el-form :inline="true">
              <el-form-item label="公司名称:" :required="isOff">
                <el-input type="text" size="mini" v-model="insertAgentInfo.data.sm_ai_CompanyName"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="24" class="formSearch">
            <el-form :inline="true">
              <el-form-item label="省:" :required="isOff">
                <el-select v-model="insertAgentInfo.data.sm_ai_Provice" placeholder="请选择省" size="mini"
                           @focus="changeProvince">
                  <el-option
                    v-for="item in provinceDataList"
                    :key="item.sm_af_AreaID"
                    :label="item.sm_af_AreaName"
                    :value="item.sm_af_AreaID">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="24" class="formSearch">
            <el-form :inline="true">
              <el-form-item label="市:" :required="isOff">
                <el-select v-model="insertAgentInfo.data.sm_ai_City" placeholder="请选择市" size="mini"
                           @focus="changeCity">
                  <el-option
                    v-for="item in cityDataList"
                    :key="item.sm_af_AreaID"
                    :label="item.sm_af_AreaName"
                    :value="item.sm_af_AreaID">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="24" class="formSearch">
            <el-form :inline="true">
              <el-form-item label="县:" :required="isOff">
                <el-select v-model="insertAgentInfo.data.sm_ai_County" placeholder="请选择县" size="mini"
                           @focus="changeCounty">
                  <el-option
                    v-for="item in countyDataList"
                    :key="item.sm_af_AreaID"
                    :label="item.sm_af_AreaName"
                    :value="item.sm_af_AreaID">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="24" class="formSearch">
            <el-form :inline="true">
              <el-form-item label="具体地址:" :required="isOff">
                <el-input type="text" size="mini" v-model="insertAgentInfo.data.sm_ai_Address"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="24" class="formSearch">
            <el-form :inline="true">
              <el-form-item label="注册成立时间:" :required="isOff">
                <div class="block">
                  <el-date-picker
                    id="c"
                    v-model="insertAgentInfo.data.sm_ai_RegTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    size="mini"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="24" class="formSearch">
            <el-form :inline="true">
              <el-form-item label="注册资金:" :required="isOff">
                <el-input style="width: 100px" type="text" size="mini"
                          v-model="insertAgentInfo.data.sm_ai_RegMoney" placeholder="请输入数字"></el-input>
                万元
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="24" class="formSearch">
            <el-form :inline="true">
              <el-form-item label="公司规模编码:" :required="isOff">
                <el-select v-model="insertAgentInfo.data.sm_ai_CPropertyID" placeholder="公司规模编码" size="mini"
                           @focus="changeCompanyType">
                  <el-option
                    v-for="item in changeCompanyTypeList"
                    :key="item.ts_jb_ID "
                    :label="item.ts_jb_Name"
                    :value="item.ts_jb_ID ">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="24" class="formSearch">
            <el-form :inline="true">
              <el-form-item label="结算币种编号:" :required="isOff">
                <el-select v-model="insertAgentInfo.data.sm_ai_MPropertyID" placeholder="请选择币种编号" size="mini"
                           @focus="changeMoneyType">
                  <el-option
                    v-for="item in changeMineyTypeList"
                    :key="item.ts_jb_ID"
                    :label="item.ts_jb_Name"
                    :value="item.ts_jb_ID">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>

        </div>
        <!--合作信息-->
        <div class="cooperationContent clearfix">
          <h5>合作信息</h5>
          <el-col :span="24" class="formSearch">
            <el-form :inline="true">
              <el-form-item label="优势产品说明:">
                <el-input type="textarea" size="mini" v-model="insertAgentInfo.data.sm_ai_GoodIntroduce"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <!--<el-col :span="24" class="formSearch">-->
            <!--<el-form :inline="true">-->
              <!--<el-form-item label="已合作的网销渠道:">-->
                <!--<el-input type="text" size="mini" v-model="insertAgentInfo.data.sm_ai_PartnerWay"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-form>-->
          <!--</el-col>-->
          <el-col :span="24" class="formSearch">
          </el-col>
          <el-col :span="24" class="formSearch">
            <el-form :inline="true">
              <el-form-item label="合作类型名称:" :required="isOff">
                <el-select v-model="insertAgentInfo.data.sm_ai_PPropertyID" placeholder="请选择合作类型" @change="changeCooperation">
                  <el-option
                    v-for="item in changeCooperationTypeList"
                    :key="item.sm_cp_ID"
                    :label="item.sm_cp_Name"
                    :value="item.sm_cp_ID">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <!--<el-col :span="24" id="ScopeOfOperationType" class="formSearch" v-show="ScopeOfOperationTypeShow">-->
            <!--<el-form :inline="true">-->
              <!--<el-form-item label="经营范围名称:" :required="isOff">-->
                <!--<el-checkbox-group v-model="ScopeOfOperationType" @change="changeBox">-->
                  <!--<el-checkbox v-for="item,index in changeScopeOfOperationList" :label="item.ts_jb_Name"-->
                               <!--:key="index"></el-checkbox>-->
                <!--</el-checkbox-group>-->
              <!--</el-form-item>-->
            <!--</el-form>-->
          <!--</el-col>-->
        </div>
        <!--资质信息-->
        <div class="qualificationsContent clearfix">
          <h5>资质信息</h5>
          <el-col :span="24" class="formSearch">
            <el-form :inline="true">
              <el-form-item label="是否三证合一:" :required="isOff">
                <el-radio-group v-model="insertAgentInfo.data.sm_ai_IncludeCert">
                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="24" class="formSearch">
            <el-form :inline="true">
              <el-form-item label="营业执照号:">
                <el-input type="text" size="mini" v-model="insertAgentInfo.data.sm_ai_CertNo"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="24" class="formSearch">
            <el-form :inline="true">
              <el-form-item label="营业执照有效期从:" >
                <div class="block">
                  <el-date-picker
                    id="b"
                    v-model="insertAgentInfo.data.sm_ai_CertExpireFrom"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    size="mini">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="24" class="formSearch">
            <el-form :inline="true">
              <el-form-item label="营业执照有效期到:" >
                <el-date-picker
                  id="a"
                  v-model="insertAgentInfo.data.sm_ai_CertExpireTo"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  size="mini">
                </el-date-picker>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="24" class="formSearch">
            <el-form :inline="true">
              <el-form-item label="营业执照扫描件:">
                <a href="javascript:;" class="file">上传文件
                  <input type="file" name="" ref="upload" accept="image/*" multiple>
                </a>
                <img
                  style="display: block"
                  v-for="item in ImageURL1"
                  v-lazy="item"
                  width="280"
                  height="125"
                  v-show="ImageURL1.length"
                >
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="24" class="formSearch">
            <el-form :inline="true">
              <el-form-item label="税务登记证号:">
                <el-input type="text" size="mini" v-model="insertAgentInfo.data.sm_ai_FeeNo"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="24" class="formSearch">
            <el-form :inline="true">
              <el-form-item label="税务登记证扫描件:">
                <a href="javascript:;" class="file">上传文件
                  <input type="file" name="" ref="upload1" accept="image/*" multiple>
                </a>
                <img
                  style="display: block"
                  v-for="item in ImageURL2"
                  v-lazy="item"
                  width="280"
                  height="125"
                  v-show="ImageURL2.length"
                >
              </el-form-item>
            </el-form>
          </el-col>
          <!--<el-col :span="24" class="formSearch">-->
            <!--<el-form :inline="true">-->
              <!--<el-form-item label="其他证件:">-->
                <!--<el-input type="text" size="mini" v-model="insertAgentInfo.data.sm_ai_OtherCert"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-form>-->
          <!--</el-col>-->
          <!--<el-col :span="24" class="formSearch">-->
            <!--<el-form :inline="true">-->
              <!--<el-form-item label="其他证件扫描件:">-->
                <!--<a href="javascript:;" class="file">上传文件-->
                  <!--<input type="file" name="" ref="upload2" accept="image/*" multiple>-->
                <!--</a>-->
                <!--<img-->
                  <!--style="display: block"-->
                  <!--v-for="item in ImageURL3"-->
                  <!--v-lazy="item"-->
                  <!--width="280"-->
                  <!--height="125"-->
                  <!--v-show="ImageURL3.length"-->
                <!--&gt;-->
              <!--</el-form-item>-->
            <!--</el-form>-->
          <!--</el-col>-->
        </div>
      </div>
      <!--信息提交-->
      <div class="ContactsSubmitWrap" v-show="off">
        <!--<p>协议</p>-->
        <a href="javascript:;" @click="InformtionSubmit">提交信息</a>
      </div>
      <div class="MerchantRegisterTabel" v-show="!off">

        <div class="searchProgress">
          <p v-show="statusText">
            {{statusText}}
          </p>
          <!--<div class="Failure">失败原因: <span>{{failureText}}</span></div>-->
          <el-form ref="form" :model="searchProgressOptions" label-width="120px" style="margin-top: 100px">
            <el-form-item label="手机号码:">
              <el-input v-model="searchProgressOptions.phone" style="width: 200px" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <!--<el-form-item label="手机验证码:" label-width="120px">-->
            <!--<el-input v-model="searchProgressOptions.verificationCode" style="width: 200px" placeholder="请输入手机验证码"></el-input>-->
            <!--<el-button @click="getCode" :disabled="disabledOff" size="small">{{text}}</el-button>-->
            <!--</el-form-item>-->
            <el-form-item label-width="120px">
              <el-button type="warning" @click="searchStatus">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <el-dialog
      title="服务条款协议"
      :visible.sync="contentDialog"
      width="50%"
      :close-on-click-modal="false"
    >
      <div style="position: relative">
        <div v-html="content"></div>
        <img src="../../assets/img/Chapter.png" alt="" style="position: absolute;bottom: -30px;left: 20px;width: 150px;height: 150px"/>
      </div>
      <span slot="footer" class="dialog-footer" style="position: relative;z-index: 999">
        <el-button type="primary" @click="submitContent">同意条款并继续</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
//  import $ from 'jquery'
  import MerchantRegister from '@/assets/css/MerchantRegister.css'
  import {isPhone,getNewStr} from '@/assets/public'


  export default {
    name: '',
    computed: mapGetters([
      'provinceDataList',
      'cityDataList',
      'countyDataList',
      'changeMineyTypeList',
      'changeValueName',
      'changeNameID',
      'changeCompanyTypeList',
      'changeCompanyTypeValue',
      'changeCompanyID',
      'changeCooperationTypeList',
      'changeScopeOfOperationList'
    ]),
    data() {
      return {
        isSubmitContent: false,//点击同意提交注册
        showClose: false,
        contentDialog: false,
        failureText: '长太帅',
        statusText: '',
        disabledOff: false,
        num: 60,
        text: '获取动态密码',
        searchProgressOptions: {
          phone: '',
          verificationCode: ''
        },
        n: 0,
        off: true,
        options: [
          {
            name: '供应商注册信息'
          },
        ],
        isOff: true,
        ScopeOfOperationType: [],
        changeCooperationTypeData: [],
        newArr: [],
        ImageURL1: [],
        ImageURL2: [],
        ImageURL3: [],
        countryData: [
          {
            Country: '中国',
            value: 0
          }
        ],
        insertAgentInfo: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "sm_ai_MPropertyID": "",//结算币种编码
            "sm_ai_CPropertyID": "",//公司规模编码
            "sm_ai_Telephone": "",//手机号码
            "sm_ai_FixPhoneContryCode": "",//固定电话区号
            "sm_ai_FixPhone": "",//电话号码
            "sm_ai_GoodName": "",//品牌名
            "sm_ai_CompanyName": "",//公司名称
            "sm_ai_Provice": "",//省
            "sm_ai_City": "",//市
            "sm_ai_County": "",//县
            "sm_ai_Address": "",//具体地址
            "sm_ai_RegTime": "",//注册成立时间
            "sm_ai_RegMoney": "",//注册资金
            "sm_ai_GoodIntroduce": "",//优势产品说明
            "sm_ai_IncludeCert": "",//是否三证合一
//            "sm_ai_Fee": "",//提供利润
            "sm_ai_CertNo": "",//营业执照号
            "sm_ai_CertExpireFrom": "",//营业执照有效期从
            "sm_ai_CertExpireTo": "",//营业执照有效期到
            "sm_ai_PPropertyID": "",//供应商合作类型 1餐饮 2酒店 3旅行社 4景区门票 5汽车租赁 6广告 7微电影 8通用
            "sm_ai_CertImage": "",//营业执照扫描件
            "sm_ai_FeeNo": "",//税务登记证号
            "sm_ai_FeeImage": "",//税务登记证扫描件
          },
//          agentinfotype: [],
//          agentinfoscope: [],
        },
        showT:true,
        content: '',
        changeCooperationTypeDataList: '',
        ScopeOfOperationTypeList: [],
        ScopeOfOperationTypeShow: false,
      }
    },
    created() {
      if(window.location.href.includes('?')){
        let id = window.location.href.split('?')[1].split('=')[1];
        this.insertAgentInfo.data.sm_ai_ParentID = id;
        this.showT = false;
      }
      let user = JSON.parse(sessionStorage.getItem('user'));
      if(user){
        this.insertAgentInfo.operateUserID = user.sm_ui_ID;
        this.insertAgentInfo.operateUserName = user.sm_ui_Name;
      }else{
        this.$notify({
          message: '请先注册用户!',
          type: 'error'
        });
        setTimeout(()=>{
          this.$router.push({name:'AdminLogin'})
        },100);
        return
      }
//      this.$store.commit('showLoading');
      this.initData().then(() => {
//        this.$store.commit('hideLoading')
      },err=>{
        this.$notify({
          message: err,
          type: 'error'
        });
      })
    },
    methods: {
      //服务条款协议提交
      submitContent() {
        this.ScopeOfOperationTypeShow = true;
        this.contentDialog = false;
        this.isSubmitContent = true;
      },
      //查询状态
      searchStatus() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "phone": this.searchProgressOptions.phone,
        };
        this.$store.dispatch('getSearchStatus', options)
          .then(text => {
            this.statusText = text
          })
      },
      //获取验证码
      getCode() {
        this.disabledOff = true;
        let timer = setInterval(() => {
          this.num--;
          this.text = this.num + 's';
          if (this.num == 0) {
            clearInterval(timer);
            this.text = '重新获取验证码';
            this.disabledOff = false;
            this.num = 60;
          }
        }, 1000)
      },
      //选中菜单
      changeOption(index) {
        this.n = index;
        if (index == 1) {
          this.off = false;
        } else {
          this.off = true;
        }
      },
      async initData() {
        await this.changeMoneyType()
        await this.changeCompanyType()
        await this.changeCooperationTypeL()
        await this.changeScopeOfOperation()
      },
      //图片转二进制
      uploadImg(file) {
        return new Promise(function (relove, reject) {
          lrz(file)
            .then(data => {
              relove(data.base64.split(',')[1])
            })
        })
      },
     uploadToOSS(file) {
         return new Promise((relove,reject)=>{
           var fd = new FormData();
           fd.append("fileToUpload", file);
           var xhr = new XMLHttpRequest();
           xhr.open("POST", getNewStr+"/OSSFile/PostToOSS");
           xhr.send(fd);
           xhr.onreadystatechange = function () {
             if (xhr.readyState == 4 && xhr.status == 200) {
               if (xhr.responseText) {
                 var data = xhr.responseText
                 relove(JSON.parse(data))
               }
             }else{
//               if (xhr.responseText) {
//                 var data = xhr.responseText;
//                 reject(JSON.parse(data).resultcontent)
//               }
             }
           }
         })
      },

  //添加图片
      uploaNode() {
        setTimeout(() => {
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                this.uploadToOSS(this.$refs.upload.files[i])
                  .then(data=>{
                  if (data) {
                    this.ImageURL1 = [];
                    this.ImageURL1.push(data.data);
                  } else {
                    this.$notify({
                      message: '图片地址不存在!',
                      type: 'error'
                    });
                  }
                })
              }
            })
          }
          if (this.$refs.upload1) {
            this.$refs.upload1.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload1.files.length; i++) {
                this.uploadToOSS(this.$refs.upload1.files[i])
                    .then(data => {
                      if (data) {
                        this.ImageURL2 = [];
                        this.ImageURL2.push(data.data);
                      } else {
                        this.$notify({
                          message: '图片地址不存在!',
                          type: 'error'
                        });
                      }
                    })
              }
            })
          }
          if (this.$refs.upload2) {
            this.$refs.upload2.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload2.files.length; i++) {
                this.uploadToOSS(this.$refs.upload2.files[i])
                    .then(data => {
                      if (data) {
                        this.ImageURL3.push(data.data);
                      } else {
                        this.$notify({
                          message: '图片地址不存在!',
                          type: 'error'
                        });
                      }
                    })
              }
            })
          }
        }, 30)
      },
      //选择省
      changeProvince(v) {
        let getAreaProvice = {
          "areaPid": 3337
        }
        this.$store.dispatch('initProvinceData', getAreaProvice)
      },

      //选择市
      changeCity() {
        if (!this.insertAgentInfo.data.sm_ai_Provice) {
          this.$notify({
            message: '请先选择省!!',
            type: 'error'
          });
          return
        }
        let getCity = {
          "areaPid": this.insertAgentInfo.data.sm_ai_Provice ? this.insertAgentInfo.data.sm_ai_Provice : ''
        }
        this.$store.dispatch('initCityData', getCity)
      },

      //选择县
      changeCounty() {
        if (!this.insertAgentInfo.data.sm_ai_Provice && !this.insertAgentInfo.data.sm_ai_City) {
          this.$notify({
            message: '请先选择省和市!!',
            type: 'error'
          });
          return
        }
        let getCounty = {
          "areaPid": this.insertAgentInfo.data.sm_ai_City ? this.insertAgentInfo.data.sm_ai_City : ''
        }
        this.$store.dispatch('initCountyData', getCounty)
      },

      //查询结算币种
      changeMoneyType() {
        var selectBalanceCurrency = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ts_jb_ID": "",
          "ts_jb_Name": "",
          "ui_jb_ParentID": "45"
        }
        return this.$store.dispatch('initEducation', selectBalanceCurrency)
      },
      changeValue(id) {
        this.$store.commit('initChangeValue', id)
        this.insertAgentInfo.data.sm_bc_Name = this.changeValueName
      },
      changeName(id) {
        this.$store.commit('initChangeNameID', id)
        this.insertAgentInfo.data.sm_bc_ID = this.changeNameID
      },
      //公司规模
      changeCompanyType() {
        var selectCompanySize = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ts_jb_ID": "",
          "ts_jb_Name": "",
          "ui_jb_ParentID": "46"
        };
        return this.$store.dispatch('initEducation', selectCompanySize)
      },
      //合作类型
      changeCooperationTypeL() {
        let selectCooperationType = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "sm_cp_ID": "",
          "sm_cp_Name": "",
          "sm_cp_IsDelete": 0
        };
        return this.$store.dispatch('initChangeCooperationType', selectCooperationType)
      },
      //选择合作类型
      changeCooperationType() {
        this.newArr = [];
        let arr = this.changeCooperationTypeList;
        let typeArr = this.changeCooperationTypeDataList
        for (var i = 0; i < arr.length; i++) {
          for (var j = 0; j < typeArr.length; j++) {
            if (arr[i].sm_cp_Name == typeArr[j]) {
              this.newArr.push({
                sm_cp_ID: arr[i].sm_cp_ID,
                sm_cp_PartnerTypeName: typeArr[j]
              })
            }
          }
        }
      },
      //经营范围
      changeScopeOfOperation() {
        var selectTradeScope = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ts_jb_ID": "",
          "ts_jb_Name": "",
          "ui_jb_ParentID": "70"
        };
        this.$store.dispatch('initEducation', selectTradeScope)
      },
//      选择经营范围
      changeBox() {
        this.ScopeOfOperationTypeList = [];
        let arr = this.changeScopeOfOperationList;
        let typeArr = this.ScopeOfOperationType;
        for (var i = 0; i < arr.length; i++) {
          for (var j = 0; j < typeArr.length; j++) {
            if (arr[i].ts_jb_Name == typeArr[j]) {
              this.ScopeOfOperationTypeList.push({
                sm_ts_ID: arr[i].ts_jb_ID,
                sm_ts_Name: typeArr[j]
              })
            }
          }
        }
      },
      //选中合作类型获取协议
      changeCooperation(v) {
        if(this.insertAgentInfo.data.sm_ai_Provice==''){
          this.$notify({
            message: '请选择省!',
            type: 'error'
          });
          this.changeCooperationTypeDataList = ''
          return
        }
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_cp_ID": "",
          "sm_cp_Name": "",
          "sm_cp_IsDelete": 0,
          "provice": this.insertAgentInfo.data.sm_ai_Provice,
          "partnerTypeID": v,
          "partnerName":this.insertAgentInfo.data.sm_ai_CompanyName
        };
        this.$store.dispatch('initAgreementContent',options)
        .then(content=>{
          if(content){
            this.contentDialog = true;
            this.content = content
          }else{
            this.$notify({
              message: '服务条款协议不存在!',
              type: 'error'
            });
          }
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      },
      //信息提交
      InformtionSubmit() {
        if(!isPhone(this.insertAgentInfo.data.sm_ai_Telephone)){
          this.$notify({
            message: '手机号码输入格式不正确!',
            type: 'error'
          });
          return;
        }
        if (!this.isSubmitContent) {
          this.$notify({
            message: '请选择合作类型并同意条款！',
            type: 'error'
          });
          return
        }
        this.newArr = [];
        let arr = this.changeCooperationTypeList;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].sm_cp_ID == this.changeCooperationTypeDataList) {
            this.newArr.push({
              sm_cp_ID: arr[i].sm_cp_ID,
              sm_cp_PartnerTypeName: arr[i].sm_cp_Name
            })
          }
        }
        if (isNaN(this.insertAgentInfo.data.sm_ai_RegMoney)) {
          this.$notify({
            message: '注册资金必须为数字！',
            type: 'error'
          });
          return
        }


        this.insertAgentInfo.data.sm_ai_CertImage = this.ImageURL1.join(',');
        this.insertAgentInfo.data.sm_ai_FeeImage = this.ImageURL2.join(',');


        this.$store.dispatch('initSubmitInformtionObj', this.insertAgentInfo)
          .then(() => {
            this.$notify({
              message: '注册成功！！',
              type: 'success'
            });
            setTimeout(()=>{
              window.open("http://hly.1000da.com.cn/supplier/index.html")
            },1000)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //点击图标返回首页
      toHome() {
        this.$router.push({name: 'AgenciesHome'})
      }
    },
    mounted() {
      this.uploaNode()
    }
  }
</script>
<style scoped>
  .searchProgress {
    padding: 0 0 0 200px;
    height: 800px;
  }

  .searchProgress p {
    margin-bottom: 100px;
    text-align: center;
    font-size: 30px;
    padding: 100px 0 0 0;
  }

  .searchProgress .Failure {
    padding: 40px 0 60px 100px;
    font-size: 20px;
  }

  .searchProgress .Failure span {
    color: #f60;
  }

  .file {
     position: relative;
     display: inline-block;
     background: #000;
     /*border: 1px solid #99D3F5;*/
     border-radius: 4px;
     padding: 4px 12px;
     overflow: hidden;
     color: #fff;
     text-decoration: none;
     text-indent: 0;
     font-size: 12px;
     line-height: 20px;
   }

  .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }

  .MerchantRegisterTabel #ContactsTypeOfCooperationType,
  #ContactsTypeOfCooperationType1 {
    width: 100%;
  }
</style>
