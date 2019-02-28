<template>
  <div>
    <div id="wrap">
      <div class="orderInfo">
        <div>
          <strong>订单编号：</strong>
          <span>{{orderInfoItem.orderID}}</span>
        </div>
        <div>
          <strong>实付金额：</strong>
          <span>￥ {{orderInfoItem.price}}</span>
        </div>
      </div>
      <div class="invoiceInfo">
        <strong>确认发票信息</strong>
        <div class="invoiceType clearfix">
          <strong>发票类型</strong>
          <div>
            <!--<span :class="{active: radio == 1}">-->
              <!--<el-radio v-model="radio" label="1">纸质增值税普通发票</el-radio>-->
            <!--</span>-->
            <span :class="{active: application ==1}">
              <el-radio v-model="application" label="1">电子增值税普通发票</el-radio>
            </span>
          </div>
        </div>
        <div class="invoiceTitle clearfix">
          <strong>填写发票抬头</strong>
          <div>
            <input type="text" v-model="options.data.sm_bi_BillHead">
            <span>发票项目: 商家默认将以订单明细开具发票，如需要开具其他项目，请确认提交后与商家沟通协调。</span>
          </div>
        </div>
        <div class="invoiceTitleType clearfix">
          <strong>发票抬头类型</strong>
          <div>
            <el-radio v-model="options.data.sm_bi_BillType" label="1">企业</el-radio>
            <el-radio v-model="options.data.sm_bi_BillType" label="0">个人</el-radio>
          </div>
        </div>
        <!--选择企业-->
        <div class="enterpriseWrap">
          <!--企业税号-->
          <div class="enterpriseNum clearfix" v-show="options.data.sm_bi_BillType==1">
            <strong>企业税号: </strong>
            <input type="text" placeholder="必填,请填入企业纳税人识别号" v-model="options.data.sm_bi_EnNo">
          </div>
          <!--重要提示-->
          <p>
            重要提示：根据最新增值税管理办法要求，7月1日起如需为企业（包括公司、非公司制企业法人、企业分支机构、个人独资企业、合伙企业和其企业）开具增值税发票，需提供纳税人识别号统一社会信用代码，否则该发票无法作为纳税凭证。请准确选择发票抬头类型，若企业发票请填写有效税号信息。</p>
          <!--&lt;!&ndash;确认收货地址&ndash;&gt;-->
          <!--<div class="confirmAddress">-->
            <!--<strong>确认收货地址</strong>-->
            <!--<ul>-->
              <!--<li v-for="item,index in 10">-->
                <!--<span>寄送至</span>-->
                <!--<el-radio v-model="radio" label="1">四川省泸州市江阳区北城街道现代150大厦1013雷波雷先生收</el-radio>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</div>-->
          <!--&lt;!&ndash;备注&ndash;&gt;-->
          <!--<div class="remarks clearfix">-->
            <!--<strong>备注:</strong>-->
            <!--<textarea placeholder="请输入备注"></textarea>-->
          <!--</div>-->
        </div>
        <!--提交申请-->
        <div class="applySubmit clearfix">
          <a href="javascript:;" @click="submit">提交申请</a>
          <span>您已经可以提交申请了，请确认您的信息</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        radio: 1,
        application:'1',
        orderInfoItem:{},
        user:{},
        options:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "sm_bi_UserID": "",//用户编号
            "sm_bi_AddressID": "0",//收货地址编号
            "sm_bi_BillType": "0",//发票类型  0个人1企业
            "sm_bi_BillHead": "",//发票抬头
            "sm_bi_EnNo": "",//企业税号【个人不传】
            "sm_bi_OrderNo": "",//订单编码
          }
        }
      }
    },
    created(){
      this.orderInfoItem = JSON.parse(sessionStorage.getItem('orderInfoItem'))
      this.user = JSON.parse(sessionStorage.getItem('user'))
    },
    methods: {
      initData() {
      },
      search() {
        this.initData()
      },
      //提交申请
      submit(){
        if(!this.options.data.sm_bi_BillHead){
          this.$notify({
            message: '请填写发票抬头!',
            type: 'error'
          });
          return
        }
        if(!this.options.data.sm_bi_EnNo&&this.options.data.sm_bi_BillType==1){
          this.$notify({
            message: '请填写企业税号!',
            type: 'error'
          });
          return
        }
        this.options.data.sm_bi_OrderNo = this.orderInfoItem.orderID
        this.options.data.sm_bi_UserID = this.user.sm_ui_ID

        this.$store.dispatch('PrintTheInvoiceSubmit',this.options)
        .then(()=>{
          this.$notify({
            message: '申请成功!',
            type: 'success'
          });
          setTimeout(()=>{
            this.$router.push({name:'MyTourOrder'})
          },500)
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
        })

        console.log(this.options)
      }
    },
  }
