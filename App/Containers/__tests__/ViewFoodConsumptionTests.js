import React from 'react'
import ViewFoodConsumption from '../ViewFoodConsumption'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders the view food consumption page correctly', () => {
  const tree = renderer.create(
    <ViewFoodConsumption />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
