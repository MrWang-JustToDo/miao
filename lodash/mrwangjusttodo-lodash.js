var mrwangjusttodo = {
  // 自定义方法
  /**
   *
   * @param {Array} arr 待展开的数组
   * @param {Function} judgeFun 需要满足的条件
   * @param {Function} action1 判断成功后执行的操作
   * @param {Function} action2 判断失败后执行的操作
   * @param {Array} init 展开数组开始时的初始值
   * @returns {Array} 返回展开后的新数组
   */
  unfoldArrByJudge: function (
    arr,
    judgeFun,
    action1,
    action2 = (pre) => pre,
    init = []
  ) {
    return arr.reduce((pre, current) => {
      if (judgeFun(current)) {
        pre = action1(pre, current);
      } else {
        pre = action2(pre, current);
      }
      return pre;
    }, init);
  },
  /**
   *
   * @param {Array} arr 查找的原始数组
   * @param {Number} target 查找的目标元素
   * @param {Function} transferFun 转换元素的函数
   * @returns {Number} 返回索引
   */
  binarySearch: function (arr, target, transferFun = (it) => it) {
    let start = 0;
    let end = arr.length - 1;
    while (end >= start) {
      let m = ((start + end) / 2) | 0;
      let p1 = transferFun(arr[m]);
      let p2 = transferFun(target);
      if (p1 === p2) {
        return m;
      } else if (p1 > p2) {
        end = m - 1;
      } else {
        start = m + 1;
      }
    }
    return start;
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @returns 返回一个包含数组中信息的对象
   */
  matchesProperty: function (arr) {
    let re = {};
    for (let i = 0; i < arr.length; i++) {
      re[arr[i++]] = arr[i];
    }
    return re;
  },
  /**
   *
   * @param {Object} obj 根据对象返回一个判断函数
   */
  matches: function (obj, judgeFun = this.equalsTwoPara) {
    return function (para) {
      for (let prop in obj) {
        if (!judgeFun(para[prop], obj[prop])) {
          return false;
        }
      }
      return true;
    };
  },
  /**
   *
   * @param {Object} obj 原始对象
   * @param {String} str 属性字符串
   * @returns 返回最终匹配的属性
   */
  propFromObjByString: function (obj, str) {
    if (str.length == 0) {
      return undefined;
    } else if (!str.includes(".")) {
      return obj[str];
    } else {
      let index = this.includes(str, ".");
      let current = str.substring(0, index);
      return this.propFromObjByString(obj[current], str.slice(index + 1));
    }
  },
  /**
   *
   * @param {Array|Function|Object|String} para 传入的元素
   * @returns 根据传入的元素生成对应功能函数
   */
  getFunctionByPara: function (para) {
    let re = null;
    if (typeof para == "object") {
      if (Array.isArray(para)) {
        para = this.matchesProperty(para);
      }
      re = this.matches(para);
    } else if (typeof para == "function") {
      re = para;
    } else if (typeof para == "string") {
      re = (it) => this.propFromObjByString(it, para);
    }
    return re;
  },
  /**
   *
   * @param {*} para 传入的元素
   * @returns 返回能转成的数字
   */
  paraToNum: function (para) {
    if (isNaN(para)) {
      return null;
    } else {
      return Number(para);
    }
  },
  /**
   *
   * @param {*} para1 参数一
   * @param {*} para2 参数二
   * @returns 返回两个参数是否相同
   */
  equalsTwoPara: function (para1, para2) {
    if (Number.isNaN(para1)) {
      return Number.isNaN(para2);
    } else {
      return para1 === para2;
    }
  },
  /**
   *
   * @param {*} para1 参数一
   * @param {*} para2 参数二
   * @returns 返回两个参数是否不相同
   */
  notEqualsTwoPara: function (para1, para2) {
    if (Number.isNaN(para1)) {
      return !Number.isNaN(para2);
    } else {
      return para2 !== para1;
    }
  },
  /**
   *
   * @param {Array} arr1 原始数组
   * @param {Array} arr2 原始数组
   * @param {Function} judgeFun 判断的规则
   * @param {Function} transferFun 数组中元素转换的函数
   * @param {Function} action 判断成功后数组与元素执行的操作
   * @returns 返回符合规则的新数组
   */
  getArrFromTwoArrBySome: function (
    arr1,
    arr2,
    judgeFun = this.equalsTwoPara,
    transferFun = (it) => it,
    action = (arr, item) => arr.push(item)
  ) {
    return arr1.reduce((pre, current) => {
      if (
        arr2.some(
          (item) =>
            judgeFun(transferFun(current), transferFun(item)) &&
            (transferFun(current) !== undefined ||
              transferFun(it) !== undefined)
        )
      ) {
        action(pre, current);
      }
      return pre;
    }, []);
  },
  /**
   *
   * @param {Array} arr1 原始数组
   * @param {Array} arr2 原始数组
   * @param {Function} judgeFun 判断的规则
   * @param {Function} transferFun 数组中元素转换的函数
   * @param {Function} action 判断成功后数组与元素执行的操作
   * @returns 返回符合规则的新数组
   */
  getArrFromTwoArrByEvery: function (
    arr1,
    arr2,
    judgeFun = this.equalsTwoPara,
    transferFun = (it) => it,
    action = (arr, item) => arr.push(item)
  ) {
    return arr1.reduce((pre, current) => {
      if (
        arr2.every(
          (item) =>
            judgeFun(transferFun(current), transferFun(item)) &&
            (transferFun(current) !== undefined ||
              transferFun(it) !== undefined)
        )
      ) {
        action(pre, current);
      }
      return pre;
    }, []);
  },

  /**
   *
   * @param {Array} arr 原始数组
   * @param {any} target 目标元素
   * @param {Function} judge 接两个参数的判断函数
   * @param {Function} transfer 接一个参数的转换函数
   */
  myIndexOf: function (
    arr,
    target,
    judgeFun = this.equalsTwoPara,
    transferFun = (it) => it
  ) {
    for (let i = 0; i < arr.length; i++) {
      if (judgeFun(transferFun(arr[i]), transferFun(target))) {
        return i;
      }
    }
    return -1;
  },

  // lodash中原始方法

  // Array
  /**
   *
   * @param {Array} arr 原始数组
   * @param {*} size 分割的长度
   * @returns {Array} 返回分割后的数组集合
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
   * @param {Array} arr 原始数组
   * @returns {Array} 返回去除false值后的新数组
   */
  compact: function (arr) {
    if (!arr) {
      return [];
    }
    return this.unfoldArrByJudge(
      Array.from(arr),
      (item) => item,
      (pre, current) => pre.concat(current)
    );
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param  {...Array} values 可选数组参数
   * @returns {Array} 拼接后的数组
   */
  concat: function (arr, ...values) {
    if (arr === undefined) {
      return [];
    }
    if (values.length > 0) {
      return this.unfoldArrByJudge(
        values,
        () => true,
        (pre, current) => pre.concat(current),
        (pre) => pre,
        [].concat(arr)
      );
    } else {
      return Array.of(arr);
    }
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
    let re = Array.from(arr);
    // 分两步
    /* if (values.length > 0) {
      values = this.unfoldArrByJudge(values, Array.isArray, (pre, current) =>
        pre.concat(current)
      );
      return this.unfoldArrByJudge(
        re,
        (item) => !values.includes(item),
        (pre, current) => pre.concat(current)
      );
    } else {
      return re;
    } */
    if (values.length > 0) {
      return this.unfoldArrByJudge(
        values,
        Array.isArray,
        (pre, current) =>
          this.getArrFromTwoArrByEvery(pre, current, this.notEqualsTwoPara),
        (pre) => pre,
        re
      );
    } else {
      return re;
    }
  },

  /**
   * @param {Array} arr 原始数组
   * @param {...Array,fucntion} values 待查找的数组以及进行判断时需要的转换条件
   * @returns {Array} 返回符合条件的新数组
   */
  differenceBy: function (arr, ...values) {
    if (!Array.isArray(arr)) {
      return [];
    }
    if (values.length === 0) {
      return Array.from(arr);
    } else if (values.length === 1) {
      return this.difference(arr, ...values);
    } else {
      if (Array.isArray(values[values.length - 1])) {
        return this.difference(arr, ...values);
      } else {
        let last = values.pop();
        let action = this.getFunctionByPara(last);
        if (action === null) {
          return [];
        } else {
          let tempValues = this.unfoldArrByJudge(
            values,
            Array.isArray,
            (pre, current) => pre.concat(current.map(action))
          );
          return arr.reduce((pre, current) => {
            if (!tempValues.includes(action(current))) {
              pre = pre.concat(current);
            }
            return pre;
          }, []);
        }
      }
    }
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param  {...Array, Function} values 待查找的数组以及比较判断条件
   */
  differenceWith: function (arr, ...values) {
    if (!Array.isArray(arr)) {
      return [];
    }
    if (values.length === 0) {
      return Array.from(arr);
    } else if (values.length === 1) {
      return this.difference(arr, ...values);
    } else {
      if (Array.isArray(values[values.length - 1])) {
        return this.difference(arr, ...values);
      } else {
        let last = values.pop();
        if (typeof last == "function") {
          let tempValues = this.unfoldArrByJudge(
            values,
            Array.isArray,
            (pre, current) => pre.concat(current)
          );
          return arr.reduce((pre, current) => {
            if (!tempValues.some((item) => last(item, current))) {
              pre = pre.concat(current);
            }
            return pre;
          }, []);
        } else {
          return [];
        }
      }
    }
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param {Number} n 需要从头去除的元素个数
   * @returns {Array} 返回得到的新数组
   */
  drop: function (arr, n = 1) {
    if (!arr) {
      return [];
    }
    let re = Array.from(arr);
    n = this.paraToNum(n);
    if (n !== null) {
      if (n <= 0) {
        return re;
      } else if (n >= re.length) {
        return [];
      } else {
        return re.slice(n);
      }
    } else {
      return re;
    }
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param {Number} n 需要从尾部去除的元素个数
   * @returns 返回得到的新数组
   */
  dropRight: function (arr, n = 1) {
    if (!arr) {
      return [];
    }
    let re = Array.from(arr);
    n = this.paraToNum(n);
    if (n !== null) {
      if (n <= 0) {
        return re;
      } else if (n >= re.length) {
        return [];
      } else {
        return re.slice(0, re.length - n);
      }
    } else {
      return re;
    }
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param {function} predicate 迭代判断条件
   * @returns 返回新的数组
   */
  dropWhile: function (arr, predicate) {
    if (!arr) {
      return [];
    }
    predicate = this.getFunctionByPara(predicate);
    if (predicate) {
      for (let i = 0; i < arr.length; i++) {
        if (!predicate(arr[i], i, arr)) {
          return arr.splice(i);
        }
      }
    } else {
      return arr;
    }
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param {function} predicate 迭代判断条件
   * @returns 返回新的数组
   */
  dropRightWhile: function (arr, predicate) {
    if (!arr) {
      return [];
    }
    predicate = this.getFunctionByPara(predicate);
    if (predicate) {
      for (let i = arr.length - 1; i >= 0; i--) {
        if (predicate(arr[i], i, arr)) {
          arr.splice(i);
        } else {
          return arr;
        }
      }
    } else {
      return arr;
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
    if (typeof arr === "string") {
      return arr;
    }
    let re = Array.from(arr);
    if (re.length == 0) {
      return re;
    }
    if (start < 0 || start === undefined) {
      start = 0;
    }
    if (end === undefined) {
      end = arr.length;
    }
    if (value === undefined || end <= start) {
      return re;
    } else {
      for (let i = start; i < end; i++) {
        re[i] = value;
      }
      return re;
    }
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param {Array|Function|Object|String} predicate 迭代的判断条件
   * @param {fromIndex} 查找的初始位置
   */
  findIndex: function (arr, predicate, fromIndex = 0) {
    if (!arr) {
      return -1;
    }
    let r = Array.from(arr);
    predicate = this.getFunctionByPara(predicate);
    if (predicate) {
      fromIndex = this.paraToNum(fromIndex);
      if (fromIndex === null) {
        fromIndex = 0;
      }
      for (let i = fromIndex; i < r.length; i++) {
        if (predicate(r[i])) {
          return i;
        }
      }
      return -1;
    } else {
      return -1;
    }
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param {Array|Function|Object|String} predicate 迭代判断条件
   * @param {fromIndex} fromIndex 查找的启示位置
   */
  findLastIndex: function (arr, predicate, fromIndex = arr.length - 1) {
    if (!arr) {
      return -1;
    }
    let r = Array.from(arr);
    predicate = this.getFunctionByPara(predicate);
    if (predicate) {
      fromIndex = this.paraToNum(fromIndex);
      if (fromIndex === null) {
        fromIndex = r.length - 1;
      }
      for (let i = fromIndex; i >= 0; i--) {
        if (predicate(r[i])) {
          return i;
        }
      }
      return -1;
    } else {
      return -1;
    }
  },
  /**
   *
   * @param {Array} arr 需要获取头部的数组
   * @returns {any} 返回获取的结果
   */
  head: function (arr) {
    if (Array.isArray(arr) || typeof arr === "string") {
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
    let re = Array.from(arr);
    return this.unfoldArrByJudge(
      re,
      () => true,
      (pre, current) => pre.concat(current)
    );
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @returns 返回展开所有元素的新数组
   */
  flattenDeep: function (arr) {
    if (!arr) {
      return null;
    }
    let re = Array.from(arr);
    return this.unfoldArrByJudge(
      re,
      Array.isArray,
      (pre, current) => pre.concat(this.flattenDeep(current)),
      (pre, current) => pre.concat(current)
    );
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param {number} depth 展开的层数
   */
  flattenDepth: function (arr, depth = 1) {
    if (!arr) {
      return null;
    }
    depth = this.paraToNum(depth);
    if (depth === null) {
      depth = 1;
    }
    let re = Array.from(arr);
    return this.unfoldArrByJudge(
      re,
      Array.isArray,
      (pre, current) => {
        return depth > 1
          ? pre.concat(this.flattenDepth(current, depth - 1))
          : pre.concat(current);
      },
      (pre, current) => pre.concat(current)
    );
  },
  /**
   *
   * @param {Array} pairs 原始数组
   * @returns 返回能组成的对象
   */
  fromPairs: function (pairs) {
    if (Array.isArray(pairs)) {
      let re = {};
      pairs.forEach((item) => {
        if (Array.isArray(item)) {
          re[item[0]] = item[1];
        }
      });
      return re;
    } else {
      return {};
    }
  },
  /**
   *
   * @param {Array} arr 需要查找的数组
   * @param {*} value 被查找的值
   * @param {*} fromIndex 查找的起始位置
   * @returns {Number}  查找到的索引
   */
  indexOf: function (arr, value, fromIndex = 0) {
    if (!arr || value === undefined) {
      return -1;
    }
    fromIndex = this.paraToNum(fromIndex);
    if (fromIndex === null) {
      fromIndex = 0;
    }
    for (let i = fromIndex; i < arr.length; i++) {
      if (this.equalsTwoPara(arr[i], value)) {
        return i;
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
    if (arr.length == 0) {
      return [];
    } else {
      if (Array.isArray(arr[0])) {
        let re = arr.shift();
        return this.unfoldArrByJudge(
          arr,
          Array.isArray,
          (pre, current) =>
            this.getArrFromTwoArrBySome(pre, current, this.equalsTwoPara),
          () => [],
          re
        );
      } else {
        return [];
      }
    }
  },
  /**
   *
   * @param  {...Array|Object|Function|String} arr 需要查找交集的数组,以及查找的条件
   * @returns 返回符合要求的交集新数组
   */
  intersectionBy: function (...arr) {
    if (arr.length == 0) {
      return [];
    } else {
      if (arr.length === 1) {
        return this.intersection(...arr);
      } else if (arr.length >= 2) {
        if (Array.isArray(arr[arr.length - 1])) {
          return this.intersection(...arr);
        } else {
          let last = arr.pop();
          let transfer = this.getFunctionByPara(last);
          if (transfer === null) {
            return [];
          } else {
            return this.unfoldArrByJudge(
              arr,
              Array.isArray,
              (pre, current) => {
                return this.getArrFromTwoArrBySome(
                  pre,
                  current,
                  this.equalsTwoPara,
                  transfer
                );
              },
              () => [],
              arr[0]
            );
          }
        }
      }
    }
  },
  /**
   *
   * @param  {...Array|Object|Function|String} arr 需要查找交集的数组,以及查找的条件,条件接受两个参数
   * @returns 返回符合要求的交集新数组
   */
  intersectionWith: function (...arr) {
    if (arr.length == 0) {
      return [];
    } else if (arr.length === 1) {
      return this.intersection(...arr);
    } else {
      if (Array.isArray(arr[arr.length - 1])) {
        return this.intersection(...arr);
      } else if (typeof arr[arr.length - 1] != "function") {
        return [];
      } else {
        let judgeFun = arr.pop();
        return this.unfoldArrByJudge(
          arr,
          Array.isArray,
          (pre, current) => this.getArrFromTwoArrBySome(pre, current, judgeFun),
          () => [],
          arr[0]
        );
      }
    }
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param {*} separator 待拼接的字符
   * @returns {String} 返回使用字符拼接的字符串
   */
  join: function (arr, separator = ",") {
    if (!arr) {
      return "";
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
      if (this.equalsTwoPara(arr[i], value)) {
        return i;
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
   * @param {Array} arr 需要删除元素的数组,会修改原始数组
   * @param  {...any} values 待删除的元素
   * @returns {Array} 删除元素后的数组
   */
  pull: function (arr, ...values) {
    if (!Array.isArray(arr) || values.length == 0) {
      return arr;
    } else {
      for (let i = arr.length - 1; i >= 0; i--) {
        if (values.includes(arr[i])) {
          arr.splice(i, 1);
        }
      }
      return arr;
    }
  },
  /**
   *
   * @param {Array} arr 需要删除元素的数组
   * @param {Array} values 待删除元素的数组
   * @returns {Array} 返回删除元素后的数组
   */
  pullAll: function (arr, values) {
    if (!Array.isArray(arr) || values.length === 0) {
      return arr;
    } else {
      return this.pull(arr, ...values);
    }
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param {Array} values 需要移除的数组
   * @param {Array|Object|Function|String} iteratee 迭代调用每个元素
   * @returns 返回删除元素后的数组
   */
  pullAllBy: function (arr, values, iteratee = (it) => it) {
    if (!Array.isArray(arr) || values.length === 0) {
      return arr;
    } else {
      let transferFun = this.getFunctionByPara(iteratee);
      for (let i = arr.length - 1; i >= 0; i--) {
        if (
          values.some((item) =>
            this.equalsTwoPara(transferFun(item), transferFun(arr[i]))
          )
        ) {
          arr.splice(i, 1);
        }
      }
      return arr;
    }
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param {Array} values 需要移除的数组
   * @param {Function} comparator 比较函数
   * @returns 返回删除元素后的数组
   */
  pullAllWith: function (arr, values, comparator = this.equalsTwoPara) {
    if (arr.length == 0 || values.length == 0) {
      return arr;
    } else {
      if (typeof comparator == "function") {
        for (let i = arr.length - 1; i >= 0; i--) {
          if (values.some((item) => comparator(item, arr[i]))) {
            arr.splice(i, 1);
          }
        }
      }
      return arr;
    }
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param  {...any} indexes 待删除的索引数组
   * @returns {Array} 返回删除的索引元素组成的数组
   */
  pullAt: function (arr, ...indexes) {
    if (!Array.isArray(arr) || indexes.length == 0) {
      return [];
    } else {
      let re = [];
      indexes = this.unfoldArrByJudge(
        indexes,
        () => true,
        (pre, current) => pre.concat(current)
      );
      for (let i = 0; i < arr.length; i++) {
        if (arr[indexes[i]]) {
          re.push(arr[indexes[i]]);
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
  remove: function (arr, predicate = (it) => it) {
    if (!Array.isArray(arr)) {
      return [];
    } else {
      predicate = this.getFunctionByPara(predicate);
      let re = [];
      for (let i = 0; i < arr.length; i++) {
        if (predicate(arr[i], i, arr)) {
          re.push(arr[i]);
          arr.splice(i, 1);
        }
      }
      return re;
    }
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
   * @param {Number} start 起始索引
   * @param {Number} end 终止索引
   * @returns {Array} 返回切下的数组
   */
  slice: function (arr, start = 0, end = arr.length) {
    if (!arr) {
      return [];
    }
    let re = Array.from(arr);
    return re.slice(start, end);
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param {*} value 查找的元素
   * @returns {Number} 返回应该插入的索引
   */
  sortedIndex: function (arr, value) {
    if (!Array.isArray(arr)) {
      return 0;
    }
    let re = Array.from(arr);
    if (value === undefined) {
      return re.length;
    } else {
      let index = this.binarySearch(re, value);
      if (re[index] == value) {
        while (re[index] == value) {
          index--;
        }
        return index + 1;
      } else {
        return index;
      }
    }
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param {*} value 判断值
   * @param {Arrya|Function|Object|String} iteratee 迭代函数，调用每一个元素
   */
  sortedIndexBy: function (arr, value, iteratee = (it) => it) {
    if (!Array.isArray(arr)) {
      return 0;
    }
    let re = Array.from(arr);
    if (value === undefined) {
      return re.length;
    } else {
      iteratee = this.getFunctionByPara(iteratee);
      let index = this.binarySearch(re, value, iteratee);
      if (iteratee(re[index]) == iteratee(value)) {
        while (index >= 0 && iteratee(re[index]) == iteratee(value)) {
          index--;
        }
        return index + 1;
      } else {
        return index;
      }
    }
  },
  /**
   *
   * @param {Array} arr 需要查询的数组
   * @param {*} value 查找的值
   * @returns {Number} 返回索引
   */
  sortedIndexOf: function (arr, value) {
    if (!Array.isArray(arr)) {
      return -1;
    }
    let re = Array.from(arr);
    if (value === undefined) {
      return -1;
    }
    let index = this.binarySearch(re, value);
    if (re[index] == value) {
      while (re[index] == value) {
        index--;
      }
      return index + 1;
    } else {
      return -1;
    }
  },
  /**
   *
   * @param {Array} arr 元素数组
   * @param {*} value 查找的元素
   * @returns 尽可能大的返回元素的索引
   */
  sortedLastIndex: function (arr, value) {
    if (!Array.isArray(arr)) {
      return 0;
    }
    let re = Array.from(arr);
    if (value == undefined) {
      return re.length;
    } else {
      let index = this.binarySearch(re, value);
      if (re[index] === value) {
        while (re[index] === value) {
          index++;
        }
        return index;
      } else {
        return index;
      }
    }
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param {*} value 查找的元素
   * @param {Array|Function|Object|String} iteratee 迭代函数
   */
  sortedLastIndexBy: function (arr, value, iteratee = (it) => it) {
    if (!Array.isArray(arr)) {
      return 0;
    }
    let re = Array.from(arr);
    if (value == undefined) {
      return re.length;
    } else {
      iteratee = this.getFunctionByPara(iteratee);
      let index = this.binarySearch(re, value, iteratee);
      if (iteratee(re[index]) == iteratee(value)) {
        while (index < re.length && iteratee(re[index]) == iteratee(value)) {
          index++;
        }
        return index;
      } else {
        return index;
      }
    }
  },
  /**
   *
   * @param {Array} arr 需要查询的数组
   * @param {*} value 查找的值
   * @returns {Number} 返回索引
   */
  sortedLastIndexOf: function (arr, value) {
    if (!Array.isArray(arr)) {
      return -1;
    }
    let re = Array.from(arr);
    if (value === undefined) {
      return -1;
    }
    let index = this.binarySearch(re, value);
    if (re[index] === value) {
      while (re[index] == value) {
        index++;
      }
      return index - 1;
    } else {
      return -1;
    }
  },

  /**
   *
   * @param {Array} arr 原始数组
   * @returns 返回去重并排序的新数组
   */
  sortedUniq: function (arr) {
    if (!arr) {
      return [];
    }
    let re = Array.from(arr);
    re.sort((o1, o2) => o1 - o2);
    return this.uniq(re);
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param {Function} iteratee 迭代判断元素
   * @returns 返回排序并且去重后的新数组
   */
  sortedUniqBy: function (arr, iteratee = (it) => it) {
    if (!arr) {
      return [];
    }
    let re = Array.from(arr);
    re.sort((o1, o2) => o1 - o2);
    return re.reduce((pre, current) => {
      let temp = pre.map(iteratee);
      if (!temp.includes(iteratee(current))) {
        pre.push(current);
      }
      return pre;
    }, []);
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @returns {Array} 返回除原数组第一个元素以外的其他元素
   */
  tail: function (arr) {
    if (!arr) {
      return [];
    }
    let re = Array.from(arr);
    return re.slice(1);
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
    n = this.paraToNum(n);
    if (n < 0) {
      n = 0;
    }
    let re = Array.from(arr);
    return re.slice(0, n);
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
    n = this.paraToNum(n);
    if (n < 0) {
      return [];
    }
    let re = Array.from(arr);
    if (re.length <= n) {
      return re;
    }
    return re.slice(re.length - n);
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param {Array|Function|Object|String} predicate 迭代判断函数
   */
  takeRightWhile: function (arr, predicate = (it) => it) {
    if (!arr) {
      return [];
    }
    let re = Array.from(arr);
    predicate = this.getFunctionByPara(predicate);
    let result = [];
    for (let i = re.length - 1; i >= 0; i--) {
      if (predicate(re[i], i, re)) {
        result.unshift(re[i]);
      } else {
        break;
      }
    }
    return result;
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param {Array|Function|Object|Strin} predicate 迭代函数
   */
  takeWhile: function (arr, predicate = (it) => it) {
    if (!arr) {
      return [];
    }
    let re = Array.from(arr);
    predicate = this.getFunctionByPara(predicate);
    let flag = true;
    return re.reduce((pre, current, index, re) => {
      if (predicate(current, index, re) && flag) {
        pre.push(current);
      } else {
        flag = false;
      }
      return pre;
    }, []);
  },
  /**
   *
   * @param  {...Array} arr 需要判断的数组集合
   * @returns {Array} 返回一个包含所有数组并集的新数组
   */
  union: function (...arr) {
    if (arr.length == 0) {
      return [];
    }
    let obj = {};
    let re = arr.reduce((pre, current) => {
      current.forEach((item) => {
        if (item in obj) {
          obj[item]++;
        } else {
          obj[item] = 1;
          pre.push(item);
        }
      });
      return pre;
    }, []);
    re.sort((key1, key2) => obj[key2] - obj[key1]);
    return re;
  },
  /**
   *
   * @param  {...Array|Function} arr 原始数组,迭代判断函数
   * @returns 返回不包含重复元素并排序的新数组
   */
  unionBy: function (...arr) {
    if (arr.length == 0) {
      return [];
    } else if (arr.length == 1) {
      return this.union(...arr);
    } else {
      if (Array.isArray(arr[arr.length - 1])) {
        return this.union(...arr);
      } else {
        let last = arr.pop();
        let transferFun = this.getFunctionByPara(last);
        if (transferFun) {
          let obj = {};
          let re = this.unfoldArrByJudge(arr, Array.isArray, (pre, current) => {
            current.forEach((item) => {
              let temp = transferFun(item);
              if (temp in obj) {
                obj[temp]++;
              } else {
                obj[temp] = 1;
                pre.push(item);
              }
            });
            return pre;
          });
          re.sort((o1, o2) => (obj[transferFun(o2)] = obj[transferFun(o1)]));
          return re;
        } else {
          return [];
        }
      }
    }
  },
  /**
   *
   * @param  {...Array|comparator} arr 原始数组,比较函数
   * @returns 返回一个新的不包含重复元素的数组
   */
  unionWith: function (...arr) {
    if (arr.length == 0) {
      return [];
    } else if (arr.length == 1) {
      return this.union(...arr);
    } else {
      if (Array.isArray(arr[arr.length - 1])) {
        return this.union(...arr);
      } else {
        let last = arr.pop();
        if (typeof last == "function") {
          return this.unfoldArrByJudge(arr, Array.isArray, (pre, current) => {
            current.forEach((item) => {
              if (!pre.some((it) => last(it, item))) {
                pre.push(item);
              }
            });
            return pre;
          });
        } else {
          return [];
        }
      }
    }
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @returns {Array} 返回去重后的新数组
   */
  uniq: function (arr) {
    if (!arr) {
      return [];
    }
    let re = Array.from(arr);
    return re.reduce((pre, current) => {
      if (!pre.includes(current)) {
        pre.push(current);
      }
      return pre;
    }, []);
  },
  /**
   *
   * @param {...Array|Function|Object|String} arr 原始数组,迭代函数
   * @returns 返回一个通过迭代比较后的新数组
   */
  uniqBy: function (...arr) {
    if (arr.length == 0) {
      return [];
    } else if (arr.length == 1) {
      return this.uniq(...arr);
    } else {
      if (Array.isArray(arr[arr.length - 1])) {
        let re = arr.reduce((pre, current) => pre.concat(current), []);
        return this.uniq(re);
      } else {
        let last = arr.pop();
        let transferFun = this.getFunctionByPara(last);
        let re = arr.reduce((pre, current) => pre.concat(current), []);
        return re.reduce((pre, current) => {
          if (
            !pre.some((item) =>
              this.equalsTwoPara(transferFun(item), transferFun(current))
            )
          ) {
            pre.push(current);
          }
          return pre;
        }, []);
      }
    }
  },
  /**
   *
   * @param  {...any} arr 原始数组,比较函数comparator
   * @returns 返回一个通过比较后的新数组
   */
  uniqWith: function (...arr) {
    if (arr.length == 0) {
      return [];
    } else if (arr.length == 1) {
      return this.uniq(...arr);
    } else {
      if (Array.isArray(arr[arr.length - 1])) {
        let re = arr.reduce((pre, current) => pre.concat(current), []);
        return this.uniq(re);
      } else {
        let last = arr.pop();
        if (typeof last == "function") {
          let re = arr.reduce((pre, current) => pre.concat(current), []);
          return re.reduce((pre, current) => {
            if (!pre.some((item) => last(item, current))) {
              pre.push(current);
            }
            return pre;
          }, []);
        } else {
          return [];
        }
      }
    }
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @returns 返回拆分元素后的新数组
   */
  unzip: function (arr) {
    return this.unzipWith(arr);
  },
  /**
   *
   * @param {Array} arr 原始数组
   * @param {Function} iteratee 组合重组的值
   * @returns 返回值重组后的新对象
   */
  unzipWith: function (arr, iteratee = (...it) => it) {
    if (!Array.isArray(arr)) {
      return [];
    } else {
      let re = [];
      let maxIndex = 0;
      arr.forEach((item) => {
        if (Array.isArray(item)) {
          maxIndex = Math.max(maxIndex, item.length);
        }
      });
      let index = 0;
      while (index < maxIndex) {
        let temp = [];
        for (let i = 0; i < arr.length; i++) {
          if (Array.isArray(arr[i])) {
            temp.push(arr[i][index]);
          }
        }
        re.push(iteratee(...temp));
        index++;
      }
      return re;
    }
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
    let re = Array.from(arr);
    let result = [];
    re.forEach((item) => {
      if (!values.includes(item)) {
        result.push(item);
      }
    });
    return result;
  },
  /**
   *
   * @param  {...any} values 需要处理的参数
   * @returns {Array} 返回一个数组包含所有不重复出现的单个数组元素
   */
  xor: function (...values) {
    if (values.length == 0) {
      return [];
    }
    let temp = {};
    return this.unfoldArrByJudge(values, Array.isArray, (pre, current) => {
      current.forEach((item) => {
        let index = this.indexOf(pre, item);
        if (index == -1) {
          if (!temp[item]) {
            temp[item] = 1;
            pre.push(item);
          }
        } else {
          let re = pre.splice(index, 1);
        }
      });
      return pre;
    });
  },
  /**
   *
   * @param {...any|Array|Function|Object|String} arr 原始数组,迭代判断的函数
   * @returns 返回过滤数值后的新数组
   */
  xorBy: function (...arr) {
    if (arr.length == 0) {
      return [];
    } else if (arr.length == 1) {
      return this.xor(...arr);
    } else {
      if (Array.isArray(arr[arr.length - 1])) {
        return this.xor(...arr);
      } else {
        let last = arr.pop();
        let transferFun = this.getFunctionByPara(last);
        let temp = {};
        return this.unfoldArrByJudge(arr, Array.isArray, (pre, current) => {
          current.forEach((item) => {
            let index = this.myIndexOf(
              pre,
              item,
              this.equalsTwoPara,
              transferFun
            );
            if (index == -1) {
              if (!temp[transferFun(item)]) {
                temp[transferFun(item)] = 1;
                pre.push(item);
              }
            } else {
              pre.splice(index, 1);
            }
          });
          return pre;
        });
      }
    }
  },
  /**
   *
   * @param  {...any|Function} arr 原始数组,迭代比较函数
   * @returns 返回过滤后的新数组
   */
  xorWith: function (...arr) {
    if (arr.length == 0) {
      return [];
    } else if (arr.length == 1) {
      return this.xor(...arr);
    } else {
      if (Array.isArray(arr[arr.length - 1])) {
        return this.xor(...arr);
      } else {
        let last = arr.pop();
        if (typeof last == "function") {
          let del = [];
          return this.unfoldArrByJudge(arr, Array.isArray, (pre, current) => {
            current.forEach((item) => {
              let index = this.myIndexOf(pre, item, last);
              if (index == -1) {
                let delIndex = this.myIndexOf(del, item, last);
                if (delIndex == -1) {
                  pre.push(item);
                }
              } else {
                let delItem = pre.splice(index, 1);
                del = del.concat(delItem);
              }
            });
            return pre;
          });
        } else {
          return this.unfoldArrByJudge(arr, Array.isArray, (pre, current) => {
            pre.push(current);
            return pre;
          });
        }
      }
    }
  },

  /**
   *
   * @param  {...Array} arr 原始数组集合
   * @returns {Array} 返回新的数组
   */
  zip: function (...arr) {
    return this.zipWith(...arr);
  },

  /**
   *
   * @param {Array} props 作为对象属性名称的数组
   * @param {Array} values 作为对象属性值的数组
   * @returns {Object} 返回包含指定属性的对象
   */
  zipObject: function (props, values) {
    if (!Array.isArray(props) || !Array.isArray(values)) {
      return {};
    } else {
      let temp = Array.from(props);
      let re = {};
      temp.forEach((item, index) => {
        re[item] = values[index];
      });
      return re;
    }
  },
  /**
   *
   * @param {Array} props 属性标识符
   * @param {Array} values 属性值
   * @returns 返回一个新对象
   */
  zipObjectDeep: function (props, values) {
    if (!props || !values) {
      return {};
    } else {
      let next = [];
      let current = props.map((it) => {
        let index = it.lastIndexOf(".");
        next.push(it.substring(0, index));
        index = index == -1 ? 0 : index + 1;
        return it.substring(index);
      });
      let tIndex = current[0].indexOf("[");
      let newValues;
      if (tIndex != -1 || current[0] === current[1]) {
        newValues = {};
        tIndex = tIndex == -1 ? current[0].length : tIndex;
        newValues[current[0].substring(0, tIndex)] = values;
      } else {
        newValues = values.map((it, index) => {
          let newObj = {};
          newObj[current[index]] = it;
          return newObj;
        });
      }
      if (next[0].length > 0) {
        return this.zipObjectDeep(next, newValues);
      } else {
        return newValues;
      }
    }
  },
  /**
   *
   * @param  {...any|Function} arr 原始数组,组合分组的函数
   * @returns 返回分组后的新数组
   */
  zipWith: function (...arr) {
    if (arr.length == 0) {
      return [];
    } else if (arr.length == 1) {
      return Array.from(...arr);
    } else {
      let iteratee = null;
      if (Array.isArray(arr[arr.length - 1])) {
        iteratee = (...it) => it;
      } else {
        iteratee = arr.pop();
      }
      let re = [];
      let maxIndex = 0;
      arr.forEach((item) => {
        if (Array.isArray(item)) {
          maxIndex = Math.max(maxIndex, item.length);
        }
      });
      let index = 0;
      while (index < maxIndex) {
        let temp = [];
        for (let i = 0; i < arr.length; i++) {
          if (Array.isArray(arr[i])) {
            temp.push(arr[i][index]);
          }
        }
        re.push(iteratee(...temp));
        index++;
      }
      return re;
    }
  },

  // Collection

  // 自定义
  /**
   *
   * @param {Array|Object} obj 创建一个对象的复制
   * @returns 返回复制的对象
   */
  cloneObj: function (obj) {
    if (
      typeof obj === "string" ||
      typeof obj === "number" ||
      typeof obj === "boolean"
    ) {
      return obj;
    } else {
      let re;
      if (Array.isArray(obj)) {
        re = [];
      } else {
        re = {};
      }
      for (let key in obj) {
        re[key] = this.cloneObj(obj[key]);
      }
      return re;
    }
  },

  /**
   *
   * @param {Object|Array} collection 原始集合
   * @param {Function} judgeFun 比较函数
   * @returns 返回排序好的集合
   */
  mergeSort: function (collection, judgeFun = (o1, o2) => o1 - o2) {
    if (!Array.isArray(collection)) {
      throw new TypeError("当前排序仅支持数组");
    }
    if (collection.length < 2) {
      return collection;
    } else {
      let min = (collection.length / 2) | 0;
      let left = this.mergeSort(collection.slice(0, min), judgeFun);
      let right = this.mergeSort(collection.slice(min), judgeFun);
      let re = [];
      let i = 0,
        j = 0;
      while (i < left.length && j < right.length) {
        if (judgeFun(left[i], right[j]) < 0 || !judgeFun(left[i], right[j])) {
          re.push(left[i++]);
        } else {
          re.push(right[j++]);
        }
      }
      while (i < left.length) {
        re.push(left[i++]);
      }
      while (j < right.length) {
        re.push(right[j++]);
      }
      return re;
    }
  },

  // 原生
  /**
   *
   * @param {Array|Object} collection 一个用来迭代的集合
   * @param {Array|Function|Object|String} iteratee 迭代函数,转换key
   * @returns 返回新对象
   */
  countBy: function (collection, iteratee = (it) => it) {
    let re = {};
    iteratee = this.getFunctionByPara(iteratee);
    if (typeof collection == "object") {
      for (let temp in collection) {
        let key = iteratee(collection[temp]);
        if (key in re) {
          re[key]++;
        } else {
          re[key] = 1;
        }
      }
    }
    return re;
  },

  /**
   *
   * @param {Array|Object} collection 原始集合
   * @param {Array|Function|Object|String} predicate 每次迭代调用的函数
   * @returns 返回断言判断后的值
   */
  every: function (collection, predicate = (it) => it) {
    let re = true;
    predicate = this.getFunctionByPara(predicate);
    if (typeof collection == "object") {
      for (let key in collection) {
        re = re && predicate(collection[key], key, collection);
        if (!re) {
          break;
        }
      }
    }
    return re;
  },

  /**
   *
   * @param {Array|Object} collection 原始集合
   * @param {Array|Function|Object|String} predicate 每次迭代调用的函数
   * @returns 返回一个新数组
   */
  filter: function (collection, predicate = (it) => it) {
    let re = [];
    predicate = this.getFunctionByPara(predicate);
    if (typeof collection == "object") {
      for (let key in collection) {
        if (predicate(collection[key], key, collection)) {
          re.push(collection[key]);
        }
      }
    }
    return re;
  },
  /**
   *
   * @param {Array|Object} collection 原始集合
   * @param {Array|Function|Object|String} predicate 每次迭代调用的函数
   * @param {Number} fromIndex 判断起始位置
   * @returns 返回找到的元素
   */
  find: function (collection, predicate = (it) => it, fromIndex = 0) {
    predicate = this.getFunctionByPara(predicate);
    fromIndex = this.paraToNum(fromIndex);
    if (fromIndex < 0) {
      fromIndex = 0;
    }
    if (typeof collection == "object") {
      let start = 0;
      for (let key in collection) {
        if (start++ >= fromIndex) {
          if (predicate(collection[key], key, collection)) {
            return collection[key];
          }
        }
      }
    }
  },
  /**
   *
   * @param {Array|Object} collection 原始集合
   * @param {Array|Function|Object|String} predicate 每次迭代调用的函数
   * @param {Number} fromIndex 判断起始位置
   * @returns 返回找到的元素
   */
  findLast: function (
    collection,
    predicate = (it) => it,
    fromIndex = collection.length - 1
  ) {
    predicate = this.getFunctionByPara(predicate);
    fromIndex = this.paraToNum(fromIndex);
    if (fromIndex > 0) {
      if (typeof collection == "object") {
        let temp = Object.keys(collection);
        for (let i = fromIndex; i >= 0; i--) {
          if (predicate(collection[temp[i]], temp[i], collection)) {
            return collection[temp[i]];
          }
        }
      }
    }
  },
  /**
   *
   * @param {Array|Object} collection 原始集合
   * @param {Array|Function|Object|string} iteratee 迭代调用函数
   * @returns 返回一个新数组
   */
  flatMap: function (collection, iteratee = (it) => it) {
    let re = [];
    iteratee = this.getFunctionByPara(iteratee);
    if (typeof collection == "object") {
      for (let key in collection) {
        re = re.concat(iteratee(collection[key], key, collection));
      }
    }
    return re;
  },
  /**
   *
   * @param {Array|Object} collection 原始集合
   * @param {Array|Function|Object|string} iteratee 迭代调用函数
   * @returns 返回一个原始集合持续扁平后的数组
   */
  flatMapDeep: function (collection, iteratee = (it) => it) {
    let re = [];
    iteratee = this.getFunctionByPara(iteratee);
    if (typeof collection == "object") {
      for (let key in collection) {
        let temp = iteratee(collection[key], key, collection);
        temp = this.flattenDeep(temp);
        re = re.concat(temp);
      }
    }
    return re;
  },

  /**
   *
   * @param {Array|Object} collection 原始集合
   * @param {Array|Function|Object|string} iteratee 迭代调用函数
   * @param {*} depth 指定扁平化深度
   * @returns 返回一个扁平化后的数组
   */
  flatMapDepth: function (collection, iteratee = (it) => it, depth = 1) {
    iteratee = this.getFunctionByPara(iteratee);
    depth = this.paraToNum(depth);
    let re = [];
    if (typeof collection == "object") {
      for (let key in collection) {
        let temp = iteratee(collection[key], key, collection);
        if (depth > 1) {
          temp = this.flattenDepth(temp, depth - 1);
        }
        re = re.concat(temp);
      }
    }
    return re;
  },

  /**
   *
   * @param {Array|Object} collection 一个用来迭代的集合
   * @param {Function} iteratee 每次迭代调用的函数
   */
  forEach: function (collection, iteratee = (it) => it) {
    if (typeof collection == "object") {
      for (let key in collection) {
        let re = iteratee(collection[key], key, collection);
        if (re == false) {
          break;
        }
      }
    }
    return collection;
  },

  /**
   *
   * @param {Array|Object} collection 一个用来迭代的集合
   * @param {Function} iteratee 每次迭代调用的函数
   */
  forEachRight: function (collection, iteratee = (it) => it) {
    if (typeof collection == "object") {
      let keys = Object.keys(collection);
      keys.reverse();
      this.forEach(keys, (key) => iteratee(collection[key], key, collection));
    }
    return collection;
  },

  /**
   *
   * @param {Array|Object} collection 一个用来迭代的集合
   * @param {Array|Function|Object|String} 转换key的迭代函数
   * @returns 返回组成的聚合对象
   */
  groupBy: function (collection, iteratee = (it) => it) {
    iteratee = this.getFunctionByPara(iteratee);
    let re = {};
    if (typeof collection == "object") {
      for (let key in collection) {
        let tKey = iteratee(collection[key]);
        if (!re[tKey]) {
          re[tKey] = Array.of(collection[key]);
        } else {
          re[tKey].push(collection[key]);
        }
      }
    }
    return re;
  },
  /**
   *
   * @param {Array|Object|String} collection 要检索的集合
   * @param {*} value 查找的值
   * @param {Number} fromIndex 开始查找的索引
   * @returns {Boolean} 返回是否存在的布尔值
   */
  includes: function (collection, value, fromIndex = 0) {
    fromIndex = this.paraToNum(fromIndex);
    if (value === undefined) {
      return false;
    } else {
      if (typeof collection == "string") {
        if (typeof value != "string") {
          return false;
        } else {
          for (let i = fromIndex; i < collection.length; i++) {
            if (collection.substr(i, value.length) === value) {
              return true;
            }
          }
        }
      } else if (typeof collection == "object") {
        let index = 0;
        for (let key in collection) {
          if (index >= fromIndex) {
            if (collection[key] === value) {
              return true;
            }
          }
          index++;
        }
      }
    }
    return false;
  },
  /**
   *
   * @param {Array|Object} collection 迭代的集合
   * @param {Array|Function|String} path 用来调用方法的路径或者每次迭代调用的函数
   * @param  {...any} args 调用每个方法的参数
   * @returns 返回结果数组
   */
  invokeMap: function (collection, path, ...args) {
    let re = [];
    if (typeof collection == "object") {
      for (let key in collection) {
        if (typeof path == "function") {
          let temp = path.call(collection[key], ...args);
          re.push(temp);
        } else {
          let temp = this.getFunctionByPara(path)(collection[key]).call(
            collection[key],
            ...args
          );
          re.push(temp);
        }
      }
    }
    return re;
  },
  /**
   *
   * @param {Array|Object} collection 原始迭代集合
   * @param {Array|Function|Object|String} iteratee 迭代转换key
   * @returns 返回新的聚合对象
   */
  keyBy: function (collection, iteratee = (it) => it) {
    let re = {};
    iteratee = this.getFunctionByPara(iteratee);
    if (typeof collection == "object") {
      for (let key in collection) {
        let temp = iteratee(collection[key]);
        re[temp] = collection[key];
      }
    }
    return re;
  },
  /**
   *
   * @param {Array|Object} collection 原始集合
   * @param {Array|Function|Object|String} iteratee 每次迭代调用的函数
   * @returns 返回新的映射后的数组
   */
  map: function (collection, iteratee = (it) => it) {
    let re = [];
    iteratee = this.getFunctionByPara(iteratee);
    if (typeof collection == "object") {
      for (let key in collection) {
        if (!isNaN(collection[key]) && !isNaN(key)) {
          re.push(iteratee(Number(collection[key]), Number(key), collection));
        } else {
          re.push(iteratee(collection[key], key, collection));
        }
      }
    }
    return re;
  },
  /**
   *
   * @param {Array|Object} collection 原始集合
   * @param {Array[]|Function[]|Object[]|String[]} iteratees 排序迭代函数
   * @param {String[]} orders 排序顺序
   * @returns 返回排序后的新数组
   */
  orderBy: function (collection, iteratees = (it) => it, orders = "asc") {
    let re = [];
    if (!Array.isArray(iteratees)) {
      iteratees = Array.of(iteratees);
      orders = Array.of(orders);
    }
    if (typeof collection == "object") {
      re = this.cloneObj(collection);
      for (let i = 0; i < iteratees.length; i++) {
        let orderRe = orders[i] == "asc" ? true : false;
        let transferFun = this.getFunctionByPara(iteratees[i]);
        re = this.mergeSort(re, (o1, o2) => {
          if (transferFun(o1) > transferFun(o2)) {
            return orderRe;
          } else {
            return !orderRe;
          }
        });
      }
    }
    return re;
  },
  /**
   *
   * @param {Array|Object} collection 原始集合
   * @param {Array|Function|Object|String} predicate 每次迭代调用的函数
   * @returns 返回元素分组后的新数组
   */
  partition: function (collection, predicate = (it) => it) {
    let re = [];
    predicate = this.getFunctionByPara(predicate);
    if (typeof collection == "object") {
      re[0] = [];
      re[1] = [];
      for (let key in collection) {
        if (predicate(collection[key])) {
          re[0].push(collection[key]);
        } else {
          re[1].push(collection[key]);
        }
      }
    }
    return re;
  },
  /**
   *
   * @param {Array|Object} collection 原始集合
   * @param {Function} iteratee 每次迭代调用的函数
   * @returns {*} accumulator 初始值
   * @returns 返回累计叠加后的值
   */
  reduce: function (collection, iteratee = (it) => it, accumulator) {
    iteratee = this.getFunctionByPara(iteratee);
    if (typeof collection == "object") {
      for (let key in collection) {
        if (accumulator === undefined) {
          accumulator = collection[key];
        } else {
          accumulator = iteratee(accumulator, collection[key], key, collection);
        }
      }
    }
    return accumulator;
  },
  /**
   *
   * @param {Array|Object} collection 原始集合
   * @param {Function} iteratee 每次迭代调用的函数
   * @returns {*} accumulator 初始值
   * @returns 返回累计叠加后的值
   */
  reduceRight: function (collection, iteratee = (it) => it, accumulator) {
    iteratee = this.getFunctionByPara(iteratee);
    if (typeof collection == "object") {
      let keys = Object.keys(collection);
      for (let i = keys.length - 1; i >= 0; i--) {
        if (accumulator === undefined) {
          accumulator = collection[keys[i]];
        } else {
          accumulator = iteratee(
            accumulator,
            collection[keys[i]],
            keys[i],
            collection
          );
        }
      }
    }
    return accumulator;
  },

  /**
   *
   * @param {Array|Object} collection 原始集合
   * @param {Array|Function|Object|String} predicate 迭代调用的函数
   * @returns 返回过滤后的新数组,filter的反向方法
   */
  reject: function (collection, predicate = (it) => it) {
    let re = [];
    predicate = this.getFunctionByPara(predicate);
    if (typeof collection == "object") {
      for (let key in collection) {
        if (!predicate(collection[key], key, collection)) {
          re.push(collection[key]);
        }
      }
    }
    return re;
  },
  /**
   *
   * @param {Object|Array} collection 原始集合
   * @returns {*} 返回可迭代数组/对象中的随机元素
   */
  sample: function (collection) {
    if (typeof collection == "object") {
      let temp = Object.keys(collection);
      return collection[temp[(Math.random() * temp.length) | 0]];
    } else {
      return undefined;
    }
  },
  /**
   *
   * @param {Object|Array} collection 原始集合
   * @param {Number} n 取样的元素个数
   * @returns {Array} 返回随机元素组成的数组
   */
  sampleSize: function (collection, n = 1) {
    n = this.paraToNum(n);
    if (n === null || n < 0) {
      return [];
    } else {
      let re = [];
      if (typeof collection == "object") {
        let temp = Object.keys(collection);
        while (re.length < n && temp.length) {
          let key = (Math.random() * temp.length) | 0;
          re.push(collection[temp[key]]);
          temp.splice(key, 1);
        }
      }
      return re;
    }
  },
  /**
   *
   * @param {Object|Array} collection 原始集合
   * @returns {Array} 返回一个随机排序的数组
   */
  shuffle: function (collection) {
    if (typeof collection == "object") {
      return this.sampleSize(collection, Object.keys(collection).length);
    } else {
      return [];
    }
  },
  /**
   *
   * @param {Object|Array|String} collection 原始集合
   * @returns {Number} 返回对应的长度
   */
  size: function (collection) {
    if (typeof collection == "object") {
      return Object.keys(collection).length;
    } else if (typeof collection == "string") {
      return collection.length;
    } else {
      return 0;
    }
  },

  /**
   *
   * @param {Array|Collection} collection 原始集合
   * @param {Array|Function|Object|String} predicate 迭代判断函数
   * @returns 如果任意元素经 predicate 检查都为 truthy（真值），返回 true ，否则返回 false 。
   */
  some: function (collection, predicate = (it) => it) {
    let re = false;
    predicate = this.getFunctionByPara(predicate);
    if (typeof collection == "object") {
      for (let key in collection) {
        re = re || predicate(collection[key], key, collection);
        if (re) {
          break;
        }
      }
    }
    return re;
  },

  /**
   *
   * @param {Array|Object} collection 原始集合
   * @param {*} iteratees
   */
  sortBy: function (collection, iteratees = (it) => it) {},

  /**
   * @returns 返回Unix纪元到现在的毫秒数
   */
  now: function () {
    return new Date().getTime();
  },

  // 函数

  /**
   *
   * @param {Number} n 方法应该在调用多少次后执行
   * @param {Function} func 用来限定的函数
   * @returns 返回新的函数
   */
  after: function (n, func) {
    let count = 0;
    return function (...args) {
      count++;
      if (count >= n) {
        func.call(this, ...args);
      }
    };
  },

  /**
   *
   * @param {Function} func 需要被限制参数个数的函数
   * @param {Number} n 限制的参数列表数量
   * @returns 返回新的覆盖函数
   */
  ary: function (func, n = func.length) {
    n = this.paraToNum(n);
    return function (...args) {
      return func.call(this, ...args.slice(0, n));
    };
  },

  /**
   *
   * @param {Number} n 超过多少次不再调用函数
   * @param {Function} func 限制执行的函数
   */
  before: function (n, func) {
    let count = 0;
    let re = null;
    return function (...args) {
      count++;
      if (count <= n) {
        re = func.call(this, ...args);
        return re;
      } else {
        return re;
      }
    };
  },

  /**
   *
   * @param {Function} func 需要绑定参数的函数
   * @param {*} thisArg 绑定的this对象
   * @param  {...any} partials 附加的部分参数
   * @returns 返回新的绑定函数
   */
  bind: function (func, thisArg, ...partials) {
    return (...args) => {
      let index = -1;
      while ((index = this.indexOf(partials, "_")) != -1 && args.length > 0) {
        partials[index] = args.shift();
      }
      return func.call(thisArg, ...partials.concat(args));
    };
  },

  /**
   *
   * @param {Function} func 需要绑定参数的函数
   * @param {*} thisArg 绑定的this对象
   * @param  {...any} partials 附加的部分参数
   * @returns 返回新的绑定函数
   */
  bindRight: function (func, thisArg, ...partials) {
    return (...args) => {
      let index = -1;
      while ((index = this.indexOf(partials, "_")) != -1 && args.length > 0) {
        partials[index] = args.pop();
      }
      return func.call(thisArg, ...args.concat(partials));
    };
  },

  /**
   *
   * @param {Object} obj 需要绑定的对象
   * @param {String} key 需要绑定的对象的键
   * @param  {...any} partials 附加的部分参数
   * @returns 返回新的绑定函数
   */
  bindKey: function (obj, key, ...partials) {
    return (...args) => {
      let index = -1;
      while ((index = this.indexOf(partials, "_")) != -1 && args.length > 0) {
        partials[index] = args.shift();
      }
      return obj[key](...partials.concat(args));
    };
  },

  /**
   *
   * @param {Function} func 用来curry的函数
   * @param {Number} arity 需要提供给func的参数数量
   * @returns 返回新的curry函数
   */
  curry: function (func, arity = func.length) {
    let myLodash = this;
    return function (...args) {
      if (args.length >= arity) {
        return func.call(this, ...args);
      } else {
        let last = arity - args.length;
        return myLodash.curry(func.bind(this, ...args), last);
      }
    };
  },

  /**
   *
   * @param {Function} func 用来curry的函数
   * @param {Number} arity 需要提供给 func 的参数数量
   * @returns 返回新的curry函数
   */
  curryRight: function (func, arity = func.length) {
    let myLodash = this;
    return function (...args) {
      if (args.length >= arity) {
        return func.call(this, ...args);
      } else {
        let last = arity - args.length;
        return myLodash.curryRight(
          myLodash.bindRight(func, this, ...args),
          last
        );
      }
    };
  },

  /**
   *
   * @param {Function} func 需要防抖动的函数
   * @param {NUmber} wait 延迟的毫秒数
   * @param {Objetc} options 选项对象
   * [options.leading=false] (boolean): 指定在延迟开始前调用
   * [options.maxWait] (number): 设置 func 允许被延迟的最大值
   * [options.trailing=true] (boolean): 指定在延迟结束后调用
   * @returns 返回新的防抖动函数
   */
  debounce: function (func, wait = 0, options = {}) {},

  /**
   *
   * @param {Functon} func 需要延迟的函数
   * @param  {...any} args 调用时传给func的参数
   * @returns 返回计时器id
   */
  defer: function (func, ...args) {},

  /**
   *
   * @param {Function} func 需要延迟的函数
   * @param {Number} wait 延迟的毫秒数
   * @param  {...any} args 调用时传给func的函数
   * @returns 返回定时器id
   */
  delay: function (func, wait, ...args) {
    return setTimeout(
      (...args) => {
        func(...args);
      },
      wait,
      ...args
    );
  },

  /**
   *
   * @param {Function} func 需要翻转参数的函数
   * @returns 返回新的函数
   */
  flip: function (func) {
    return function (...args) {
      return func.call(this, ...args.reverse());
    };
  },

  /**
   *
   * @param {Function} func 需要缓存化的函数
   * @param {Function} resolver 这个函数的返回值作为key
   * @returns 返回缓存化后的函数
   */
  memoize: function (func, resolver) {},

  /**
   *
   * @param {Function} predicate 需要对结果取反的函数
   * @returns 返回一个新的取反函数
   */
  negate: function (predicate) {
    return function (...args) {
      return !predicate.call(this, ...args);
    };
  },

  /**
   *
   * @param {Function} func 需要限制的函数
   * @returns 返回新的只能调用一次的函数
   */
  once: function (func) {
    let count = 0;
    let re = null;
    return function (...args) {
      if (count < 1) {
        count++;
        re = func.call(this, ...args);
        return re;
      } else {
        return re;
      }
    };
  },

  /**
   *
   * @param {Function} func 需要转换参数的函数
   * @param {*} transforms 转换参数的函数
   * @returns 返回新的函数
   */
  overArgs: function (func, transforms = (it) => it) {
    if (!Array.isArray(transforms)) {
      transforms = Array.of(transforms);
    }
    let myLodash = this;
    return function (...args) {
      myLodash.forEach(transforms, (item) => {
        args = myLodash.map(args, item);
      });
      return func.call(this, ...args);
    };
  },

  /**
   *
   * @param {Function} func 需要预设的函数
   * @param {...any} partials 预设的参数
   * @returns 返回预设参数的函数
   */
  partial: function (func, ...partials) {
    let myLodash = this;
    return function (...args) {
      let index = -1;
      while (
        (index = myLodash.indexOf(partials, "_")) != -1 &&
        args.length > 0
      ) {
        partials[index] = args.shift();
      }
      return func.call(this, ...partials.concat(args));
    };
  },

  /**
   *
   * @param {Function} func 需要预设的函数
   * @param  {...any} partials 预设的参数
   * @returns 返回预设参数的函数
   */
  partialRight: function (func, ...partials) {
    let myLodash = this;
    return function (...args) {
      let index = -1;
      while (
        (index = myLodash.indexOf(partials, "_")) != -1 &&
        args.length > 0
      ) {
        partials[index] = args.pop();
      }
      return func.call(this, ...args.concat(partials));
    };
  },

  /**
   *
   * @param {Function} func 待调用的函数
   * @param {Number[]} indexes 排列参数的位置
   * @returns 返回新的函数
   */
  rearg: function (func, indexes) {
    return function (...args) {
      let newArgs = [];
      indexes.forEach((item, index) => {
        newArgs[index] = args[item];
      });
      return func.call(this, ...newArgs);
    };
  },

  /**
   *
   * @param {Function} func 需要reset的函数
   * @param {Number} start reset参数开始的位置
   * @returns 返回新的函数
   */
  rest: function (func, start = func.length - 1) {
    return function (...args) {
      let arrPara = args.splice(start, args.length - start);
      return func.call(this, ...args, arrPara);
    };
  },

  /**
   *
   * @param {Function} func 需要spread参数的函数
   * @param {Number} start 传播参数开始的位置
   * @returns 返回新的函数
   */
  spread: function (func, start = 0) {
    return function (...args) {
      let newArgs = args.splice(start, args.length);
      return func.call(this, ...args, newArgs);
    };
  },

  throttle: function (func, wait, options) {},

  /**
   *
   * @param {Function} func 需要处理的函数
   * @returns 返回新的函数
   */
  unary: function (func) {
    return function (...args) {
      return func.call(this, args[0]);
    };
  },

  /**
   *
   * @param {*} value 需要包装的值
   * @param {Function} wrapper 包装的函数
   * @returns 返回新的函数
   */
  wrap: function (value, wrapper) {
    return function (...args) {
      return wrapper.call(this, value, ...args);
    };
  },

  // Lang

  /**
   *
   * @param {*} value 如果value不是数组,强制转换为数组
   * @returns 返回转换后的数组
   */
  castArray: function (value) {
    if (Array.isArray(value)) {
      return value;
    } else {
      return Array.of(value);
    }
  },

  /**
   *
   * @param {*} value 创建value的浅拷贝
   * @returns 返回拷贝后的值
   */
  clone: function (value) {
    if (Array.isArray(value)) {
      let re = [];
      value.forEach((it) => {
        re.push(it);
      });
      return re;
    } else if (typeof value == "object") {
      let re = {};
      for (let key in value) {
        re[key] = value[key];
      }
      return re;
    } else {
      return value;
    }
  },

  /**
   *
   * @param {*} value 需要深拷贝的对象
   * @returns 返回克隆的对象
   */
  cloneDeep: function (value) {
    if (Array.isArray(value)) {
      let re = [];
      value.forEach((item) => {
        re.push(this.cloneDeep(item));
      });
      return re;
    } else if (typeof value == "object") {
      let re = {};
      for (let key in value) {
        re[key] = this.cloneDeep(value[key]);
      }
      return re;
    } else {
      return value;
    }
  },

  /**
   *
   * @param {*} value 需要克隆的原始原始
   * @param {Function} customizer 克隆函数
   * @returns 返回克隆的对象
   */
  cloneDeepWith: function (value, customizer) {},

  /**
   *
   * @param {*} value 需要克隆的值
   * @param {Function} customizer 克隆函数
   * @returns 返回克隆的值
   */
  cloneWith: function (value, customizer) {},

  /**
   *
   * @param {Object} object 需要检查的对象
   * @param {Object} source 要断言属性是否符合的对象
   * @returns 返回是否符合
   */
  conformsTo: function (object, source) {
    for (let key in source) {
      if (typeof source[key] == "function") {
        if (!source[key](object[key])) {
          return false;
        }
      } else {
        if (source[key] === object[key]) {
          return false;
        }
      }
    }
    return true;
  },

  /**
   *
   * @param {*} value 传入的参数一
   * @param {*} other 传入的参数二
   * @returns {Boolean} 返回两个参数是否相同的布尔值
   */
  eq: function (value, other) {
    return this.equalsTwoPara(value, other);
  },

  /**
   *
   * @param {*} value 需要比较的值
   * @param {*} other 另一个比较的值
   * @returns 返回比较的boolean值
   */
  qt: function (value, other) {
    value = this.paraToNum(value);
    other = this.paraToNum(other);
    return value > other;
  },

  /**
   *
   * @param {*} value 需要比较的值
   * @param {*} other 另一个要比较的值
   * @returns 返回比较的boolean值
   */
  gte: function (value, other) {
    value = this.paraToNum(value);
    other = this.paraToNum(other);
    return value >= other;
  },

  /**
   *
   * @param {*} value 要检测的对象
   * @returns 返回是否是一个类数组对象
   */
  isArguments: function (value) {
    if (Array.isArray(value)) {
      return false;
    } else if (typeof value != "object") {
      return false;
    } else {
    }
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回是否是一个数组
   */
  isArray: function (value) {
    return Array.isArray(value);
  },

  /**
   *
   * @param {*} value 需要判断的对象
   * @returns 返回判断的boolean值
   */
  isArrayBuffer: function (value) {
    return ArrayBuffer.isView(value);
  },

  /**
   *
   * @param {*} value 需要判断的对象
   * @returns 返回判断的boolean值
   */
  isArrayLike: function (value) {
    if (Array.isArray(value)) {
      return true;
    } else if (Object.prototype.hasOwnProperty.call(value, "length")) {
      if (
        parseInt(value.length) == value.length &&
        value.length >= 0 &&
        value.length <= Number.MAX_SAFE_INTEGER
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isArrayLikeObject: function (value) {
    return typeof value == "object" && this.isArrayLike(value);
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的结果
   */
  isBoolean: function (value) {
    return value instanceof Boolean;
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isBuffer: function (value) {},

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isDate: function (value) {
    return value instanceof Date;
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isElement: function (value) {
    return value instanceof Node;
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isEmpty: function (value) {
    if (this.isArrayLike(value)) {
      return value.length == 0;
    } else {
      if (Object.prototype.hasOwnProperty.call(value, "size")) {
        return value.size == 0;
      } else {
        let count = 0;
        for (let key in value) {
          count++;
        }
        return count == 0;
      }
    }
  },

  /**
   *
   * @param {*} value 需要比较的值
   * @param {*} other 另一个比较的值
   * @returns 返回比较结果
   */
  isEqual: function (value, other) {
    if (typeof value == "object") {
      for (let key in value) {
        if (!this.isEqual(value[key], other[key])) {
          return false;
        }
      }
      return true;
    } else {
      return this.equalsTwoPara(value, other);
    }
  },

  /**
   *
   * @param {*} value 需要比较的值
   * @param {*} other 另一个比较的值
   * @param {Function} customizer 如何进行比较的函数
   * @returns 返回比较结果
   */
  isEqualWith: function (value, other, customizer = this.equalsTwoPara) {},

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isError: function (value) {
    return value instanceof Error;
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回是否是否是有限数值的判断值
   */
  isFinite: function (value) {
    if (typeof value === "number") {
      if (value === Infinity || value === -Infinity) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isFunction: function (value) {
    return value instanceof Function;
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isInteger: function (value) {
    if (this.isFinite(value)) {
      return parseInt(value) === value;
    } else {
      return false;
    }
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isLength: function (value) {
    if (this.isInteger(value)) {
      return value >= 0;
    } else {
      return false;
    }
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isMap: function (value) {
    return value instanceof Map;
  },

  /**
   *
   * @param {*} object
   * @param {*} source
   */
  isMatch: function (object, source) {
    for (let key in source) {
      if (!this.isEqual(object[key], source[key])) {
        return false;
      }
    }
    return true;
  },

  /**
   *
   * @param {*} object
   * @param {*} source
   */
  isMatchWith: function (object, source, customizer = this.equalsTwoPara) {
    for (let key in source) {
      if (!customizer(object[key], source[key], key, object, source)) {
        return false;
      }
    }
    return true;
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回value是否是NaN
   */
  isNaN: function (value) {
    if (typeof value == "number") {
      return isNaN(value);
    } else {
      return false;
    }
  },

  /**
   *
   * @param {*} value 需要检测的函数
   * @returns 返回被检测的函数是否是一个本地函数
   */
  isNative: function (value) {},

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回被检测的值是否是一个null或者undifiend
   */
  isNil: function (value) {
    return value === null || value === undefined;
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回被检测的值是否是null
   */
  isNull: function (value) {
    return value === null;
  },

  /**
   *
   * @param {*} value 要检查的值
   * @returns 返回value是否是一个数字
   */
  isNumber: function (value) {
    return typeof value === "number";
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isObject: function (value) {
    return value instanceof Object;
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isObjectLike: function (value) {
    if (value !== null && value !== undefined) {
      return typeof value == "object";
    } else {
      return false;
    }
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isPlainObject: function (vale) {
    if (this.isObjectLike(vale)) {
      return vale.__proto__ === Object.prototype;
    } else {
      return false;
    }
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isRegExp: function (value) {
    return value instanceof RegExp;
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isSafeInteger: function (value) {
    if (this.isInteger(value)) {
      return (
        value <= Number.MAX_SAFE_INTEGER && value >= Number.MIN_SAFE_INTEGER
      );
    } else {
      return false;
    }
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isSet: function (value) {
    return value instanceof Set;
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isString: function (value) {
    return typeof value === "string";
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isSymbol: function (value) {
    return value instanceof Symbol;
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isTypedArray: function (value) {},

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isUndefined: function (value) {
    return value === undefined;
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isWeakMap: function (value) {
    return value instanceof WeakMap;
  },

  /**
   *
   * @param {*} value 需要检测的值
   * @returns 返回判断的boolean值
   */
  isWeakSet: function (value) {
    return value instanceof WeakSet;
  },

  /**
   *
   * @param {*} value 需要比较的值
   * @param {*} other 另一个比较的值
   * @returns 返回value是否小于other
   */
  lt: function (value, other) {
    return this.paraToNum(value) < this.paraToNum(other);
  },

  /**
   *
   * @param {*} value 需要比较的值
   * @param {*} other 另一个比较的值
   * @returns 返回value是否小于等于other
   */
  lte: function (value, other) {
    return this.paraToNum(value) <= this.paraToNum(other);
  },
};
