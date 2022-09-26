import AsyncStorageKey from "../constants/AsyncStorageKey"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    try {

      await AsyncStorage.setItem(AsyncStorageKey.LANGUAGE, value)
      console.log("store data"+value)
    } catch (e) {
      console.log("error save to storage!!")
    }
  }
 export const getStoreData = async () => {
     var value;
    try {
     await AsyncStorage.getItem(AsyncStorageKey.LANGUAGE).then(val=>{
         value=val
     })
    } catch(e) {
      console.log("Error reading value")
    }
    console.log("language_value",value)
    return value
  }

 

