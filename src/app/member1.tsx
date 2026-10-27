import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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

// Updated with Member1's static info as the default baseline attributes
const defaultProfile: MemberProfile = {
  id: "1",
  name: "John Roy",
  role: "Carry / Safelaner",
  tagline:
    "Leader of PARIVISION, I am a strategic and patient player who thrives in high-pressure situations.",
  bio: "My role as a carry allows me to farm gold efficiently and make decisive plays that can turn the tide of the game. I am committed to leading my team to victory through careful planning, precise execution, and unwavering dedication to our shared goals.",
  game: "Dota 2, CS2, and Chess",
  leisure: "I enjoy reading novel while lying down doing absolutely nothing.",
};

const API_BASE_URL = "";

export default function MemberProfileViewer() {
  const { memberId: routeMemberId } = useLocalSearchParams<{
    memberId?: string | string[];
  }>();
  const requestedId = Array.isArray(routeMemberId)
    ? routeMemberId[0]
    : routeMemberId || defaultProfile.id;

  // State Management
  const [profile, setProfile] = useState<MemberProfile>({
    ...defaultProfile,
    id: requestedId,
  });
  const [bio, setBio] = useState(defaultProfile.bio);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Data Fetching Lifecycle
  useEffect(() => {
    if (!API_BASE_URL) return;

    const controller = new AbortController();

    async function loadProfile() {
      setLoading(true);
      setError("");

      try {
        const cleanBaseUrl = API_BASE_URL.replace(/\/$/, "");
        const response = await fetch(
          `${cleanBaseUrl}/members/${encodeURIComponent(requestedId)}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
            signal: controller.signal,
          },
        );

        if (!response.ok)
          throw new Error(`Server returned error status: ${response.status}`);

        const data = await response.json();
        const member = data.member ?? data.profile ?? data;

        if (!member || typeof member !== "object" || Array.isArray(member)) {
          throw new Error("Invalid profile payload structure received.");
        }

        const nextProfile: MemberProfile = {
          id: String(member.id ?? requestedId),
          name: member.name || defaultProfile.name,
          role: member.role || defaultProfile.role,
          tagline: member.tagline || defaultProfile.tagline,
          bio: member.bio || defaultProfile.bio,
          game: member.game || defaultProfile.game,
          leisure: member.leisure || defaultProfile.leisure,
        };

        setProfile(nextProfile);
        setBio(nextProfile.bio);
      } catch (requestError: any) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message || "Something went wrong.");
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

  // Handler functions
  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const handleSaveBio = () => {
    Alert.alert("Success", "Bio changes saved locally!");
    setProfile((prev) => ({ ...prev, bio }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Navigation Layer */}
      <Link href="/" style={styles.backButton}>
        <Text style={styles.backButtonText}>⬅️ BACK TO DASHBOARD</Text>
      </Link>

      {/* Loading & Error Status Indicators */}
      {loading && (
        <ActivityIndicator size="large" color="#E53E3E" style={styles.loader} />
      )}
      {error ? <Text style={styles.errorText}>⚠️ {error}</Text> : null}

      {/* Profile Header Details Layout */}
      <View style={styles.profileCard}>
        <Pressable
          style={[styles.tagBox, isFavorite && styles.tagBoxActive]}
          onPress={toggleFavorite}
          accessibilityRole="button"
          accessibilityLabel="Toggle Favorite status"
        >
          <Text style={styles.tagText}>
            {isFavorite ? "⭐ FAVORITE" : "☆ MARK FAVORITE"}
          </Text>
        </Pressable>

        <Text style={styles.nameText}>{profile.name}</Text>
        <Text style={styles.roleText}>{profile.role}</Text>
        <Text style={styles.taglineText}>"{profile.tagline}"</Text>
      </View>

      {/* Editable Management Box */}
      <View style={styles.detailsBox}>
        <Text style={styles.sectionTitle}>BIO & PREFERENCES</Text>

        <Text style={styles.itemTitle}>🎮 Main Game:</Text>
        <Text style={styles.itemDetail}>{profile.game}</Text>

        <Text style={styles.itemTitle}>📖 Leisure Activities:</Text>
        <Text style={styles.itemDetail}>{profile.leisure}</Text>

        <Text style={styles.itemTitle}>📝 Edit Profile Bio:</Text>
        <TextInput
          style={styles.bioInput}
          value={bio}
          onChangeText={setBio}
          multiline
          placeholder="Update profile biography description..."
          placeholderTextColor="#555"
        />

        <Pressable style={styles.saveButton} onPress={handleSaveBio}>
          <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
        </Pressable>
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
  loader: {
    marginBottom: 16,
  },
  errorText: {
    color: "#E53E3E",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "600",
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
    backgroundColor: "#2C2C2E",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  tagBoxActive: {
    backgroundColor: "#E53E3E",
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 0.5,
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
  },
  taglineText: {
    color: "#CCCCCC",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 12,
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
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 14,
  },
  itemDetail: {
    color: "#CCCCCC",
    fontSize: 14,
    marginLeft: 4,
    marginTop: 4,
    lineHeight: 20,
  },
  bioInput: {
    backgroundColor: "#0F0F11",
    color: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2C2C2E",
    padding: 12,
    marginTop: 8,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#E53E3E",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 13,
    letterSpacing: 0.5,
  },
});
