import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import messaging from './messaging';
import App from './App';

messaging.requestPermission();

serviceWorker.register();

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
