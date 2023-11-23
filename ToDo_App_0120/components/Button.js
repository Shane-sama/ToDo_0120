import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Button({ label, theme }) {
    if (theme === "primary") {
        return (
            <View
            style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}
            >
                <Pressable
                style={[styles.button, { backgroundColor: "#fff" }]}
                onPress={() => alert('hmm...')}
                >
                    <FontAwesome
                        size={18}
                        color="#25292e"
                    />
                <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
                </Pressable>
            </View>
        );
    }
    else if(theme==="add") {
      return (
        <View
        style={[styles.buttonContainerAdd, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}
        >
            <Pressable
            style={[styles.buttonAdd, { backgroundColor: "#fff" }]}
            onPress={() => alert('hmm...')}
            >
                <FontAwesome
                    size={18}
                    color="#25292e"
                />
            <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
            </Pressable>
        </View>
    );
    }
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => alert('hmm...')}>
              <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  buttonContainerAdd: {
    width: 160,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'bottom',
    justifyContent: 'left',
    padding: 3,
    position: 'fixed',
    bottom: 0,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonAdd: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
