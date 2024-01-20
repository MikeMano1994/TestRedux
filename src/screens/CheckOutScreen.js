import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, Image, Dimensions, FlatList, Linking, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../setup/actions/auth";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get('screen').width

const CheckOutScreen = ({ }) => {

  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [postList, setPostList] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  const cartInfo = useSelector(rootState => rootState);

  useEffect(() => {
    const data = async()=> {
      cartInfo = JSON.parse(cartInfo)
    setPostList(cartInfo || [])
    let total = 0
    for (let i = 0; i < cartInfo.length; i++) {
      total = total + parseInt(cartInfo[i].price)
    }
    setTotalAmount(total)
  }
  data()
  }, [])

  const clearData = () => {
    dispatch(clear()).then((response) => {
      if (response.status === "success") {
        navigation.replace('QRScanScreen')
      }
    });
  };

  const renderData = (item, index) => {
    return (<View style={styles.card}>
      <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Name: {item.name}</Text>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
      <View style={{flexDirection:'column'}}>
      <Text style={{ color: 'black', fontSize: 16, marginTop: 10 }}>Price: {item.price}</Text>
      </View>
      </View>
    </View>)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, padding: 10 }}>
      <View style={{flexDirection:'row',padding: 10,justifyContent:'space-between'}}>
          <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Image style={{width:25, height:25, resizeMode:'contain'}}
            source={require('./../assets/back.png')}/>
          </TouchableOpacity>
        <Text
          style={{flex:1,
            color: 'black',
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Check Out
        </Text></View>

        <FlatList
          data={postList}
          renderItem={({ item, index }) => (
            renderData(item, index)
          )} />
          <Text style={{ color: 'black', fontSize: 20, alignSelf: 'center', padding: 10, fontWeight: 'bold' }}>Total : {totalAmount}</Text>
          <TouchableOpacity
                onPress={() => clearData()}
                style={[
                  styles.textViewStyle,
                  {
                    marginTop: 10,
                    height: 50,
                    padding: 10,
                    alignSelf: 'center',
                    backgroundColor: 'red',
                  },
                ]}>
                <Text
                  style={{color: 'green', fontSize: 20, fontWeight: 'bold', flex:1, textAlign:'center'}}>
                  Clear
                </Text>
              </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default CheckOutScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'wheat'
  },
  textViewStyle: {
    width: '90%',
    flexDirection: 'row', justifyContent: 'space-between',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin: 5
  }
});