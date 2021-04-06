import { StyleSheet, Text, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export const theme = {
  Button: {
    style: styles.buttonContainer,
  },

  // Button({ children }) {
  //   return (
  //     <TouchableOpacity style={styles.buttonContainer}>
  //       <Text style={styles.buttonText}>Howdy {children}</Text>
  //     </TouchableOpacity>
  //   );
  // },
};
