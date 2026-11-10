import {
  fetchMemberProfile,
  MEMBER_API_BASE_URL,
  type MemberProfile,
} from "@/utils/member-api";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const defaultProfile: MemberProfile = {
  id: "3",
  name: "ALLAN REY LAPECEROS",
  role: "OFFLANER",
  tagline:
    " I hold the hardest lane alone, so my team can shine. I don't chase kills, I create space and win wars.",
  bio: "Hard me, Harder me.",
  game: "Ros, Mobile Legend, cf.",
  leisure: "Spending quality time with friends.",
};

export default function MemberProfileViewer() {
  const { memberId: routeMemberId } = useLocalSearchParams<{
    memberId?: string | string[];
  }>();
  const requestedId = Array.isArray(routeMemberId)
    ? routeMemberId[0]
    : routeMemberId || defaultProfile.id;

  const [profile, setProfile] = useState<MemberProfile>({
    ...defaultProfile,
    id: requestedId,
  });
  const [bio, setBio] = useState(defaultProfile.bio);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!MEMBER_API_BASE_URL) return;

    const controller = new AbortController();

    async function loadProfile() {
      setLoading(true);
      setError("");

      try {
        const nextProfile = await fetchMemberProfile(
          requestedId,
          defaultProfile,
          controller.signal,
        );
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

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Link href="/" style={styles.backButton}>
        <Text style={styles.backButtonText}>⬅️ BACK TO DASHBOARD</Text>
      </Link>

      {loading && (
        <ActivityIndicator size="large" color="#E53E3E" style={styles.loader} />
      )}
      {error ? <Text style={styles.errorText}>⚠️ {error}</Text> : null}

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

      <View style={styles.detailsBox}>
        <Text style={styles.sectionTitle}>BIO & PREFERENCES</Text>

        <Text style={styles.itemTitle}>🎮 Main Game:</Text>
        <Text style={styles.itemDetail}>{profile.game}</Text>

        <Text style={styles.itemTitle}>📖 Leisure Activities:</Text>
        <Text style={styles.itemDetail}>{profile.leisure}</Text>

        <Text style={styles.itemTitle}>♡ BIO:</Text>
        <TextInput
          style={styles.itemDetail}
          value={bio}
          onChangeText={setBio}
          multiline
          placeholder="Write a short bio"
          accessibilityLabel="Edit bio"
        />
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
