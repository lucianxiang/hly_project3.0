<template>
  <div>
    <div class="personalDataDetailsWrap">
      <ul class="personalDataDetailsWrapNavList clearfix">
        <li><a href="javascript:;" class="active">基本信息</a></li>
      </ul>
      <el-form ref="form" label-width="80px">
        <el-form-item label="昵称:" label-width="100px">
          <el-input
            style="width: 220px"
            placeholder="请输入昵称"
            v-model="userInfoObj.sm_ui_Name"
            clearable
            :disabled="isDisabled"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="身份证:" label-width="100px" :required="isOff">
          <el-input
            style="width: 220px"
            placeholder="请输入身份证"
            v-model="userInfoObj.sm_ui_CertNo"
            :disabled="isDisabled"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="电话号码:" label-width="100px" :required="isOff">
          <el-input
            style="width: 220px"
            placeholder="请输入电话号码"
            v-model="userInfoObj.sm_ui_Phone"
            :disabled="isDisabled"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="生日:" label-width="100px">
          <el-select v-model="yearValue" placeholder="请选择年" style="width: 120px" size="small" :disabled="isDisabled">
            <el-option
              v-for="item in years"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="monthValue" placeholder="请选择月" style="width: 120px" size="small" @change="changeMonth"
                     :disabled="isDisabled">
            <el-option
              v-for="item in months"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="dateValue" placeholder="请选择日" style="width: 120px" size="small" :disabled="isDisabled">
            <el-option
              v-for="item in dates"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别:" label-width="100px">
          <el-select v-model="userInfoObj.sm_ui_Sex" placeholder="请选择性别" :disabled="isDisabled">
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱:" label-width="100px">
          <el-input
            style="width: 220px"
            placeholder="请输入邮箱"
            v-model="userInfoObj.sm_ui_Email"
            :disabled="isDisabled"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="常住地:" label-width="100px">
          <el-select v-model="userInfoObj.sm_ui_ProviceName" placeholder="请选择省" size="mini"
                     @change="changeProvinceAll" :disabled="isDisabled">
            <el-option
              v-for="item in provinceDataList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>
          <el-select v-model="userInfoObj.sm_ui_CityName" placeholder="请选择市" size="mini"
                     :disabled="isDisabled" @change="changeCityAll">
            <el-option
              v-for="item in cityDataList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址:" label-width="100px">
          <el-input
            style="width: 220px"
            placeholder="请输入详细地址"
            v-model="userInfoObj.sm_ui_Address"
            :disabled="isDisabled"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="婚姻:" label-width="100px">
          <el-select v-model="userInfoObj.sm_ui_MarryStatus" placeholder="请选择婚姻状态" :disabled="isDisabled">
            <el-option
              v-for="item in marryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职业:" label-width="100px">
          <strong class="name" v-show="JobName">{{userInfoObj.sm_ui_JobName}}</strong>
          <el-cascader
            v-show="!JobName"
            :options="jobList"
            :disabled="isDisabled"
            v-model="selectedOptions"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="学历:" label-width="100px" >
          <el-select v-model="userInfoObj.sm_ui_EducationName" placeholder="请选择学历" :disabled="isDisabled" @change="changeEducationName">
            <el-option
              v-for="item in educationList"
              :key="item.ts_jb_ID"
              :label="item.ts_jb_Name"
              :value="item.ts_jb_ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="!isDisabled">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="clear">清空</el-button>
        </el-form-item>
        <el-form-item v-show="isDisabled">
          <el-button type="primary" @click="Editor">编辑</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        marryOptions:[
          {
            label:'未婚',
            value:0,
          },
          {
            label:'已婚',
            value:1,
          }
        ],
        sexOptions:[
          {
            label:'女',
            value:0,
          },
          {
            label:'男',
            value:1,
          }
        ],
        selectedOptions: [],
        yearValue: '',//年
        monthValue: '',//月
        dateValue: '',//日
        years: [],
        months: [],
        dates: [],
        isDisabled: true,
        value: '',
        sex: 0,
        userInfo: {},
        NoID: '',
        width: '120px',
        input10: '',
        isOff: true,
        saveUser: {
          "sm_ui_ID": '',
          "sm_ui_UserCode": "",
          "sm_ui_Name": "",
          "sm_ui_CertNo": "",
          "sm_ui_MarryStatus": '',
          "sm_ui_Marray": "",
          "sm_ui_HeadImage": "",
          "sm_ui_JobID": '',
          "sm_ui_JobName": "",
          "sm_ui_EducationID": '',
          "sm_ui_EducationName": "",
          "sm_ui_RoleID": '',
          "sm_ui_RoleName": "",
          "sm_ui_Sex": '',
          "sm_ui_SexName": "",
          "sm_ui_Email": "",
          "sm_ui_Birthday": "",
          "sm_ui_Phone": "",
          "sm_ui_Provice": '',
          "sm_ui_ProviceName": "",
          "sm_ui_City": '',
          "sm_ui_CityName": "",
          "sm_ui_County": '',
          "sm_ui_CountyName": "",
          "sm_ui_Address": "",
          "sm_ui_IsDelete": '',
          "sm_ui_ShowStateName": "",
          "sm_ui_CreateTime": "",
          "sm_ui_extensionID": '',
          "sm_ui_ExtensionURL": ""
        },
        JobName: true,
        userInfoObj: {},
      }
    },
    computed: Object.assign({
      newYearValue(){
        return this.yearValue+'年'
      }
    },mapGetters([
      'provinceDataList',
      'cityDataList',
      'jobList',
      'educationList',
    ])),
    created() {
      //查询省份
      this.changeProvince()
      //初始化职业
      let jobOptions = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "parentID": "38"
      };
      this.$store.dispatch('initJob', jobOptions)

      //初始化学历
      let educationOptions = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "ts_jb_ID": "",
        "ts_jb_Name": "",
        "ui_jb_ParentID": "39"
      };
      this.$store.dispatch('initEducation', educationOptions)
        .then(() => {
        }, () => {
        })

      //设置年
      let year = new Date().getFullYear();
      for (var i = 1900; i <= year; i++) {
        this.years.push({
          value: i,
          name: i + '年'
        })
      }
      for (var i = 1; i < 13; i++) {
        this.months.push({
          value: i,
          name: i
        })
      }
      this.years.sort((a, b) => {
        return b.value - a.value;
      });
      let user = JSON.parse(sessionStorage.getItem('user'));
      if (user) {
        this.userInfo = user;
        if (user) {
          this.selectedOptions.push(user.sm_ui_JobID)
          user.sm_ui_Sex = user.sm_ui_Sex + '';
          for (var attr in user) {
            this.saveUser[attr] = user[attr];
          }
        } else {
          for (var attr in user) {
            this.saveUser[attr] = user[attr];
          }
        }

//        this.saveUser.ui_Name =this.userInfo.ui_Name
//        this.saveUser.ui_ID =  this.userInfo.ui_ID
//        this.saveUser.ui_CertNo =this.userInfo.ui_CertNo
      } else {
        this.$router.push({name: 'AdminLogin'})
      }
      ;
      this.initData();
    },
    methods: {
      //选中学历
      changeEducationName(){
        this.userInfoObj.sm_ui_EducationID  = this.userInfoObj.sm_ui_EducationName
      },
      //选择省
      changeProvince(v) {
        let getAreaProvice = {
          "areaPid": 3337
        };
        this.$store.dispatch('initProvinceData', getAreaProvice);
      },
      changeProvinceAll() {
        this.userInfoObj.sm_ui_Provice = this.userInfoObj.sm_ui_ProviceName
        this.changeCity(this.userInfoObj.sm_ui_ProviceName)
      },
      //选择市
      changeCity(id) {
        if (!id&&id!=0) {
          this.$notify({
            message: '请先选择省!!',
            type: 'error'
          });
          return
        }
        let getCity = {
          "areaPid": id ? id : ''
        }
        this.$store.dispatch('initCityData', getCity)
          .then(()=>{},()=>{})
      },
      changeCityAll(v) {
        this.userInfoObj.sm_ui_City = this.userInfoObj.sm_ui_CityName
        this.userInfoObj.sm_ui_CityName = v
      },
      //选中月
      changeMonth() {
        this.dates = [];
        let newDate = new Date(this.yearValue, this.monthValue)
        let month = newDate.getMonth()
        newDate.setMonth(month);
        newDate.setDate(0);
        let date = newDate.getDate()

        for (var i = 1; i <= date; i++) {
          this.dates.push({
            value: i,
            name: i
          })
        }
      },
      //初始化用户信息
      initData() {
        let selectUser = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_ui_ID": this.userInfo.sm_ui_ID,//标识
        }
        this.$store.dispatch('initUserInfo', selectUser)
          .then(obj => {
            this.userInfoObj = obj;
            this.yearValue = obj.sm_ui_Birthday.split('-')[0]+'年'
            this.monthValue = Number(obj.sm_ui_Birthday.split('-')[1])+'月'
            this.dateValue = Number(obj.sm_ui_Birthday.split('-')[2])+'日'
            this.changeCity(obj.sm_ui_Provice)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //清空
      clear() {
        for (var attr in this.saveUser) {
          this.saveUser[attr] = ''
        }
      },
      //补零
      getNum(num) {
        return num < 10 ? '0' + num : '' + num;
      },
      save() {
        let user = JSON.parse(sessionStorage.getItem('user'))
        this.userInfoObj.sm_ui_Birthday = parseInt(this.yearValue) + '-' + this.getNum(parseInt(this.monthValue)) + '-' + this.getNum(parseInt(this.dateValue));
        this.userInfoObj.sm_ui_JobID = this.selectedOptions[this.selectedOptions.length - 1]
        if (this.userInfoObj.sm_ui_CertNo == '') {
          this.$notify({
            message: '请输入身份证号!',
            type: 'error'
          });
          return;
        }
        let saveOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          data: this.userInfoObj
        };
        this.isLoading = true;
        this.$store.dispatch('saveUserInfo', saveOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.isDisabled = true;
            this.JobName = true;
            this.initData()
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
            this.$router.push({name: 'AdminLogin'})
            this.isLoading = false;
          })
      },
      //编辑
      Editor() {

        this.isDisabled = false;
        this.JobName = false;
      },
    },
  }
</script>

<style scoped>
  i {
    color: #f60;
  }

  .personalDataDetailsWrapNavList {
    font: bold 20px/55px "微软雅黑";
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }

  .personalDataDetailsWrapNavList > li {
    float: left;
    margin-bottom: -1px;
  }

  .personalDataDetailsWrapNavList > li > a {
    padding: 0 30px;
    display: block;
    border-right: 1px solid #dddddd;
  }

  .personalDataDetailsWrapNavList > li > .active {
    border-top: 4px solid #22c233;
    margin-top: -4px;
    background-color: #fff;
    color: #22c233;
  }

  .personalDataDetailsWrapContentList {
    font: 16px/3 "微软雅黑";
  }

  .personalDataDetailsWrapContentList > li > strong {
    display: inline-block;
    width: 120px;
    text-align: right;
    color: #666;
  }

  .personalDataDetailsWrapContentList > li > input {
    width: 200px;
    height: 30px;
    padding: 5px;
    border: 1px solid #ccc;
    margin-left: 20px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .name {
    color: #ccc;
  }
</style>
