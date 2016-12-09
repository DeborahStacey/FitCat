import React from 'react'
import Device from '../Device'
import Moment from 'Moment'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

jest.mock('../../Services/MomentWrapper', () => {
  return {
    getMomentFromDate: () => { return new Moment('20161212') }
  }
})
it('renders the device page correctly', () => {
  const tree = renderer.create(
    <Device />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
