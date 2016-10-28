import React from 'react'
import GraphComponent from '../GraphComponent'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  var testData = [
      {'date': '2016-10-10', 'distance': 10.0}
  ]
  const tree = renderer.create(
    <GraphComponent weekData={testData} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
