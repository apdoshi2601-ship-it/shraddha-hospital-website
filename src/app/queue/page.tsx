import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileCTABar from "@/components/layout/MobileCTABar";
import QueueDisplay from "@/components/queue/QueueDisplay";
import { Users } from "lucide-react";

export const metadata = {
  title: "Live OPD Queue | Shraddha Institute — SISOS Sangli",
  description: "Check live OPD queue status and estimated wait times at Shraddha Institute of Spine & Orthopaedic Superspeciality, Sangli.",
};

export default function QueuePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-alt pt-32 pb-20 md:pb-12">
        <div className="container-custom max-w-3xl">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Users size={24} />
              <h1 className="text-2xl font-display font-bold text-text">Live OPD Queue</h1>
            </div>
            <p className="text-text-muted text-sm">
              Real-time queue status for today&apos;s OPD. Enter your token number to track your position.
            </p>
          </div>
          <QueueDisplay />
        </div>
      </main>
      <Footer />
      <MobileCTABar />
    </>
  );
}
