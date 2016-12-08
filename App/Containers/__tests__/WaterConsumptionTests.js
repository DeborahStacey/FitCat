import React from 'react'
import WaterConsumption from '../WaterConsumption'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders the water consumption page correctly', () => {
  const tree = renderer.create(
    <WaterConsumption />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
