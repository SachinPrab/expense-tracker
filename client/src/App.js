import React from 'react'
import Header from './components/Header'
import './App.css'
import Balance from './components/Balance'
import IncomeExpense from './components/IncomeExpense'
import TransactionList from './components/TransactionList'
import AddTransaction from './components/AddTransaction'
import { GlobalProvider } from './context/GlobalState'
const App = () => {
  return (
    <GlobalProvider>
     <Header/>
     <Balance/>
     <IncomeExpense/>
     <TransactionList/>
     <AddTransaction/>
    </GlobalProvider>
  )
}

export default App
