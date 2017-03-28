export const traverseObject = (obj) => {
  var newObj = {};
  for(var key in obj) {
    var newKey = key.replace(/\./g,'');
    var value = obj[key];
    if(Object.prototype.toString.call(value) === '[object Object]' ) {
      newObj[newKey] = traverseObject(value);
    } else if(Object.prototype.toString.call(value) === '[object Array]' ) {
      newObj[newKey] = traverseList(value)
    } else {
      newObj[newKey] = value;
    }
  }
  return newObj;
};

export const traverseList = (list) => {
  var newList = [];
  list.forEach(function(item) {
    if(Object.prototype.toString.call(item) === '[object Object]' ) {
      newList.push(traverseObject(item));
    } else {
      if (item) newList.push(item);
    }
  });
  return newList;
};
