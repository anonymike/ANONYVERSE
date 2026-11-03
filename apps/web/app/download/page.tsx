import type { Metadata } from "next";
import { ReleaseDownload } from "@/components/release-download";

export const metadata: Metadata = { title: "Download ANONYVERSE" };

export default function DownloadPage() {
  return <div className="page-head"><span className="eyebrow">ANONYVERSE / DOWNLOAD CENTRE</span><h1>Bring the universe with you.</h1><p>Official mobile distribution only. This page displays approved release metadata and never links to arbitrary development builds.</p><ReleaseDownload /></div>;
}
