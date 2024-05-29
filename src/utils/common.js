// 树状结构 第一个 node 添加默认属性 
export function addTreePro(node, fieldName, value) {
  if (!node.children || node.children.length === 0) {
    node[fieldName] = value;
    return
  }
  for (let i = 0; i < node.children.length; i++) {
    addTreePro(node.children[i], fieldName, value);
    if (node.children[i][fieldName]) {
      break;
    }
  }
  return node
}

// 根据传入的id选中
export function findAndAdd(nodes, id, fieldName, value) {
  if (!nodes || nodes.length === 0) return;
  nodes.forEach(node => {
    if (node.id === id) {
      node[fieldName] = value;
    }
    if (node.children && node.children.length > 0) {
      findAndAdd(node.children, id, fieldName, value)
    }
  })
  return nodes
}

/**
* 参数处理
* @param params 参数
*/
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + "="
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + "="
            result += subPart + encodeURIComponent(value[key]) + "&"
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&"
      }
    }
  }
  return result
}
// 时间处理
export const timeHandler = (time) => {
  let date = new Date(time)
  const year = date.getFullYear();  
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要+1  
  const day = String(date.getDate()).padStart(2, '0');  
  const hours = String(date.getHours()).padStart(2, '0');  
  const minutes = String(date.getMinutes()).padStart(2, '0');  
  const seconds = String(date.getSeconds()).padStart(2, '0');  

  // 拼接字符串  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;  
}

// 处理车辆出入数据
// export const flattenScores = (input) => {  
//   return input.map(item => {  
//       // 假设我们已经修正了键名错误，将 socre 改为 score  
//       let flattenedScore = item.score.flatMap(range => range);  
//       return { score: flattenedScore }; // 返回新的对象，其中 score 是扁平化后的数组  
//   });  
// }
// export const transformScores = (input) => {  
//   return input.map(item => {  
//       const score = item.score;  
//       const data = [score[0]]; // 第一个数是数组的第一个值  

//       // 从第二个元素开始，计算差值并添加到data数组中  
//       for (let i = 1; i < score.length; i++) {  
//           data.push(score[i] - score[i - 1]);  
//       }  

//       // 如果data数组长度小于6，用0填充到长度为6  
//       while (data.length < 6) {  
//           data.push(0);  
//       }  
//       return { data };  
//   });  
// }  
export const transformData = (input) => {
  let data = input.map(item => {  
    let flattenedScore = item.score.flatMap(range => range);  
    return { score: flattenedScore }; // 返回新的对象，其中 score 是扁平化后的数组  
  })
  let data2 = data.map(item => {  
      const score = item.score;  
      const data = [score[0]]  
      // 从第二个元素开始，计算差值并添加到data数组中  
      for (let i = 1; i < score.length; i++) {  
          data.push(score[i] - score[i - 1]);  
      }  
      // 如果data数组长度小于6，用0填充到长度为6  
      while (data.length < 6) {  
          data.push(0);  
      }  
      return { data };  
  })
  const output = [];  
  const colors = ['transparent', 'orange']; // 定义颜色数组，根据需求调整  
  let colorIndex = 0; // 跟踪当前颜色索引  
  // 遍历每个原始 data 数组  
  data2.forEach(item => {  
    // 遍历 data 数组中的每个元素  
    for (let i = 0; i < item.data.length; i++) {  
        // 如果 output 数组的长度小于当前索引加 1，则添加一个新的对象  
        if (output.length <= i) {  
            output.push({ data: [], color: colors[colorIndex] });  
        }  

        // 将当前元素添加到对应索引的 output 对象的 data 数组中  
        output[i].data.push(item.data[i] || 0); // 如果不存在，则用 0 填充  

        // 切换颜色（如果需要的话）  
        colorIndex = (colorIndex + 1) % colors.length; // 循环使用颜色数组  
    }  
  });  

  return output;  
}