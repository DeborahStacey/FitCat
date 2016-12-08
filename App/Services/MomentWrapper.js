import Moment from 'moment'

module.exports = {
  getNewMoment () {
    return new Moment()
  },

  getMomentFromDate (date) {
    return new Moment(date)
  }
}
