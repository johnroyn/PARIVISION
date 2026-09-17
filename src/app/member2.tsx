import { Link, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Member2() {
  const { role } = useLocalSearchParams<{ role?: string }>();

  // Static profile data for the Position 2 (Midlaner) roster member
  const player = {
    tag: "DOTA 2",
    ign: "Chanix",
    realName: "Rod Christian M. \"Chanix\" Mojado",
    position: "Position 2",
    role: role ?? "Midlaner",
    desc: "Controls the tempo and ganks lanes.",
    bio: "A relentless tempo-controller known for aggressive mid matchups and map-wide gank timing. Shadowflux specializes in high-mobility heroes that snowball the game before minute twenty.",
    stats: [
      { label: "Matches", value: "312" },
      { label: "Win Rate", value: "58%" },
      { label: "KDA", value: "4.2" },
      { label: "GPM Avg", value: "612" },
    ],
    signatureHeroes: ["Storm Spirit", "Puck", "Templar Assassin", "Ember Spirit"],
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 🔙 Back to Roster */}
      <Link href="/" style={styles.backLink}>
        <Text style={styles.backLinkText}>{"← BACK TO ROSTER"}</Text>
      </Link>

      {/* 🔴 Avatar Placeholder */}
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarText}>🧠</Text>
      </View>

      {/* Red Manhwa Tag Placeholder */}
      <View style={styles.tagBox}>
        <Text style={styles.tagText}>{player.tag}</Text>
      </View>

      {/* 💥 Player Name */}
      <Text style={styles.ign}>{player.ign}</Text>
      <Text style={styles.realName}>{player.realName}</Text>

      {/* 📝 Position / Role */}
      <View style={styles.roleRow}>
        <Text style={styles.positionBadge}>{player.position}</Text>
        <Text style={styles.roleText}>{player.role}</Text>
      </View>

      <Text style={styles.desc}>{player.desc}</Text>

      {/* 📊 Bio Section */}
      <View style={styles.sectionBlock}>
        <Text style={styles.sectionHeader}>PLAYER BIO</Text>
        <Text style={styles.bioText}>{player.bio}</Text>
      </View>

      {/* 🎴 Stats Grid */}
      <View style={styles.sectionBlock}>
        <Text style={styles.sectionHeader}>SEASON STATS</Text>
        <View style={styles.statsGrid}>
          {player.stats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ⚔️ Signature Heroes */}
      <View style={styles.sectionBlock}>
        <Text style={styles.sectionHeader}>SIGNATURE HEROES</Text>
        <View style={styles.heroList}>
          {player.signatureHeroes.map((hero) => (
            <View key={hero} style={styles.heroChip}>
              <Text style={styles.heroChipText}>{hero}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F11", // Very dark black matching index page
  },
  content: {
    padding: 20,
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 60,
  },
  backLink: {
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  backLinkText: {
    color: "#8A8A93",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#1C1C1E",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E53E3E", // Red accent ring
    marginBottom: 14,
  },
  avatarText: {
    fontSize: 40,
  },
  tagBox: {
    backgroundColor: "#E53E3E",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 12,
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  ign: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  realName: {
    color: "#8A8A93",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 14,
  },
  roleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  positionBadge: {
    color: "#FFFFFF",
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "#2C2C2E",
    fontSize: 11,
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  roleText: {
    color: "#E53E3E",
    fontSize: 14,
    fontWeight: "700",
  },
  desc: {
    color: "#8A8A93",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  sectionBlock: {
    width: "100%",
    marginBottom: 26,
  },
  sectionHeader: {
    color: "#8A8A93",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 12,
  },
  bioText: {
    color: "#C7C7CC",
    fontSize: 13,
    lineHeight: 19,
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "#2C2C2E",
    borderRadius: 12,
    padding: 14,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "#2C2C2E",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    color: "#8A8A93",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  heroList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  heroChip: {
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "#E53E3E",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  heroChipText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});
