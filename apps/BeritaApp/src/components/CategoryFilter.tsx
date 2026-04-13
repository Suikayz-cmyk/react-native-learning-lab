import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function CategoryFilter({ categories, selected, onChange }: any) {
  return (
    <View style={styles.container}>
      {categories.map((cat: any) => {
        const isActive = cat.value === selected;

        return (
          <TouchableOpacity
            key={cat.value}
            style={[styles.item, isActive && styles.activeItem]}
            onPress={() => onChange(cat.value)}
          >
            <Text style={[styles.text, isActive && styles.activeText]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 4,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  activeItem: {
    backgroundColor: "#0891B2",
  },
  text: {
    fontSize: 12,
  },
  activeText: {
    color: "#fff",
  },
});
