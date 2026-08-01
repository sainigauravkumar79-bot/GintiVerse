import { StaticPage } from "./StaticPage";

export function AboutPage() {
  return (
    <StaticPage title="About" path="/about">
      <p>
        GintiVerse is a collection of calculators, converters and generators built to answer everyday
        questions instantly — no signup, no clutter, no waiting.
      </p>
      <p>
        Every tool runs in your browser. Fill in this page with the real story of the project before launch:
        who built it, why, and how tools get added.
      </p>
    </StaticPage>
  );
}

export function ContactPage() {
  return (
    <StaticPage title="Contact" path="/contact">
      <p>Replace this placeholder with a real contact method (email address or form) before launch.</p>
    </StaticPage>
  );
}

export function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" path="/privacy">
      <p>
        Most tools on GintiVerse run entirely in your browser. Calculator inputs are not sent to a server
        unless a tool explicitly says otherwise.
      </p>
      <p>
        Favorites, recently used tools and your theme preference are stored locally on your device using
        localStorage, and are never transmitted anywhere.
      </p>
      <p>
        This placeholder policy should be reviewed and expanded with real detail — including any analytics or
        ad-serving scripts actually installed — before launch.
      </p>
    </StaticPage>
  );
}

export function TermsPage() {
  return (
    <StaticPage title="Terms & Conditions" path="/terms">
      <p>
        GintiVerse is provided as-is for informational and everyday-utility purposes. Replace this
        placeholder with real terms reviewed for your jurisdiction before launch.
      </p>
    </StaticPage>
  );
}

export function DisclaimerPage() {
  return (
    <StaticPage title="Disclaimer" path="/disclaimer">
      <p>
        Calculators on this site — including financial and health tools — provide estimates for informational
        purposes only. They are not financial, medical, legal or professional advice. Verify important
        decisions with a qualified professional.
      </p>
    </StaticPage>
  );
}
