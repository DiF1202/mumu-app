export function addTreePro(node, fieldName, value) {
  if (!node.children || node.children.length === 0) {
    node[fieldName] = value;
    return
  }
  // 不是叶子节点，递归遍历子节点
  for (let i = 0; i < node.children.length; i++) {
    addTreePro(node.children[i], fieldName, value);
    console.log(i)
    if (node.children[i][fieldName]) {
      break;
    }
  }
  return node
}