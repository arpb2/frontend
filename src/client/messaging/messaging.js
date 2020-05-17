import { getUserId, getDeviceToken, isLoggedIn } from '../common/auth';

const { firebase } = window;

// Retrieve Firebase Messaging object.
const messaging = firebase ? firebase.messaging() : {};
// Add the public key generated from the console here.
if (firebase) messaging.usePublicVapidKey('BDSB0TBDwWZsBBVPnslxVPEwpXY-AISjYd2WEVA6J0_93uEVMZxBPiqsrLOD9c47wY-any9Q1ctKf58IcU2OgQs');

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
    if (!isLoggedIn()) {
      console.log('user not logged in, skipping token setting');
      return;
    }
    const userId = getUserId();
    fetch(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ tokens: { web: currentToken } }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('webToken', currentToken);
        setTokenSentToServer(true);
      });
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
    } else {
      console.log('No Instance ID token available. Request permission to generate one.');
      setTokenSentToServer(false);
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
    setTokenSentToServer(false);
  });
}

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
    }).catch((err) => {
      console.log('Unable to retrieve refreshed token ', err);
      showToken('Unable to retrieve refreshed token ', err);
    });
  });
}

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
if (firebase) {
  messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // Update the UI to include the received message.
    // appendMessage(payload);
  });
}

const requestPermission = () => {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // In many cases once an app has been granted notification permission,
      // it should update its UI reflecting this.
      // resetUI();
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
};

const deleteToken = () => {
  // Delete Instance ID token.
  messaging.getToken().then((currentToken) => {
    messaging.deleteToken(currentToken).then(() => {
      console.log('Token deleted.');
      setTokenSentToServer(false);
      // Once token is deleted update UI.
      // resetUI();
    }).catch((err) => {
      console.log('Unable to delete token. ', err);
    });
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

const sendCodeToApp = (code) => {
  fetch('/api/messaging', {
    method: 'POST',
    body: JSON.stringify({
      message: { code },
      to: getDeviceToken(),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      console.log(response);

      if (!response.ok) throw Error(response.statusText);
      return response.status;
    })
    .then(status => status);
};


export default {
  messaging,
  requestPermission,
  deleteToken,
  sendCodeToApp,
};
