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
    AppRegistry,
    Platform
} = ReactNative;
import AMapView from 'air-amap'

const amapkey = Platform.OS == 'ios' ? 'e4501131bc38329b48c5ad72b99a9048'
    : '93f7f4e86f0f203a23bd3bdaecee1b3a'

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