import React from "react";
import "../styles/ContentReel.scss";



export default function Information() {

  return (
    <div className={"infoBody"}>
        <h2>Information</h2>
        <div>
        <h2>Capabilities of the Linter</h2>
        <ul>
            <li>Components with the keyword @PLAYBOOK_HELPER_SKIP in their description will automatically be skipped over. This keyword has automatically been added to all country assets, team logos, and company logos that will have loose hex values. </li>
            <li>You must have a library imported in order for your variable/style to count as “Imported”. Press Assets and import your desired library.</li>
            <li>Any layers that are locked will automatically be skipped and not linted.</li>
            <li>Elements with a spacing or corner radius value of 0 will not be linted/flagged.</li>
        </ul>
        </div>

        <div>
            <h2>Capabilites of the Content Reel</h2>
            <ul>
                <li>The content reel only scans for text layers and layers with an image fill.</li>
                <li>The content reel groups text/image layers that are within a frame together so all information can be related to one another.</li>
            </ul>
        </div>
        
    </div>
  );
}

