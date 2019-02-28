<template>
  <div class="commentWrap">

    <div class="commentBox">
      <strong>*只有一次评价机会，请慎重评论!!</strong>
      <!--评论内容-->
      <div class="commentContent">
        <el-input
          type="textarea"
          :rows="8"
          placeholder="说点什么吧"
          v-model="addOptions.data.ts_ct_Content">
        </el-input>
      </div>
      <!--上传图片-->
      <div class="uploadPicture">
        <strong>上传图片</strong>

        <div class="uploadPictureBox clearfix">
          <img src="../../assets/img/imgIcon.png" v-show="!ImageURL.length" alt="">
          <img
            v-for="item in ImageURL"
            v-lazy="item"
            width="100"
            height="100"
            v-show="ImageURL.length"
          >
          <a href="javascript:;" class="file">
            <input type="file" name="" ref="upload" accept="image/*" multiple>
          </a>
        </div>

      </div>
      <!--评分-->
      <ul class="scoreList clearfix">
        <li v-for="item,index in getScoreTypeList">
          <span>{{item.ts_ct_Name}}:</span>
          <el-rate
            v-model="item.startNum">
          </el-rate>
        </li>
      </ul>
      <!--提交-->
      <div class="submitComment clearfix">
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr, deepClone} from '@/assets/public'

  export default {
    computed: mapGetters([
      'getScoreTypeList'
    ]),
    data() {
      return {
        typeList: [],
        TourGuideService: null,
        Scheduling: null,
        CateringAccommodation: null,
        TravelTraffic: null,
        ImageURL: [],
        user: {},
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "data": {
            "ts_ct_UserInfoID": '',
            "ts_ct_GoodID": '',
            "ts_ct_Content": "",
            "ts_ct_AfterContent": "",
            "ts_ct_Image": "",
            "ts_ct_SysID": ''
          },
          "commentScoreJson": []
        },
        typeId: '',
      }
    },
    created() {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.typeId = this.$route.params.typeId;
      this.addOptions.data.ts_ct_SysID = this.typeId;

      this.addOptions.token = this.user.token;
      //获取评分类型
      if( this.typeId == 2 || this.typeId == 6) {
        this.getScoreType(1)
      }else if(this.typeId == 3){
        this.getScoreType(2)
      }else if(this.typeId == 4){
        this.getScoreType(3)
      }
    },
    methods: {
      toHome() {
        this.$router.push({name: 'AgenciesHome'})
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
        return new Promise((relove, reject) => {
          var fd = new FormData();
          fd.append("fileToUpload", file);
          var xhr = new XMLHttpRequest();
          xhr.open("POST", getNewStr + "/OSSFile/PostToOSS");
          xhr.send(fd);
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              if (xhr.responseText) {
                var data = xhr.responseText
                relove(JSON.parse(data))
              }
            } else {
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
                  .then(data => {
                    if (data) {
                      this.ImageURL.push(data.data);
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
      //提交
      submit() {
        if (this.getScoreTypeList.length) {
          for (var i = 0; i < this.getScoreTypeList.length; i++) {
            this.addOptions.commentScoreJson.push({
              ts_cs_ScoreTypeID: this.getScoreTypeList[i].ts_ct_ID,
              ts_cs_Score: this.getScoreTypeList[i].startNum,
            })
          }
        }
        this.addOptions.data.ts_ct_GoodID = this.$route.params.id;
        this.addOptions.data.ts_ct_UserInfoID = this.user.sm_ui_ID;
        this.addOptions.data.ts_ct_Image = this.ImageURL.join(',');
        this.$store.dispatch('addComment', this.addOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.$router.go(-1)
//            window.location.href = 'http://hly.1000da.com.cn/index.html#/Comment/agenciesDetail/308'
            setTimeout(() => {
              window.location.reload()
            }, 30)
          })
      },
      //获取评分类型
      getScoreType(id) {
        let NewSelect = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": this.user.token ? this.user.token : '',
          "comment": id ? id : ''
        }
        this.$store.dispatch('getScoreType',NewSelect)
      }
    },
    mounted() {
      this.uploaNode()
    }
  }
</script>
<style scoped>
  .el-rate {
    display: inline-block;
    margin-left: 10px;
  }

  .file {
    position: relative;
    display: inline-block;
    background: green;
    /*border: 1px solid #99D3F5;*/
    border-radius: 4px;
    padding: 4px 20px;
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

  .commentHeaderWrap {
    width: 100%;
    background-color: #00cd4c;
  }

  .commentHeader {
    width: 1000px;
    margin: 0 auto;
    padding: 20px 0;
    position: relative;
  }

  .commentHeader strong {
    font: bold 30px/1.3 "宋体";
    color: #fff;
    vertical-align: bottom;
    padding-left: 10px;
  }

  .commentHeader a {
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 100%;
  }

  .commentWrap {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .commentBox {
    padding: 60px 100px 100px;
    width: 800px;
    background-color: #f9f9f9;
    margin: 0 auto;
    box-sizing: content-box;
  }

  .commentBox > strong {
    font: 13px/2 "微软雅黑";
    color: #ccc;
  }

  .scoreList > li {
    float: left;
    width: 50%;
  }

  .scoreList > li > span {
    font: 14px/4 "微软雅黑";
    color: #f80;
  }

  .submitComment > button {
    float: right;
  }

  .uploadPicture {
    border: 1px solid #dcdfe6;
    padding: 10px 0;
    margin-top: 20px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    padding: 10px;
    background-color: #fff;
    padding-bottom: 20px;
  }

  .uploadPicture:hover {
    border-color: rgb(64, 158, 255);
  }

  .uploadPicture > strong {
    display: block;
    font: 14px/2 "微软雅黑";
    color: #000;
  }

  .file {
    width: 100px;
    height: 100px;
    background: transparent url("../../assets/img/addImage.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
    margin-top: 30px;
  }

  .uploadPictureBox {
    padding: 0 14px;
  }

  .uploadPictureBox > img {
    float: left;
    width: 100px;
    height: 100px;
    margin-right: 30px;
    margin-top: 30px;
    vertical-align: top;
  }

  .uploadPictureBox > img:nth-of-type(7n) {
    margin-right: 0;
  }

</style>
