import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import InputRegister from './src/screens/InputRegister';
import MainCalender from './src/screens/MainCalender';
import Login from './src/screens/Login';
import TypeDent from './src/screens/TypeDent';
import { Provider as PaperProvider } from 'react-native-paper'

export default function Main() {
    return (
      <PaperProvider>
        <App />
      </PaperProvider>
    );
  }

AppRegistry.registerComponent(appName, () => Main);
