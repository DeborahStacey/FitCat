import React, { Component, PropTypes } from 'react'
import { Animated, Easing, Text, View, ScrollView } from 'react-native'

import styles from './Styles/GraphComponentStyles'

export default class GraphComponent extends Component {
  constructor (props) {
    super(props)
    this.animations = []
    this.animValues = {}
  }

  render () {
    this.animations.length = 0
    var oldAnimValues = this.animValues
    this.animValues = {}
    var i = 0
    var graphs = this.props.weekData.map((item) => {
      var distance = parseFloat(item.distance).toFixed(2)
      var bigDistance = parseFloat(item.distance) * 50
      this.animValues[item.date] = Object.values(oldAnimValues)[i] || new Animated.Value(0)
      i = i + 1
      this.animations.push(this.createAnimation(this.animValues[item.date], bigDistance, 1000, Easing.ease, 0))
      return (
        <View key={item.date} style={styles.item}>
          <Text style={styles.dateText}>
            {item.date}
          </Text>
          <View style={styles.data}>{
            <Animated.View style={[styles.bar, styles.distance, {width: this.animValues[item.date]}]} />
          }
            <Text style={styles.dateText}>
              {distance}
            </Text>
          </View>
        </View>
      )
    })
    return (
      <ScrollView>
        {graphs}
      </ScrollView>
    )
  }

  componentDidUpdate () {
    this.animate(this.animations)
  }

  animate (animations) {
    Animated.parallel(this.animations).start()
  }

  createAnimation (value, valueToGoTo, duration, easing, delay) {
    return Animated.timing(
      value,
      {
        toValue: valueToGoTo,
        duration,
        easing,
        delay
      }
    )
  }
}

GraphComponent.propTypes = {
  weekData: PropTypes.any.isRequired
}
