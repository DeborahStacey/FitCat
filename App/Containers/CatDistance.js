import { default as WeeklyActivityBase } from './WeeklyActivityBase'

export default class CatDistance extends WeeklyActivityBase {

  async fetchYearOfData () {
    return super.fetchYearOfData('distance')
  }

  render () {
    return super.render(50)
  }
}
