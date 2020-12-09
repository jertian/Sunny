function arraysEqual(_arr1, _arr2) {
    if (
      !Array.isArray(_arr1)
      || !Array.isArray(_arr2)
      || _arr1.length !== _arr2.length
      ) {
        return false;
      }
    
    const arr1 = _arr1.concat().sort();
    const arr2 = _arr2.concat().sort();
    
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
         }
    }
    
    return true;
  }

  function getMaxIdOfList(list){
    let maxNum = -1;
    for (let item of list){
      if(item.storageID > maxNum){
        maxNum = item.storageID;
      }
    }
    return maxNum;
  }


module.exports = {
    getMaxIdOfList: getMaxIdOfList,
    arraysEqual: arraysEqual,
}