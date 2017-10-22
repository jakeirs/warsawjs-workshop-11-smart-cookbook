import React, { Component } from 'react';
import {Provider} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import Layout from 'components/Layout';
import Content from 'components/Content';
import Sidebar from 'components/Sidebar';


class App extends Component {
  render() {
    const injectables = this.props.rootStore.injectables;

    return (
      <div>
        <Provider {...injectables}>
          <Layout
            sidebar={<Sidebar />}
            content={<Content />}
          />
        </Provider>
        <DevTools />
      </div>
    );
  }
}

export default App;
