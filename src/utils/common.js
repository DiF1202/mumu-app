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