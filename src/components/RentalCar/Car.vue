<template>
  <div>
    <!--<div class="pickCarCity">-->
      <!--<el-input v-model="pickCarCity" style="width: 200px;" placeholder="请选择取车城市"></el-input>-->
      <!--<div class="cityListWrap">-->
        <!--<ul class="clearfix cityList">-->
          <!--<li-->
            <!--v-for="item,index in cityList"-->
            <!--:class="{active:activeNumber == index}"-->
            <!--@click="changeLetter(item,index)"-->
          <!--&gt;{{item.letter}}</li>-->
        <!--</ul>-->
        <!--<div class="cityListContent">-->
          <!--<ul>-->
            <!--<li v-for="item,index in cityListContent" class="clearfix" v-show="item.cityName[0]">-->
              <!--<strong>{{item.cityLetter}}</strong>-->
              <!--<div class="clearfix">-->
                <!--<span v-for="item,index in item.cityName" @click="changeCity(item)">{{item.CityName}}</span>-->
              <!--</div>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->

    <el-rate
      v-model="value5"
      disabled
      text-color="#ff9900"
      score-template="{value}">
    </el-rate>
  </div>
</template>
<script>
  import {postPromise} from '@/assets/public'
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        pickCarCity: '',
        cityList: [],
        activeNumber: 0,
        cityListContent: [],
        value5: 3,

      }
    },
    created() {
      this.initCityData();
    },
    methods: {
      initCityData() {
        let initCityData = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
        }
        return new Promise((relove, reject) => {
          postPromise('http://webservice.1000da.com.cn/CarRentalWebPage/GetCarRentCity', initCityData)
            .then(data => {
              var data = JSON.parse(data);
              if (Number(data.resultcode) == 200) {
                var data = data.data;
                let arr = [
                  {
                    letter: 'ABCD',
                    city: [
                      {
                        cityLetter: 'A',
                        cityName: data.ABCD.filter(item => {
                          if (item.CityFirst == 'A') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'B',
                        cityName: data.ABCD.filter(item => {
                          if (item.CityFirst == 'B') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'C',
                        cityName: data.ABCD.filter(item => {
                          if (item.CityFirst == 'C') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'D',
                        cityName: data.ABCD.filter(item => {
                          if (item.CityFirst == 'D') {
                            return true
                          }
                          return false
                        })
                      }
                    ]
                  },
                  {
                    letter: 'EFGHI',
                    city: [
                      {
                        cityLetter: 'E',
                        cityName: data.EFGHI.filter(item => {
                          if (item.CityFirst == 'E') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'F',
                        cityName: data.EFGHI.filter(item => {
                          if (item.CityFirst == 'F') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'G',
                        cityName: data.EFGHI.filter(item => {
                          if (item.CityFirst == 'G') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'H',
                        cityName: data.EFGHI.filter(item => {
                          if (item.CityFirst == 'H') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'I',
                        cityName: data.EFGHI.filter(item => {
                          if (item.CityFirst == 'I') {
                            return true
                          }
                          return false
                        })
                      }
                    ]
                  },
                  {
                    letter: 'JKLM',
                    city: [
                      {
                        cityLetter: 'J',
                        cityName: data.JKLM.filter(item => {
                          if (item.CityFirst == 'J') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'K',
                        cityName: data.JKLM.filter(item => {
                          if (item.CityFirst == 'K') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'L',
                        cityName: data.JKLM.filter(item => {
                          if (item.CityFirst == 'L') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'M',
                        cityName: data.JKLM.filter(item => {
                          if (item.CityFirst == 'M') {
                            return true
                          }
                          return false
                        })
                      }
                    ]
                  },
                  {
                    letter: 'NOPQRS',
                    city: [
                      {
                        cityLetter: 'N',
                        cityName: data.NOPQRS.filter(item => {
                          if (item.CityFirst == 'N') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'O',
                        cityName: data.NOPQRS.filter(item => {
                          if (item.CityFirst == 'O') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'P',
                        cityName: data.NOPQRS.filter(item => {
                          if (item.CityFirst == 'P') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'Q',
                        cityName: data.NOPQRS.filter(item => {
                          if (item.CityFirst == 'Q') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'R',
                        cityName: data.NOPQRS.filter(item => {
                          if (item.CityFirst == 'R') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'S',
                        cityName: data.NOPQRS.filter(item => {
                          if (item.CityFirst == 'S') {
                            return true
                          }
                          return false
                        })
                      }
                    ]
                  },
                  {
                    letter: 'TUVWX',
                    city: [
                      {
                        cityLetter: 'T',
                        cityName: data.TUVWX.filter(item => {
                          if (item.CityFirst == 'T') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'U',
                        cityName: data.TUVWX.filter(item => {
                          if (item.CityFirst == 'U') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'V',
                        cityName: data.TUVWX.filter(item => {
                          if (item.CityFirst == 'V') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'W',
                        cityName: data.TUVWX.filter(item => {
                          if (item.CityFirst == 'W') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'X',
                        cityName: data.TUVWX.filter(item => {
                          if (item.CityFirst == 'X') {
                            return true
                          }
                          return false
                        })
                      },
                    ]
                  },
                  {
                    letter: 'YZ',
                    city: [
                      {
                        cityLetter: 'Y',
                        cityName: data.YZ.filter(item => {
                          if (item.CityFirst == 'Y') {
                            return true
                          }
                          return false
                        })
                      },
                      {
                        cityLetter: 'Z',
                        cityName: data.YZ.filter(item => {
                          if (item.CityFirst == 'Z') {
                            return true
                          }
                          return false
                        })
                      }
                    ]
                  },
                ]
                this.cityList = arr;
                this.cityListContent = this.cityList[0].city

              }
            })
        })
      },
      changeLetter(item, index) {
        this.cityListContent = item.city;
        this.activeNumber = index;
      },
      changeCity( item ){
        console.log(item)
        this.pickCarCity = item.CityName
      }
    },
  }
</script>
<style scoped>
  .cityListWrap {
    padding: 10px;
    border: 1px solid #ccc;
    position: absolute;
  }

  .cityList > li {
    float: left;
    padding: 10px;
  }

  .cityList > li:hover {
    cursor: pointer;
  }

  .cityList > li.active {
    border-bottom: 1px solid #f80;
    margin-bottom: -1px;
  }

  .cityListContent {
    width: 362px;
  }

  .cityListContent li {
    margin-top: 10px;
    font: 14px/2 "微软雅黑";
  }

  .cityListContent li strong {
    float: left;

  }

  .cityListContent li div {
    float: left;
    width: 330px;
  }

  span {
    float: left;
    margin: 0 10px;
    white-space: nowrap;
  }
</style>