</script>
<style scoped>
  strong {
    font-weight: normal;
  }

  #wrap {
    width: 100%;
    background-color: #fff;
    padding: 30px;
    border: 1px solid #000;
  }

  .orderInfo {
    font: 14px/1.5 "微软雅黑";
  }

  .orderInfo strong {
    color: #666;
  }

  .orderInfo span {
    color: #333;
  }

  .orderInfo {
    margin-bottom: 20px;
  }

  .invoiceInfo > strong {
    font: bold 16px/2 "微软雅黑";
    color: #444;
  }

  .invoiceType {
    font: 14px/3 "微软雅黑";
    color: #666;
    border-bottom: 1px solid #ccc;
  }

  .invoiceType > strong {
    float: left;
    margin-right: 50px;
  }

  .invoiceType > div {
    float: left;
  }

  .invoiceType > div > span {
    float: left;
    margin-right: 30px;
    position: relative;
  }

  .invoiceType > div > span.active:before {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 3px;
    width: 10px;
    height: 10px;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    background-color: #fff;
    transform: rotate(45deg);
  }

  .invoiceTitle {
    margin-top: 20px;
    font: 14px/3 "微软雅黑";
    color: #666;
  }

  .invoiceTitle > strong {
    float: left;
    margin-right: 30px;
  }

  .invoiceTitle > div {
    float: left;
  }

  .invoiceTitle input {
    font: 14px/2 "微软雅黑";
    display: block;
    margin-top: 5px;
    padding: 0 5px;
    width: 400px;
    color: #666;
  }

  .invoiceTitle span {
    display: block;
    line-height: 2;
    color: #ccc;
  }

  .invoiceTitleType,
  .enterpriseNum {
    font: 14px/3 "微软雅黑";
    color: #666;
  }

  .invoiceTitleType > strong,
  .enterpriseNum > strong {
    float: left;
    margin-right: 30px;
  }

  .invoiceTitleType > div {
    float: left;
  }

  .enterpriseNum > input {
    font: 14px/2 "微软雅黑";
    width: 400px;
    padding: 0 5px;
    float: left;
    margin-top: 5px;
    color: #666;
  }

  .enterpriseWrap > p {
    font: 12px/1.5 "微软雅黑";
    margin: 10px 0;
    padding: 10px 15px;
    background-color: rgb(255,249,200);
    color: rgb(255,183,42);
  }

  .confirmAddress > strong {
    font: bold 16px/2 "微软雅黑";
    color: #444;
  }

  .confirmAddress li {
    position: relative;
    padding-left: 100px;
  }

  .confirmAddress li.active {
    border: 1px solid #f00;
  }

  .confirmAddress li > span {
    position: absolute;
    color: #f00;
    left: 10px;
    top: 0;
  }

  .remarks {
    margin: 20px 0;
  }

  .remarks > strong {
    float: left;
    margin-right: 30px;
    font: 14px/2 "微软雅黑";
    color: #666;
  }
  .remarks > textarea {
    float: left;
    padding: 10px;
    font: 14px/1.5 "微软雅黑";
    color: #333;
    resize:none;
    width: 500px;
    height:200px;
  }

  .applySubmit {
    background-color: #e5e5e5;
    padding: 20px 10px;
  }

  .applySubmit > a {
    float: right;
    font: 16px/2 "微软雅黑";
    padding: 0 10px;
    background-color: #ff3800;
    color: #fff;
  }

  .applySubmit > span  {
    float: right;
    margin-right: 20px;
    font: 12px/32px "微软雅黑";
  }


</style>
