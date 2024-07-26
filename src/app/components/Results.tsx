import React from 'react';
import ListItem from './ListItem';
import '../styles/Linter.scss';
// import CheckIcon from '../icons/CheckIcon';
// import AlertIcon from '../icons/AlertIcon';

function Results({ results }) {
  console.log('Results!!!:', results);

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

// Calculate total number of issues
const getTotalIssues = () => {
  return [
    ...cornerMapTypes,
    ...spacingMapTypes,
    'hexColors',
    'missingVariables',
    'missingStyles'
  ].reduce((total, key) => {
    return total + (results[key]?.length || 0);
  }, 0);
};

const totalIssues = getTotalIssues();
  return (
    <>
    <div className={'results'}>
      {/* No errors */}
      {Object.keys(results).length === 0 ? (
        <div className={'successContainer'}>
          <img className='successGraphic' src='https://cdn-icons-png.flaticon.com/512/6808/6808239.png'></img>
          <p>Everything looks great!</p>
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

          {cornerMapTypes.flatMap(mapType => 
            results[mapType]?.map((item, index) => (
              <ListItem key={`${mapType}-${index}`} item={item} type={mapType.replace('Map', '')} />
            )) || []
          )}

          {spacingMapTypes.flatMap(mapType => 
            results[mapType]?.map((item, index) => (
              <ListItem key={`${mapType}-${index}`} item={item} type={mapType.replace('Map', '')} />
            )) || []
          )}
        </>
      )}
    </div>
    <div className='footer'>
    <div className={totalIssues === 0 ? 'footer_no_errors' : 'footer_issues'}>
       <p>{totalIssues} {totalIssues === 1 ? 'issue' : 'issues'}</p>
      </div>

    </div>
    </>
  );
}

export default Results;