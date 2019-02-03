import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import firebase from "firebase";


var auth = firebase.auth();


export default class ResetPassword extends React.Component {
    state = {
        emailAddress: '',
        
    
    }
    resetPassword = (emailAddress) => auth.sendPasswordResetEmail(emailAddress).then(function() {
// Email sent.
    alert("email sent");
}).catch(function(error) {
    alert(error.message);
});
    render() {
        return (
        <View style={styles.container}>

            <TouchableOpacity style={{width:"100%", marginTop:30}} onPress={()=>this.props.navigation.pop()}><AntDesign name="back" size={32} color="white" /></TouchableOpacity> 
            <Text style = {{color:'white', fontSize:40, fontWeight:'600', marginTop:80,marginBottom:20,fontFamily: 'Avenir Next'}}>Forgot Password?</Text>
            <Text style = {{color:'white', fontSize:20, fontWeight:'600',marginBottom:20,fontFamily: 'Avenir Next'}}>Enter Email Address to reset password.</Text>
     
    
            <View style={styles.userAndpass}>
            <TextInput style={[styles.textInputs,{marginBottom:40,fontFamily: 'Avenir Next'}]}  placeholder=" Email Address" onChangeText={(text) => {this.setState({emailAddress: text})}}></TextInput>
            {/* <TextInput style={[styles.textInputs, {marginBottom:40}]}  placeholder=" Last Name" onChangeText={(text) => {this.setState({password: text})}}></TextInput> */}
            <TouchableOpacity style={{justifyContent:"center",backgroundColor:'white',height:60,borderRadius:8,padding:10,shadowOpacity: 1,
    shadowRadius: 10,
    shadowColor: 'white',
    shadowOffset: { 
      height: 0, 
      width: 0 
    }}}  onPress = {() => {this.resetPassword(this.state.emailAddress)}}><Text style={{color:"#F6343F", fontSize:25, width: 200, alignSelf:"center",textAlign:"center",fontWeight:'600',fontFamily: 'Avenir Next'}}>Reset Password</Text></TouchableOpacity>
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
    