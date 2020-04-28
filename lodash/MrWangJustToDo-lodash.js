var MrWangJustToDo = {
  /**
   * 
   * @param {Array} arr 传入的数组 
   * @param {*} size 分割的长度
   * @returns {Array} 返回分割后的数组
   */
  chunk: function (arr, size = 1) {
    arr = arr || [];
    if (arr.length <= size) {
      return [arr];
    } else {
      let re = [];
      let len = 0;
      while (len < arr.length) {
        let temp = arr.slice(len, len + size);
        re.push(temp);
        len += size;
      }
      return re;
    }
  },
  /**
   * 
   * @param {Array} arr 传入的数组
   * @returns {Array} 返回得到的数组
   */
  compact: function (arr) {
    arr = arr || [];
    let re = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) {
        re.push(arr[i]);
      }
    }
    return re;
  },
  /**
   * 
   * @param {Array} arr 初始参数
   * @param  {...any} values 可选数组参数
   * @returns {Array} 拼接后的数组
   */
  concat: function (arr, ...values) {
    arr = arr || [];
    let re = [];
    re = re.concat(arr);
    if (values) {
      for (let i = 0; i < values.length; i++) {
        if (typeof (values[i]) == 'object') {
          re = re.concat(values[i]);
        } else {
          re.push(values[i]);
        }
      }
    }
    return re;
  },
  difference: function (arr, ...values) {
    if (!arr) {
      return [];
    } else {
      
    }
  }

}
