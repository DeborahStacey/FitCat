import { default as WeeklyActivityBase } from './WeeklyActivityBase'

export default class CatSteps extends WeeklyActivityBase {

  async fetchYearOfData () {
    return super.fetchYearOfData('steps')
  }

  render () {
    return super.render(0.06)
  }
}
