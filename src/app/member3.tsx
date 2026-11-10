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
import {
  fetchMemberProfile,
  MEMBER_API_BASE_URL,
  type MemberProfile,
} from "@/utils/member-api";

// ==========================================
// ⚙️ UPDATE THIS BASELINE DATA FOR EACH MEMBER
// ==========================================
const defaultProfile: MemberProfile = {
  id: "3", // Change ID accordingly (e.g., "2", "3", "4"...)
  name: "ALLAN REY LAPECEROS",
  role: "OFFLANER",
  tagline:" I hold the hardest lane alone, so my team can shine. I don't chase kills, I create space and win wars.",
  bio: "Hard me, Harder me.",
  game: "Ros, Mobile Legend.",
  leisure:"Spending quality time with friends.",
};

export default function MemberProfileViewer() {
  const { memberId: routeMemberId } = useLocalSearchParams < {
    memberId ? : string | string[];
  } > ();
  const requestedId = Array.isArray(routeMemberId) ?
    routeMemberId[0] :
    routeMemberId || defaultProfile.id;
  
  // State Management
  const [profile, setProfile] = useState < MemberProfile > ({
    ...defaultProfile,
    id: requestedId,
  });
  const [bio, setBio] = useState(defaultProfile.bio);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Data Fetching Lifecycle
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
  errorTex