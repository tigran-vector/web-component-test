function ListItemCustomerClick(event, param) {
  let params = param || { id: null, data: null };
  var evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(event, false, false, params);
  return evt;
}

ListItemCustomerClick.prototype = window.Event.prototype;

window.ListItemCustomerClick = ListItemCustomerClick;