import React, {Component,PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';

import Button from "react-native-button";
import {mainColor, grayFontColor} from '../configure';
// import {mainColor,lightFontColor} from '../configure'
export default class CourseTabBar extends Component {
  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    underlineColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
  };
  renderTabOption(name:string, page:number) {
    const isTabActive = this.props.activeTab === page;
    const activeTextColor = this.props.activeTextColor || mainColor;
    const inactiveTextColor = this.props.inactiveTextColor || grayFontColor;
    const textStyle = this.props.textStyle || {};
    return <Button
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => this.props.goToPage(page)}>
      <View style={[styles.tab, {width:this.props.containerWidth/this.props.tabs.length}]}>
        <Text style={[{color: isTabActive ? activeTextColor : inactiveTextColor, fontWeight: isTabActive ? 'bold' : 'normal', fontSize:15 }, textStyle]}>
          {name}
        </Text>
      </View>
    </Button>;
  }

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabWidth = containerWidth / numberOfTabs/2;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: tabWidth,
      height: 2,
      backgroundColor: this.props.underlineColor || mainColor,
      bottom: 0,
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [tabWidth/2,  tabWidth/2*5],
    });

    return (
      <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor || 'white', }, this.props.style, ]}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        <Animated.View style={[tabUnderlineStyle, { left, }, ]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingBottom: 10,
  },
  tabs: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#ccc',
  },
});
