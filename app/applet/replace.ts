import fs from "fs";
import path from "path";

const filepath = path.join(process.cwd(), "engineering-graphics-lab.html");
let html = fs.readFileSync(filepath, "utf8");
const startMarker = "<div id=\"scales-solver\"";
const endMarker = "<!-- SUITE 2: Projections Visualizer -->";

if(html.includes(startMarker) && html.includes(endMarker)) {
  const startIndex = html.indexOf(startMarker);
  const endIndex = html.indexOf(endMarker);
  
  let newHtml = html.substring(0, startIndex);
  newHtml += `<div id="scales-solver" class="solver-sec hidden pt-4 animate-fadeIn w-full">\n    <div id="react-cad-tutor-root"></div>\n</div>\n\n                        `;
  newHtml += html.substring(endIndex);
  
  if (!newHtml.includes("cad-entry.tsx")) {
    newHtml = newHtml.replace("</body>", "    <script type=\"module\" src=\"/src/cad-entry.tsx\"></script>\n</body>");
  }
  
  fs.writeFileSync(filepath, newHtml);
  console.log("SUCCESS!");
} else {
  console.log("FAILURE! markers not found");
}
