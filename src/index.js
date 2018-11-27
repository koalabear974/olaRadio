import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Teaser from './Teaser';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Teaser />, document.getElementById('root'));
registerServiceWorker();
