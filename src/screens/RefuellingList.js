import React from 'react';
import {
  Container,
  Content,
  Text,
  Spinner,
  List,
  ListItem,
} from 'native-base';
import firebase from 'react-native-firebase';
import NavigateableComponent from './NavigateableComponent';

export const ROUTE_NAME = 'RefuellingList';

export default class RefuellingList extends NavigateableComponent {
  static navigationOptions = {
    title: 'Refuellings'
  };

  constructor(props) {
    super(props);
    const { vehicleKey } = this.props.screenProps;
    this.refuellingsRef = firebase
      .firestore()
      .collection(`vehicles/${vehicleKey}/refuellings`);

    this.state = {
      refuellings: [],
      loading: true,
    }
  }

  componentDidMount() {
      this.unsubscribeRefuellings = this.refuellingsRef.onSnapshot(snapshot => {
        const refuellings = [];

        snapshot.forEach(refuellingRef => {
          refuellings.push({
            ...refuellingRef.data(),
            id: refuellingRef.id,
          })
        })

        this.setState({
          refuellings,
          loading: false,
        })
      }, err => console.warn(err));
  }

  componentWillUnmount() {
    this.unsubscribeRefuellings();
  }

  render() {
    const {
      loading,
      refuellings,
    } = this.state;

    if (loading) {
      return (
        <Spinner />
      )
    }

    return (
      <Container>
        <Content>
          {(!refuellings.length) && (
            <Text>No refuellings found for this vehicle</Text>
          )}
          {refuellings.length && (
            <List>
              {refuellings.map(refuelling => (
                <ListItem key={refuelling.id}>
                  <Text>{refuelling.odometer}</Text>
                </ListItem>
              ))}
            </List>
          )}
        </Content>
      </Container>
    )
  }
}
