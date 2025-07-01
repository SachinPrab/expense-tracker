import React, { useContext, useEffect, useState } from 'react'
import Transaction from './Transaction';
import { GlobalContext } from '../context/GlobalState';

const TransactionList = () => {
  const { transactions, getTransactions, updateTransaction } = useContext(GlobalContext);

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editAmount, setEditAmount] = useState('');

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startEdit = (transaction) => {
    setEditId(transaction._id);
    setEditText(transaction.text);
    setEditAmount(transaction.amount);
  };

  const submitEdit = (e) => {
    e.preventDefault();
    updateTransaction(editId, { text: editText, amount: Number(editAmount) });
    setEditId(null);
    setEditText('');
    setEditAmount('');
  };

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <li key={transaction._id || transaction.id}>
            {editId === (transaction._id || transaction.id) ? (
              <form onSubmit={submitEdit} style={{ display: 'inline' }}>
                <input
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  required
                  style={{ width: '100px' }}
                />
                <input
                  type="number"
                  value={editAmount}
                  onChange={e => setEditAmount(e.target.value)}
                  required
                  style={{ width: '80px' }}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <Transaction transaction={transaction} />
                <button onClick={() => startEdit(transaction)} style={{ marginLeft: '10px' }}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

export default TransactionList
