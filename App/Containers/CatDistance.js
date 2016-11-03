import React from 'react'
import Moment from 'moment'
import { AsyncStorage, Text, TouchableHighlight, View, ScrollView } from 'react-native'
import GraphComponent from '../Components/GraphComponent'
import Icon from 'react-native-vector-icons/FontAwesome'
import { default as StorageKeys } from '../Config/StorageKeys'

import styles from './Styles/CatDistanceStyle'

export default class CatDistance extends React.Component {
  constructor (props) {
    super(props)
    var date = Moment().subtract(7, 'day')
    this.state = {
      selectedDate: date,
      currentWeekData: []
    }

    this.fetchYearOfData()
  }

  onPressLeft = () => {
    this.setState({
      selectedDate: this.state.selectedDate.subtract(7, 'day')
    })
    this.updateDisplayedData()
  }

  onPressRight = () => {
    this.setState({
      selectedDate: this.state.selectedDate.add(7, 'day')
    })
    this.updateDisplayedData()
  }

  async fetchYearOfData () {
    let userId = await AsyncStorage.getItem(StorageKeys.FITBIT_USER_ID)
    let accessToken = await AsyncStorage.getItem(StorageKeys.FITBIT_ACCESS_TOKEN)
    fetch(`https://api.fitbit.com/1/user/${userId}/activities/distance/date/${Moment(this.state.selectedDate).format('YYYY-MM-DD')}/1y.json`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }).then((response) => response.json()).then((responseJson) => {
      var arrayOfObjects = responseJson['activities-distance'].map((obj) => {
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

  updateDisplayedData = () => {
    var selectedDate = Moment(this.state.selectedDate)
    var weekOfData = []
    for (var i = 0; i <= 7; i++) {
      var dateCopy = Moment(selectedDate)
      var dateString = dateCopy.add(i, 'day').format('YYYY-MM-DD')
      weekOfData.push({'label': dateString, 'value': this.state.yearOfData[dateString] ? this.state.yearOfData[dateString] : 0.0})
    }
    this.setState({
      currentWeekData: weekOfData
    })
  }

  canMoveForward = () => {
    return Moment(this.state.selectedDate).add(7, 'day').isSame(Moment(), 'day')
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <TouchableHighlight style={[styles.buttonTouchable, styles.blockStyle]} onPress={this.onPressLeft}>
            <View style={[styles.buttonContainer, styles.blockStyle]}>
              <Icon name='chevron-left' style={styles.iconLeft} />
              <Text style={styles.buttonText}>Previous Week</Text>
            </View>
          </TouchableHighlight>
          <Text style={styles.sectionText}>
            {this.state.selectedDate.format('dddd DD, MMMM YYYY') + ' - ' + Moment(this.state.selectedDate).add(7, 'day').format('dddd DD, MMMM YYYY')}
          </Text>
          <TouchableHighlight style={[styles.buttonTouchable, styles.blockStyle]} onPress={this.onPressRight}>
            <View style={[styles.buttonContainer, styles.blockStyle]}>
              <Text style={styles.buttonText}>Next Week</Text>
              <Icon name='chevron-right' style={styles.iconRight} />
            </View>
          </TouchableHighlight>
          <GraphComponent data={this.state.currentWeekData} barMultiplier={50} />
        </ScrollView>
      </View>
      )
  }
}
