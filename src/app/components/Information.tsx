import React from "react";
import "../styles/ContentReel.scss";



export default function Information() {

  return (
    <div className={"infoBody"}>
        <h2>About</h2>
        <div>
        <h3>Linter</h3>
        <ul>
            <li>To have variables/styles counted as “Imported,” ensure you have a library imported. Press Assets and import your desired library.</li>
            <li>[Admin Purposes] Figma doesn’t check styles through a library directly. Save your style library to Figma storage to accurately lint for unimported styles. Use the <span className='code'>Save Styles</span>  button in the Styles tab at the bottom left.</li>

            <li>Locked layers will be skipped and not linted.</li>
            <li>Components with the keyword <span className='code'>@PLAYBOOK_HELPER_PLUGIN: SKIP</span> in their description are automatically skipped. This keyword is added to the following files:
            <ul>
              <li>Company Logos</li>
              <li>Team Logos</li>
              <li>Country Flags</li>
            </ul>
            </li>
            <li>Elements with a spacing or corner radius value of 0 will not be linted or flagged.</li>
            <li>StickyNote frames are skipped.</li>
        </ul>
        </div>

        <div>
            <h3>Content Reel</h3>
            <ul>
                <li>The content reel only scans for text layers and layers with an image fill.</li>
                <li>Text and image layers that are within a frame are grouped so all information can be related to one another.</li>
            </ul>
        </div>
        
    </div>
  );
}

