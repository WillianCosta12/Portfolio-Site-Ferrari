import SmoothScroll from "@/components/SmoothScroll";
import ScrollChrome from "@/components/ScrollChrome";
import Footer from "@/components/Footer";
import IgnitionScene from "@/components/scenes/IgnitionScene";
import MonopostoScene from "@/components/scenes/MonopostoScene";
import HeritageScene from "@/components/scenes/HeritageScene";
import MachineScene from "@/components/scenes/MachineScene";
import ClimaxScene from "@/components/scenes/ClimaxScene";

export default function Home() {
  return (
    <SmoothScroll>
      <ScrollChrome />
      <main>
        <IgnitionScene />
        <MonopostoScene />
        <HeritageScene />
        <MachineScene />
        <ClimaxScene />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
