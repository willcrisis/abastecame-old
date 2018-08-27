import React from 'react';
import { createStackNavigator } from 'react-navigation';
import SelectVehicleScreen from './src/screens/SelectVehicle';

const LoggedStack = createStackNavigator(
  {
    SelectVehicle: SelectVehicleScreen
  },
  {
    initialRouteName: 'SelectVehicle',
    headerMode: 'none',
  }
);

export default class App extends React.Component {
  render() {
    return (
      <LoggedStack />
    );
  }
}
