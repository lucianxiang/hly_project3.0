<template>
  <div>
    <el-tabs type="border-card">
      <!--<el-tab-pane label="我的积分" name="first">-->
      <h1 class="userClass">游客信息查询</h1>
      <span class="addTourInfo" @click="add"><el-button type="primary" size="small">添加</el-button></span>
      <el-table
        :data="touristInfoList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          prop="ui_uc_ID"
          label="编号"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="ui_uc_Name"
          label="常用联系人名称"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="ui_uc_Phone"
          align="center"
          label="电话号码"
        >
        </el-table-column>
        <el-table-column
          prop="ui_uc_CertNo"
          align="center"
          label="身份证号"
        >
        </el-table-column>
        <el-table-column
          prop="ui_uc_Remark"
          align="center"
          label="备注"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="sm_usd_Score"
          label="操作">

          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="update(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.ui_uc_ID)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="block" style="float: right;">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="5"
          layout="total, prev, pager, next"
          :total="total"
          v-show="total"
        >
        </el-pagination>
      </div>
      <!--添加-->
      <el-dialog title="添加常用信息" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="游客姓名:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.ui_uc_Name" placeholder="常用游客姓名"></el-input>
          </el-form-item>
          <el-form-item label="游客电话:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.ui_uc_Phone" maxlength="11" placeholder="常用游客电话"></el-input>
          </el-form-item>
          <el-form-item label="身份证号:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.ui_uc_CertNo" placeholder="身份证号"></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.ui_uc_Remark" placeholder="备注"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改-->
      <el-dialog title="修改常用信息" :visible.sync="updateDialog">
        <el-form :model="updateObj">
          <el-form-item label="游客姓名:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.ui_uc_Name" placeholder="常用游客姓名"></el-input>
          </el-form-item>
          <el-form-item label="游客电话:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.ui_uc_Phone" maxlength="11" placeholder="常用游客电话"></el-input>
          </el-form-item>
          <el-form-item label="身份证号:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.ui_uc_CertNo" placeholder="身份证号"></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.ui_uc_Remark" placeholder="备注"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateSubmit">确 定</el-button>
        </div>
      </el-dialog>

    </el-tabs>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {isPhone,isCardNo} from '@/assets/public'

  export default {
    data() {
      return {
        num: '',
        formLabelWidth: '120px',
        addDialog: false,
        isLoading: false,
        updateDialog: false,
        total: 0,
        userInfo: '',
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ui_uc_UserInfoID": "",//
            "ui_uc_Name": "",//常用联系人名称
            "ui_uc_Phone": "",//电话号码
            "ui_uc_CertNo": "",//身份证号
            "ui_uc_Remark": "",//备注
          },
        },
        updateOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ui_uc_UserInfoID": "",
            "ui_uc_Name": "",//常用联系人名称
            "ui_uc_Phone": "",//电话号码
            "ui_uc_CertNo": "",//身份证号
            "ui_uc_CreateTime": "",//
            "ui_uc_Remark": "",//备注
          }
        },
        updateObj: {},
      }
    },
    computed: mapGetters([
      'touristInfoList',
      'updateTouristObj',

    ]),
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('user'));//sessionStorage.getItem获取用户的申请时的字符串
      this.initData("")

    },
    methods: {

      //分页
      handleCurrentChange(num) {
        this.initData('', num)
      },
      //初始化
      initData(name, page) {
        let options = {
          "ui_uc_ID": "",//常用联系人ID（选传）
          "ui_uc_UserInfoID":this.userInfo.sm_ui_ID,//当前登录账号ID（必传项）
          "ui_uc_Name": "",//常用联系人名称（选传）
          "ui_uc_Phone": "",//电话号码（选传）
          "ui_uc_CertNo": "",//身份证号（选传）
          "ui_uc_Provice": "",//所属省份（选传）
          "ui_uc_IsUrgent": "",//（选传）
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "page": page ? page : 1,
          "rows": "5",
        };
        this.isLoading = true;
        this.$store.dispatch('initTouristInfo', options)
          .then((data) => {
            this.total = data;
            this.isLoading = false;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //添加
      add() {
        this.addDialog = true;
        this.addOptions.data.ui_uc_UserInfoID = this.userInfo.sm_ui_ID;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交信息
      addSubmit() {
        this.addOptions.token =this.userInfo.token;
        if(
          !this.addOptions.data.ui_uc_CertNo ||
          !this.addOptions.data.ui_uc_Name||
          !this.addOptions.data.ui_uc_Phone
        ){
          this.$notify({
            message: '请完善信息',
            type: 'error'
          });
          return
        };
        if(!isPhone(this.addOptions.data.ui_uc_Phone)){
          this.$notify({
            message: '请正确的手机号',
            type: 'error'
          });
          return
        }
        if(!isCardNo(this.addOptions.data.ui_uc_CertNo)){
          this.$notify({
            message: '请正确的身份证号',
            type: 'error'
          });
          return
        }
        this.isLoading = true;
        this.$store.dispatch('AddTouristInfo', this.addOptions)
          .then((suc) => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData("")
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addDialog = false;
      },
      //修改
      update(obj) {
        let newObj = {}
        for (var attr in obj) {
          newObj[attr] = obj[attr]
        }
        this.updateObj = newObj;
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //修改提交
      updateSubmit() {
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          token:this.userInfo.token,
          "data": {
            "ui_uc_UserInfoID": this.userInfo.sm_ui_ID,
            "ui_uc_ID": this.updateObj.ui_uc_ID,
            "ui_uc_Name": this.updateObj.ui_uc_Name,//常用联系人名称
            "ui_uc_Phone": this.updateObj.ui_uc_Phone,//电话号码
            "ui_uc_CertNo": this.updateObj.ui_uc_CertNo,//身份证号
            "ui_uc_Remark": this.updateObj.ui_uc_Remark,//备注
          }
        };
        if(
          !updateOptions.data.ui_uc_CertNo ||
          !updateOptions.data.ui_uc_Name||
          !updateOptions.data.ui_uc_Phone
        ){
          this.$notify({
            message: '请完善信息',
            type: 'error'
          });
          return
        };
        if(!isPhone(updateOptions.data.ui_uc_Phone)){
          this.$notify({
            message: '请正确的手机号',
            type: 'error'
          });
          return
        }
        if(!isCardNo(updateOptions.data.ui_uc_CertNo)){
          this.$notify({
            message: '请正确的身份证号',
            type: 'error'
          });
          return
        }
        this.$store.dispatch('UpdateTouristInfo', updateOptions)
          .then((suc) => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData("")
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.updateDialog = false
      },
      //删除
      Delete(id) {
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          token:this.userInfo.token,
          "data": {
            "ui_uc_ID": id,//常用联系人ID
          }
        };
        this.$store.dispatch('DeleteTouristInfo', deleteOptions)
          .then((suc) => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData("")
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
      }

    },
  }
</script>
<style scoped>
  .userClass {
    padding: 20px 0 0 20px;
    font-size: 18px;
  }

  .formSearch {
    padding: 20px 0 0 20px;
  }

  .addTourInfo {
    margin-left: 850px;
  }
</style>
