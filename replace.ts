import fs from "fs";

let html = fs.readFileSync("engineering-graphics-lab.html", "utf8");
const startMarker = "<div id=\"scales-solver\"";
const endMarker = "<!-- SUITE 2: Projections Visualizer -->";

if(html.includes(startMarker) && html.includes(endMarker)) {
  const startIndex = html.indexOf(startMarker);
  const endIndex = html.indexOf(endMarker);
  
  // Cut out the old scales-solver
  let newHtml = html.substring(0, startIndex);
  newHtml += `<div id="scales-solver" class="solver-sec hidden animate-fadeIn w-full">\n    <div id="react-cad-tutor-root"></div>\n</div>\n\n                        `;
  newHtml += html.substring(endIndex);
  
  if (!newHtml.includes("cad-entry.tsx")) {
    newHtml = newHtml.replace("</body>", "    <script type=\"module\" src=\"/src/cad-entry.tsx\"></script>\n</body>");
  }

  // Also remove the extra lingering closing div tags if any? 
  // No, the </div>     </div></div> were before the endMarker. So we already cut them out cleanly.
  
  fs.writeFileSync("engineering-graphics-lab.html", newHtml);
  console.log("SUCCESS!");
} else {
  console.log("FAILURE! markers not found");
}
