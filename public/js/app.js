const socket = io();
const name = getQueryParams('name'),
  room = getQueryParams('room');

socket.on('connect', (socket) => {
  console.log('connected via socket');
});

socket.on('message', (message) => {
  const $message = jQuery('.messages');
  const timeStamp = moment.utc(message.timeStamp);

  $message
    .append(`<p><strong>${timeStamp.local().format('hh:mm a')} ${message.name}</strong></p>`);
  $message
    .append(`<p>${message.text}</p>`);

});

const $form = jQuery('#message-form');

$form.on('submit', (event) => {
  event.preventDefault();
  const message = $form.find('input[name=message]');

  socket.emit('message', {text: message.val(), name: name});
  message.val('');
});


function getQueryParams(value) {
  const query = window.location.search.substring(1).split('&');
  for (let item of query) {
    let pair = item.split('=');
    if (pair[0] === value) return decodeURIComponent(pair[1]);
  }
}
