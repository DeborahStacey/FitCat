import React from 'react'
import CatSleep from '../CatSleep'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders the cat sleep page correctly', () => {
  const tree = renderer.create(
    <CatSleep />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
