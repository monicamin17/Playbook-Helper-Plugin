import React, { useState } from 'react';
import '../styles/ListItem.css';

function ListItem({ item, type }) {
  console.log('item:', item);
  console.log('type:', type);
  console.log(type.includes('Radius'));
  const [expanded, setExpanded] = useState(false);

  const handleSelectAll = () => {
    parent.postMessage({ pluginMessage: { type: 'selectAllNodes', value: item[1] } }, '*');
  };

  const handleNodeSelect = (nodeId) => {
    parent.postMessage({ pluginMessage: { type: 'selectSpecificNode', nodeId: nodeId } }, '*');
  };

  return (
    <div className={'listItem'}>
      {/* Swatch Box */}
      <div
        className={'swatch'}
        style={{
          ...(type.toLowerCase().includes('radius') || type.toLowerCase().includes('padding')
            ? {}
            : { backgroundColor: item[0] }),
          borderRadius: type === 'style' || type.includes('Radius') ? '50%' : '0',
        }}
      >
        {type.toLowerCase().includes('bottom left') ? (
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16 14.2223L8.88889 14.2223C4.9616 14.2223 1.77778 11.0385 1.77778 7.11123L1.77778 0.00012207H0L0 7.11123C0 12.0204 3.97973 16.0001 8.88889 16.0001L16 16.0001V14.2223Z"
              fill="black"
            />
          </svg>
        ) : type.toLowerCase().includes('bottom right') ? (
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 14.2222H7.11111C11.0384 14.2222 14.2222 11.0384 14.2222 7.11111V0H16V7.11111C16 12.0203 12.0203 16 7.11111 16H0V14.2222Z"
              fill="black"
            />
          </svg>
        ) : type.toLowerCase().includes('top left') ? (
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16 1.77778H8.88889C4.9616 1.77778 1.77778 4.9616 1.77778 8.88889V16H0V8.88889C0 3.97973 3.97973 0 8.88889 0H16V1.77778Z"
              fill="black"
            />
          </svg>
        ) : type.toLowerCase().includes('top right') ? (
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 1.77778H7.11111C11.0384 1.77778 14.2222 4.9616 14.2222 8.88889V16H16V8.88889C16 3.97973 12.0203 0 7.11111 0H0V1.77778Z"
              fill="black"
            />
          </svg>
        ) : type.toLowerCase().includes('left padding') ? (
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2 16V0H3.14286V16H2ZM6.57143 4.57143H13.4286V11.4286H6.57143V4.57143ZM5.42857 3.42857H6.57143H13.4286H14.5714V4.57143V11.4286V12.5714H13.4286H6.57143H5.42857V11.4286V4.57143V3.42857Z"
              fill="black"
            />
          </svg>
        ) : type.toLowerCase().includes('right padding') ? (
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.5714 16V0H13.4286V16H14.5714ZM9.99998 4.57143H3.14284V11.4286H9.99998V4.57143ZM11.1428 3.42857H9.99998H3.14284H1.99998V4.57143V11.4286V12.5714H3.14284H9.99998H11.1428V11.4286V4.57143V3.42857Z"
              fill="black"
            />
          </svg>
        ) : type.toLowerCase().includes('top padding') ? (
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.285522 1.71423L16.2855 1.71423V2.85709L0.285522 2.85709V1.71423ZM11.7141 6.28566L11.7141 13.1428L4.85695 13.1428L4.85695 6.28566L11.7141 6.28566ZM12.857 5.14281V6.28566L12.857 13.1428V14.2857H11.7141L4.85695 14.2857H3.71409V13.1428L3.71409 6.28566V5.14281H4.85695L11.7141 5.14281L12.857 5.14281Z"
              fill="black"
            />
          </svg>
        ) : type.toLowerCase().includes('bottom padding') ? (
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.285522 14.2858L16.2855 14.2858V13.1429L0.285522 13.1429V14.2858ZM11.7141 9.71434L11.7141 2.85719L4.85695 2.85719L4.85695 9.71434L11.7141 9.71434ZM12.857 10.8572V9.71434L12.857 2.85719V1.71434H11.7141L4.85695 1.71434H3.71409V2.85719L3.71409 9.71434V10.8572H4.85695L11.7141 10.8572H12.857Z"
              fill="black"
            />
          </svg>
        ) : type.toLowerCase().includes('paddingtopbottom') ? (
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16 1.14286H0V0H16V1.14286ZM11.4286 4.57143H4.57143V11.4286H11.4286V4.57143ZM4.57143 3.42857H3.42857V4.57143V11.4286V12.5714H4.57143H11.4286H12.5714V11.4286V4.57143V3.42857H11.4286H4.57143ZM0 16H16V14.8571H0V16Z"
              fill="black"
            />
          </svg>
        ) : type.toLowerCase().includes('paddingsides') ? (
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 16V0H1.14286V16H0ZM14.8571 16V0H16V16H14.8571ZM4.57143 4.57143H11.4286V11.4286H4.57143V4.57143ZM3.42857 3.42857H4.57143H11.4286H12.5714V4.57143V11.4286V12.5714H11.4286H4.57143H3.42857V11.4286V4.57143V3.42857Z"
              fill="black"
            />
          </svg>
        ) : type.toLowerCase().includes('itemspacing') ? (
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.571411 14.8571H2.85713H3.99998V13.7143V2.28568V1.14282H2.85713H0.571411V2.28568H2.85713V13.7143H0.571411V14.8571ZM15.4286 2.28568H13.1428V13.7143H15.4286V14.8571H13.1428H12V13.7143V2.28568V1.14282H13.1428H15.4286V2.28568ZM7.42855 4.57139V11.4285H8.57141V4.57139H7.42855Z"
              fill="black"
            />
          </svg> /* : type.toLowerCase().includes('itemspacingvertical') ? (
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8571 15.4286V13.1429V12H13.7143H2.28568H1.14282V13.1429L1.14282 15.4286H2.28568V13.1429H13.7143V15.4286H14.8571ZM2.28568 0.571447V2.85716H13.7143L13.7143 0.571447H14.8571L14.8571 2.85716V4.00002H13.7143H2.28568H1.14282V2.85716L1.14282 0.571447H2.28568ZM4.57139 8.57145H11.4285V7.42859L4.57139 7.42859V8.57145Z" fill="black"/>

          </svg>
        )  */
        ) : type.toLowerCase().includes('radius') ? (
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21 19H17C14.7909 19 13 17.2091 13 15V11H12V15C12 17.7614 14.2386 20 17 20H21V19Z"
              fill="black"
            />
          </svg>
        ) : null}
      </div>

      {/* Container for Information and Arrow */}
      <div className="infoContainer">
        <div className="other">
          <div className={'content'}>
            {/* Contains color information and # issues */}
            {type === 'hex' ? (
              <div className={'issueContainer'}>
                <p className={'hexValue'}>{item[0]}</p>
                <p className={'divider'}>•</p>
                <p className={'numIssues'}>{item[1].length}</p>
              </div>
            ) : type.toLowerCase().includes('radius') ||
              type.toLowerCase().includes('spacing') ||
              type.toLowerCase().includes('padding') ? (
              <div className={'issueContainer'}>
                <p className={'spacingValue'}>{item[0]}px</p>
              </div>
            ) : (
              <div className={'issueContainer'}>
                <p className={'name'}>{item[1][0][4]}</p>
              </div>
            )}

            {/* Show library name if not a hex issue */}
            {!type.toLowerCase().includes('hex') ? (
              <div className={'issueContainer'}>

                {/* If it is a spacing element, print the spacing issue. Print the Library name otherwise */}
                {!type.toLowerCase().includes('variable') ? (
                  <p className={'libName'}>{item[1][0][2]}</p>
                ) : (
                  <p className={'libName'}>{item[1][0][3]}</p>
                )}
                <p className={'divider'}>•</p>
                <p className={'numIssues'}>{item[1].length}</p>
              </div>
            ) : null}

            {/* Select All Text */}
            <p className={'selectAll'} onClick={handleSelectAll}>
              Select All
            </p>
          </div>

          {/* Arrow */}
          <div className={`${'arrow'} ${expanded ? expanded : ''}`} onClick={() => setExpanded(!expanded)}>
            arrowhere
          </div>
        </div>

        {/* Frame Names */}
        {expanded && (
          <div className={'expandedList'}>
            {item[1].map((node, index) => (
              <div key={index} className={'expandedListItem'} onClick={() => handleNodeSelect(node[1])}>
                {node[0]}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListItem;
