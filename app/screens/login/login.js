import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class LogIn extends React.Component {
  state = {
    username: '',
    password: ''

  }

  signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => {
    const rdb = firebase.database().ref();
    const e = email.split('@')[0];
   rdb.child(`users/${e}`).once('value').then(descSnap => {
    if (descSnap.val().customer) {
      this.props.navigation.navigate('Customer');
    } else {
      this.props.navigation.navigate('Farmer');
    }
  })})
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage)
  // ...
});

  render() {
    return (
      <View style={styles.container}>
      <View style={{height: 200,alignItems:'center',marginTop:80}}>
          <MaterialCommunityIcons name="food-apple" size={60} color="white" />
        <Text style = {{color:'white', fontSize:60, fontWeight:'600',fontFamily: 'Avenir Next'}}>FarmBaba</Text>
      </View>
      


          {/* <Image source={{uri: "https://juststickers.in/wp-content/uploads/2017/12/corn-hun.png"}} style={{width: 300, height: 300}}></Image> */}


        <View style={styles.userAndpass}>
          <TextInput style={[styles.textInputs, {marginBottom:10}]}  placeholder=" Email Address" onChangeText={(text) => {this.setState({username: text})}}></TextInput>
          <TextInput style={[styles.textInputs, {marginBottom:30}]} secureTextEntry={true} placeholder=" Password" onChangeText={(text) => {this.setState({password: text})}}></TextInput>
          <TouchableOpacity style={{justifyContent:"center", marginBottom:30,borderRadius:8,backgroundColor:'white',height:50,shadowOpacity: 1,
    shadowRadius: 10,
    shadowColor: 'white',
    shadowOffset: { 
      height: 0, 
      width: 0 
    }}} onPress = {() => {this.signIn(this.state.username, this.state.password)}}><Text style={{borderWidth:2, borderColor:"white", color:"#F6343F", fontSize:25, width: 200, alignSelf:"center",textAlign:"center",borderRadius:8,fontWeight:'600',fontFamily: 'Avenir Next'}}>Sign In</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Reset')}>
            <Text style={{color:"white", fontWeight:'700',fontFamily: 'Avenir Next' }}>Forgot Your Password?</Text>
          </TouchableOpacity>
        </View>
 
        <View style={{ flexDirection:'row', marginBottom:50}}>
        <Text style={{color:"white",fontFamily: 'Avenir Next'}}>Don't have an account?{' '}</Text>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signup')}>
            <Text style={{color:"white", fontWeight:'700',fontFamily: 'Avenir Next'}}>Sign Up</Text>
          </TouchableOpacity> 
        </View>
        
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6343F',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop : 20
    
  },
  userAndpass: {
    flex: 1,
    backgroundColor:'#F6343F',
    alignItems: 'center',
    justifyContent: 'flex-start',
    
    
    
  },
  textInputs:{
    borderWidth:0, 
    borderColor:"#F6343F",
    height:60, 
    backgroundColor:'white', 
    fontSize:20, 
    width: 300, 
    borderRadius: 8,
    paddingLeft: 16,
    marginBottom: 20,
    // textAlign:"center",
    fontFamily: 'Avenir Next'
  
}
});
