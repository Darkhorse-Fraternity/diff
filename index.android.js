/**
 * Created by lintong on 9/21/16.
 * @flow
 */
'use strict';

require('./src/app');


// import React, {Component, PropTypes} from 'react';
// import  {
//     AppRegistry,
//     TouchableOpacity,
//     View,
//     Text,
//     Image,
//     ListView,
//     ViewPagerAndroid,
//     ScrollView,
// } from 'react-native';
//
//
// export default class App extends Component {
//
//     constructor(props: Object) {
//         super(props);
//         this.state = {};
//         this._dataSource = new ListView.DataSource({
//             rowHasChanged: (r1, r2) => r1 !== r2,
//         });
//     }
//
//     __renderRow(item: Object, sectionID: number, rowID: number): ReactElement<any> {
//         return (
//             <View>
//                 <Text>{item}</Text>
//             </View>
//         )
//     }
//
//     __renderHeaderView(): ReactElement<any> {
//         return (
//                 <ViewPagerAndroid
//                     initialPage={0}
//                     style={{backgroundColor:'orange',height:100,}}>
//
//                     <View style={{backgroundColor:'green',}}/>
//                     <View style={{backgroundColor:'grey',}}/>
//                 </ViewPagerAndroid>
//
//         )
//     }
//
//     render() {
//         return (
//             <View style={{flex:1}}>
//                 <ListView
//                     style={{flex:1}}
//                     removeClippedSubviews={false}
//                     renderHeader={this.__renderHeaderView.bind(this)}
//                     renderRow={this.__renderRow.bind(this)}
//                     dataSource={this._dataSource.cloneWithRows(['aaa','bbb'])}
//                 />
//                 {this.__renderHeaderView() }
//             </View>
//         );
//     }
// }
//
// // var WhiteBoardRN = require('../example_advanced');
// AppRegistry.registerComponent('diff', () => App);