import React from 'react';
import { AsyncStorage } from 'react-native';
import { Root, Spinner } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import SelectVehicleScreen, { ROUTE_NAME as SELECT_VEHICLE_ROUTE } from './src/screens/SelectVehicle';
import NewVehicleScreen, { ROUTE_NAME as NEW_VEHICLE_ROUTE } from './src/screens/NewVehicle';
import RefuellingListScreen, { ROUTE_NAME as REFUELLING_LIST_ROUTE } from './src/screens/RefuellingList';
import firebase from 'react-native-firebase';

const SelectVehicleStack = createStackNavigator(
  {
    [SELECT_VEHICLE_ROUTE]: (props) => <SelectVehicleScreen {...props} />,
    [NEW_VEHICLE_ROUTE]: NewVehicleScreen,
  },
  {
    initialRouteName: SELECT_VEHICLE_ROUTE,
  }
);

const RefuellingStack = createStackNavigator(
  {
    [REFUELLING_LIST_ROUTE]: (props) => <RefuellingListScreen {...props} />,
  },
  {
    initialRouteName: REFUELLING_LIST_ROUTE,
  }
);

export default class App extends React.Component {
  state = {
    loading: true,
    selectedVehicle: '',
  };

  async componentDidMount() {
    //await firebase.auth().signInAndRetrieveDataWithEmailAndPassword('fakeuser@willcrisis.com', '123456');
    // await AsyncStorage.removeItem('vehicleKey');
    const selectedVehicle = await AsyncStorage.getItem('vehicleKey');
    this.setState({
      selectedVehicle,
      loading: false,
    });
  }

  onSelectVehicle = (selectedVehicle) => {
    console.warn(selectedVehicle);
    this.setState({
      selectedVehicle,
    }, async () => {
      await AsyncStorage.setItem('vehicleKey', selectedVehicle)
    });
  };

  render() {
    const {
      loading,
      selectedVehicle,
    } = this.state;

    if (loading)
      return (
        <Spinner />
      );

    if (!selectedVehicle)
      return (
        <Root>
          <SelectVehicleStack screenProps={{onSelectVehicle: this.onSelectVehicle}} />
        </Root>
      );

    return (
      <Root>
        <RefuellingStack screenProps={{vehicleKey: selectedVehicle}} />
      </Root>
    );
  }
}
