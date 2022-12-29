import { useState, useReducer, useEffect } from 'react';
import reducer from './expensesReducer';
import request from './request';
import Expense from './expense.js'
import './index.css'

function App() {
  const [expenses, dispatch] = useReducer(reducer, []);
  const [expenseDescription, setExpenseDescription] = useState('')
  const [expenseAmount, setExpenseAmount] = useState(0)

  useEffect(() => { request('expenses', dispatch); }, []);
  
  function addExpense(e) {
    e.preventDefault();
    if (expenseAmount === 0 || isNaN(expenseAmount)) {
      return;
    }
    const newExpense = new Expense(
      Date.now(),
      expenseDescription,
      expenseAmount,
    );
    dispatch({ type: 'add', payload: newExpense});
    setExpenseDescription('');
    setExpenseAmount(0);
  }

  return (
    <div className="my-6 flex flex-col">
      <div className="px-6 py-4 mx-auto bg-slate-100 rounded-md">
        <form className="my-3" onSubmit={addExpense}>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            className="border-2 rounded-md px-2 mx-2"
            onChange={ (e) => setExpenseDescription(e.target.value) }
            value={expenseDescription}
          />
          <label htmlFor="amount" className="ml-3">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            className="border-2 rounded-md px-2 mx-2"
            onChange={ (e) => setExpenseAmount(parseFloat(e.target.value).toString()) }
            value={expenseAmount}
          />
          <button className="bg-blue-400 hover:bg-blue-500 px-3 py-1 ml-2 border rounded-md">
            Add
          </button>
        </form>
        <List expenses={expenses}/>
      </div>
    </div>
  );
}

function List({expenses}) {
  return (
    <div className="my-3 w-full rounded-md bg-white overflow-auto">
      {expenses.slice().reverse().map( expense => (
        <div key={expense.id} className="px-2 py-1 odd:bg-white even:bg-slate-50">
          <span className="inline-block min-w-[50%]">{expense.description}</span>
          <span>{expense.amount}</span>
        </div>
        ))
      }
    </div>
  );
}

export default App;
