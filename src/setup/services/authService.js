import AsyncStorage from "@react-native-async-storage/async-storage";
const cartData = async (cart) => {
  console.log("cart ", cart);
  const { name, price } = cart;
  if (name != "" && price != "") {
    let cartInfo = await AsyncStorage.getItem('CartData');
      cartInfo = JSON.parse(cartInfo);
      cartInfo = cartInfo || []
    let data = [...cartInfo]
    data.push(cart)
   AsyncStorage.setItem('CartData', JSON.stringify(data));
    return {
      status: "success",
      message: "Data added to cart successfully",
      data: name,
    };
  } else {
    return {
      status: "failure",
      message: "Data not added to cart",
      data: '',
    };
  }
};
const clearData = async () => {
    let data = []
   AsyncStorage.setItem("CartData", JSON.stringify(data));
    return {
      status: "success",
      message: "Data cleared successfully",
      data: '',
    };
};
export default {
  cartData,clearData
};