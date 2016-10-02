/**
 * Created by lintong on 8/29/16.
 * @flow
 */
'use strict';
import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux'
import {
  View,
  TextInput,
  StyleSheet,
}from 'react-native'
import {renderNavSenderButton} from '../../util/viewUtil'
import * as immutable from 'immutable';
import {backViewColor, textInputTextColor, placeholderTextColor, grayFontColor} from '../../configure'
import {iCommentContentChange} from '../../redux/actions/iComment'
import {navigateRefresh,navigatePop} from '../../redux/actions/nav'
import {iCommentAdd} from '../../redux/actions/iComment'
class AddComment extends Component{

 constructor(props:Object){
      super(props);

  }
  static propTypes = {
     content: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const rightBtn = renderNavSenderButton(this._tapRight)
    this.props.refresh({renderRightComponent:rightBtn,
       rightButtonDisabled:this.props.content==0});
  }

  componentWillUnmount(){
    this.props.changeText('')
  }

 shouldComponentUpdate(nextProps:Object) {
   return !immutable.is(this.props.content, nextProps.content) ;
 }

  _tapRight = () => {
      this.props.add()
  };

  render() {
    return(
      <View style={styles.contentView}>
        <TextInput
          defaultValue={this.props.content}
          placeholderTextColor={placeholderTextColor}
          style={styles.input}
          placeholder={"请输入评论"}
          maxLength={500}
          multiline={true}
          enablesReturnKeyAutomatically= {true}
          onChangeText={(text) => {

            this.props.changeText(text)
          }}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  contentView:{
    flex:1,
  },
  input:{
    marginLeft:12,
    marginRight:12,
    backgroundColor: 'white',
    height: 250,
    color:textInputTextColor,

    fontSize:14,
    marginTop: 15,
    textAlignVertical:'top',
    paddingHorizontal:12,
    paddingTop:14,
  }
})

const mapStateToProps = (state) => {

	return {
    content:state.iComment.get('content'),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    changeText:(text:string)=>{
     dispatch(navigateRefresh({
            rightButtonDisabled:text.length==0}))
      dispatch(iCommentContentChange(text))
    },
    refresh:(obj)=>{
      dispatch(navigateRefresh(obj))
    },
    add:()=>{
      dispatch(iCommentAdd())
    }
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddComment)
