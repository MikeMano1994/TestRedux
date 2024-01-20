import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Linking,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../setup/actions/auth';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('screen').width;

const CartScreen = ({}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [postList, setPostList] = useState([]);

  const cartInfo = useSelector(state => state);

  useEffect(() => {
    const data = async () => {
      cartInfo = JSON.parse(cartInfo);
      setPostList(cartInfo || []);
    };
    data();
  }, []);

  const onLogout = () => {
    // dispatch(logout()).then((response) => {
    //   if (response.status === "success") {
    //     AsyncStorage.setItem("LoginStatus", 'false');
    //   }
    // });
  };

  const setIncDecQuantity = (index, quantity) => {
    let data = [...postList];
    let quan = parseInt(data[index].quantity || 0);
    data[index].quantity = quan > 0 ? quan + quantity : 0;
    setPostList(data);
    AsyncStorage.setItem("CartData", JSON.stringify(data));
  };

  const renderData = (item, index) => {
    return (
      <View style={styles.card}>
        <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
          Name: {item.name}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{color: 'black', fontSize: 16, marginTop: 10}}>
              Price: ₹{item.price * item.quantity}
            </Text>
            <Text style={{color: 'black', fontSize: 16, marginTop: 10}}>
              {item.gst}
            </Text>
          </View>
          <View style={{flexDirection: 'column', alignSelf: 'center'}}>
            <Text style={{color: 'black', fontSize: 16}}>Quantity</Text>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 10,
              }}>
              <TouchableOpacity onPress={() => setIncDecQuantity(index, -1)}>
                <Image
                  style={{width: 20, height: 20, resizeMode: 'contain'}}
                  source={require('./../assets/minus.png')}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  marginStart: 10,
                  marginEnd: 10,
                }}>
                {item.quantity || 0}
              </Text>
              <TouchableOpacity onPress={() => setIncDecQuantity(index, 1)}>
                <Image
                  style={{width: 20, height: 20, resizeMode: 'contain'}}
                  source={require('./../assets/plus.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, padding: 10}}>
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
          Welcome
        </Text></View>

        <FlatList
          data={postList}
          renderItem={({item, index}) => renderData(item, index)}
        />
        <TouchableOpacity
                onPress={() => navigation.navigate('CheckOutScreen')}
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
                  Continue
                </Text>
              </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default CartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'wheat',
  },
  textViewStyle: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  card: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin: 5,
  },
});
