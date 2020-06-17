var mrwangjusttodo = {
  // 自定义方法
  /**
   *
   * @param {Array} arr 待展开的数组
   * @param {Function} test 需要满足的条件
   * @param {Function} action1 判断成功后执行的操作
   * @param {Function} action2 判断失败后执行的操作
   * @param {Array} init 展开数组开始时的初始值
   * @returns {Array} 返回展开后的新数组
   */
  unfoldArrByJudge: function (
    arr,
    test,
    action1,
    action2 = (pre) => pre,
    init = []
  ) {
    return arr.reduce((pre, current) => {
      if (test(current)) {
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
   * @param {*} target 查找的目标元素
   * @param {Function} transfer 转换元素的函数
   * @returns {Number} 返回索引
   */
  binarySearch: function (arr, target, transfer = (it) => it) {
    let start = 0;
    let end = arr.length - 1;
    while (end >= start) {
      let m = ((start + end) / 2) | 0;
      let p1 = transfer(arr[m]);
      let p2 = transfer(target);
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
  matches: function (obj) {
    return function (para) {
      for (let prop in obj) {
        if (para[prop] != obj[prop]) {
          return false;
        }
      }
      return true;
    };
  },
  /**
   *
   * @param {Array|Function|Object|String} para 传入的元素
   * @returns 根据传入的元素判断函数
   */
  judegFunByOnePara: function (para) {
    let re = null;
    if (typeof para == "object") {
      if (Array.isArray(para)) {
        para = this.matchesProperty(para);
      }
      re = this.matches(para);
    } else if (typeof para == "function") {
      re = para;
    } else if (typeof para == "string") {
      re = (it) => it[para];
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
    judge = this.equalsTwoPara,
    transfer = (it) => it
  ) {
    for (let i = 0; i < arr.length; i++) {
      if (judge(transfer(arr[i]), transfer(target))) {
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
        let action = this.judegFunByOnePara(last);
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
    predicate = this.judegFunByOnePara(predicate);
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
    predicate = this.judegFunByOnePara(predicate);
    if (predicate) {
      for (let i = 0; i < arr.length; i++) {
        if (!predicate(arr[i], i, arr)) {
          return arr.splice(0, i);
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
    predicate = this.judegFunByOnePara(predicate);
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
    predicate = this.judegFunByOnePara(predicate);
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
          let transfer = this.judegFunByOnePara(last);
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
      let transferFun = this.judegFunByOnePara(iteratee);
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
      predicate = this.judegFunByOnePara(predicate);
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
      iteratee = this.judegFunByOnePara(iteratee);
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
      iteratee = this.judegFunByOnePara(iteratee);
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
    predicate = this.judegFunByOnePara(predicate);
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
    predicate = this.judegFunByOnePara(predicate);
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
        let transferFun = this.judegFunByOnePara(last);
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
        let transferFun = this.judegFunByOnePara(last);
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
        let transferFun = this.judegFunByOnePara(last);
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
  /**
   *
   * @param {Array|Object} collection 一个用来迭代的集合
   * @param {Array|Function|Object|String} iteratee 迭代函数,转换key
   * @returns 返回新对象
   */
  countBy: function (collection, iteratee = (it) => it) {
    let re = {};
    iteratee = this.judegFunByOnePara(iteratee);
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
  },
  /**
   *
   * @param {Array|Object} collection 原始集合
   * @param {Array|Function|Object|String} predicate 每次迭代调用的函数
   * @returns 返回断言判断后的值
   */
  every: function (collection, predicate = (it) => it) {
    let re = true;
    predicate = this.judegFunByOnePara(predicate);
    if (typeof collection == "object") {
      for (let key in obj) {
        re = re && predicate(obj[key], key, collection);
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
    predicate = this.judegFunByOnePara(predicate);
    if (typeof collection == "object") {
      for (let key in obj) {
        if (predicate[(obj[key], key, collection)]) {
          re.push(boj[key]);
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
    predicate = this.judegFunByOnePara(predicate);
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
    predicate = this.judegFunByOnePara(predicate);
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
  flatMap: function (collection, iteratee) {
    let re = [];
    iteratee = this.judegFunByOnePara(iteratee);
    if (typeof collection == "object") {
      for (let key in collection) {
        re.push(iteratee(collection[key], key, collection));
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
  flatMapDeep: function (collection, iteratee) {
    let re = [];
    iteratee = this.judegFunByOnePara(iteratee);
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
    } else if (typeof collection === "string") {
      return collection.includes(value, fromIndex);
    } else if (typeof collection === "object") {
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
    } else if (typeof collection === "object") {
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
    } else if (typeof collection === "object") {
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
    } else if (typeof collection === "object") {
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
    } else if (typeof collection === "object") {
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
  },
};
