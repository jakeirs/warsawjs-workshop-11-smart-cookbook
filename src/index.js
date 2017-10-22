import React from 'react';
import ReactDOM from 'react-dom';
import {useStrict as mobxUseStrict} from 'mobx';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

import RootStore from 'stores';
import App from 'components/App';

mobxUseStrict();

const fetch = window.fetch;
const rootStore = new RootStore(fetch);

ReactDOM.render(
  <App rootStore={rootStore} />,
  document.getElementById('root')
);

registerServiceWorker();

window.rootStore = rootStore;
