var mrwangjusttodo = {
  /**
   * 
   * @param {Array} arr 待展开的数组
   * @returns {Array} 元素展开后的数组
   */
  unfoldArr: function (arr) {
    let re = [];
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        re = re.concat(this.unfoldArr(arr[i]));
      } else {
        re.push(arr[i]);
      }
    }
    return re;
  },
  /**
   * 
   * @param {Array} arr 查找的原始数组
   * @param {*} target 查找的目标元素
   * @returns {Number} 返回索引
   */
  binarySearch: function (arr, target) {
    let start = 0;
    let end = arr.length - 1;
    while (end >= start) {
      let m = (start + end) / 2 | 0;
      if (arr[m] === target) {
        let t = m - 1;
        while (t >= 0 && arr[t] == target) {
          t--;
        }
        return t + 1;
      } else if (arr[m] > target) {
        end = m - 1;
      } else {
        start = m + 1;
      }
    }
    return start;
  },
  /**
   * 
   * @param {Array} arr 传入的数组 
   * @param {*} size 分割的长度
   * @returns {Array} 返回分割后的数组
   */
  chunk: function (arr, size = 1) {
    if (!arr) {
      return [];
    }
    let tArr = Array.from(arr);
    if (isNaN(size) || size < 0) {
      return [];
    }
    if (tArr.length <= size) {
      return [tArr];
    } else {
      let re = [];
      let len = 0;
      while (len < tArr.length) {
        let temp = tArr.slice(len, len + size);
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
    if (!arr) {
      return [];
    }
    let tArr = Array.from(arr);
    let re = [];
    for (let i = 0; i < tArr.length; i++) {
      if (tArr[i]) {
        re.push(tArr[i]);
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
    if (!Array.isArray(arr)) {
      return [];
    }
    if (!values) {
      return Array.from(arr);
    } else {
      let re = Array.from(arr);
      for (let i = 0; i < values.length; i++) {
        if (Array.isArray(values[i])) {
          let temp = [];
          for (let j = 0; j < re.length; j++) {
            if (this.indexOf(values[i], re[j]) === -1) {
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
    if (!arr) {
      return [];
    }
    let tArr = Array.from(arr);
    if (n < 0) {
      n = 0;
    }
    if (n >= tArr.length) {
      return [];
    } else {
      return tArr.slice(n);
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
    if (typeof (arr) === 'string') {
      return arr;
    }
    let tArr = Array.from(arr);
    if (tArr.length == 0) {
      return tArr;
    }
    if (start < 0 || start === undefined) {
      start = 0;
    }
    if (end === undefined) {
      end = arr.length;
    }
    if (value === undefined) {
      return tArr;
    } else {
      for (let i = start; i < end; i++) {
        tArr[i] = value;
      }
      return tArr;
    }
  },
  /**
   * 
   * @param {Array} arr 需要获取头部的数组
   * @returns {any} 返回获取的结果
   */
  head: function (arr) {
    if (Array.isArray(arr) || typeof (arr) === 'string') {
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
    if (!arr) {
      return null;
    }
    let tArr = Array.from(arr);
    let re = [];
    for (let i = 0; i < tArr.length; i++) {
      if (Array.isArray(tArr[i])) {
        re = re.concat(tArr[i]);
      } else {
        re.push(tArr[i]);
      }
    }
    return re;
  },
  /**
   * 
   * @param {Array} arr 需要查找的数组
   * @param {*} value 被查找的值
   * @param {*} fromIndex 查找的起始位置
   * @returns {Number}  查找到的索引 
   */
  indexOf: function (arr, value, fromIndex = 0) {
    if (!arr || Array.from(arr).length === 0 || value === undefined) {
      return -1;
    }
    for (let i = fromIndex; i < arr.length; i++) {
      if (Number.isNaN(value)) {
        if (Number.isNaN(arr[i])) {
          return i;
        }
      } else {
        if (arr[i] === value) {
          return i;
        }
      }
    }
    return -1;
  },
  /**
   * 
   * @param {Array} arr 需要去除末尾的数组
   * @returns {Array} 返回新的数组
   */
  initial: function (arr) {
    if (!arr) {
      return [];
    }
    let tArr = Array.from(arr);
    return tArr.slice(0, tArr.length - 1);
  },
  /**
   * 
   * @param  {...Array} arr 需要查找交集的数组
   * @returns {Array} 返回只包含交集的新数组 
   */
  intersection: function (...arr) {
    if (!arr || arr.length == 0) {
      return [];
    } else {
      let re;
      if (Array.isArray(arr[0])) {
        re = Array.from(arr[0]);
      } else {
        return [];
      }
      let len = 1;
      while (len < arr.length && re.length > 0) {
        if (!Array.isArray(arr[len])) {
          return [];
        }
        let next = [];
        for (let i = 0; i < arr[len].length; i++) {
          if (this.indexOf(re, arr[len][i]) != -1) {
            next.push(arr[len][i]);
          }
        }
        re = next;
        len++;
      }
      return re;
    }
  },
  /**
   * 
   * @param {Array} arr 原始数组
   * @param {*} separator 待拼接的字符
   * @returns {String} 返回使用字符拼接的字符串
   */
  join: function (arr, separator = ',') {
    if (!arr) {
      return '';
    }
    let tArr = Array.from(arr);
    return tArr.join(separator);
  },
  /**
   * 
   * @param {Array} arr 原始数组
   * @returns {*} 返回原始数组的最后一项
   */
  last: function (arr) {
    if (!arr) {
      return undefined;
    }
    let tArr = Array.from(arr);
    return tArr[tArr.length - 1];
  },
  /**
   * 
   * @param {Array} arr 需要查找的数组
   * @param {*} value 被查找的元素
   * @param {*} fromIndex 逆序查找开始的索引
   * @returns {Number}  返回查找到的索引
   */
  lastIndexOf: function (arr, value, fromIndex) {
    if (!arr) {
      return -1;
    }
    let tArr = Array.from(arr);
    if (tArr.length == 0) {
      return -1;
    }
    if (value === undefined) {
      return tArr.length;
    }
    if (fromIndex === undefined) {
      fromIndex = tArr.length - 1;
    }
    if (fromIndex < 0) {
      if (Math.abs(fromIndex) >= arr.length) {
        return -1;
      } else {
        fromIndex = tArr.length - 1 + fromIndex;
      }
    }
    for (let i = fromIndex; i >= 0; i--) {
      if (Number.isNaN(value)) {
        if (Number.isNaN(arr[i])) {
          return i;
        }
      } else {
        if (arr[i] === value) {
          return i;
        }
      }
    }
    return -1;
  },
  /**
   * 
   * @param {Array} arr 原始数组
   * @param {*} n 需要的索引
   * @returns {*} 返回当前索引的元素
   */
  nth: function (arr, n = 0) {
    if (!arr || Array.from(arr).length == 0) {
      return undefined;
    }
    if (n >= 0) {
      return arr[n];
    } else {
      return arr[arr.length + n];
    }
  },
  /**
   * 
   * @param {Array} arr 需要删除元素的数组
   * @param  {...any} values 待删除的元素
   * @returns {Array} 删除元素后的数组
   */
  pull: function (arr, ...values) {
    if (!Array.isArray(arr) || !values) {
      return arr;
    } else {
      for (let i = 0; i < values.length; i++) {
        let index = this.indexOf(arr, values[i]);
        while (index != -1) {
          arr.splice(index, 1);
          index = this.indexOf(arr, values[i]);
        }
      }
      return arr;
    }
  },
  /**
   * 
   * @param {Array} arr 需要删除元素的数组
   * @param {*} value 待删除元素的数组
   * @returns {Array} 返回删除元素后的数组
   */
  pullAll: function (arr, value) {
    if (!Array.isArray(arr) || !values) {
      return arr;
    } else {
      return this.pull(arr, ...value);
    }
  },
  /**
   * 
   * @param {Array} arr 原始数组
   * @param  {...any} indexes 待删除的索引数组
   * @returns {Array} 返回删除的索引元素组成的数组
   */
  pullAt: function (arr, ...indexes) {
    if (!Array.isArray(arr) || !indexes) {
      return [];
    } else {
      let re = [];
      indexes = this.unfoldArr(indexes).sort((a, b) => a - b);
      for (let i = indexes.length - 1; i >= 0; i--) {
        if (arr[indexes[i]]) {
          re.unshift(arr[indexes[i]]);
          arr.splice(indexes[i], 1);
        }
      }
      return re;
    }
  },
  /**
   * 
   * @param {Array} arr 原始数组
   * @param {*} fun 判断函数
   * @returns {Array} 返回符合要求的新数组
   */
  remove: function (arr, fun) {
    if (!Array.isArray(arr)) {
      return [];
    }
    if (typeof (fun) != 'function') {
      return arr;
    }
    let re = [];
    for (let i = 0; i < arr.length; i++) {
      if (fun(arr[i])) {
        re.push(arr[i]);
      }
    }
    return re;
  },
  /**
   * 
   * @param {Array} arr 原始数组
   * @returns {Array} 逆序返回原始数组
   */
  reverse: function (arr) {
    if (!Array.isArray(arr)) {
      return arr;
    } else {
      arr.reverse();
      return arr;
    }
  },
  /**
   * 
   * @param {Array} arr 原始数组
   * @param {*} start 起始索引
   * @param {*} end 终止索引
   * @returns {Array} 返回切下的数组
   */
  slice: function (arr, start, end) {
    if (!arr) {
      return [];
    }
    let tArr = Array.from(arr);
    if (start === undefined) {
      start = 0;
    }
    if (end === undefined) {
      end = tArr.length;
    }
    return tArr.slice(start, end);
  },
  /**
   * 
   * @param {Array} arr 原始数组
   * @param {*} value 查找的元素
   * @returns {Number} 返回应该插入的索引
   */
  sortedIndex: function (arr, value) {
    if (!arr) {
      return 0;
    }
    let tArr = Array.from(arr);
    if (value === undefined) {
      return tArr.length;
    } else {
      return this.binarySearch(tArr, value);
    }
  },
  /**
   * 
   * @param {Array} arr 需要查询的数组
   * @param {*} value 查找的值
   * @returns {Number} 返回索引
   */
  sortedIndexOf: function (arr, value) {
    if (!arr) {
      return -1;
    }
    let tArr = Array.from(arr);
    if (value === undefined) {
      return -1;
    }
    let re = this.binarySearch(arr, value);
    if (arr[re] === value) {
      return re;
    } else {
      return -1;
    }
  },
  /**
   * 
   * @param {Array} arr 需要的数组
   * @returns {Array} 返回去除了首位的数组
   */
  tail: function (arr) {
    if (!arr) {
      return [];
    }
    let tArr = Array.from(arr);
    return tArr.slice(1);
  },
  /**
   * 
   * @param {Array} arr 需要处理的数组
   * @param {*} n 从头开始保留的元素个数
   * @returns {Array} 返回包含保留元素的新数组
   */
  take: function (arr, n = 1) {
    if (!arr) {
      return [];
    }
    if (n < 0) {
      n = 0;
    }
    let tArr = Array.from(arr);
    return tArr.slice(0, n);
  },
  /**
   * 
   * @param {Array} arr 需要处理的数组
   * @param {*} n 从右开始保留的元素个数
   * @returns {Array} 返回保留元素的新数组
   */
  takeRight: function (arr, n = 1) {
    if (!arr) {
      return [];
    }
    let tArr = Array.from(arr);
    if (tArr.length <= n) {
      return tArr;
    }
    if (n < 0) {
      return [];
    }
    return tArr.slice(tArr.length - n);
  },
  /**
   * 
   * @param  {...Array} arr 需要判断的数组集合
   * @returns {Array} 返回一个包含所有数组并集的新数组 
   */
  union: function (...arr) {
    if (!arr) {
      return [];
    } else {
      let re = [];
      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
          if (re.length == 0) {
            re = Array.from(arr[i]);
          } else {
            for (let j = 0; j < arr[i].length; j++) {
              if (!this.include(re, arr[i][j])) {
                re.push(arr[i][j]);
              }
            }
          }
        }
      }
      return re;
    }
  },
  /**
   * 
   * @param {Array} arr 需要处理的数组
   * @returns {Array} 返回一个不包含相同元素的新数组
   */
  uniq: function (arr) {
    if (!arr) {
      return [];
    }
    let tArr = Array.from(arr);
    let re = [];
    for (let i = 0; i < tArr.length; i++) {
      if (!this.include(re, tArr[i])) {
        re.push(tArr[i]);
      }
    }
    return re;
  },
  /**
   * 
   * @param  {...Array} arr 传入的数组集合
   * @returns {Array} 返回新的数组
   */
  zip: function (...arr) {
    if (!arr) {
      return [];
    }
    let re = [];
    let maxLen = 0;
    let maxIndex = 0;
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        maxLen++;
        maxIndex = maxIndex >= arr[i].length ? maxIndex : arr[i].length;
      }
    }
    let index = 0;
    while (index < maxIndex) {
      let temp = Array(maxLen);
      let iTemp = 0;
      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
          temp[iTemp++] = arr[i][index];
        }
      }
      re.push(temp);
      index++;
    }
    return re;
  },
  unzip: function (arr) {
    if (!arr || !Array.isArray(arr)) {
      return [];
    }
    let re = [];
    let maxLen = 0;
    let maxIndex = 0;
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        maxLen++;
        maxIndex = maxIndex >= arr[i].length ? maxIndex : arr[i].length;
      }
    }
    let index = 0;
    while (index < maxIndex) {
      let temp = Array(maxLen);
      let iTemp = 0
      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
          temp[iTemp++] = arr[i][index];
        }
      }
      re.push(temp);
      index++;
    }
    return re;
  },
  /**
   * 
   * @param {Array} arr 原始需要判断数组
   * @param  {...any} values 判断数组中是否包含对应的参数
   * @returns {Array} 返回新的不包含任何指定参数的数组
   */
  without: function (arr, ...values) {
    if (!Array.isArray(arr)) {
      return [];
    }
    let tArr = Array.from(arr);
    let re = [];
    for (let i = 0; i < tArr.length; i++) {
      if (this.indexOf(values, tArr[i]) === -1) {
        re.push(tArr[i]);
      }
    }
    return re;
  },
  /**
   * 
   * @param  {...any} values 需要处理的参数
   * @returns {Array} 返回一个数组包含所有不重复出现的单个数组元素
   */
  xor: function (...values) {
    if (!values) {
      return [];
    }
    let re = [];
    for (let i = 0; i < values.length; i++) {
      if (Array.isArray(values[i])) {
        for (let j = 0; j < values[i].length; j++) {
          let index = this.indexOf(re, values[i][j]);
          if (index === -1) {
            re.push(values[i][j]);
          } else {
            re.splice(index, 1);
          }
        }
      }
    }
    return re;
  },
  /**
   * 
   * @param {Array} props 作为对象属性名称的数组
   * @param {Array} values 作为对象属性值的数组
   * @returns {Object} 返回包含指定属性的对象
   */
  zipObject: function (props, values) {
    if (!props) {
      return {};
    }
    let tArr = Array.from(props);
    if (tArr.length == 0) {
      return {};
    }
    let re = {};
    for (let i = 0; i < tArr.length; i++) {
      re[tArr[i]] = undefined;
    }
    if (!values || Array.from(values).length === 0) {
      return re;
    }
    let index = 0;
    for (let attr in re) {
      re[attr] = values[index++];
    }
    return re;
  },
  /**
   * 
   * @param {Array|Object|String} collection 需要查找的元素
   * @param {*} value 查找的值
   * @param {*} fromIndex 开始查找的索引
   * @returns {Boolean} 返回是否存在的布尔值
   */
  include: function (collection, value, fromIndex = 0) {
    if (!collection || !value) {
      return false;
    }
    if (Array.isArray(collection)) {
      return this.indexOf(collection, value, fromIndex);
    } else if (typeof (collection) === 'string') {
      return collection.includes(value, fromIndex);
    } else if (typeof (collection) === 'object') {
      for (let attr in collection) {
        if (Number.isNaN(value)) {
          if (Number.isNaN(collection[attr])) {
            return true;
          }
        } else {
          if (value === collection[attr]) {
            return true;
          }
        }
      }
    }
    return false;
  },
  /**
   * 
   * @param {Object|Array} collection 可迭代数组/对象
   * @returns {*} 返回可迭代数组/对象中的随机元素
   */
  sample: function (collection) {
    if (!collection) {
      return undefined;
    }
    let tArr = Array.from(collection);
    if (tArr.length > 0) {
      return tArr[Math.floor(Math.random() * tArr.length)];
    } else if (typeof (collection) === 'object') {
      tArr = Object.values(collection);
      return tArr[Math.floor(Math.random() * tArr.length)];
    }
    return undefined;
  },
  /**
   * 
   * @param {Object|Array} collection 可迭代的数组/对象
   * @param {*} n 返回的数组最大长度
   * @returns {Array} 返回获取的随机索引元素组成的数组
   */
  sampleSize: function (collection, n = 1) {
    if (!collection || n < 1) {
      return [];
    }
    let tArr = Array.from(collection);
    let re = [];
    let len = 0;
    if (tArr.length > 0) {
      while (tArr.length > 0 && len++ < n) {
        let index = Math.floor(Math.random() * tArr.length);
        re.push(tArr[index]);
        tArr.splice(index, 1);
      }
    } else if (typeof (collection) === 'object') {
      tArr = Object.values(collection);
      while (tArr.length > 0 && len++ < n) {
        let index = Math.floor(Math.random() * tArr.length);
        re.push(tArr[index]);
        tArr.splice(index, 1);
      }
    }
    return re;
  },
  /**
   * 
   * @param {Object|Array} collection 传入的可迭代数组/对象
   * @returns {Array} 返回一个随机排序的数组
   */
  shuffle: function (collection) {
    if (!collection) {
      return [];
    }
    let tArr = Array.from(collection);
    if (tArr.length > 0) {
      tArr.sort(() => Math.random() > 0.5);
      return tArr;
    } else if (typeof (collection) === 'object') {
      tArr = Object.values(collection);
      tArr.sort(() => Math.random() > 0.5);
      return tArr;
    }
    return [];
  },
  /**
   * 
   * @param {Object|Array|String} collection 传入的可迭代数组/对象/字符串
   * @returns {Number} 返回对应的长度
   */
  size: function (collection) {
    if (!collection) {
      return 0;
    }
    let tArr = Array.from(collection);
    if (tArr.length > 0) {
      return tArr.length;
    } else if (typeof (collection) === 'object') {
      tArr = Object.values(collection);
      return tArr.length;
    }
    return 0;
  },
  /**
   * 
   * @param {*} value 传入的参数一
   * @param {*} other 传入的参数二
   * @returns {Boolean} 返回两个参数是否相同的布尔值
   */
  eq: function (value, other) {
    if (value === undefined && other === undefined) {
      return true;
    }
    if (value === undefined || other === undefined) {
      return false;
    }
    if (value != value) {
      return other != other;
    }
    return value === other;
  }
}
