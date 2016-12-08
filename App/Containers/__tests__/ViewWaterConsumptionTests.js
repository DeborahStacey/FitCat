import React from 'react'
import ViewWaterConsumption from '../ViewWaterConsumption'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders the view water consumption page correctly', () => {
  const tree = renderer.create(
    <ViewWaterConsumption />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
