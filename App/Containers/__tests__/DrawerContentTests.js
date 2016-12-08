import React from 'react'
import DrawerContent from '../DrawerContent'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders the navigation drawer correctly', () => {
  const tree = renderer.create(
    <DrawerContent />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
