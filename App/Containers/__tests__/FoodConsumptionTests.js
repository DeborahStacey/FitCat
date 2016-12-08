import 'react-native'
import React, { Component } from 'react'
import FoodConsumption from '../FoodConsumption'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

jest.mock('Picker', () => {
  const React = require('React');
  return class MockPicker extends Component {
    static Item = props => React.createElement('Item', props, props.children);
    static propTypes = { children: React.PropTypes.any };

    render() {
      return React.createElement('Picker', this.props, this.props.children);
    }
  }
})
it('renders the food consumption page correctly', () => {
  const tree = renderer.create(
    <FoodConsumption />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
