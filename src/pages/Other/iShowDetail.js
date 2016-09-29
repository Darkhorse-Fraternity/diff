/**
 * Created by lintong on 8/29/16.
 * @flow
 */
'use strict';
import React, {Component,PropTypes} from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native'
import {blackFontColor, grayFontColor, backViewColor} from '../../configure';
import * as immutable from 'immutable';
import {connect} from 'react-redux'
import {navigatePush} from '../../redux/actions/nav'
import {iShowDelete} from '../../redux/actions/iShow'
class iShowDetail extends Component {
  constructor(props:Object) {
      super(props);
      // this._renderHeader.bind(this)
  }

  static propTypes = {
    //  load: PropTypes.func.isRequired,
  };


  componentDidMount() {
  }


  _renderRow(title:string, style:any,  isArraw:bool = false, onPress:Function = ()=> {
  }, description:any = null) {
      return (
          <TouchableOpacity onPress={onPress} style={style}>
              <View style={styles.row}>
                  <View style={{flexDirection:'row',alignItems:'center',}}>
                      {/*<Image
                          resizeMode='contain'
                          source={source}
                          style={styles.imageNail}
                      />*/}
                      <Text style={styles.rowText}>
                          {title}
                      </Text>
                  </View >
                  <View style={styles.row2}>
                      {description ? <Text style={styles.description}>{description}</Text> : null}
                      {isArraw ? <View style={styles.arrowView}/> : null}
                  </View>
              </View>
          </TouchableOpacity>
      );
  }

  _renderHeader():ReactElement<any>{
    const exam = this.props.data.get('exam')
    const type = this.props.data.get('gradeType');
    const str = type == 2 ?exam:'正在审核'
    return (
      <View style={styles.topView}>
        <Text style={styles.text}>{str}</Text>
      </View>)
  }
  render():ReactElement<any>{
    const type = this.props.data.get('gradeType');

    //type:
    //0 正在审核。
    //1 审核通过。
    //2 被拒绝。
    //3 隐藏。
    //-1 已经删除
    return(
      <View
          style={styles.list}
          //refreshControl={
    // <RefreshControl
    // 	refreshing={this.state.refreshing}
    // 	onRefresh={this._handleRefresh}
    // 	/>
  //}
      >
        {type != 1  &&this._renderHeader()}

          {this._renderRow('查看', styles.group, true, () => {
              this.props.push('Intro');
          })}
          {this._renderRow('删除', styles.group, true, () => {
            Alert.alert('提示', '是否要删除？', [
              {text: '是', onPress: this.props.delete},
              {text: '否', onPress: ()=>{}},
            ]);
          })}


      </View>
    )
  }
  // shouldComponentUpdate(nextProps:Object) {
  //   return !immutable.is(this.props.loadStatu, nextProps.loadStatu) ;
  // }

}

const styles = StyleSheet.create({
  list: {
      flex:1,
      backgroundColor:backViewColor,
  },
  text:{
    fontSize:17,
    textAlign:'center',
    marginBottom:20,
    color:'red',
  },
  topView:{
    marginBottom:7,
    backgroundColor:'white',
    justifyContent:'center',
  },
  group: {
      marginBottom: 7
  },
  rowText: {
      marginLeft: 10,
      fontSize: 14,
      color: blackFontColor,
  },
  arrowView: {
      borderBottomWidth: StyleSheet.hairlineWidth * 2,
      borderRightWidth: StyleSheet.hairlineWidth * 2,
      borderColor: '#8c8c85',
      transform: [{rotate: '315deg'}],
      marginRight: 5,
      width: 10,
      height: 10,
  },
  row: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10 ,
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  description: {
      marginRight: 12,
      fontSize: 13,
      color: blackFontColor
  },
  row2: {
      flexDirection: 'row',
      alignItems: 'center',
  },
})


const mapStateToProps = (state) => {
  const data = state.iShow.get('data');
  const index = state.iShow.get('index');
    return {
      data:data.get(index)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      push: (key)=> {
          dispatch(navigatePush(key))
      },
      delete:()=>{
        dispatch(iShowDelete())
      }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(iShowDetail)
