import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  fetchMemberProfile,
  MEMBER_API_BASE_URL,
  type MemberProfile,
} from "@/utils/member-api";

const roles = [
  {
    id: "1",
    title: "Position 1",
    name: "Carry / Safelane",
    desc: "Farms gold to win the late game.",
    route: "/member1",
  },
  {
    id: "2",
    title: "Position 2",
    name: "Midlaner",
    desc: "Controls tempo and creates openings.",
    route: "/member2",
  },
  {
    id: "3",
    title: "Position 3",
    name: "Offlaner",
    desc: "Creates space and starts fights.",
    route: "/member3",
  },
  {
    id: "4",
    title: "Position 4",
    name: "Soft Support",
    desc: "Roams the map and builds leads.",
    route: "/member4",
  },
  {
    id: "5",
    title: "Position 5",
    name: "Hard Support",
    desc: "Protects the carry and the vision.",
    route: "/member5",
  },
  {
    id: "6",
    title: "Position 6",
    name: "Coach / Substitute",
    desc: "Shapes strategy and reads the game.",
    route: "/member6",
  },
] as const;

type MemberProfiles = Record<string, MemberProfile>;

export default function Index() {
  const [profiles, setProfiles] = useState<MemberProfiles>({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (!MEMBER_API_BASE_URL) return;

    const controller = new AbortController();

    async function loadProfiles() {
      setError("");

      try {
        const nextProfiles = await Promise.all(
          roles.map((role) =>
            fetchMemberProfile(
              role.id,
              {
                id: role.id,
                name: `Member ${role.id}`,
                role: role.name,
                tagline: "",
                bio: "",
                game: "",
                leisure: "",
              },
              controller.signal
            )
          )
        );

        if (!controller.signal.aborted) {
          setProfiles(
            Object.fromEntries(
              roles.map((role, index) => [role.id, nextProfiles[index]])
            )
          );
        }
      } catch (requestError) {
        if (
          requestError instanceof Error &&
          requestError.name !== "AbortError"
        ) {
          setError(requestError.message);
        }
      }
    }

    loadProfiles();
    return () => controller.abort();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.logoCircle}>
        <Text style={styles.logoText}>P</Text>
      </View>
      <Text style={styles.mainTitle}>PARIVISION</Text>
      <Text style={styles.teamIntro}>
        A competitive Dota 2 team built around patience, precision, and powerful
        late-game decisions.
      </Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionHeader}>TEAM ROLES</Text>
        <Text style={styles.sectionCount}>06 MEMBERS</Text>
      </View>
      <View style={styles.gridContainer}>
        {roles.map((role) => (
          <View key={role.id} style={styles.card}>
            <View style={styles.tagBox}>
              <Text style={styles.tagText}>DOTA 2</Text>
            </View>
            <Text style={styles.cardTitle}>{role.title}</Text>
            <Text style={styles.cardSubtitle}>{role.name}</Text>
            {profiles[role.id] ? (
              <Text style={styles.memberName}>{profiles[role.id].name}</Text>
            ) : null}
            <Text style={styles.cardDesc}>{role.desc}</Text>
            <Link href={role.route} style={styles.cardButton}>
              <Text style={styles.cardButtonText}>VIEW PROFILE</Text>
            </Link>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F0F11" },
  content: { padding: 20, paddingTop: 76, alignItems: "center" },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#1C1C1E",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E53E3E",
    marginBottom: 10,
  },
  logoText: { color: "#E53E3E", fontSize: 30, fontWeight: "800" },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 8,
  },
  teamIntro: {
    color: "#9A9AA3",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 15,
    marginBottom: 35,
  },
  errorText: {
    color: "#E53E3E",
    fontSize: 12,
    marginBottom: 16,
    textAlign: "center",
  },
  sectionRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionHeader: {
    color: "#9A9AA3",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  sectionCount: {
    color: "#E53E3E",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  gridContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#1C1C1E",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2C2C2E",
    marginBottom: 16,
  },
  tagBox: {
    backgroundColor: "#E53E3E",
    alignSelf: "flex-start",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  tagText: { color: "#FFFFFF", fontSize: 10, fontWeight: "bold" },
  cardTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  cardSubtitle: {
    color: "#E53E3E",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
    marginBottom: 6,
  },
  memberName: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
  },
  cardDesc: {
    color: "#9A9AA3",
    fontSize: 11,
    lineHeight: 15,
    marginBottom: 12,
    minHeight: 30,
  },
  cardButton: {
    backgroundColor: "#2C2C2E",
    paddingVertical: 8,
    borderRadius: 6,
    textAlign: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  cardButtonText: { color: "#FFFFFF", fontSize: 11, fontWeight: "bold" },
});
