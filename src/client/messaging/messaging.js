const { firebase } = window;

// [START get_messaging_object]
// Retrieve Firebase Messaging object.
const messaging = firebase ? firebase.messaging() : {};
// [END get_messaging_object]
// [START set_public_vapid_key]
// Add the public key generated from the console here.
if (firebase) messaging.usePublicVapidKey('BDSB0TBDwWZsBBVPnslxVPEwpXY-AISjYd2WEVA6J0_93uEVMZxBPiqsrLOD9c47wY-any9Q1ctKf58IcU2OgQs');
// [END set_public_vapid_key]

const isTokenSentToServer = () => window.localStorage.getItem('sentToServer') === '1';

const setTokenSentToServer = (sent) => {
  window.localStorage.setItem('sentToServer', sent ? '1' : '0');
};

const showToken = (currentToken) => {
  // Show token in console and UI.
  console.log(`Token: ${currentToken}`);
};

// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
const sendTokenToServer = (currentToken) => {
  showToken(currentToken);
  if (!isTokenSentToServer()) {
    console.log('Sending token to server...');
    // TODO(developer): Send the current token to your server.
    setTokenSentToServer(true);
  } else {
    console.log('Token already sent to server so won\'t send it again '
                + 'unless it changes');
  }
};


// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
if (firebase) {
  messaging.getToken().then((currentToken) => {
    if (currentToken) {
      sendTokenToServer(currentToken);
    // updateUIForPushEnabled(currentToken);
    } else {
    // Show permission request.
      console.log('No Instance ID token available. Request permission to generate one.');
      // Show permission UI.
      // updateUIForPushPermissionRequired();
      setTokenSentToServer(false);
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
    setTokenSentToServer(false);
  });
}

// [START refresh_token]
// Callback fired if Instance ID token is updated.
if (firebase) {
  messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
      console.log('Token refreshed.');
      console.log(refreshedToken);
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      setTokenSentToServer(false);
      // Send Instance ID token to app server.
      sendTokenToServer(refreshedToken);
    // [START_EXCLUDE]
    // Display new Instance ID token and clear UI of all previous messages.
    // resetUI();
    // [END_EXCLUDE]
    }).catch((err) => {
      console.log('Unable to retrieve refreshed token ', err);
      showToken('Unable to retrieve refreshed token ', err);
    });
  });
}
// [END refresh_token]

// [START receive_message]
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
if (firebase) {
  messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
  // [START_EXCLUDE]
  // Update the UI to include the received message.
  // appendMessage(payload);
  // [END_EXCLUDE]
  });
}
// [END receive_message]

const requestPermission = () => {
  console.log('Requesting permission...');
  // [START request_permission]
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // [START_EXCLUDE]
      // In many cases once an app has been granted notification permission,
      // it should update its UI reflecting this.
      // resetUI();
      // [END_EXCLUDE]
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
  // [END request_permission]
};

const deleteToken = () => {
  // Delete Instance ID token.
  // [START delete_token]
  messaging.getToken().then((currentToken) => {
    messaging.deleteToken(currentToken).then(() => {
      console.log('Token deleted.');
      setTokenSentToServer(false);
      // [START_EXCLUDE]
      // Once token is deleted update UI.
      // resetUI();
      // [END_EXCLUDE]
    }).catch((err) => {
      console.log('Unable to delete token. ', err);
    });
    // [END delete_token]
  }).catch((err) => {
    console.log('Error retrieving Instance ID token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
  });
};

// Add a message to the messages element.
// function appendMessage(payload) {
//   const messagesElement = document.querySelector('#messages');
//   const dataHeaderELement = document.createElement('h5');
//   const dataElement = document.createElement('pre');
//   dataElement.style = 'overflow-x:hidden;';
//   dataHeaderELement.textContent = 'Received message:';
//   dataElement.textContent = JSON.stringify(payload, null, 2);
//   messagesElement.appendChild(dataHeaderELement);
//   messagesElement.appendChild(dataElement);
// }

// Clear the messages element of all children.
// function clearMessages() {
//   const messagesElement = document.querySelector('#messages');
//   while (messagesElement.hasChildNodes()) {
//     messagesElement.removeChild(messagesElement.lastChild);
//   }
// }

export default {
  messaging,
  requestPermission,
  deleteToken,
};
