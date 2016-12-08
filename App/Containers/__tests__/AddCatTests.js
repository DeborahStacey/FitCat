import React from 'react'
import AddCat from '../AddCat'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders the add cat page corectly', () => {
  const tree = renderer.create(
    <AddCat />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
