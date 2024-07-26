// App.js
import React, { useState, useEffect } from 'react';
import Authentication from './Authentication';
import Navigation from './Navigation';
import LinterOptions from './LinterOptions';
import ContentReelOptions from './ContentReelOptions';
import Results from './Results';
import ContentReel from './ContentReel'; // Import the ContentReel component
// import '../styles/UI.scss';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('linter');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeLinterOption, setActiveLinterOption] = useState('All');

  useEffect(() => {
    console.log('Results in App after update:', results);
  }, [results]);

  useEffect(() => {
    window.onmessage = (event) => {
      const { type, data } = event.data.pluginMessage;

      switch (type) {
        case 'tokenSaved':
          setAuthenticated(true);
          break;
        case 'invalidToken':
          // Handle invalid token
          break;
        case 'errorToken':
          console.log('Error getting token');
          break;
        case 'results':
          console.log('data!!:', data);
          setResults(data);
          setLoading(false);
          break;
        case 'none':
          setResults({});
          setLoading(false);
          break;
      }
    };
  }, []);

  const handleTokenSubmit = (token) => {
    parent.postMessage({ pluginMessage: { type: 'saveToken', token } }, '*');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setResults({}); // Clear results when changing tabs
  };

  const handleLinterOptionClick = (option) => {
    console.log('handleLinterOptionClick: ', option);
    setActiveLinterOption(option);
    setLoading(true);
    parent.postMessage({ pluginMessage: { type: 'userSelection', value: option } }, '*');
  };

  const handleContentReelClick = () => {
    setLoading(true);
    parent.postMessage({ pluginMessage: { type: 'contentReel', value: 'Content Reel' } }, '*');
  };

  return (
    <div className={'authenticationContainer'}>
      {!authenticated ? (
        <Authentication onSubmit={handleTokenSubmit} />
      ) : (
        <>
          <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
          <div className="rightBody">
            {activeTab === 'linter' ? (
              <>
                <LinterOptions onClick={handleLinterOptionClick} activeOption={activeLinterOption} />
                {loading ? (
                  <div className={'loading'}>
                    {/* Add your loading SVG here */}
                    Linting...
                  </div>
                ) : (
                  <Results results={results} />
                )}
                {/* <div className='footer'>
                  <div className='footer_issues'>
                    <p>8 issues</p>
                  </div>

                </div> */}
              </>
            ) : (
              <>
                <ContentReelOptions onClick={handleContentReelClick} />
                {loading ? (
                  <div className={'loading'}>
                    {/* Add your loading SVG here */}
                    Loading Content Reel...
                  </div>
                ) : (
                  <ContentReel results={results} />
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
