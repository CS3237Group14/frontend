import React from 'react'
import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const WhiteButton = props => (
  <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
    <Text style={styles.text}>{props.children}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#F7EDE2',
    borderTopColor:'black'
  },
  text: {
    fontSize: 17,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    textAlign: 'center',
    color:'black', 
    fontWeight:"bold",
  }
})

export default WhiteButton