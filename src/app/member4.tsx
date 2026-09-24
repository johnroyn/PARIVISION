import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Member4Profile() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Link href="/" style={styles.backButton}>
        <Text style={styles.backButtonText}>⬅️ BACK TO DASHBOARD</Text>
      </Link>

      <View style={styles.profileCard}>
        <View style={styles.tagBox}>
          <Text style={styles.tagText}>POSITION 4</Text>
        </View>
        <Text style={styles.nameText}>[Beth Zanoria]</Text>
        <Text style={styles.roleText}>[soft support]</Text>
        <Text style={styles.bioText}>
          [As a soft player, I focus on helping my team by providing vision, utility and protection when needed.]
        </Text>
      </View>

      <View style={styles.detailsBox}>
        <Text style={styles.sectionTitle}>HOBBIES & INTERESTS</Text>
        <Text style={styles.itemTitle}>♡ BIO:</Text>
        <Text style={styles.itemDetail}>
          [I don't need the glory]
        </Text>
        <Text style={styles.itemTitle}>🎮 Games I Play:</Text>
        <Text style={styles.itemDetail}>• [candy crush], [ML], [Crossfire]</Text>
        <Text style={styles.itemTitle}>📖 Leisure:</Text>
        <Text style={styles.itemDetail}>
          • [spending quality time with friends]
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F0F11" },
  content: { padding: 24, paddingTop: 40 },
  backButton: { marginBottom: 24, alignSelf: "flex-start" },
  backButtonText: { color: "#E53E3E", fontSize: 12, fontWeight: "bold", letterSpacing: 1 },
  profileCard: { backgroundColor: "#1C1C1E", padding: 24, borderRadius: 16, borderWidth: 1, borderColor: "#2C2C2E", alignItems: "center", marginBottom: 20 },
  tagBox: { backgroundColor: "#E53E3E", paddingVertical: 4, paddingHorizontal: 10, borderRadius: 4, marginBottom: 12 },
  tagText: { color: "#FFFFFF", fontSize: 11, fontWeight: "bold" },
  nameText: { color: "#FFFFFF", fontSize: 28, fontWeight: "bold" },
  roleText: { color: "#8A8A93", fontSize: 16, marginTop: 4, marginBottom: 16 },
  bioText: { color: "#CCCCCC", fontSize: 14, fontStyle: "italic", textAlign: "center", lineHeight: 20 },
  detailsBox: { backgroundColor: "#1C1C1E", padding: 20, borderRadius: 16, borderWidth: 1, borderColor: "#2C2C2E" },
  sectionTitle: { color: "#8A8A93", fontSize: 12, fontWeight: "bold", letterSpacing: 1, marginBottom: 16 },
  itemTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold", marginTop: 10 },
  itemDetail: { color: "#CCCCCC", fontSize: 14, marginLeft: 8, marginTop: 4, lineHeight: 20 },
});
