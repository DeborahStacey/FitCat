import React from 'react'
import CatDistance from '../CatDistance'
import Moment from 'moment'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

jest.mock('../../Services/MomentWrapper', () => {
  return {
    getMomentFromDate: () => { return new Moment('20161212') }
  }
})
it('renders the cat distance page correctly', () => {
  const tree = renderer.create(
    <CatDistance />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
