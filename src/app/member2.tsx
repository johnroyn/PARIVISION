import { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type MemberProfile = {
  id: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  game: string;
  leisure: string;
};

const defaultProfile: MemberProfile = {
  id: "2",
  name: "Rod Christian",
  role: "Midlaner",
  tagline: "Outplays. Adapts. Wins the mid. No mercy in lane.",
  bio: "I'm an aggressive, mechanically-focused midlaner who thrives on outplaying opponents and creating space for the team. Off the server, I study replays and strategy breakdowns to sharpen my decision-making and stay a step ahead of the meta.",
  game: "CS2",
  leisure: "reading novel and manga, watching anime, and playing games",
};

/*
  Set this to your API's base URL to enable profile loading.
  The screen sends a GET request to:
  {API_BASE_URL}/members/{memberId}

  Expected JSON:
  {
    "member": {
      "id": "2",
      "name": "Rod Christian",
      "role": "Midlaner",
      "tagline": "...",
      "bio": "...",
      "game": "CS2",
      "leisure": "..."
    }
  }
*/
const API_BASE_URL = "";

export default function Member2Profile() {
  const { memberId: routeMemberId } = useLocalSearchParams<{
    memberId?: string | string[];
  }>();

  const memberId = Array.isArray(routeMemberId)
    ? routeMemberId[0]
    : routeMemberId;
  const requestedId = memberId ? memberId : defaultProfile.id;

  const [profile, setProfile] = useState<MemberProfile>({
    ...defaultProfile,
    id: requestedId,
  });
  const [bio, setBio] = useState(defaultProfile.bio);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!API_BASE_URL) return;

    const controller = new AbortController();

    async function loadProfile() {
      setLoading(true);
      setError("");

      try {
        const baseUrl = API_BASE_URL.replace(/\/$/, "");
        const response = await fetch(
          `${baseUrl}/members/${encodeURIComponent(requestedId)}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        const data = await response.json();
        const member = data.member ?? data.profile ?? data;

        if (!member || typeof member !== "object" || Array.isArray(member)) {
          throw new Error("The API returned an invalid profile.");
        }

        const nextProfile: MemberProfile = {
          id: String(member.id ?? requestedId),
          name:
            typeof member.name === "string"
              ? member.name
              : defaultProfile.name,
          role:
            typeof member.role === "string"
              ? member.role
              : defaultProfile.role,
          tagline:
            typeof member.tagline === "string"
              ? member.tagline
              : defaultProfile.tagline,
          bio:
            typeof member.bio === "string" ? member.bio : defaultProfile.bio,
          game:
            typeof member.game === "string" ? member.game : defaultProfile.game,
          leisure:
            typeof member.leisure === "string"
              ? member.leisure
              : defaultProfile.leisure,
        };

        setProfile(nextProfile);
        setBio(nextProfile.bio);
      } catch (requestError) {
        if (
          requestError instanceof Error &&
          requestError.name !== "AbortError"
        ) {
          setError(requestError.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => controller.abort();
  }, [requestedId]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Back Button to Team Dashboard */}
      <Link href="/" style={styles.backButton}>
        <Text style={styles.backButtonText}>⬅️ BACK TO DASHBOARD</Text>
      </Link>

      {/* Profile Info Card */}
      <View style={styles.profileCard}>
        <Pressable
          style={styles.tagBox}
          onPress={() => setIsFavorite((current) => !current)}
          accessibilityRole="button"
          accessibilityLabel={
            isFavorite ? "Remove member from favorites" : "Favorite this member"
          }
        >
          <Text style={styles.tagText}>
            {isFavorite ? "★ FAVORITE · " : ""}
            POSITION {profile.id}
          </Text>
        </Pressable>

        <Text style={styles.nameText}>{profile.name}</Text>
        <Text style={styles.roleText}>{profile.role}</Text>
        <Text style={styles.bioText}>{profile.tagline}</Text>

        {loading ? (
          <Text style={styles.bioText}>Loading profile...</Text>
        ) : null}

        {error ? <Text style={styles.bioText}>{error}</Text> : null}
      </View>

      {/* Details Box */}
      <View style={styles.detailsBox}>
        <Text style={styles.sectionTitle}>HOBBIES &amp; INTERESTS</Text>

        <Text style={styles.itemTitle}>♡ BIO:</Text>
        <TextInput
          style={styles.itemDetail}
          value={bio}
          onChangeText={setBio}
          multiline
          placeholder="Write a short bio"
          accessibilityLabel="Edit bio"
        />

        <Text style={styles.itemTitle}>🎮 Games I Play:</Text>
        <Text style={styles.itemDetail}>{profile.game}</Text>

        <Text style={styles.itemTitle}>📖 Leisure:</Text>
        <Text style={styles.itemDetail}>{profile.leisure}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F11",
  },
  content: {
    padding: 24,
    paddingTop: 40,
  },
  backButton: {
    marginBottom: 24,
    alignSelf: "flex-start",
  },
  backButtonText: {
    color: "#E53E3E",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  profileCard: {
    backgroundColor: "#1C1C1E",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2C2C2E",
    alignItems: "center",
    marginBottom: 20,
  },
  tagBox: {
    backgroundColor: "#E53E3E",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 12,
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  nameText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },
  roleText: {
    color: "#8A8A93",
    fontSize: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  bioText: {
    color: "#CCCCCC",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 20,
  },
  detailsBox: {
    backgroundColor: "#1C1C1E",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2C2C2E",
  },
  sectionTitle: {
    color: "#8A8A93",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 16,
  },
  itemTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
  },
  itemDetail: {
    color: "#CCCCCC",
    fontSize: 14,
    marginLeft: 8,
    marginTop: 4,
    lineHeight: 20,
  },
});