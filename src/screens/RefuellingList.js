import React from 'react';
import {
  Container,
  Content,
  Text,
} from 'native-base';
import Header from '../components/Header';
import NavigateableComponent from './NavigateableComponent';

export const ROUTE_NAME = 'RefuellingList';

export default class RefuellingList extends NavigateableComponent {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header title="Refuellings"/>
    )
  });

  render() {
    const { navigation } = this.props;
    const vehicleKey = navigation.getParam('vehicleKey');
    return (
      <Container>
        <Content>
          <Text>dsdsds</Text>
          <Text>{vehicleKey}</Text>
        </Content>
      </Container>
    )
  }
}
