import AsyncStorage from "@react-native-async-storage/async-storage";
const cart =async()=> {
    return await AsyncStorage.getItem("CartData");
}
export default cart