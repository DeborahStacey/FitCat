import React from 'react'
import CatSleep from '../CatSleep'
import Moment from 'moment'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

jest.mock('../../Services/MomentWrapper', () => {
  return {
    getMomentFromDate: () => { return new Moment('20161212') }
  }
})
it('renders the cat sleep page correctly', () => {
  const tree = renderer.create(
    <CatSleep />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
