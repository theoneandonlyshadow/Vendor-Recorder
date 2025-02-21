import Link from "next/link";
import AuthButtons from "./components/AuthButtons";

export default function Home() {
  return (
    <div className="container">
      <h1>Next.js + MongoDB assignment by JS Tigers</h1>
      <AuthButtons />
      <Link href="/vendors" className="button">
        go to vendors
      </Link>
    </div>
  );
}
