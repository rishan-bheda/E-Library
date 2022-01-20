import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions'; 

export default class TransactionScreen extends Component {

  constructor(props){

    super(props);
    this.state={

      domState : "normal",
      haveCameraPermissions : null,
      scanned : false,
      scannedData : ""

    }

  }

  getCameraFunction = async domState =>{

    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({

      haveCameraPermissions : status === "granted",
      domState : domState,
      scanned : false,

    })

  }

  handleBarCodeScanned = async({type, data}) =>{

    this.setState({

      scannedData : data,
      domState : "normal",
      scanned : true

    })

  }

  render() {

    const {domState, haveCameraPermissions, scannedData, scanned} = this.state

    if(domState === "scanner"){ return(<BarCodeScanner
    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
    />)}

    return (
      <View style={styles.container}>
        <Text>
          {haveCameraPermissions ? scannedData:"request for the camera permission"}
        </Text>
        <Text style={styles.text}>Transaction Screen</Text>
        <TouchableOpacity style={style.scanButton} onPress={()=>this.getCameraFunction("scanner")}>Scan Button</TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  scanButton: {

    width:50,
    height:50,
    justifyContent:"center",
    backgroundColor:"red",
    borderRadius:15

  }
});
