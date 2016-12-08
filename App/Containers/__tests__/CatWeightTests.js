import React from 'react'
import CatWeight from '../CatWeight'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders the cat weight page correctly', () => {
  const tree = renderer.create(
    <CatWeight />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
