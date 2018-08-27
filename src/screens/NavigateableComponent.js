import { Component } from 'react';

export default class NavigateableComponent extends Component {
  goTo = (route) => this.props.navigation.navigate(route);
}
