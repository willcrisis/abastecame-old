import React from 'react';
import {
  Container,
  Content,
  Spinner,
} from 'native-base';
import firebase from 'react-native-firebase';
import NavigateableComponent from './NavigateableComponent';
import VehicleCard from '../components/VehicleCard';
import Header from '../components/Header';
import { ROUTE_NAME as NEW_VEHICLE_ROUTE } from './NewVehicle';

export const ROUTE_NAME = 'SelectVehicle';

export default class SelectVehicle extends NavigateableComponent {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header title="Vehicles"/>
    )
  });

  constructor() {
    super();
    this.userRef = firebase.firestore().doc('users/3eqzPiYvwYNHvQLHIm2BaO7jUTs1');

    this.state = {
      vehicles: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.unsubscribeUser = this.userRef.onSnapshot(docSnapshot => {
      const vehicles = [];

      const user = docSnapshot.data();
      user.vehicles.forEach(async vehicleRef => {
        const ref = await vehicleRef.get();
        this.setState(({ vehicles }) => ({
          vehicles: [
            ...vehicles,
            {
              ...ref.data(),
              id: vehicleRef.id,
            }
          ]
        }));
      });

      this.setState({
        vehicles,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribeUser();
  }

  render() {
    const {
      loading,
      vehicles,
    } = this.state;

    if (loading) {
      return (
        <Spinner />
      )
    }

    return (
      <Container>
        <Content>
          {vehicles.map(vehicle => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
            />
          ))}
          <VehicleCard
            key="add-new"
            icon="plus"
            vehicle={{name: 'Add New Vehicle'}}
            onPress={() => this.goTo(NEW_VEHICLE_ROUTE)}
          />
        </Content>
      </Container>
    )
  }
}
