import _ from "lodash";
import { Platform } from "react-native";

class Util {
  allowNav = true;
  isEmpty = value => _.isEmpty(value);
  keyExtractor = (item, index) => index;
  isPlatformAndroid = () => Platform.OS === "android";
}

export default new Util();
