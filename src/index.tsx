import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Home from './containers/Home';
import 'antd/dist/antd.css'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Home />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
