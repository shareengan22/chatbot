import {View, StyleSheet} from 'react-native';
import TextInputBar from "./TextInputBar";


const Home = () => {
  return (
    <View style={styling.container}>
     
      <TextInputBar />
    </View>
  )
}

export default Home;

const styling = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  }
});