let count = 0;
function createTree(arr, parentId = "") {
    const tree = [];
    arr.forEach((item) => {
      if (item.parent_id === parentId) {
        count++;
        const newItem = item;
        newItem.index = count
        const children = createTree(arr, item.id);
        newItem.children = children
        tree.push(newItem)
      }
    });
    return tree;
  }

  module.exports.tree = (arr, parentId = "") => {
    count = 0;
    const tree = createTree(arr, parentId = "");
    return tree;
  }