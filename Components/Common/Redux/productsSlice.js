const initialState = {
    productListCurrent : [],
    productListHistory : [],
}

/*
{type: "product/productListCurrent", payload: object}
{type: "product/productListHistory", payload: object}
{type: "product/productCurrentList/delete", payload: product.storageId}
*/

export default function productSlice(state = initialState, action) {
  switch (action.type) {
      case 'product/productListCurrent': {
        return {
            ...state,
            productListCurrent : [...state.productListCurrent, action.payload]
            
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
      case 'product/productListHistory': {
        return {
            ...state,
            productListHistory : [...state.productListHistory, action.payload]
            
        }
         
      }
 
      default:
        return state
    }
  }