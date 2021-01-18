import React from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        studentid:"", bookid:"",
        hasCameraPermissions: null,
        scanned: false,
        scannedData: '',
        buttonState: 'normal'
      }
    }

    getCameraPermissions = async () =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: 'clicked',
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      const state=this.state.buttonState
      if(state==="Book Id"){
      this.setState({
        scanned: true,
        bookid: data,
        buttonState: 'normal'
      });
    }
    else if(state==="Student Id"){
      this.setState({
        scanned: true,
        studentid: data,
        buttonState: 'normal'
      });
    }
    }
    

    render() {
      const hasCameraPermissions=this.state.hasCameraPermissions
      const scanned=this.state.scanned
      const buttonState=this.state.buttonState
      if(buttonState!=="normal"&& hasCameraPermissions){
        return(
          <BarCodeScanner
          onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}/>
        )
      }
      else if(buttonState==="normal"){
     return(<View>
       <TextInput placeholder="Enter Your Book Id" onChangeText={
         Text=>{this.setState({bookid:Text})} }
         value={this.state.bookid}
       />
       <TouchableOpacity onPress={()=>{this.getCameraPermissions("book id")}}> <Text>scan</Text></TouchableOpacity>

       <TextInput placeholder="Enter Your Student Id" onChangeText={
         Text=>{this.setState({studentid:Text})} }
         value={this.state.studentid}
       />
       <TouchableOpacity onPress={()=>{this.getCameraPermissions("student id")}}> <Text>scan</Text></TouchableOpacity>
     </View>)
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    }
  });