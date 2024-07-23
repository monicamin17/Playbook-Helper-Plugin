// components/Results.js
import React from 'react';
import ListItem from './ListItem';
import '../styles/Results.css';

function Results({ results }) {
  console.log('Results!!!:', results);
  if (Object.keys(results).length === 0) {
    return <div className={'noErrors'}>No errors in this selection!</div>;
  }

  const cornerMapTypes = [
    'bottomLeftRadiusMap',
    'bottomRightRadiusMap',
    'topLeftRadiusMap',
    'topRightRadiusMap',
    'radiusMap',
  ];
  const spacingMapTypes = [
    'itemSpacingMap',
    'paddingLeftMap',
    'paddingRightMap',
    'paddingSidesMap',
    'paddingTopMap',
    'paddingBottomMap',
    'paddingTopBottomMap',
  ];

  return (
    <div className={'results'}>
      {results.hexColors && (
        <div className={'hexColors'}>
          {/* <h3>Hex Colors</h3> */}
          {results.hexColors.map((item, index) => (
            <ListItem key={index} item={item} type="hex" />
          ))}
        </div>
      )}

      {results.missingVariables && (
        <div className={'missingVariables'}>
          {results.missingVariables.map((item, index) => (
            <ListItem key={index} item={item} type="variable" />
          ))}
        </div>
      )}

      {results.missingStyles && (
        <div className={'missingStyles'}>
          {results.missingStyles.map((item, index) => (
            <ListItem key={index} item={item} type="style" />
          ))}
        </div>
      )}

      {cornerMapTypes.map(
        (mapType) =>
          results[mapType] && (
            <div key={mapType} className={'corner'}>
              {results[mapType].map((item, index) => (
                <ListItem key={index} item={item} type={mapType.replace('Map', '')} />
              ))}
            </div>
          )
      )}

      {spacingMapTypes.map(
        (mapType) =>
          results[mapType] && (
            <div key={mapType} className={'corner'}>
              {results[mapType].map((item, index) => (
                <ListItem key={index} item={item} type={mapType.replace('Map', '')} />
              ))}
            </div>
          )
      )}
    </div>
  );
}

export default Results;
