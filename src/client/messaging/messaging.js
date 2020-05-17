import { getUserId, getDeviceToken, isLoggedIn } from '../common/auth';

const { firebase } = window;

// Retrieve Firebase Messaging object.
// const messaging = firebase ? firebase.messaging() : {};
const messaging = (firebase && firebase.messaging.isSupported()) ? firebase.messaging() : null;

// Add the public key generated from the console here.
if (messaging) messaging.usePublicVapidKey('BDSB0TBDwWZsBBVPnslxVPEwpXY-AISjYd2WEVA6J0_93uEVMZxBPiqsrLOD9c47wY-any9Q1ctKf58IcU2OgQs');

const isTokenSentToServer = () => window.localStorage.getItem('sentToServer') === '1';

const setTokenSentToServer = (sent) => {
  window.localStorage.setItem('sentToServer', sent ? '1' : '0');
};

const showToken = (currentToken) => {
  // Show token in console and UI.
  console.info(`Token: ${currentToken}`);
};

// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
const sendTokenToServer = (currentToken) => {
  showToken(currentToken);
  if (!isTokenSentToServer()) {
    if (!isLoggedIn()) {
      console.info('user not logged in, skipping token setting');
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
    console.info('Token already sent to server so won\'t send it again '
                + 'unless it changes');
  }
};


// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
if (messaging) {
  messaging.getToken().then((currentToken) => {
    if (currentToken) {
      sendTokenToServer(currentToken);
    } else {
      console.info('No Instance ID token available. Request permission to generate one.');
      setTokenSentToServer(false);
    }
  }).catch((err) => {
    console.info('An error occurred while retrieving token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
    setTokenSentToServer(false);
  });
}

// Callback fired if Instance ID token is updated.
if (messaging) {
  messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
      console.info('Token refreshed.');
      console.info(refreshedToken);
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      setTokenSentToServer(false);
      // Send Instance ID token to app server.
      sendTokenToServer(refreshedToken);
    }).catch((err) => {
      console.info('Unable to retrieve refreshed token ', err);
      showToken('Unable to retrieve refreshed token ', err);
    });
  });
}

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
if (messaging) {
  messaging.onMessage((payload) => {
    console.info('Message received. ', payload);
    // Update the UI to include the received message.
    // appendMessage(payload);
  });
}

const requestPermission = () => {
  console.info('Requesting permission...');
  if (messaging) {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.info('Notification permission granted.');
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // In many cases once an app has been granted notification permission,
        // it should update its UI reflecting this.
        // resetUI();
      } else {
        console.info('Unable to get permission to notify.');
      }
    });
  }
};

const deleteToken = () => {
  if (messaging) {
  // Delete Instance ID token.
    messaging.getToken().then((currentToken) => {
      messaging.deleteToken(currentToken).then(() => {
        console.info('Token deleted.');
        setTokenSentToServer(false);
      // Once token is deleted update UI.
      // resetUI();
      }).catch((err) => {
        console.info('Unable to delete token. ', err);
      });
    }).catch((err) => {
      console.info('Error retrieving Instance ID token. ', err);
      showToken('Error retrieving Instance ID token. ', err);
    });
  }
};

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
      console.info(response);

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
