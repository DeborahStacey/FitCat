import React from 'react'
import { ListView, View, ScrollView, Text, TouchableHighlight } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { Colors } from '../Themes/'

import { default as WellCatManager } from '../Services/WellCatManager'

import styles from './Styles/AddCatStyle'

export default class AddCat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (h1, h2) => h1 !== h2
      }),
      catsList: {},
      loaded: false
    }

    this.fetchCatsList()
  }

  async fetchCatsList () {
    var catsList = await WellCatManager.fetchCatsList()
    console.log(catsList)
    var ds = this.state.dataSource.cloneWithRowsAndSections(catsList)

    this.setState({
      catsList: ds,
      loaded: true
    })
  }

  addCat (catId) {
    WellCatManager.addCat(catId)
    NavigationActions.pop()
  }

  renderSectionHeader (sectionData, sectionID) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{sectionID}</Text>
      </View>
    )
  }

  renderRow (cat) {
    return (
      <TouchableHighlight underlayColor={Colors.frost} onPress={() => { this.addCat(cat.petid) }}>
        <View style={styles.catRow}>
          <Text style={styles.catRowText}>{cat.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  renderSeparator (sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
      />
    )
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          {
            this.state.loaded &&
            <ListView dataSource={this.state.catsList}
              renderSectionHeader={this.renderSectionHeader}
              renderRow={this.renderRow.bind(this)}
              renderSeparator={this.renderSeparator}
              style={styles.listView} />
          }
        </ScrollView>
      </View>
    )
  }
}
