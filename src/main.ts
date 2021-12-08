import { getProject, types as t } from "@theatre/core";
import studio from "@theatre/studio";
import state from "./state.json";

// Get the studio UI (time sequence, etc.)
studio.initialize();

// Create a project with a saved state
const proj = getProject("Animation practice", { state });

function makeBouncingBox(i: number) {
  const sheet = proj.sheet("Bouncing box", "instance_" + i);

  // Box container div
  const boxContainer = document.createElement("div");
  boxContainer.className = "boxContainer";
  document.getElementById("space").appendChild(boxContainer);

  // Box object
  const boxObj = sheet.object("Box", {
    y: 0,
    stretch: t.number(1, { nudgeMultiplier: 0.1 }),
  });

  // Box div
  const boxDiv = document.createElement("div");
  boxDiv.className = "box";
  boxContainer.appendChild(boxDiv);

  // Animation
  boxDiv.addEventListener("click", () =>
    sheet.sequence.play({ iterationCount: Infinity })
  );

  boxObj.onValuesChange(({ y, stretch }) => {
    boxDiv.style.transform = `translateY(${-y}px) scale(${
      1 / stretch
    }, ${stretch})`;
  });
}

// Create bouncing boxes!
makeBouncingBox(1);
makeBouncingBox(2);
makeBouncingBox(3);
