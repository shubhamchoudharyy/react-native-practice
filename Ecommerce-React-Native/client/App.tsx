import {Provider} from 'react-redux';
import React from 'react';

import store from './redux/store';
import Main from './Main';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
