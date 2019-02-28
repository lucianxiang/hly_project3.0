<template>
  <div class="wrap">
    <strong>收货地址</strong>
    <el-form ref="form" :model="addOptions">
      <el-form-item label="地址信息:" required>
        <el-select v-model="addOptions.data.sm_gga_Provice" placeholder="请选择省" size="mini"
                   @change="changeProvinceAll">
          <el-option
            v-for="item in provinceDataList"
            :key="item.sm_af_AreaID"
            :label="item.sm_af_AreaName"
            :value="item.sm_af_AreaID">
          </el-option>
        </el-select>
        <el-select v-model="addOptions.data.sm_gga_City" placeholder="请选择市" size="mini"  @change="changeCityAll">
          <el-option
            v-for="item in cityDataList"
            :key="item.sm_af_AreaID"
            :label="item.sm_af_AreaName"
            :value="item.sm_af_AreaID">
          </el-option>
        </el-select>
        <el-select v-model="addOptions.data.sm_gga_Contry" placeholder="请选择县" size="mini">
          <el-option
            v-for="item in countyDataList"
            :key="item.sm_af_AreaID"
            :label="item.sm_af_AreaName"
            :value="item.sm_af_AreaID">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址:" required>
        <el-input
          style="width: 500px;"
          type="textarea"
          :rows="2"
          placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息"
          v-model="addOptions.data.sm_gga_Adress">
        </el-input>
      </el-form-item>
      <el-form-item label="邮政编码:" required>
        <el-input
          v-model="addOptions.data.sm_gga_PostCode"
          size="small"
          placeholder="如您不清楚邮递区号，请填写000000"
          style="width: 500px;"
        ></el-input>
      </el-form-item>
      <el-form-item label="收货人姓名:" required>
        <el-input
          v-model="addOptions.data.sm_gga_GetterName"
          size="small"
          placeholder="请输入收货人姓名"
          style="width: 500px;"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" required>
        <el-input
          v-model="addOptions.data.sm_gga_Tel"
          size="small"
          placeholder="电话号码、手机号码必须填一项"
          style="width: 500px;"
        ></el-input>
      </el-form-item>
      <el-form-item style="padding-left: 70px;">
        <el-checkbox v-model="addOptions.data.sm_gga_IsDefault">设置为默认收货地址</el-checkbox>
      </el-form-item>
      <el-form-item style="padding-left: 70px;">
        <el-button size="small" type="primary" @click="Preservation">保存</el-button>
      </el-form-item>
    </el-form>
    <el-alert
      style="background-color: #e3f2fd;color: #666;"
      :title="'已保存了'+total+'条地址，还能保存'+newTotal+'条地址'"
      :closable="false"
      type="info">
    </el-alert>
    <div class="tabelBox">
      <el-table
        :data="receivingAddressList"
        v-loading="isLoading"
        stripe
        style="width: 100%">
        <el-table-column
          prop="sm_gga_GetterName"
          align="center"
          label="收货人"
          width="100">
        </el-table-column>
        <el-table-column
          prop="located"
          align="center"
          label="所在地区"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sm_gga_Adress"
          align="center"
          label="详细地址">
        </el-table-column>
        <el-table-column
          prop="sm_gga_PostCode"
          align="center"
          label="邮编">
        </el-table-column>
        <el-table-column
          prop="sm_gga_Tel"
          align="center"
          label="电话/手机">
        </el-table-column>
        <el-table-column label="操作" width="200px" align="center">
          <template slot-scope="scope">
            <el-button size="small" @click="Update(scope.row)">修改</el-button>
            <el-button size="small" type="danger" @click="Delete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="是否默认" width="200px" align="center">
          <template slot-scope="scope">
            <el-button size="small" disabled  type="danger" v-show="scope.row.sm_gga_IsDefault==1">默认地址</el-button>
            <el-button size="small"   v-show="scope.row.sm_gga_IsDefault!=1" @click="setDefault(scope.row)">设为默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="修改收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="updateOptions">
        <el-form-item label="收货人姓名" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.data.sm_gga_GetterName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地区" :label-width="formLabelWidth">
          <el-select v-model="updateOptions.data.sm_gga_ProviceName" placeholder="请选择省" size="mini"
                     @change="changeProvinceAll">
            <el-option
              v-for="item in provinceDataList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>
          <el-select v-model="updateOptions.data.sm_gga_CityName" placeholder="请选择市" size="mini"  @change="changeCityAll">
            <el-option
              v-for="item in cityDataList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>
          <el-select v-model="updateOptions.data.sm_gga_ContryName" placeholder="请选择县" size="mini">
            <el-option
              v-for="item in countyDataList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮编" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.data.sm_gga_PostCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.data.sm_gga_Tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.data.sm_gga_Adress" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {isPhone} from '@/assets/public'

  export default {
    name: '',
    data() {
      return {
        dialogFormVisible:false,
        formLabelWidth:'120px',
        props:{
          value: 'label',
          children: 'cities'
        },
        updateOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data":{}
        },
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "sm_gga_UserID": "",//用户编号
            "sm_gga_GetterName": "",//收货人姓名
            "sm_gga_PostCode": "",//邮编
            "sm_gga_Provice": "",//省
            "sm_gga_City": "",//市
            "sm_gga_Contry": "",//县
            "sm_gga_Tel": "",//联系电话
            "sm_gga_Adress": "",//详细地址
            sm_gga_IsDefault:false
          }
        },
        total:0,
        isLoading:false,
      }
    },
    computed: Object.assign({
      newTotal(){
        return 20-Number(this.total)
      }
    },mapGetters([
      'receivingAddressList',
      'provinceDataList',
      'cityDataList',
      'countyDataList'
    ])),
    created() {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      if(this.user){
        this.initData(this.user)
        this.changeProvince()
      }
    },
    methods: {
      //设置默认
      setDefault(obj){
        obj.sm_gga_IsDefault = 1;
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": obj
        }
        this.$store.dispatch('UpdateressPreservation',options)
        .then(()=>{
          this.$notify({
            message:'设置成功' ,
            type: 'success'
          });
          this.initData(this.user)
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
          this.isLoading = false;
        })
        console.log(options)
      },
      //删除
      Delete(obj){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "sm_gga_ID": obj.sm_gga_ID,//用户地址编号
          }
        }
        this.$store.dispatch('DeleteeressPreservation',options)
        .then((suc)=>{
          this.$notify({
            message:suc ,
            type: 'success'
          });
          this.initData(this.user)
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
          this.isLoading = false;
        })
      },
      //修改提交
      submit(){
        if(!isNaN(this.updateOptions.data.sm_gga_ProviceName)){
          this.updateOptions.data.sm_gga_Provice = this.updateOptions.data.sm_gga_ProviceName
        }
        if(!isNaN(this.updateOptions.data.sm_gga_CityName)){
          this.updateOptions.data.sm_gga_City = this.updateOptions.data.sm_gga_CityName
        }
        if(!isNaN(this.updateOptions.data.sm_gga_ContryName)){
          this.updateOptions.data.sm_gga_Contry = this.updateOptions.data.sm_gga_ContryName
        }
        this.$store.dispatch('UpdateressPreservation',this.updateOptions)
        .then(()=>{
          this.initData(this.user)
          this.dialogFormVisible = false;
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
          this.isLoading = false;
        })
      },
      //修改
      Update(obj){
        this.updateOptions.data = obj;
        this.dialogFormVisible = true;
      },
      //添加保存
      Preservation(){
        if(this.addOptions.data.sm_gga_IsDefault){
          this.addOptions.data.sm_gga_IsDefault = 1
        }else{
          this.addOptions.data.sm_gga_IsDefault = 0
        }
        this.addOptions.data.sm_gga_UserID = this.user.sm_ui_ID;
        if(!isPhone(this.addOptions.data.sm_gga_Tel)){
          this.$notify({
            message: '手机号码输入不正确!',
            type: 'error'
          });
          return
        }
        this.$store.dispatch('AddressPreservation',this.addOptions)
        .then(()=>{
          for(let attr in this.addOptions.data){
            this.addOptions.data[attr] = ''
          }
          this.$notify({
            message:'添加成功' ,
            type: 'success'
          });
          this.initData(this.user)
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
          this.isLoading = false;
        })
      },
      //初始化省
      changeProvince(v) {
        let getAreaProvice = {
          "areaPid": 3337
        };
        this.$store.dispatch('initProvinceData', getAreaProvice);
      },
      //选中省
      changeProvinceAll(id){
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
      //选中市获取县
      changeCityAll(id){
        if (!id&&id!=0) {
          this.$notify({
            message: '请先选择市!!',
            type: 'error'
          });
          return
        }
        let getCity = {
          "areaPid": id ? id : ''
        }
        this.$store.dispatch('initCountyData', getCity)
        .then(()=>{},()=>{})
      },
      initData(user){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "page": "1",
          "rows": "10",
          "sm_gga_UserID": user.sm_ui_ID,//用户编号
        };
        this.isLoading = true;
        this.$store.dispatch('initReceivingAddress',options)
        .then(total=>{
          this.total = total;
          this.isLoading = false;
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
          this.isLoading = false;
        })
      },
      handleChange() {
      },
    },
  }
</script>
<style scoped>
  .wrap {
    background: #fff;
    padding: 20px 30px;
  }

  .wrap > strong {
    font: bold 16px/2 "微软雅黑";
    color: #333;
    display: block;
    margin-bottom: 10px;
  }

  .tabelBox {
    margin-top: 20px;
    box-shadow: 0 0 100px 10px #f0f0f0;
  }
</style>
