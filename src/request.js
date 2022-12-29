export default function(resource, dispatch) {
  var request = new XMLHttpRequest();

  request.open('GET', 'https://private-1c6e90-budgetingreact.apiary-mock.com/' + resource);
  
  request.setRequestHeader('Accept', 'application/json');
  request.setRequestHeader('Authorization', 'Bearer sometoken');
  
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      dispatch({ type: 'set', payload: JSON.parse(this.responseText) })
    }
  };

  request.send();
}
