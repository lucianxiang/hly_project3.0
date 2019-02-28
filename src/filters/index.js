/**
 * Created by leibo on 17/11/13.
 */
//获取日期 格式年-月-日
export const getNewDate = (value) => {
  let reg = /\d+/g
  if (value) {
    var num = value.match(reg)[0];
    var date = new Date(Number(num));
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }
};
//获取状态
export const getStatus = (value) => {
  switch (Number(value)) {
    case 0:
      return '空闲';
    case 1:
      return '锁定';
    default:
      return '使用'
  }
};
export const getCancelType = (value)=>{
  switch (Number(value)) {
    case 0:
      return '可取消';
    case 1:
      return '不可取消';
    case 2:
      return '限时取消';
    default:
      return '其他'
  }
}
//获取启用状态
export const getDelete = (value) => {
  if (Number(value) == 0) {
    return '启用'
  } else {
    return '不启用'
  }
};
//获取入住状态
export const getUseStatus = (value) => {
  switch (Number(value)) {
    case 0:
      return '未入住';
    case 1:
      return '已入住';
    case 2:
      return '已退房';
    default:
      return '未知';
  }
};
export const useStatus = (value) => {
  switch (Number(value)) {
    case 0:
      return '未使用';
    case 1:
      return '已使用';
    case 2:
      return '已离店';
    default:
      return '未知';
  }
};
export const getGrade = (value) => {
  switch (Number(value)) {
    case 0:
      return '差评';
    case 1:
      return '中评';
    case 2:
      return '好评'
    default:
      return '未评级';
  }
};
export const getParkType = (val) => {
  switch (Number(val)) {
    case 0:
      return '用餐';
    case 1:
      return '景点';
    case 2:
      return '酒店';
    case 3:
      return '交通';
    default:
      return '未知';
  }
};
export const getEatType = (val) => {
  switch (Number(val)) {
    case 0:
      return '早餐';
    case 1:
      return '午餐';
    case 2:
      return '晚餐';
    default:
      return '未知';
  }
};
export const getOutStatus = (val) => {
  switch (Number(val)) {
    case 0:
      return '商家出单中';
    case 1:
      return '商家出单成功';
    case 2:
      return '商家出单失败';
    default:
      return '未知';
  }
};
export const getCheck = (val) => {
  switch (Number(val)) {
    case 0:
      return '审核中';
    case 1:
      return '通过';
    case 2:
      return '未通过';
    default:
      return '未知';
  }
};
export const getLongOut = val => {
  switch (Number(val)) {
    case 0:
      return '短线';
    case 1:
      return '长线';
    default:
      return '未知';
  }
};
export const getSex = val => {
  switch (Number(val)) {
    case 0:
      return '男';
    case 1:
      return '女';
    default:
      return '未知';
  }
};
//三证合一
export const getIncludeCert = val => {
  switch (Number(val)) {
    case 0:
      return '是';
    case 1:
      return '否';
    default:
      return '未知';
  }
}
//跟团游和自由行
export const getHeelType = val=>{
  switch (Number(val)) {
    case 0:
      return '跟团游';
    case 1:
      return '自由行';
    default:
      return '其他';
  }
}

//审核状态
export const getPass = val => {
  switch (Number(val)) {
    case 0:
      return '审核中';
    case 1:
      return '审核成功';
    case 2:
      return '审核失败';
    default:
      return '未知';
  }
}
//我的订单状态
export const getTicketStatus = val => {
  switch (Number(val)) {
    case 0:
      return '未支付';
    case 1:
      return '已支付';
    case 2:
      return '已取消';
    default:
      return '未知';
  }
};

function getNum(num) {
  return num < 10 ? '0' + num : '' + num
}

//时间
export const getUseTime = val => {
  let date = new Date()
  if (!val) {
    return date.getFullYear() + '-' + getNum((date.getMonth() + 1)) + '-' + getNum(date.getDate()) + ' ' + getNum(date.getHours()) + ':' + getNum(date.getMinutes()) + ':' + getNum(date.getSeconds())
  } else {
    if (!val.includes('.')) {
      return val.replace(/T/, ' ')
    } else {
      return val.substring(0, val.indexOf('.')).replace(/T/, ' ')
    }
  }
};

export const getReserveTime = val => {
  return parseInt(val / 60) + "时" + val % 60 + "分钟"
}

//订单类型
export const getOrderType = val => {
  switch (Number(val)) {
    case 0:
      return '旅行社订单';
    case 1:
      return '车票订单';
    case 2:
      return '门票订单';
    case 3:
      return '美食订单';
    case 4:
      return '酒店订单';
    case 5:
      return '租车订单';
    default:
      return '未知';
  }
};

//酒店星级
export const getStars = val=>{
  switch (Number(val)) {
    case 1:
      return '普通型';
    case 2:
      return '经济型';
    case 3:
      return '舒适型';
    case 4:
      return '高档型';
    case 5:
      return '豪华型';
    default:
      return '其他';
  }
}

//周一到周日
export const getWeekDay = val =>{
  switch (Number(val)) {
    case 1:
      return '周一';
    case 2:
      return '周二';
    case 3:
      return '周三';
    case 4:
      return '周四';
    case 5:
      return '周五';
    case 6:
      return '周六';
    case 7:
      return '周日';
    default:
      return '';
  }
}

//获取床型
export const getBedType = (value) => {
  switch (value) {
    case '未知':
      return '';
    default:
      return value;
  }
};

