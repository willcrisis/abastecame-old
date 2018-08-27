import React from 'react';
import SelectVehicle from './SelectCar';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<SelectVehicle />).toJSON();
  expect(rendered).toBeTruthy();
});
