import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { C } from "@/components/reel";
import { trpc } from "@/lib/trpc";

export function ReleaseAdmin() {
  const [version, setVersion] = useState("1.0.0");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [notes, setNotes] = useState("Initial signed Android APK");
  const [minimum, setMinimum] = useState("Android 7.0 / API 24");
  const [sha256, setSha256] = useState("");
  const releases = trpc.releases.adminList.useQuery(undefined, { retry: false });
  const createRelease = trpc.releases.adminCreate.useMutation({ onSuccess: () => { releases.refetch(); setDownloadUrl(""); } });
  const submit = (approve: boolean) => createRelease.mutate({ version, platform: "android", downloadUrl, releaseNotes: notes.split("\n").map((item) => item.trim()).filter(Boolean), minimumRequirement: minimum, sha256: sha256 || undefined, approve });

  return <View style={{ marginTop: 12, padding: 15, borderRadius: 16, backgroundColor: C.surface, borderWidth: 1, borderColor: C.line }}><Text style={{ color: C.text, fontSize: 15, fontWeight: "900" }}>Android release management</Text><Text style={{ color: C.muted, fontSize: 12, lineHeight: 17, marginTop: 5 }}>Upload the signed APK to GitHub Releases or approved storage first, then paste its HTTPS URL here. The file itself is never stored in the mobile database.</Text><TextInput value={version} onChangeText={setVersion} placeholder="Version" placeholderTextColor={C.muted} style={inputStyle} /><TextInput value={downloadUrl} onChangeText={setDownloadUrl} placeholder="https://.../anonyverse.apk" placeholderTextColor={C.muted} autoCapitalize="none" keyboardType="url" style={inputStyle} /><TextInput value={minimum} onChangeText={setMinimum} placeholder="Minimum Android requirement" placeholderTextColor={C.muted} style={inputStyle} /><TextInput value={sha256} onChangeText={setSha256} placeholder="SHA-256 checksum (optional)" placeholderTextColor={C.muted} autoCapitalize="none" style={inputStyle} /><TextInput value={notes} onChangeText={setNotes} placeholder="Release notes, one per line" placeholderTextColor={C.muted} multiline style={[inputStyle, { minHeight: 60, textAlignVertical: "top" }]} /><View style={{ flexDirection: "row", gap: 8 }}><Pressable disabled={!downloadUrl || createRelease.isPending} onPress={() => submit(false)} style={buttonStyle}><Text style={buttonText}>Save draft</Text></Pressable><Pressable disabled={!downloadUrl || createRelease.isPending} onPress={() => submit(true)} style={[buttonStyle, { backgroundColor: C.red }]}><Text style={[buttonText, { color: C.bg }]}>Approve release</Text></Pressable></View>{createRelease.error && <Text style={{ color: C.red, fontSize: 11, marginTop: 8 }}>{createRelease.error.message}</Text>}{releases.data?.map((release) => <View key={release.id} style={{ borderTopWidth: 1, borderTopColor: C.line, marginTop: 12, paddingTop: 10 }}><Text style={{ color: C.text, fontWeight: "800" }}>{release.platform.toUpperCase()} · {release.version}</Text><Text style={{ color: C.muted, fontSize: 11, marginTop: 3 }}>{release.status} · {release.downloadUrl}</Text></View>)}</View>;
}

const inputStyle = { color: C.text, backgroundColor: C.surface2, borderWidth: 1, borderColor: C.line, borderRadius: 10, paddingHorizontal: 11, paddingVertical: 10, marginTop: 9, fontSize: 12 } as const;
const buttonStyle = { flex: 1, padding: 11, borderRadius: 10, backgroundColor: C.surface2, alignItems: "center", marginTop: 10 } as const;
const buttonText = { color: C.text, fontSize: 11, fontWeight: "800" } as const;
