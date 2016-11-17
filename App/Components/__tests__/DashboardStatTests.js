import React from 'react'
import DashboardStat from '../DashboardStat'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <DashboardStat icon='paw' stat='125' unit='steps' onPress={() => {}} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
