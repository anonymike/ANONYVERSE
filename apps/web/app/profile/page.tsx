import type { Metadata } from "next";
import { ProfileClient } from "@/components/profile-client";

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <div className="page-head">
      <span className="eyebrow">YOUR SPACE</span>
      <h1>Make it personal.</h1>
      <p>
        Your ANONYVERSE profile uses the shared Manus account identity. Keep your list and future viewing progress connected across the mobile app and website.
      </p>
      <ProfileClient />
    </div>
  );
}
