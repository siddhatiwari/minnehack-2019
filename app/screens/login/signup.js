import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import firebase from "firebase";
import { AntDesign } from '@expo/vector-icons';
// import { RadioButton } from 'react-native-paper';
import RadioForm,{RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'

var radioProps = [
    {label: 'Buyer', value: "Buyer"},
    {label: 'Seller', value: "Seller"}
];

export default class SignUp extends React.Component {
    state = {
        firstname:'',
        lastname:'',
        username: '',
        password: '',
        ph:'',
        email:'',
        value: "Buyer",
    
    }
   sign = async (email, pass) => {
    const e = email.split('@')[0];
    try {

        if (this.state.value === null) return;
        await firebase.auth()
            .createUserWithEmailAndPassword(email, pass);


        await firebase.auth().signInWithEmailAndPassword(email, pass)
  .then(() => {
    const rdb = firebase.database().ref();
        

    if (this.state.value === 'Buyer') {
        rdb.child(`users/${e}`).set({  
            customer: true
        })
        this.props.navigation.navigate('Customer');
    } else {
        rdb.child(`users/${e}`).set({  
            farmer: true
        })
        this.props.navigation.navigate('Farmer');
    }
  })

        // Navigate to the Home page, the user is auto logged in

    } catch (error) {
        alert(error.message)
        console.log(error.toString())
    }

}

        render() {
    
    return (
    <View style={styles.container}>
    <TouchableOpacity style={{width:"100%", marginTop:30}} onPress={()=>this.props.navigation.pop()}><AntDesign name="back" size={32} color="white" /></TouchableOpacity> 
        <Text></Text>
        <Text></Text>
        <Text style={{color:"white", fontSize: 30, textAlign:"left", fontWeight:"500",fontFamily: 'Avenir Next'}}> Signup For CornHub: {"  "} </Text>
        <Text></Text>
        
        <View style={styles.userAndpass}>

            <TextInput style={styles.textInputs} placeholder=" Email Address" onChangeText={(text) => {this.setState({email: text})}}></TextInput>

            <TextInput style={styles.textInputs}  secureTextEntry={true} placeholder=" Password" onChangeText={(text) => {this.setState({password: text})}}></TextInput>
            
            {/* <RadioButton value="first"></RadioButton> */}
            {/* <RadioButton.Group
                onValueChange={value => this.setState({ value })}
                value={this.state.value}
            >
                <View>
                <Text>Buyer</Text>
                <RadioButton  value = "Buyer" />
                </View>
                <View>
                <Text>Seller</Text>
                <RadioButton value="Seller" />
                </View>
            </RadioButton.Group> */}
            <View style={{textAlign:"center"}}>
                <RadioForm buttonColor={'black'}  radio_props={radioProps} initial={0} onPress={(value) => {this.setState({value:value})}}/>
            </View>
            

            {/* <Text>{this.state.value}</Text> */}
            
            <TouchableOpacity style={{backgroundColor:'white',borderColor:'#F6343F', justifyContent:"center",height:60,borderRadius:8,marginTop:20,shadowOpacity: 1,
    shadowRadius: 10,
    shadowColor: 'white',
    shadowOffset: { 
      height: 0, 
      width: 0 
    }}} onPress = {() => {
                this.sign(this.state.email,this.state.password)
            }}><Text style={{ color:"#F6343F", fontSize:25, width: 250, alignSelf:"center",textAlign:"center",fontFamily: 'Avenir Next',fontWeight:'600'}}>Create Account</Text></TouchableOpacity>
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
userAndpass:{
    backgroundColor:"#F6343F",
    // justifyContent:'center',
    // alignItems:'center'
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
