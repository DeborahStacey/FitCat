import React from 'react'
import Dashboard from '../Dashboard'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders an empty page initially', () => {
  const tree = renderer.create(
    <Dashboard />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
