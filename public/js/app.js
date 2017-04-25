const socket = io();

socket.on('connect', (socket) => {
    console.log('connected via socket');
});

socket.on('message', (message) => {
    console.log(message.text);
});

const $form = jQuery('#message-form');

$form.on('submit', (event) => {
    event.preventDefault();
    const message = $form.find('input[name=message]');

    socket.emit('message', {text: message.val()});
    message.val('');
});
