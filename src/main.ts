import { getProject, types as t } from "@theatre/core";
import studio from "@theatre/studio";
import state from "./state.json";

studio.initialize();

const proj = getProject("Animation practice", { state });
const sheet = proj.sheet("Bouncing box");

const boxObj = sheet.object("Box", {
  y: 0,
  stretch: t.number(1, { nudgeMultiplier: 0.1 }),
});

const boxDiv = document.querySelector(".box")! as HTMLDivElement;

boxObj.onValuesChange(({ y, stretch }) => {
  boxDiv.style.transform = `translateY(${-y}px) scale(${
    1 / stretch
  }, ${stretch})`;
});
