import React from 'react'
import Moment from 'moment'
import { AsyncStorage, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import { Images } from '../Themes'
import { default as StorageKeys } from '../Config/StorageKeys'

import styles from './Styles/CatDistanceStyle'

export default class CatDistance extends React.Component {
    constructor(props) {
        super(props)
        var date = Moment()
        this.state = {
            selectedDate: date
        }

        this.fetchYearOfData()
    }

    onPressLeft = () => {
        this.setState({
            selectedDate: this.state.selectedDate.subtract(1, "day")
        })
        this.updateDisplayedData()
    }

    onPressRight = () => {
        this.setState({
            selectedDate: this.state.selectedDate.add(1, "day")
        })
        this.updateDisplayedData()
    }

    async fetchYearOfData() {
        let userId = await AsyncStorage.getItem(StorageKeys.FITBIT_USER_ID)
        let accessToken = await AsyncStorage.getItem(StorageKeys.FITBIT_ACCESS_TOKEN)
        fetch(`https://api.fitbit.com/1/user/${userId}/activities/distance/date/${Moment(this.state.selectedDate).format("YYYY-MM-DD")}/1y.json`, {
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
            for(var i = 0; i < arrayOfObjects.length; i++) {
                thing[Object.keys(arrayOfObjects[i])[0]] = Object.values(arrayOfObjects[i])[0]
            }
            this.setState({
                yearOfData: thing
            })

            this.updateDisplayedData()
        })
    }

    updateDisplayedData = () => {
        var selectedDate = Moment(this.state.selectedDate)
        var dateString = selectedDate.format("YYYY-MM-DD")
        this.setState({
            currentDateData: this.state.yearOfData[dateString]
        })
    }

    canMoveForward = () => {
        return Moment(this.state.selectedDate).isSame(Moment(), "day")
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
            {this.state.selectedDate.format("dddd DD, MMMM YYYY")}
          </Text>
          <TouchableOpacity disabled={this.canMoveForward()} onPress={this.onPressRight}>
            <Text style={styles.sectionText}>
                &#62;
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionText}>
            {this.state.currentDateData}
          </Text>
        </ScrollView>
      </View>
      )
  }
}
