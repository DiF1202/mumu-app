// 树状结构 最后一层 第一个 node 添加默认属性 
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