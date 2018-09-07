import React from 'react';
import {
  Container,
  Content,
  Text,
} from 'native-base';
import NavigateableComponent from './NavigateableComponent';

export const ROUTE_NAME = 'RefuellingList';

export default class RefuellingList extends NavigateableComponent {
  static navigationOptions = {
    title: 'Refuels'
  };

  render() {
    const { vehicleKey } = this.props.screenProps;
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
