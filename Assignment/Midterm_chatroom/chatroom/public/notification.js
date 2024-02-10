const message = firebase.messaging();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(reg) {

      if(reg.installing) {
        console.log('Service worker installing');
      } else if(reg.waiting) {
        console.log('Service worker installed');
      } else if(reg.active) {
        console.log('Service worker active');
      }
  
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
}

Notification.requestPermission().then((result) => {console.log(result);})

message.onMessage(payload => {
    console.log('onMessage: ', payload);
    var notifyMsg = payload.notification;
    var notification = new Notification(notifyMsg.title, {
        body: notifyMsg.body,
        icon: notifyMsg.icon
    });
    notification.onclick = function (e) { // 綁定點擊事件
        e.preventDefault(); // prevent the browser from focusing the Notification's tab
        window.open(notifyMsg.click_action);
    }
})