/* eslint-disable no-global-assign, no-native-reassign */
import React, { Component } from 'react'
import NewCat from '../NewCat'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

jest.mock('Picker', () => {
  const React = require('React')
  return class MockPicker extends Component {
    static Item = props => React.createElement('Item', props, props.children)
    static propTypes = { children: React.PropTypes.any }

    render () {
      return React.createElement('Picker', this.props, this.props.children)
    }
  }
})
jest.mock('react-native-datepicker', () => {
  const React = require('React')
  return class MockDatePicker extends Component {
    static Item = props => React.createElement('Item', props, props.children)
    static propTypes = { children: React.PropTypes.any }
    render () {
      return React.createElement('DatePicker', this.props, this.props.children)
    }
  }
})
it.skip('should render the new cat page correctly but we cannot get a good mock of the date picker control we used', () => {
  fetch = jest.fn(() => new Promise(resolve => resolve()))
  const tree = renderer.create(
    <NewCat />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
