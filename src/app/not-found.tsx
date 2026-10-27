import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="container not-found">
      <span className="eyebrow">A SMALL DETOUR / 404</span>
      <h1>
        A little <span className="serif-word">lost?</span>
      </h1>
      <p>This page hasn’t made it out of the notebook.</p>
      <Link href="/" className="button button-dark">
        <ArrowLeft size={17} /> Back to the studio
      </Link>
    </main>
  );
}
