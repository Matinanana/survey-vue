export default {
  cloneObj: function(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
      return;
    } else if(window.JSON){
      str = JSON.stringify(obj), //系列化对象
      newobj = JSON.parse(str); //还原
    } else {
      for(var i in obj){
        newobj[i] = typeof obj[i] === 'object' ?
        this.cloneObj(obj[i]) : obj[i];
      }
    }
    return newobj;
  },
	//对象转字符串 TODO deep
  objToStr: function (obj, flag1, flag2, fitlerNull) {
	  flag1 = flag1 || '=';
	  flag2 = flag2 || '&';
	  var result = '';
	  for (var item in obj) {
      if (obj[item] !== '' || obj[item] !== null) {
        result += item + flag1 + obj[item] + flag2;
      }
	  }
	  return result.slice(0,-1);
	},
	//字符串转对象 'a=1&b=2'
	strToObj: function (str, flag1, flag2) {
	  flag1 = flag1 || '&';
	  flag2 = flag2 || '=';
	  var arr = str.split(flag1),
	  		item = '',
	  		result = {};
	  for (var i in arr) {
	  	item = arr[i].split(flag2);
	  	result[item[0]] = item[1];
	  }

	  return result;
	},
	//获取url参数
	getUrlParams: function (name) {
		var searchStr = window.location.search.substring(1);
  	return decodeURIComponent(this.strToObj(searchStr)[name]) || '';
	},

  formateDateToStr: function (time) {
      function _addZore(num) {
          if (num < 10) {
              num = '0' + num;
          }
          return num;
      }
      if (typeof time != 'object') {
          time = '' + time;
          if (time.length > 12) {
              time = new Date(parseInt(time));
          } else {
              time = new Date(parseInt(time) * 1000);
          }
      }
      var year = time.getFullYear();
      var month = _addZore(time.getMonth() + 1);
      var date = _addZore(time.getDate());
      var hours = _addZore(time.getHours());
      var minutes = _addZore(time.getMinutes());
      var seconds = _addZore(time.getSeconds());
      return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
      // return {
      //     year: year,
      //     month: month,
      //     date: date,
      //     hours: hours,
      //     minutes: minutes,
      //     seconds: seconds,
      //     short_str: year + '-' + month + '-' + date,
      //     str: year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
      // };
  },

  formateStrToDate: function(dateString) {
    if (dateString) {
      var arr1 = dateString.split(" ");
      var sdate = arr1[0].split('-');
      var date = new Date(sdate[0], sdate[1]-1, sdate[2]);
      return date;
    }
  },

  removeByValue: function(arr, val) {
    for(var i=0; i<arr.length; i++) {
      if(arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
  }
}
