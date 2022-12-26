export default function (state, action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        action.payload
      ];
    case "remove":
      return state.filter(expense => expense.id !== action.payload)
    default:
      return state
  }
}