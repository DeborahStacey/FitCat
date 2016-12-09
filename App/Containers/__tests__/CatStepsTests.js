import React from 'react'
import CatSteps from '../CatSteps'
import Moment from 'moment'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

jest.mock('../../Services/MomentWrapper', () => {
  return {
    getMomentFromDate: () => { return new Moment('20161212') }
  }
})
it('renders the cat steps page correctly', () => {
  const tree = renderer.create(
    <CatSteps />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
