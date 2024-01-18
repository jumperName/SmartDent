import { StyleSheet, Text, View,SafeAreaView,ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import NetInfo from "@react-native-community/netinfo";

const ConnectionInternet = ({ navigation }) => {
  const [connectionStatus, setConnectionStatus] = React.useState(false);
  const [connectionType, setConnectionType] = React.useState(null);
  
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
     // console.log(state);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleNetworkChange = (state) => {
    setConnectionStatus(state.isConnected);
    setConnectionType(state.type);
  };

   const NetworkCheck = ({ status, type }) => {
    const handleNetworkChange = (state) => {
      setConnectionStatus(state.isConnected);
      setConnectionType(state.type);
    };

    return (
      <View style={styles.container}>
        <Text style={styles.statusText}>
           {status ? "Connected": "ไม่มีสัญญาณอินเตอร์เน็ต"}
        </Text>
        {/* <Text style={styles.statusText}>Connection Type : {type}</Text> */}
      </View>
    );
  };
  
 useEffect(() => {
    const netInfoSubscription = NetInfo.addEventListener(handleNetworkChange);
    return () => {
      netInfoSubscription && netInfoSubscription();
    };
  }, []);


  return (
    <>
      {connectionStatus ? (
      <SafeAreaView>
        </SafeAreaView>
      ) : (
        <NetworkCheck status={connectionStatus} type={connectionType} />
      )}
    </>
  );
}

export default ConnectionInternet

const styles = StyleSheet.create({
  container: {
    //flex: 1,
   padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#808080 ',
  },
  statusText: {
    fontSize: 18,
    textAlign: 'center',

    color: 'black',
  },
})