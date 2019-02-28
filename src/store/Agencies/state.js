/**
 * Created by leibo on 18/2/10.
 */
export default {
  user: {
    isLoginShow: false,
    name: ''
  },
  text: '拼命加载中',
  showFixedComment: true,//右边导航
  //-------------首页------------
  isLoading: false,//loading
  domesticDataList: [],//国内跟团游数据
  domesticGoodList: [],//国内跟团游数据
  aroundList: [],//周边游
  shortLineList: [],//境外短线
  shortLineGoodList: [],//境外短线
  longLineList: [],//境外长线
  longLineGoodList: [],//境外长线
  getTourSiteListImage: '',//展示图片
  reasonList: [],//推荐理由
  introList: [],//产品介绍


  productDetailsObj: {},
  lineScheduleObj: {},
  IncludeList: [],
  noWrapMoneyList: [],
  lineMenuList: [],
  packMoneyObj: {},//余额
  outCityName: '',

  timesPriceList: [],//产品价格
  priceObj: {},
  newPriceDetail: {},//当前日期详情
  navList: [],//导航套子导航
  // pictureList:[],//获取图片

  showQuit: false,//退出
  orderDetail: {},//订单详情
  getAreaInfoList: [],//区域
  agenciesSearchCityList: [],//出发城市
  agenciesSearchTourSiteList: [],//推荐景点
  agenciesSearchGroupCityList: [],//成团地点
  heelTourSearchMoreList: [],  //初始化跟团游列表数据
//----------商户注册-----------
  provinceDataList: [],//获取省
  cityDataList: [],//获取市
  countyDataList: [],//获取县
  changeMineyTypeList: [],//获取币种
  changeValueName: '',//筛选币种名称
  changeNameID: '',
  changeCompanyTypeList: [],//公司规模数据
  changeCompanyTypeValue: '',
  changeCompanyID: '',
  changeCooperationTypeList: [],//合作类型
  changeScopeOfOperationList: [],//经营范围
  payStr: '',
  myTourOrderList: [],//用户订单
  collectionList: [],//用户收藏
  commentMXObj: {},//评论信息
  commentData: [],//旅行社用户评论
  newCommentData: [],
  jobList: [],//个人中心职业
  educationList: [],//个人中心学历
  useScoreDetailInfo: [],//用户积分
  userAllScoreList: [],//用户总积分
  topPageList: [],//轮播图
  hotAgenciesCityList: [],//热门城市
  outLongAreaList: [],//出境长线
  outShortAreaList: [],//出境短线
  contryAreaList: [],//国内跟团
  nearAreaList: [],//周边跟团
  nearAreaGoodList: [],//周边跟团
  touristInfoList: [],//常用游客信息
  outCityObj: {},//出发城市
  travelCommendList: [],//初始化旅行社评论
  searchTravelObj: {},
  receivingAddressList:[],//收货地址
};
