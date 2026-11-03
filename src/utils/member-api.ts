export type MemberProfile = {
  id: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  game: string;
  leisure: string;
};

export const MEMBER_API_BASE_URL = (
  process.env.EXPO_PUBLIC_API_BASE_URL ?? ""
).replace(/\/$/, "");

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function fetchMemberProfile(
  requestedId: string,
  fallback: MemberProfile,
  signal: AbortSignal
): Promise<MemberProfile> {
  const response = await fetch(
    `${MEMBER_API_BASE_URL}/members/${encodeURIComponent(requestedId)}`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
      signal,
    }
  );

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  const data: unknown = await response.json();
  const member = isRecord(data)
    ? data.member ?? data.profile ?? data
    : undefined;

  if (!isRecord(member)) {
    throw new Error("The API returned an invalid profile.");
  }

  const getString = (key: Exclude<keyof MemberProfile, "id">) => {
    const value = member[key];
    return typeof value === "string" ? value : fallback[key];
  };

  return {
    id: String(member.id ?? requestedId),
    name: getString("name"),
    role: getString("role"),
    tagline: getString("tagline"),
    bio: getString("bio"),
    game: getString("game"),
    leisure: getString("leisure"),
  };
}
