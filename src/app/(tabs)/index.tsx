import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  // Simple data array for the 6 Dota 2 position roles
  const dotaRoles = [
    {
      id: "1",
      title: "Position 1",
      name: "Carry / Safelane",
      desc: "Farms gold to win late game.",
      route: "/member1",
    },
    {
      id: "2",
      title: "Position 2",
      name: "Midlaner",
      desc: "Controls the tempo and ganks lanes.",
      route: "/member2",
    },
    {
      id: "3",
      title: "Position 3",
      name: "Offlaner",
      desc: "Creates space and initiates fights.",
      route: "/member3",
    },
    {
      id: "4",
      title: "Position 4",
      name: "Soft Support",
      desc: "Roams the map and helps build leads.",
      route: "/member4",
    },
    {
      id: "5",
      title: "Position 5",
      name: "Hard Support",
      desc: "Wards the map and protects the carry.",
      route: "/member5",
    },
    {
      id: "6",
      title: "Position 6",
      name: "Coach / Substitute",
      desc: "Drafts strategies and analyzes play.",
      route: "/member6",
    },
  ] as const;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 🔴 Team Logo Placeholder */}
      <View style={styles.logoCircle}>
        <Text style={styles.logoText}>👁️‍🗨️</Text>
      </View>

      {/* 💥 Main Title Banner */}
      <Text style={styles.mainTitle}>PARIVISION</Text>

      {/* 📝 Short Esport Intro Team Summary */}
      <Text style={styles.teamIntro}>
        We are an elite Esport team competing across competitive circuits.
        Engineered for victory, driven by strategy, and dominating the
        battlefields.
      </Text>

      {/* 📊 Section Header Counter Label */}
      <Text style={styles.sectionHeader}>FOUND 6 ACTIVE ROLES</Text>

      {/* 🎴 The Grid Layout containing the 6 Cards */}
      <View style={styles.gridContainer}>
        {dotaRoles.map((role) => (
          <View key={role.id} style={styles.card}>
            {/* Red Manhwa Tag Placeholder */}
            <View style={styles.tagBox}>
              <Text style={styles.tagText}>DOTA 2</Text>
            </View>

            <Text style={styles.cardTitle}>{role.title}</Text>
            <Text style={styles.cardSubtitle}>{role.name}</Text>
            <Text style={styles.cardDesc}>{role.desc}</Text>

            {/* Simple Link component using your classroom guide format */}
            {/* `as any` below is temporary: typed routes only recognizes a
                pathname once that member's file exists under src/app/.
                Remove the cast for each position as you add its page. */}
            <Link
              href={{
                pathname: role.route as any,
                params: { role: role.name },
              }}
              style={styles.cardButton}
            >
              <Text style={styles.cardButtonText}>VIEW PROFILE</Text>
            </Link>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F11", // Very dark black matching image background
  },
  content: {
    padding: 20,
    alignItems: "center",
    paddingTop: 50,
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#1C1C1E",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E53E3E", // Red accent ring
    marginBottom: 10,
  },
  logoText: {
    fontSize: 32,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  teamIntro: {
    color: "#8A8A93", // Muted gray text
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 15,
    marginBottom: 35,
  },
  sectionHeader: {
    color: "#8A8A93",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  gridContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap", // Forces items to break to the next line dynamically
    justifyContent: "space-between",
  },
  card: {
    width: "48%", // Fits two items per row nicely with spacing
    backgroundColor: "#1C1C1E", // Dark grey cards matching the site dashboard look
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2C2C2E",
    marginBottom: 16,
  },
  tagBox: {
    backgroundColor: "#E53E3E", // Crimson red header label box from image style
    alignSelf: "flex-start",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "#E53E3E",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
    marginBottom: 6,
  },
  cardDesc: {
    color: "#8A8A93",
    fontSize: 11,
    lineHeight: 15,
    marginBottom: 12,
    minHeight: 30, // Keeps card heights uniform
  },
  cardButton: {
    backgroundColor: "#2C2C2E",
    paddingVertical: 8,
    borderRadius: 6,
    textAlign: "center",
    alignItems: "center",
    marginTop: "auto", // Pushes down block element neatly
  },
  cardButtonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
});
