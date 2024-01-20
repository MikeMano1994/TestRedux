import React, { useEffect } from "react";
import { View, Image, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';

let width = Dimensions.get('window').width

const SplashScreen = ({ }) => {

    const navigation = useNavigation()

    useEffect(() => {
        const data = async () => {
            setTimeout(() => {
                    navigation.replace('QRScanScreen')
            }
                , 3000)
        };
        data();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'wheat' }}>
            <Image source={require('../assets/logo.jpg')}
                style={{ width: width / 1.5, height: width / 1.5, resizeMode: 'cover', borderRadius: (width / 1.5) / 2, alignSelf: 'center' }} />
        </View>);
};

export default SplashScreen;