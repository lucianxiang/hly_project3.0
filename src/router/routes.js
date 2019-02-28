// import Comment from '@/components/public/Comment'//公用页面
// import AgenciesDetail from '@/components/Agencies/AgenciesDetail'//跟团游详情页
// import AdminLogin from '@/components/AdminLogin'//登录
// import Register from '@/components/Register'//游客注册
// import AgenciesHome from '@/components/Agencies/AgenciesHome'//跟团游首页
// import HeelTourSearchMore from '@/components/Agencies/HeelTourSearchMore' //跟团游查询更多
// import MerchantRegister from '@/components/VendorRegistration/MerchantRegister'//供应商注册
// import Agents from '@/components/VendorRegistration/Agents'//代理商注册
//
// import FillInOrder from '@/components/Agencies/FillInOrder'//填写订单
// import PersonalCenter from '@/components/PersonakCenterFolder/PersonalCenter'//个人中心
// import MyTourOrder from '@/components/PersonakCenterFolder/MyTourOrder'//我的订单
// import PersonalDataDetails from '@/components/PersonakCenterFolder/PersonalDataDetails'//个人信息
// import UpdatePassword from '@/components/PersonakCenterFolder/UpdatePassword'//修改密码
// import PaymentPlatform from '@/components/public/PaymentPlatform'//订单支付的类型
// import MyOrderQRCode from '@/components/MyOrderQRCode'//二维码付款
// import MyOrderDetails from '@/components/PersonakCenterFolder/MyOrderDetails'//订单详情
// import TicketOrderDetails from '@/components/PersonakCenterFolder/TicketOrderDetails'//门票订单详情
// import HotelOrderDetails from '@/components/PersonakCenterFolder/HotelOrderDetails'//酒店订单详情
// import MyCollection from '@/components/PersonakCenterFolder/MyCollection' //我的收藏
// import CommentOnAComment from '@/components/Agencies/CommentOnAComment' //发表评论
//
// import MyPoints from '@/components/PersonakCenterFolder/MyPoints'//我的积分
// //微信支付
//
//
// import AdmissionTicketHomePage from '@/components/Tickets/AdmissionTicketHomePage'//门票首页
// import TicketsDetail from '@/components/Tickets/TicketsDetail'//门票详情
// import TicketsReserve from '@/components/Tickets/TicketsReserve'//门票预定
// import AdmissionTicketMore from '@/components/Tickets/AdmissionTicketMore' //更多门票
//
//
// import HotelHomePage from '@/components/Hotel/HotelHomePage'//酒店首页
// import HotelSearchMore from '@/components/Hotel/HotelSearchMore'//酒店查询更多
// import HotelDetalis from '@/components/Hotel/HotelDetalis'//酒店详情页
// import HotelOrder from '@/components/Hotel/HotelOrder' //酒店订单页
// import HotelParentChildTour from '@/components/Hotel/HotelParentChildTour'//酒店亲子游
// import HotelLovers from '@/components/Hotel/HotelLovers' //情侣酒店
// import HotelMountaineering from '@/components/Hotel/HotelMountaineering'//依山酒店
// import HotelAncientTown from '@/components/Hotel/HotelAncientTown' //古镇酒店
// import HotelInn from '@/components/Hotel/HotelInn'//客栈酒店
// // import HotelQingLv from '@/components/Hotel/HotelQingLv'//青旅酒店
//
// //美食
// import FoodHomePage from '@/components/Food/FoodHomePage'   //美食首页
// import FoodDetail from '@/components/Food/FoodDetail'   //美食详情
// import FoodOrder from '@/components/Food/FoodOrder'   //美食下订单
// import FoodOrderDetails from '@/components/PersonakCenterFolder/FoodOrderDetails'   //订单详情
//
// /*租车首页*/
// import RentalCar from '@/components/RentalCar/RentalCar' //  租车首页
// import RentalCarDiscount from '@/components/RentalCar/RentalCarDiscount'


