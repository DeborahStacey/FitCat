import React from 'react'
import GraphComponent from '../GraphComponent'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  var testData = [
      {'label': '2016-10-10', 'value': 10.0}
  ]
  const tree = renderer.create(
    <GraphComponent data={testData} multiplier={10} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
