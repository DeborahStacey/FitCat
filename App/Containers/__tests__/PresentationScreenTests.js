import React from 'react'
import PresentationScreen from '../PresentationScreen'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <PresentationScreen />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
