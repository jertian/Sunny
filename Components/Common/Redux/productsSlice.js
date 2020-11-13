const initialState = {
    productListCurrent : [],
    productListHistory : [],
    shouldRetrieveFromCache: true,
    hasRetrievedFromCache : false
}

/*
{type: "product/productListCurrent", payload: object}
{type: "product/productListHistory", payload: object}
{type: "product/productCurrentList/delete", payload: product.storageId}
*/

export default function productSlice(state = initialState, action) {
  switch (action.type) {
      case 'product/productListCurrent/replaceAll': {
        return {
            ...state,
            productListCurrent :  action.payload
            
        }
         
      }
      case 'product/productCurrentList/delete': {
        debugger;
        let newProductList = state.productListCurrent.filter(product => product.storageId !== action.payload);
        return {
            ...state,
            productListCurrent : {newProductList}
            
        }
      }
      case 'product/productListHistory/replaceAll': {
        return {
            ...state,
            productListHistory : [action.payload]
        }
      }
      case 'product/hasRetrievedFromCache': {
        return {
          ...state,
          hasRetrievedFromCache: true
        }
      }
 
      default:
        return state
    }
  }