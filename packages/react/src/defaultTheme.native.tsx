import { StyleSheet, Text, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 6,
    padding: 2,
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export const theme = {
  Button: styles.buttonContainer,
};
