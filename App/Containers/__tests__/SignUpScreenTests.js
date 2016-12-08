/* eslint-disable no-global-assign, no-native-reassign */
import React, { Component } from 'react'
import SignUpScreen from '../SignUpScreen'

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

it('renders the sign up screen correctly', () => {
  fetch = jest.fn(() => new Promise(resolve => resolve()))
  const tree = renderer.create(
    <SignUpScreen />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
