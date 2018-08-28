import React from 'react';
import { Root } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import SelectVehicleScreen, { ROUTE_NAME as SELECT_VEHICLE_ROUTE } from './src/screens/SelectVehicle';
import NewVehicleScreen, { ROUTE_NAME as NEW_VEHICLE_ROUTE } from './src/screens/NewVehicle';
import RefuellingListScreen, { ROUTE_NAME as REFUELLING_LIST_ROUTE } from './src/screens/RefuellingList';

const LoggedStack = createStackNavigator(
  {
    [SELECT_VEHICLE_ROUTE]: SelectVehicleScreen,
    [NEW_VEHICLE_ROUTE]: NewVehicleScreen,
    [REFUELLING_LIST_ROUTE]: RefuellingListScreen,
  },
  {
    initialRouteName: SELECT_VEHICLE_ROUTE,
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Root>
      <LoggedStack/>
      </Root>
    );
  }
}
