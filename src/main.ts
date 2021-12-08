import { getProject, types as t } from "@theatre/core";
import studio from "@theatre/studio";
import state from "./state.json";

// Get the studio UI (time sequence, etc.)
studio.initialize();

// Create a project with a saved state
const proj = getProject("Animation practice", { state });

const nudgableNumber = t.number(1, { nudgeMultiplier: 0.1 });

function makeBouncingBox(i: number) {
  const sheet = proj.sheet("Bouncing box", "instance_" + i);

  // Box container div
  const boxContainer = document.createElement("div");
  boxContainer.className = "boxContainer";
  document.getElementById("space").appendChild(boxContainer);

  // Box object
  const boxObj = sheet.object("Box", {
    y: 0,
    stretch: nudgableNumber,
  });

  // Box div
  const boxDiv = document.createElement("div");
  boxDiv.className = "box";
  boxContainer.appendChild(boxDiv);

  // Box animation
  boxDiv.addEventListener("click", () =>
    sheet.sequence.play({ iterationCount: Infinity })
  );

  boxObj.onValuesChange(({ y, stretch }) => {
    boxDiv.style.transform = `translateY(${-y}px) scale(${
      1 / stretch
    }, ${stretch})`;
  });

  // Dust div
  const dustDiv = document.createElement("div");
  dustDiv.className = "dust";
  boxContainer.appendChild(dustDiv);

  // Dust object
  const dustObj = sheet.object("Dust", {
    opacity: nudgableNumber,
    scaleX: nudgableNumber,
  });

  // Dust animation
  dustObj.onValuesChange(({ opacity, scaleX }) => {
    dustDiv.style.opacity = String(opacity);
    dustDiv.style.transform = `scaleX(${scaleX})`;
  });
}

// Create bouncing boxes!
makeBouncingBox(1);
makeBouncingBox(2);
makeBouncingBox(3);
