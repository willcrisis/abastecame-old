import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
} from 'native-base';
import firebase from 'react-native-firebase';
import Header from '../components/Header';

export const ROUTE_NAME = 'NewVehicle';

export default class NewVehicle extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header title="New Vehicle"/>
    )
  });

  render() {
    return (
      <Container>
        <Content>
          <Text>
            Hey!
          </Text>
        </Content>
      </Container>
    )
  }
}