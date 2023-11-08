import Root from '@app/screens/root';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@app/redux/create-store'; // Assurez-vous que store est correctement exporté
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-get-random-values';

// create our store

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Root />
        </SafeAreaProvider>
      </Provider>
    );
  }
}

export default App;
