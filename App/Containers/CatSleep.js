import { default as WeeklyActivityBase } from './WeeklyActivityBase'
import { AsyncStorage } from 'react-native'
import Moment from 'moment'
import { default as StorageKeys } from '../Config/StorageKeys'

export default class CatSleep extends WeeklyActivityBase {

  async fetchYearOfData () {
    // selectedDate is the first date in the selected week, but we want data starting at the end
    let endDate = Moment(this.state.selectedDate).add(7, 'day').format('YYYY-MM-DD')
    let accessToken = await AsyncStorage.getItem(StorageKeys.FITBIT_ACCESS_TOKEN)

    fetch(`https://api.fitbit.com/1/user/-/sleep/minutesAsleep/date/${endDate}/1y.json`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }).then((response) => response.json()).then((responseJson) => {
      console.log(responseJson)
      var arrayOfObjects = responseJson['sleep-minutesAsleep'].map((obj) => {
        var rObj = {}
        rObj[obj['dateTime'].toString()] = obj.value
        return rObj
      })

      var thing = {}
      for (var i = 0; i < arrayOfObjects.length; i++) {
        thing[Object.keys(arrayOfObjects[i])[0]] = parseFloat(Object.values(arrayOfObjects[i])[0])
      }
      this.setState({
        yearOfData: thing
      })

      this.updateDisplayedData()
    })
  }

  render () {
    return super.render(0.5)
  }
}
