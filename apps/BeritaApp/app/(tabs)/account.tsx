import { darkTheme, lightTheme } from "@/src/constants/theme";
import { useTheme } from "@/src/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AccountScreen() {
  const { theme, toggleTheme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* PROFILE */}
      <View style={styles.profile}>
        <Ionicons name="person-circle" size={80} color={colors.text} />
        <Text style={[styles.name, { color: colors.text }]}>
          Muhammad Prayogo Pangestu
        </Text>
        <Text style={{ color: "#888" }}>2410501046@mahasiswa.upnvj.ac.id</Text>
      </View>

      {/* MENU */}
      <View style={styles.menu}>
        {/* TOGGLE THEME */}
        <TouchableOpacity style={styles.menuItem} onPress={toggleTheme}>
          <Ionicons
            name={theme === "dark" ? "sunny" : "moon"}
            size={20}
            color={colors.text}
          />
          <Text style={[styles.menuText, { color: colors.text }]}>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Text>
        </TouchableOpacity>

        {/* LOGOUT (DUMMY) */}
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="log-out-outline" size={20} color="red" />
          <Text style={[styles.menuText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  profile: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },

  menu: {
    gap: 12,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },

  menuText: {
    fontSize: 16,
  },
});
