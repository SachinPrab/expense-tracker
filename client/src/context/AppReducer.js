export default (state,action) => {
    switch(action.type)
    {
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                transactions: action.payload,
                loading: false
            }
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
            }
            case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [ ...state.transactions,action.payload]
            }
            case 'UPDATE_TRANSACTION':
  return {
    ...state,
    transactions: state.transactions.map(transaction =>
      transaction._id === action.payload._id ? action.payload : transaction
    )
  }
            case 'TRANSACTION_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false}
        default: return state;
    }
}