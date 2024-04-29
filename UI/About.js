import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function About() {
  return (
    <View style={styling.container}>
      <Text style={styling.text} >
        This is an AI chatbot specifically made for the LPU students which will
        be capable of answering doubts related to LPU like rules, exams, events,
        RMS, how and where to reach respective faculty for a specific problem.
      </Text>
    </View>
  );
}

const styling = StyleSheet.create({
  container:{
    display:'flex',
    height:'100%',
    backgroundColor:'#212121',
  },
  text:{
    padding:5,
    color:'white',
    fontSize:20
  }
})
