/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// require('./src/app');



var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Share,
    AppRegistry
} = ReactNative;
import AMapView from 'air-amap'

const amapkey = Platform.OS == 'ios' ? '0220c0014e571c40a99752d6865bcedb'
    : '2351b3779d2bde3aa611e228917bda0c'

class ShareMessageExample extends React.Component {


    constructor(props) {
        super(props);



        this.state = {
            result: ''
        };
    }

    render() {
        return (<View style={{flex: 1, backgroundColor: '#f00'}}>
            <AMapView
                amapkey={amapkey}
                initialRegion={{latitude: 30.315888, longitude: 120.165817}} showsUserLocation>
                <AMapView.Marker pinColor="green" draggable title='xxx' description="这是一个好地方" coordinate={{latitude: 30.315888, longitude: 120.165817}} />
            </AMapView>
        </View>);
    }



}


var styles = StyleSheet.create({
    wrapper: {
        borderRadius: 5,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#eeeeee',
        padding: 10,
    },
});



// var WhiteBoardRN = require('../example_advanced');
AppRegistry.registerComponent('diff', () => ShareMessageExample);