export default [
  {
    path: '/car',
    name: 'Car',
    component: (reslove) => require(['@/components/RentalCar/Car'], reslove)
  },
  //青旅酒店
  {
    path: '/hotelQingLv/:id',
    name: 'HotelQingLv',
    component: (resolve) => require(['@/components/Hotel/HotelQingLv'], resolve)
  },
  //古镇酒店
  {
    path: '/hotelAncientTown/:id',
    name: 'HotelAncientTown',
    component: (resolve) => require(['@/components/Hotel/HotelAncientTown'], resolve)
  },
  //客栈酒店
  {
    path: '/hotelInn/:id',
    name: 'HotelInn',
    component: (resolve) => require(['@/components/Hotel/HotelInn'], resolve)
  },
  //酒店订单页
  {
    path: '/hotelOrder',
    name: 'HotelOrder',
    component: (resolve) => require(['@/components/Hotel/HotelOrder'], resolve)
  },
  //依山酒店
  {
    path: '/hotelMountaineering/:id',
    name: 'HotelMountaineering',
    component: (resolve) => require(['@/components/Hotel/HotelMountaineering'], resolve)
  },
  //情侣酒店
  {
    path: '/hotelLovers/:id',
    name: 'HotelLovers',
    component: (resolve) => require(['@/components/Hotel/HotelLovers'], resolve)
  },
  //酒店亲子游
  {
    path: '/hotelParentChildTour/:id',
    name: 'HotelParentChildTour',
    component: (resolve) => require(['@/components/Hotel/HotelParentChildTour'], resolve)
  },
  //发表评论
  {
    path: '/commentOnAComment/:id/:typeId',
    name: 'CommentOnAComment',
    component: (resolve) => require(['@/components/Agencies/CommentOnAComment'], resolve)
  },
  //订单支付的类型
  {
    path: '/paymentPlatform',
    name: 'PaymentPlatform',
    component: (resolve) => require(['@/components/public/PaymentPlatform'], resolve)
  },
  //门票预定
  {
    path: '/ticketsReserve/:id',
    name: 'TicketsReserve',
    component: (resolve) => require(['@/components/Tickets/TicketsReserve'], resolve)
  },
  //二维码支付订单
  {
    path: '/myOrderQRCode',
    name: 'MyOrderQRCode',
    component: (resolve) => require(['@/components/MyOrderQRCode'], resolve)
  },
  //旅行社订单详情
  {
    path: '/myOrderDetails',
    name: 'MyOrderDetails',
    component: (resolve) => require(['@/components/PersonakCenterFolder/MyOrderDetails'], resolve)
  },
  //门票订单详情
  {
    path: '/ticketOrderDetails',
    name: 'TicketOrderDetails',
    component: (resolve) => require(['@/components/PersonakCenterFolder/TicketOrderDetails'], resolve)
  },
  //酒店订单详情
  {
    path: '/hotelOrderDetails',
    name: 'HotelOrderDetails',
    component: (resolve) => require(['@/components/PersonakCenterFolder/HotelOrderDetails'], resolve)
  },
  //美食订单详情
  {
    path: '/foodOrderDetails',
    name: 'FoodOrderDetails',
    component: (resolve) => require(['@/components/PersonakCenterFolder/FoodOrderDetails'], resolve)
  },
  //租车订单详情
  {
    path: '/carOrderDetails',
    name: 'CarOrderDetails',
    component: (resolve) => require(['@/components/PersonakCenterFolder/CarOrderDetails'], resolve)
  },
  //供应商注册
  {
    path: '/merchantRegister',
    name: 'MerchantRegister',
    component: (resolve) => require(['@/components/VendorRegistration/MerchantRegister'], resolve)
  },
  //代理商注册
  {
    path: '/agents',
    name: 'Agents',
    component: (resolve) => require(['@/components/VendorRegistration/Agents'], resolve)
  },
  //个人中心
  {
    path: '/personalCenter',
    name: 'PersonalCenter',
    component: (resolve) => require(['@/components/PersonakCenterFolder/PersonalCenter'], resolve),
    children: [
      //打印发票
      {
        path: 'printTheInvoice',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          MyInformtion: (resolve) => require(['@/components/PersonakCenterFolder/PrintTheInvoice'], resolve),
        },
        name: 'PrintTheInvoice'
      },
      //我的订单
      {
        path: 'myTourOrder',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          MyInformtion: (resolve) => require(['@/components/PersonakCenterFolder/MyTourOrder'], resolve),
        },
        name: 'MyTourOrder'
      },
      //我的积分
      {
        path: 'myPoints',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          MyInformtion: (resolve) => require(['@/components/PersonakCenterFolder/MyPoints'], resolve),
        },
        name: 'MyPoints'
      },
      {
        path: 'myBalance',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          MyInformtion: (resolve) => require(['@/components/PersonakCenterFolder/MyBalance'], resolve),
        },
        name: 'MyBalance'
      },
      //常用游客信息
      {
        path: 'touristInfo',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          MyInformtion: (resolve) => require(['@/components/PersonakCenterFolder/TouristInfo'], resolve),
        },
        name: 'TouristInfo'
      },
      //个人信息
      {
        path: 'personalDataDetails',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          MyInformtion: (resolve) => require(['@/components/PersonakCenterFolder/PersonalDataDetails'], resolve),
        },
        name: 'PersonalDataDetails'
      },
      //修改密码
      {
        path: 'updatePassword',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          MyInformtion: (resolve) => require(['@/components/PersonakCenterFolder/UpdatePassword'], resolve)
        },
        name: 'UpdatePassword'
      },
      //收货地址
      {
        path: 'receivingAddress',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          MyInformtion: (resolve) => require(['@/components/PersonakCenterFolder/ReceivingAddress'], resolve)
        },
        name: 'ReceivingAddress'
      },
      //我的推荐二维码
      {
        path: 'myTwoCode',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          MyInformtion: (resolve) => require(['@/components/PersonakCenterFolder/MyTwoCode'], resolve)
        },
        name: 'MyTwoCode'
      },
      //我的收藏
      {
        path: 'myCollection',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          MyInformtion: (resolve) => require(['@/components/PersonakCenterFolder/MyCollection'], resolve)
        },
        name: 'MyCollection'
      }
    ]
  },
  //填写订单
  {
    path: '/fillInOrder',
    name: 'FillInOrder',
    component: (resolve) => require(['@/components/Agencies/FillInOrder'], resolve)
  },
  //游客注册
  {
    path: '/Register',
    name: 'Register',
    component: (resolve) => require(['@/components/Register'], resolve)
  },
  //游客注册
  {
    path: '/ForgetThePassword',
    name: 'ForgetThePassword',
    component: (resolve) => require(['@/components/ForgetThePassword'], resolve)
  },
  //公用页面
  {
    path: '/Comment',
    name: 'Comment',
    component: (resolve) => require(['@/components/public/Comment'], resolve),
    children: [
      //跟团游查询更多
      {
        path: 'heelTourSearchMore',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          User: (resolve) => require(['@/components/Agencies/HeelTourSearchMore'], resolve),
        },
        name: 'HeelTourSearchMore'
      },
      //跟团游首页
      {
        path: 'agenciesHome',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          User: (resolve) => require(['@/components/Agencies/AgenciesHome'], resolve),
        },
        name: 'AgenciesHome'
      },
      //跟团游详情页
      {
        path: 'agenciesDetail/:id',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          User: (resolve) => require(['@/components/Agencies/AgenciesDetail'], resolve),
        },
        name: 'AgenciesDetail'
      },
      //门票详情页
      {
        path: 'ticketsDetail/:id',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          User: (resolve) => require(['@/components/Tickets/TicketsDetail'], resolve),
        },
        name: 'TicketsDetail'
      },
      //门票首页
      {
        path: 'admissionTicketHomePage',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          User: (resolve) => require(['@/components/Tickets/AdmissionTicketHomePage'], resolve),
        },
        name: 'AdmissionTicketHomePage'
      },
      //酒店首页
      {
        path: 'hotelHomePage',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          User: (resolve) => require(['@/components/Hotel/HotelHomePage'], resolve),
        },
        name: 'HotelHomePage'
      },
      //酒店搜索更多
      {
        path: 'hotelSearchMore',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          User: (resolve) => require(['@/components/Hotel/HotelSearchMore'], resolve),
        },
        name: 'HotelSearchMore'
      },
      //酒店详情页
      {
        path: 'hotelDetalis/:id',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          User: (resolve) => require(['@/components/Hotel/HotelDetalis'], resolve),
        },
        name: 'HotelDetalis'
      },
      //更多门票
      {
        path: 'admissionTicketMore',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          User: (resolve) => require(['@/components/Tickets/AdmissionTicketMore'], resolve),
        },
        name: 'AdmissionTicketMore'
      },
      /*--------------------------------租车--------------------------------------*/
      //
      {
        path: 'rentalCar',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          User: (resolve) => require(['@/components/RentalCar/RentalCar'], resolve),
        },
        name: 'RentalCar'
      },

      {
        path: 'rentalCarDiscount/:id',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          User: (resolve) => require(['@/components/RentalCar/RentalCarDiscount'], resolve),
        },
        name: 'RentalCarDiscount'
      },
      /*--------------------------------美食--------------------------------------*/
      {
        path: 'foodHome',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          User: (resolve) => require(['@/components/Food/FoodHome'], resolve),
        },
        name: 'FoodHome'
      },
      {
        path: 'newFoodDetail',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          User: (resolve) => require(['@/components/Food/NewFoodDetail'], resolve),
        },
        name: 'NewFoodDetail'
      },
      {
        path: 'lineOrder',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          User: (resolve) => require(['@/components/Food/LineOrder'], resolve),
        },
        name: 'LineOrder'
      },
      {
        path: 'foodShopOrder',
        components: {
          default: (resolve) => require(['@/components/public/Comment'], resolve),
          User: (resolve) => require(['@/components/Food/FoodShopOrder'], resolve),
        },
        name: 'FoodShopOrder'
      },
    ]
  },
  //登录
  {
    path: '/adminLogin',
    component: (resolve) => require(['@/components/AdminLogin'], resolve),
    name: 'AdminLogin'
  },
  {
    path: '/',
    hidden: true,
    redirect: {name: 'AgenciesHome'}
  },
  {
    path: '/404',
    name: '404',
    component: (reslove) => require(['@/components/404'], reslove)
  },
  // {
  //   path: '*',
  //   hidden: true,
  //   redirect: {name: 'AgenciesHome'}
  // },
  {path: '*', redirect: '/404', hidden: true}
]
