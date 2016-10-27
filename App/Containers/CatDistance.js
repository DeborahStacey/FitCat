import React from 'react'
import Moment from 'moment'
import { AsyncStorage, Animated, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import GraphComponent from '../Components/GraphComponent'
import { Images } from '../Themes'
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
      weekOfData.push({'date': dateString, 'distance': this.state.yearOfData[dateString] ? this.state.yearOfData[dateString] : 0.0})
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
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <Text style={styles.sectionText}>
            Cat distance!
          </Text>

          <Text style={styles.sectionText} onPress={this.onPressLeft}>
            &#60;
          </Text>
          <Text style={styles.sectionText}>
            {this.state.selectedDate.format('dddd DD, MMMM YYYY') + ' - ' + Moment(this.state.selectedDate).add(7, 'day').format('dddd DD, MMMM YYYY')}
          </Text>
          <TouchableOpacity disabled={this.canMoveForward()} onPress={this.onPressRight}>
            <Text style={styles.sectionText}>
                &#62;
            </Text>
          </TouchableOpacity>
          <GraphComponent weekData={this.state.currentWeekData} />
        </ScrollView>
      </View>
      )
  }
}
