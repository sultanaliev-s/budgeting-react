import Expense from './expense.js'

export default function (state, action) {
  switch (action.type) {
    case 'set':
      return action.payload.map(expense => Object.assign(new Expense, expense));
    case 'add':
      return [
        ...state,
        action.payload
      ];
    case 'remove':
      return state.filter(expense => expense.id !== action.payload)
    default:
      return state
  }
}