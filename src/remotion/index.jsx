import { registerRoot, Composition } from "remotion";
import { NaturalResourceIntro } from "./NaturalResourceIntro.jsx";

const FPS = 30;
const DURATION_IN_SECONDS = 5;
const WIDTH = 1280;
const HEIGHT = 720;

function RemotionRoot() {
  return (
    <Composition
      id="NaturalResourceIntro"
      component={NaturalResourceIntro}
      durationInFrames={FPS * DURATION_IN_SECONDS}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
}

registerRoot(RemotionRoot);