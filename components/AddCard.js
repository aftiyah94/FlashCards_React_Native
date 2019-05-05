import React from 'react';
import { Text, View, StyleSheet,TextInput,KeyboardAvoidingView,Platform } from 'react-native';
import TextButton from './TextButton';
import { connect } from 'react-redux';
import {addCard} from '../actions/index';
import {addCardToDB} from "../Utils/api";
import {white,purple,gray} from '../Utils/colors';

class AddCard extends React.Component{
  state ={
    question:"",
    answer:""
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card',
    }
  }

  hanldeAddCard = () => {
    const {deckKey,deck,goDeckDetails,dispatch,navigation} = this.props;
    const noQuestions = (deck.questions === undefined) || (deck.questions === null);
    let newQuestion = (noQuestions)? [this.state]:deck.questions.concat([this.state]);
    //add card to db , update redux store and navigate to respective deck
    let newDeck = {
      ...deck,
      questions : newQuestion
    }

addCardToDB(newDeck,deckKey).then(()=>{
     dispatch(addCard(newQuestion,deckKey))
  }).then(() => (navigation.navigate('DeckDetails',
              { deckKey :deckKey })));
  }


  render(){
    const {deckKey,goDeckDetails} = this.props;
    return (
      <KeyboardAvoidingView style={styles.mainEle} 
      behavior= {(Platform.OS === 'ios')? "padding" : null} 
      >
      <TextInput
      mode='flat'
      multiline={true}
      style={styles.textInputField}
      onChangeText={(question) => this.setState({question})}
      value={this.state.question}
      placeholder='enter question here'
      />
      <TextInput
      mode='flat'
      multiline={true}
      style={styles.textInputField}
      onChangeText={(answer) => this.setState({answer})}
      value={this.state.answer}
      placeholder='enter answer here'

      />

      <TextButton style={styles.buttonEle} onPress={this.hanldeAddCard}>
            <Text style={styles.submitBtnText}>
              Submit
            </Text>
          </TextButton>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  mainEle: {
    flex:1,
    fontFamily: 'Cochin',
    fontSize: 20,
    backgroundColor:white,
    borderRadius :10,
    alignContent: 'center',
    justifyContent: 'flex-start',
    padding:20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10, 
    marginBottom: 10,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  textInputField: {
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    fontSize: 20,
    textAlign: 'center',
    padding:10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20, 
    placeholderTextColor: gray,
    height:100
  },
  buttonEle : {
    backgroundColor: purple,
    padding: 10,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop:20,
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
});
const mapStateToProps = (state,{navigation}) => {
  const {deckKey} = navigation.state.params;
  console.log("nav=",deckKey);
  return ({deckKey: deckKey,
  deck:state[deckKey],
  navigation
  })
}

const mapDispatchToProps = (dispatch,{navigation}) => {
    const {deckKey} = navigation.state.params;
  return ({
    goDeckDetails : () => navigation.navigate(
              'DeckDetails',
              { deckKey :deckKey }
            )
  })

}
export default connect(mapStateToProps)(AddCard);