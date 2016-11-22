import React from 'react'
import { Platform, Picker, View, Text } from 'react-native'
import styles from './Styles/DropdownStyle'

export default class Dropdown extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentWillReceiveProps (nextProps) {
    var options = nextProps.options.items
    if (options != null) {
      var items = []

      items.push(<Picker.Item label='Select one...' value={-1} key={'first'} />)

      for (var i = 0; i < options.length; i++) {
        items.push(<Picker.Item label={options[i].name} value={options[i].id} key={i} />)
      }

      this.setState({
        items: items
      })
    }
  }

  render () {
    if (Platform.OS === 'ios') {
      return (
        <View style={styles.dropStyle}>
          <Picker itemStyle={styles.item} style={styles.contentsIOS} selectedValue={this.props.selectedValue} onValueChange={this.props.onValueChange}>
            {this.state.items}
          </Picker>
          <Text style={styles.hackPadding} />
        </View>
      )
    } else {
      return (
        <View style={styles.dropStyle}>
          <Picker style={styles.contents} selectedValue={this.props.selectedValue} onValueChange={this.props.onValueChange}>
            {this.state.items}
          </Picker>
          <Text style={styles.hackPadding} />
        </View>
      )
    }
  }
}

// Options should be an object with name and value inside of it
// ex {"name": x, "value": y}
Dropdown.propTypes = {
  options: React.PropTypes.object.isRequired,
  onValueChange: React.PropTypes.func.isRequired,
  selectedValue: React.PropTypes.number.isRequired
}
