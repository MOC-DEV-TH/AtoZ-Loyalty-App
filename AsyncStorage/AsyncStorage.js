import AsyncStorageKey from "../constants/AsyncStorageKey"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key,value) => {
    try {

      await AsyncStorage.setItem( key,value)
    } catch (e) {
      console.log("error save to storage!!")
    }
  }
 export const getStoreData = async (key) => {
     var value;
    try {
     await AsyncStorage.getItem(key).then(val=>{
         value=val
     })
    } catch(e) {
      console.log("Error reading value")
    }
    return value
  }

 

