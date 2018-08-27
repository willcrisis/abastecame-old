import React, { Component } from 'react';
import {
  Container,
  Content,
  Spinner,
} from 'native-base';
import firebase from 'react-native-firebase';
import VehicleCard from '../components/VehicleCard';
import Header from '../components/Header';

export default class SelectVehicle extends Component {
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
        <Header title="Vehicles"/>
        <Content>
          {vehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle}/>
          ))}
          <VehicleCard key="add-new" icon="plus" vehicle={{name: 'Add New Vehicle'}}/>
        </Content>
      </Container>
    )
  }
}
