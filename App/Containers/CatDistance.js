import React from 'react'
import Moment from 'moment'
import { AsyncStorage, Text, TouchableHighlight, View, Image, ScrollView, StyleSheet } from 'react-native'
import GraphComponent from '../Components/GraphComponent'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Images } from '../Themes'
import { default as StorageKeys } from '../Config/StorageKeys'

import styles from './Styles/CatDistanceStyle'

const tempStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 8
  },
  touchable: {
    overflow: 'hidden'
  },
  iconLeft: {
    color: 'white',
    marginRight: 10
  },
  iconRight: {
    color: 'white',
    marginLeft: 10
  },
  text: {
    fontWeight: '600',
    backgroundColor: 'transparent'
  },
  blockStyle: {
    backgroundColor: 'blue',
    borderRadius: 5
  },
  buttonText: {
    color: 'white'
  }
})

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
        <ScrollView style={styles.container}>
          <TouchableHighlight style={[tempStyles.touchable, tempStyles.blockStyle]} onPress={this.onPressLeft}>
            <View style={[tempStyles.container, tempStyles.blockStyle]}>
              <Icon name='chevron-left' style={tempStyles.iconLeft} />
              <Text style={tempStyles.buttonText}>Previous Week</Text>
            </View>
          </TouchableHighlight>
          <Text style={styles.sectionText}>
            {this.state.selectedDate.format('dddd DD, MMMM YYYY') + ' - ' + Moment(this.state.selectedDate).add(7, 'day').format('dddd DD, MMMM YYYY')}
          </Text>
          <TouchableHighlight style={[tempStyles.touchable, tempStyles.blockStyle]} onPress={this.onPressRight}>
            <View style={[tempStyles.container, tempStyles.blockStyle]}>
              <Text style={tempStyles.buttonText}>Next Week</Text>
              <Icon name='chevron-right' style={tempStyles.iconRight} />
            </View>
          </TouchableHighlight>
          <GraphComponent weekData={this.state.currentWeekData} />
        </ScrollView>
      </View>
      )
  }
}
