import React from 'react'
import CatSteps from '../CatSteps'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders the cat steps page correctly', () => {
  const tree = renderer.create(
    <CatSteps />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
