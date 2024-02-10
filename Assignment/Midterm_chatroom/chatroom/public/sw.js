importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyAGYHcHc5jKlDTvEAzv-51qQODZFfzwzT8",
    authDomain: "midterm-chatroom-91e35.firebaseapp.com",
    databaseURL: "https://midterm-chatroom-91e35-default-rtdb.firebaseio.com",
    projectId: "midterm-chatroom-91e35",
    storageBucket: "midterm-chatroom-91e35.appspot.com",
    messagingSenderId: "267463017636",
    appId: "1:267463017636:web:f1e4b91960825b36e21231",
    measurementId: "G-DCH8T6M1WX"
  });
  const messaging = firebase.messaging();  

self.addEventListener('push', function(e) {
    var options = {
      body: 'You have a new message',
      icon: 'img/i.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2'
      },
      actions: [
        {action: 'open', title: 'Check'},
        {action: 'close', title: 'Close'},
      ]
    };
    e.waitUntil(
      self.registration.showNotification(options)
    );
});


self.addEventListener('notificationclose', event => {
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;
  
    console.log('Closed notification: ' + primaryKey);
});

self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;
    const action = event.action;
  
    if (action === 'close') {
      notification.close();
    } else {
        clients.openWindow('https://midterm-chatroom-91e35.web.app/');
      notification.close();
    }
});

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });