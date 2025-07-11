import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
const initialState = {
  transactions: [],
  error: null,
  loading: true
}


export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
const [state,dispatch] = useReducer(AppReducer, initialState);


async function getTransactions() {
  try {
    const res = await axios.get('/api/v1/transactions');
    dispatch({
      type: 'GET_TRANSACTIONS',
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: 'TRANSACTION_ERROR',
      payload: err.response ? err.response.data.error : err.message
    });
  }
}
async function deleteTransaction(id) {
  try {
    await axios.delete(`/api/v1/transactions/${id}`);

    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }
  catch (err) {
    dispatch({
      type: 'TRANSACTION_ERROR',
      payload: err.response ? err.response.data.error : err.message
    });
  }
}

async function addTransaction(transaction) {
  const config = {
    headers: 
    {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/v1/transactions', transaction, config);
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: 'TRANSACTION_ERROR',
      payload: err.response ? err.response.data.error : err.message
    });
  }
}

async function updateTransaction(id, updatedData) {
  try {
    const res = await axios.put(`/api/v1/transactions/${id}`, updatedData, {
      headers: { 'Content-Type': 'application/json' }
    });
    dispatch({
      type: 'UPDATE_TRANSACTION',
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: 'TRANSACTION_ERROR',
      payload: err.response ? err.response.data.error : err.message
    });
  }
}

return (<GlobalContext.Provider value = {{
    transactions: state.transactions,
    getTransactions,
    error: state.error,
    loading: state.loading,
    deleteTransaction,
    addTransaction,
    updateTransaction
}}>
    {children}
</GlobalContext.Provider>)
}