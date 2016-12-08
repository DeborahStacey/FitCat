import React from 'react'
import CatDistance from '../CatDistance'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders the cat distance page correctly', () => {
  const tree = renderer.create(
    <CatDistance />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
