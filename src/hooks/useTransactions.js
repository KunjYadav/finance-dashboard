/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { INITIAL_TRANSACTIONS } from '../utils/constants';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("finance_data_v26");
    if (saved) setTransactions(JSON.parse(saved));
    else setTransactions(INITIAL_TRANSACTIONS);
  }, []);

  useEffect(() => {
    if (transactions.length > 0)
      localStorage.setItem("finance_data_v26", JSON.stringify(transactions));
  }, [transactions]);

  const handleSaveTransaction = (data, editingTransaction) => {
    if (editingTransaction)
      setTransactions(
        transactions.map((t) =>
          t.id === editingTransaction.id ? { ...data, id: t.id } : t,
        ),
      );
    else
      setTransactions([{ ...data, id: crypto.randomUUID() }, ...transactions]);
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm("Delete this transaction?"))
      setTransactions(transactions.filter((t) => t.id !== id));
  };

  return { transactions, handleSaveTransaction, handleDeleteTransaction };
};
