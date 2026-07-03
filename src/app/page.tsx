import SmoothScroll from "@/components/SmoothScroll";
import ScrollChrome from "@/components/ScrollChrome";
import Footer from "@/components/Footer";
import IgnitionScene from "@/components/scenes/IgnitionScene";
import MonopostoScene from "@/components/scenes/MonopostoScene";
import HeritageScene from "@/components/scenes/HeritageScene";
import LegendsScene from "@/components/scenes/LegendsScene";
import IconsScene from "@/components/scenes/IconsScene";
import MachineScene from "@/components/scenes/MachineScene";
import NumbersScene from "@/components/scenes/NumbersScene";
import ClimaxScene from "@/components/scenes/ClimaxScene";

export default function Home() {
  return (
    <SmoothScroll>
      <ScrollChrome />
      <main>
        <IgnitionScene />
        <MonopostoScene />
        <HeritageScene />
        <LegendsScene />
        <IconsScene />
        <MachineScene />
        <NumbersScene />
        <ClimaxScene />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
