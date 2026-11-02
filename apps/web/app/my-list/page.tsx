import Link from "next/link";
import { demoContent } from "@anonyverse/shared";
import { ContentCard } from "@/components/content-card";
export const metadata = { title: "My List" };
export default function MyListPage() { return <><div className="page-head"><span className="eyebrow">YOUR LIBRARY</span><h1>My list.</h1><p>Save the stories you want to come back to. Sign in with the existing ANONYVERSE account architecture to sync across devices.</p><div className="actions"><Link className="btn" href="/profile">Sign in to sync</Link></div></div><div className="content-grid">{demoContent.slice(0, 4).map((item) => <ContentCard key={item.id} item={item} />)}</div></>; }
