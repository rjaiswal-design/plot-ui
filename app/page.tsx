import { Hero } from "./_sections/Hero";
import { Install } from "./_sections/Install";
import { Foundations } from "./_sections/Foundations";
import { Gallery } from "./_sections/Gallery";
import { Footer } from "./_sections/Footer";
import { ToastProvider } from "../src/components/primitives/Toast";
import { PageChrome } from "./_chrome/Chrome";
import { CommandLauncher } from "./_chrome/CommandLauncher";

export default function Page() {
  return (
    <ToastProvider>
      <PageChrome>
        <CommandLauncher />
        <main
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "56px 80px 160px",
            display: "flex",
            flexDirection: "column",
            gap: 128,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Hero />
          <Install />
          <Foundations />
          <Gallery />
          <Footer />
        </main>
      </PageChrome>
    </ToastProvider>
  );
}
