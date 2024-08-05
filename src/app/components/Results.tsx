import React from "react";
import ListItem from "./ListItem";
import "../styles/Linter.scss";
// import CheckIcon from '../icons/CheckIcon';
// import AlertIcon from '../icons/AlertIcon';

function Results({ results, choice }) {
  // console.log("Results!!!:", results);
  const handleReload = () => {
    parent.postMessage(
      { pluginMessage: { type: "userSelection", value: choice } },
      "*"
    );
  };
  const cornerMapTypes = [
    "bottomLeftRadiusMap",
    "bottomRightRadiusMap",
    "topLeftRadiusMap",
    "topRightRadiusMap",
    "radiusMap",
  ];
  const spacingMapTypes = [
    "itemSpacingMap",
    "counterAxisSpacing",
    "paddingLeftMap",
    "paddingRightMap",
    "paddingSidesMap",
    "paddingTopMap",
    "paddingBottomMap",
    "paddingTopBottomMap",
  ];
  // console.log(results);
  // Calculate total number of issues
  const getTotalIssues = () => {
    const hexColorIssues = [
      "hexColors", // This is a string key for results
      "missingStyles", // This is a string key for results
    ].reduce((total, key) => {
      if (Array.isArray(results[key])) {
        for (const [, issuesArray] of results[key]) {
          total += issuesArray.length;
        }
      }
      return total;
    }, 0);

    const spacingIssues = [...cornerMapTypes, ...spacingMapTypes].reduce(
      (spacingTotal, key) => {
        if (Array.isArray(results[key])) {
          for (const [, issuesArray] of results[key]) {
            spacingTotal += issuesArray.length;
          }
        }
        return spacingTotal;
      },
      0
    );

    // Handle `missingVariables` separately, as it has nested arrays
    const missingVariablesCount = results.missingVariables
      ? results.missingVariables.reduce(
          (sum, item) => sum + (Array.isArray(item) ? item[1].length : 0),
          0
        )
      : 0;

    return hexColorIssues + missingVariablesCount + spacingIssues;
  };

  const totalIssues = getTotalIssues();
  return (
    <>
      <div className={"results"}>
        {/* No errors */}
        {Object.keys(results).length === 0 ? (
          <div className={"messagingContainer"}>
            <div className="messagingSVGContainer successContainer">
              <svg
                className="successGraphic"
                viewBox="0 0 24 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00005 13.1501L19.9 1.25005C20.4 0.783382 20.95 0.550049 21.55 0.550049C22.15 0.550049 22.7 0.783382 23.2 1.25005C23.7 1.75005 23.95 2.30838 23.95 2.92505C23.95 3.54172 23.7 4.10005 23.2 4.60005L9.70005 18.1501C9.23338 18.6167 8.66672 18.85 8.00005 18.85C7.33338 18.85 6.76672 18.6167 6.30005 18.1501L0.750049 12.6C0.283382 12.1 0.0500488 11.5417 0.0500488 10.925C0.0500488 10.3084 0.300049 9.75005 0.800049 9.25005C1.30005 8.78338 1.85838 8.55005 2.47505 8.55005C3.09172 8.55005 3.65005 8.78338 4.15005 9.25005L8.00005 13.1501Z"
                  fill="#639113"
                />
              </svg>
            </div>
            <p className="successText">Everything looks great!</p>
          </div>
        ) : results === "Successfully stored local styles." ? (
          <div className={"messagingContainer"}>
            <div className="messagingSVGContainer successContainer">
              <svg
                className="successGraphic"
                viewBox="0 0 24 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00005 13.1501L19.9 1.25005C20.4 0.783382 20.95 0.550049 21.55 0.550049C22.15 0.550049 22.7 0.783382 23.2 1.25005C23.7 1.75005 23.95 2.30838 23.95 2.92505C23.95 3.54172 23.7 4.10005 23.2 4.60005L9.70005 18.1501C9.23338 18.6167 8.66672 18.85 8.00005 18.85C7.33338 18.85 6.76672 18.6167 6.30005 18.1501L0.750049 12.6C0.283382 12.1 0.0500488 11.5417 0.0500488 10.925C0.0500488 10.3084 0.300049 9.75005 0.800049 9.25005C1.30005 8.78338 1.85838 8.55005 2.47505 8.55005C3.09172 8.55005 3.65005 8.78338 4.15005 9.25005L8.00005 13.1501Z"
                  fill="#639113"
                />
              </svg>
            </div>
            <p className="successText">Successfully stored local styles.</p>
          </div>
        ) : (
          <>
            {results.hexColors?.map((item, index) => (
              <ListItem key={index} item={item} type="hex" />
            ))}

            {results.missingVariables?.map((item, index) => (
              <ListItem key={index} item={item} type="variable" />
            ))}

            {results.missingStyles?.map((item, index) => (
              <ListItem key={index} item={item} type="style" />
            ))}

            {cornerMapTypes.flatMap(
              (mapType) =>
                results[mapType]?.map((item, index) => (
                  <ListItem
                    key={`${mapType}-${index}`}
                    item={item}
                    type={mapType.replace("Map", "")}
                  />
                )) || []
            )}

            {spacingMapTypes.flatMap((mapType) => {
              return (
                results[mapType]?.map((item, index) => (
                  <ListItem
                    key={`${mapType}-${index}`}
                    item={item}
                    type={mapType.replace("Map", "")}
                  />
                )) || []
              );
            })}
          </>
        )}
      </div>

      <div className="footer">
        <div
          className={totalIssues === 0 ? "footer_no_errors" : "footer_issues"}
        >
          {totalIssues === 0 ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_2426_6852"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="20"
                height="20"
              >
                <rect width="20" height="20" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_2426_6852)">
                <path
                  d="M8.92142 12.7113L13.6073 8.0463L12.8333 7.27234L8.92142 11.1634L7.15058 9.41338L6.37663 10.1873L8.92142 12.7113ZM10.0014 17.5832C8.96197 17.5832 7.98135 17.3858 7.05954 16.9911C6.13774 16.5964 5.33093 16.0532 4.63913 15.3617C3.94732 14.6702 3.40392 13.8637 3.00892 12.9423C2.61406 12.0209 2.41663 11.0406 2.41663 10.0013C2.41663 8.94796 2.61399 7.96386 3.00871 7.049C3.40343 6.13414 3.94656 5.33081 4.63808 4.639C5.32961 3.9472 6.13607 3.4038 7.05746 3.0088C7.97885 2.61393 8.9592 2.4165 9.9985 2.4165C11.0518 2.4165 12.0359 2.61386 12.9508 3.00859C13.8657 3.40331 14.669 3.94643 15.3608 4.63796C16.0526 5.32949 16.596 6.13248 16.991 7.04692C17.3859 7.96137 17.5833 8.94518 17.5833 9.99838C17.5833 11.0378 17.3859 12.0184 16.9912 12.9403C16.5965 13.8621 16.0534 14.6689 15.3618 15.3607C14.6703 16.0525 13.8673 16.5959 12.9529 16.9909C12.0384 17.3857 11.0546 17.5832 10.0014 17.5832ZM9.99996 16.4998C11.8055 16.4998 13.3402 15.8679 14.6041 14.604C15.868 13.3401 16.5 11.8054 16.5 9.99984C16.5 8.19428 15.868 6.65956 14.6041 5.39567C13.3402 4.13178 11.8055 3.49984 9.99996 3.49984C8.1944 3.49984 6.65968 4.13178 5.39579 5.39567C4.1319 6.65956 3.49996 8.19428 3.49996 9.99984C3.49996 11.8054 4.1319 13.3401 5.39579 14.604C6.65968 15.8679 8.1944 16.4998 9.99996 16.4998Z"
                  fill="#639113"
                />
              </g>
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_2426_6864"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="20"
                height="20"
              >
                <rect width="20" height="20" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_2426_6864)">
                <path
                  d="M9.99558 13.7755C10.1614 13.7755 10.3019 13.7194 10.417 13.6071C10.5322 13.4949 10.5898 13.3559 10.5898 13.19C10.5898 13.0242 10.5336 12.8837 10.4214 12.7686C10.3092 12.6536 10.1702 12.5961 10.0043 12.5961C9.8385 12.5961 9.69802 12.6521 9.58288 12.7642C9.46774 12.8764 9.41017 13.0155 9.41017 13.1813C9.41017 13.3471 9.46628 13.4876 9.5785 13.6028C9.69072 13.7179 9.82975 13.7755 9.99558 13.7755ZM9.45829 11.064H10.5416V6.064H9.45829V11.064ZM10.007 17.5832C8.96385 17.5832 7.98135 17.3858 7.05954 16.9911C6.13774 16.5964 5.33093 16.0532 4.63913 15.3617C3.94732 14.6702 3.40392 13.864 3.00892 12.9432C2.61406 12.0225 2.41663 11.0387 2.41663 9.99171C2.41663 8.94477 2.61399 7.96386 3.00871 7.049C3.40343 6.13414 3.94656 5.33081 4.63808 4.639C5.32961 3.9472 6.13579 3.4038 7.05663 3.0088C7.97732 2.61393 8.96114 2.4165 10.0081 2.4165C11.055 2.4165 12.0359 2.61386 12.9508 3.00859C13.8657 3.40331 14.669 3.94643 15.3608 4.63796C16.0526 5.32949 16.596 6.134 16.991 7.0515C17.3859 7.96914 17.5833 8.94956 17.5833 9.99275C17.5833 11.0359 17.3859 12.0184 16.9912 12.9403C16.5965 13.8621 16.0534 14.6689 15.3618 15.3607C14.6703 16.0525 13.8658 16.5959 12.9483 16.9909C12.0307 17.3857 11.0502 17.5832 10.007 17.5832ZM9.99996 16.4998C11.8055 16.4998 13.3402 15.8679 14.6041 14.604C15.868 13.3401 16.5 11.8054 16.5 9.99984C16.5 8.19428 15.868 6.65956 14.6041 5.39567C13.3402 4.13178 11.8055 3.49984 9.99996 3.49984C8.1944 3.49984 6.65968 4.13178 5.39579 5.39567C4.1319 6.65956 3.49996 8.19428 3.49996 9.99984C3.49996 11.8054 4.1319 13.3401 5.39579 14.604C6.65968 15.8679 8.1944 16.4998 9.99996 16.4998Z"
                  fill="#CC0E00"
                />
              </g>
            </svg>
          )}
          <p>
            {totalIssues} {totalIssues === 1 ? "issue" : "issues"}
          </p>
        </div>

        {/* Refresh Icon */}
        <div className="refreshContainer" onClick={handleReload}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
          >
            <path
              d="M7.03612 14.5C5.07179 14.5 3.40806 13.822 2.04493 12.466C0.681644 11.1101 0 9.45518 0 7.5014C0 5.54762 0.681644 3.89228 2.04493 2.53537C3.40806 1.17846 5.07179 0.5 7.03612 0.5C8.13297 0.5 9.17096 0.742589 10.1501 1.22777C11.129 1.7131 11.9433 2.39786 12.5928 3.28203V0.5H14V6.20757H8.26298V4.8078H11.9687C11.4743 3.90667 10.7886 3.19679 9.91178 2.67817C9.03508 2.15939 8.07653 1.9 7.03612 1.9C5.47254 1.9 4.14349 2.44444 3.04899 3.53333C1.95448 4.62222 1.40722 5.94444 1.40722 7.5C1.40722 9.05556 1.95448 10.3778 3.04899 11.4667C4.14349 12.5556 5.47254 13.1 7.03612 13.1C8.24008 13.1 9.32677 12.7578 10.2962 12.0733C11.2656 11.3889 11.9458 10.4867 12.3367 9.36667H13.8196C13.3939 10.8899 12.5553 12.1262 11.3038 13.0757C10.0523 14.0252 8.62972 14.5 7.03612 14.5Z"
              fill="#181B29"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export default Results;
