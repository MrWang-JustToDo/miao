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
   * @param  {...Array} values 可选数组参数
   * @returns {Array} 拼接后的数组
   */
  concat: function (arr, ...values) {
    arr = arr || [];
    let re = [];
    re = re.concat(arr);
    if (values) {
      for (let i = 0; i < values.length; i++) {
        if (Array.isArray(values[i])) {
          re = re.concat(values[i]);
        } else {
          re.push(values[i]);
        }
      }
    }
    return re;
  },
  /**
   * 
   * @param {Array} arr 原始数组
   * @param  {...Array} values 待查找的数组参数
   * @returns {Array} 返回新的不包含重叠元素的数组
   */
  difference: function (arr, ...values) {
    if (!values) {
      return arr;
    } else {
      let re = Array.from(arr);
      for (let i = 0; i < values.length; i++) {
        if (Array.isArray(values[i])) {
          let temp = [];
          for (let j = 0; j < re.length; j++) {
            if (values[i].indexOf(re[j]) === -1) {
              temp.push(re[j]);
            }
          }
          re = temp;
        }
      }
      return re;
    }
  },
  /**
   * 
   * @param {Array} arr 元素参数
   * @param {Number} n 需要从头去除的元素个数
   * @returns {Array} 返回得到的新数组 
   */
  drop: function (arr, n = 1) {
    arr = arr || [];
    if (n >= arr.length) {
      return [];
    } else {
      return arr.slice(n);
    }
  },
  /**
   * 
   * @param {Array} arr 需要填充的数组
   * @param {*} value 待填充的数据
   * @param {Number} start 起始位置
   * @param {Number} end 终止位置
   * @returns {Array} 返回的数组
   */
  fill: function (arr, value, start, end) {
    if (!arr) {
      return [];
    }
    if (start < 0 || start == undefined) {
      start = 0;
    }
    if (end == undefined) {
      end = arr.length;
    }
    if (value === undefined) {
      return Array.from(arr);
    } else {
      let re = Array.from(arr);
      for (let i = start; i < end; i++) {
        re[i] = value;
      }
      return re;
    }
  },
  /**
   * 
   * @param {Array} arr 需要获取头部的数组
   * @returns {any} 返回获取的结果
   */
  head: function (arr) {
    arr = arr || [];
    if (Array.isArray(arr)) {
      return arr[0];
    } else {
      return undefined;
    }
  },
  /**
   * 
   * @param {Array} arr 需要展开的数组
   * @returns {Array} 返回展开后的新数组
   */
  flatten: function (arr) {
    arr = arr || [];
    if (!Array.isArray(arr) || arr.length == 0) {
      return [];
    } else {
      let re = [];
      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
          re = re.concat(arr[i]);
        } else {
          re.push(arr[i]);
        }
      }
      return re;
    }
  }
}
