import React, {useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,Alert
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import {cartListData} from '../setup/actions/auth';
import Toast from 'react-native-simple-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";

let width = Dimensions.get('window').width;

const QRScanScreen = ({}) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  let ref = useRef(null);

  const [scannedQrCode, setScannedQrCode] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [gstData, setGstData] = useState([]);
  const [value, setValue] = useState(0);
  const [showQrCodeSuccess, setShowQrCodeSuccess] = useState(true);

  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    const data = ()=> {
      setGstData([
        { label: 'GST 0% - 5%', value: 1 },
        { label: 'GST 6% - 10%', value: 2 },
        { label: 'GST 11% - 15%', value: 3 },
        { label: 'GST 16% - 20%', value: 4 },
      ])
    }
    data()
  }, []);

  const onSuccess = e => {
    setScannedQrCode(e.data)
    setShowQrCodeSuccess(true)
  }

  const addToCart =async()=> {
    if (name.length == 0) {
      Toast.show('Enter the Name');
      return
    }
    if (price.length == 0) {
      Toast.show('Enter the Price');
      return
    }
    if (value == 0) {
      Toast.show('Select the GST');
      return
    }

    let cart = {qrData:new Date().getTime(), name,price,gst:gstData[value].label, quantity:1}
    let data = [...cartList]
    data.push(cart)
    setCartList(data)
    
    dispatch(cartListData(cart))
      .then((response) => {
        if (response.status == "success"){
          Toast.show(response.message);
        }
      })
      .catch((error) => {
        Alert.alert(error)
      });
    setShowQrCodeSuccess(false)
  };

  const toggleBottomView = () => {
      setShowQrCodeSuccess(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => {setShowQrCodeSuccess(true)}}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              alignSelf: 'center',
              padding: 10,
              fontWeight: 'bold',
            }}>
            QR Code Scanner
          </Text>
        </TouchableOpacity>

        <View style={{flex: 1}}>
          {!showQrCodeSuccess && (
            <QRCodeScanner
              reactivate={true}
              showMarker={true}
              ref={ref}
              onRead={e => onSuccess(e)}
              topContent={
                <Text style={styles.centerText}>
                  Please move your camera over the QR Code
                </Text>
              }
              bottomContent={<View></View>}
            />
          )}
          <TouchableOpacity onPress={()=> navigation.navigate('CartScreen')}
          style={{margin:20}}>
            <Image style={{width:50, height:50, resizeMode:'contain', alignSelf:'flex-end'}}
            source={require('./../assets/check.png')}/>
            <Text style={{position:'absolute', top:-10, right:0, fontSize:14, fontWeight:'bold'}}>{cartList.length}</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animated
          animationType="fade"
          isVisible={showQrCodeSuccess}
          deviceWidth={width}
          transparent
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={1000}
          animationOutTiming={500}
          useNativeDriver={false}
          onRequestClose={() => toggleBottomView()}>
          <View style={{height:'60%', backgroundColor: 'wheat',borderTopLeftRadius:15, borderTopRightRadius:15, padding: 15}}>
            <View style={{flex: 1, alignItems: 'center'}}>
            <View style={[styles.textViewStyle, {marginTop: 30}]}>
                <Text style={styles.textInputStyle}>{scannedQrCode}</Text>
              </View>
              <View style={[styles.textViewStyle, {marginTop: 10}]}>
                <TextInput
                  value={name}
                  placeholder="Enter Name"
                  placeholderTextColor={'grey'}
                  maxLength={50}
                  style={styles.textInputStyle}
                  onChangeText={text => setName(text)}
                />
              </View>

              <View style={[styles.textViewStyle, {marginTop: 10}]}>
                <TextInput
                  value={price}
                  placeholder="Enter Price"
                  placeholderTextColor={'grey'}
                  maxLength={8}
                  keyboardType='number-pad'
                  style={styles.textInputStyle}
                  onChangeText={text => setPrice(text)}
                />
              </View>

              <View style={[styles.textViewStyle, { marginTop: 10}]}>
              <Dropdown
          style={{flex:1,padding: 6}}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={gstData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select'}
          value={value}
          onChange={item => {
            setValue(item.value);
          }}/></View>

              <TouchableOpacity
                onPress={() => addToCart()}
                style={[
                  styles.textViewStyle,
                  {
                    marginTop: 50,
                    height: 50,
                    padding: 10,
                    justifyContent: 'center',
                    backgroundColor: 'red',
                  },
                ]}>
                <Text
                  style={{color: 'green', fontSize: 20, fontWeight: 'bold', flex:1, textAlign:'center'}}>
                  Add To Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
export default QRScanScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerText: {
    flex: 1,
    fontSize: 16,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  textViewStyle: {
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
  textInputStyle: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    padding: 10,
  },
  imageStyle: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    marginEnd: 10,
    marginStart: 10,
    alignSelf: 'center',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
