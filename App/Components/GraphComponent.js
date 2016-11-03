import React, { Component, PropTypes } from 'react'
import { Animated, Easing, Text, View, ScrollView } from 'react-native'

import styles from './Styles/GraphComponentStyles'

/* IMPORTANT USAGE NOTES:
data must be an object of label: something, value: something
For example:
{
  {label: 'I am a label', value: 1.234},
  {label: 'I am also a thing', value: 1.34},
}
Values have to be numeric because it's a graph.

Multiplier is to make the animation of the bars more noticeable.
*/

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
    var graphs = this.props.data.map((item) => {
      var value = parseFloat(item.value).toFixed(2)
      var bigValue = parseFloat(item.value) * this.props.barMultiplier
      this.animValues[item.label] = Object.values(oldAnimValues)[i] || new Animated.Value(0)
      i = i + 1
      this.animations.push(this.createAnimation(this.animValues[item.label], bigValue, 1000, Easing.ease, 0))
      return (
        <View key={item.label} style={styles.item}>
          <Text style={styles.labelText}>
            {item.label}
          </Text>
          <View style={styles.data}>{
            <Animated.View style={[styles.bar, styles.value, {width: this.animValues[item.label]}]} />
          }
            <Text style={styles.labelText}>
              {value}
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
  data: PropTypes.any.isRequired,
  barMultiplier: PropTypes.number.isRequired
}
