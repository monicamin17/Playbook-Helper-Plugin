// App.js
import React, { useState, useEffect } from 'react';
// import Authentication from './Authentication';
import Navigation from './Navigation';
import LinterOptions from './LinterOptions';
import Results from './Results';
import ContentReel from './ContentReel'; // Import the ContentReel component
import StickyNote from './StickyNote'; // Import the StickyNote component

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
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
          // setAuthenticated(true);
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

  // const handleTokenSubmit = (token) => {
  //   parent.postMessage({ pluginMessage: { type: 'saveToken', token } }, '*');
  // };

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

  return (
    // <div className={'authenticationContainer'}>
    //   {!authenticated ? (
    //     <Authentication onSubmit={handleTokenSubmit} />
    //   ) : (
        <>
          <Navigation
            activeTab={activeTab}
            onTabChange={handleTabChange}
            // tabs={['linter', 'contentReel', 'stickyNote']} // Include the new tab here
          />
          <div className="rightBody">
            {activeTab === 'linter' ? (
              <>
                <LinterOptions onClick={handleLinterOptionClick} activeOption={activeLinterOption} />
                {loading ? (
                  <div className={"successContainer"}>
                  <svg
                    className="successGraphic"
                    viewBox="0 0 62 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.0535 9.53859L14.3384 1.09187C14.4045 0.921852 14.645 0.921852 14.7112 1.09187L17.996 9.53859C18.0145 9.58609 18.0504 9.62475 18.0964 9.64667L28.0662 14.3942C28.2302 14.4723 28.2136 14.7108 28.0405 14.7655L19.1122 17.5849C19.0567 17.6025 19.0116 17.6433 18.9886 17.6969L14.7086 27.6836C14.6393 27.8452 14.4102 27.8452 14.3409 27.6836L10.0609 17.6969C10.0379 17.6433 9.99282 17.6025 9.93729 17.5849L1.00905 14.7655C0.835897 14.7108 0.819347 14.4723 0.983294 14.3942L10.9531 9.64667C10.9991 9.62475 11.035 9.58609 11.0535 9.53859ZM12.8346 43.7446L14.3724 39.7902C14.6038 39.1951 15.4458 39.1951 15.6772 39.7902L17.2151 43.7446C17.2797 43.9109 17.4054 44.0462 17.5665 44.1229L22.5836 46.512C23.1574 46.7852 23.0995 47.6201 22.4934 47.8115L18.2764 49.1431C18.0821 49.2045 17.9241 49.3476 17.8438 49.5349L15.6682 54.6113C15.4258 55.177 14.6238 55.177 14.3814 54.6113L12.2058 49.5349C12.1255 49.3476 11.9676 49.2045 11.7732 49.1431L7.55623 47.8115C6.95018 47.6201 6.89225 46.7852 7.46607 46.512L12.4831 44.1229C12.6442 44.0462 12.7699 43.9109 12.8346 43.7446ZM39.0605 11.2741L33.9735 24.0007C33.9261 24.1193 33.8352 24.2152 33.7194 24.2688L18.2086 31.455C17.7926 31.6477 17.8337 32.252 18.2719 32.3866L32.0741 36.6272C32.2128 36.6699 32.3262 36.7707 32.3848 36.9036L39.0672 52.0738C39.2425 52.4717 39.807 52.4717 39.9823 52.0738L46.6647 36.9036C46.7233 36.7707 46.8367 36.6699 46.9755 36.6272L60.7776 32.3866C61.2159 32.252 61.2569 31.6477 60.841 31.455L45.3301 24.2688C45.2143 24.2152 45.1234 24.1193 45.076 24.0007L39.989 11.2741C39.8215 10.8549 39.228 10.8549 39.0605 11.2741Z"
                      fill="#0085FF"
                    />
                    <path
                      d="M14.3384 1.09187L13.8724 0.910642V0.910643L14.3384 1.09187ZM11.0535 9.53859L10.5875 9.35736L10.5875 9.35737L11.0535 9.53859ZM14.7112 1.09187L14.2452 1.27309L14.2452 1.27309L14.7112 1.09187ZM17.996 9.53859L18.462 9.35737L18.462 9.35736L17.996 9.53859ZM18.0964 9.64667L18.3114 9.19524L18.0964 9.64667ZM28.0662 14.3942L27.8512 14.8456L27.8512 14.8456L28.0662 14.3942ZM28.0405 14.7655L28.191 15.2423L28.191 15.2423L28.0405 14.7655ZM19.1122 17.5849L19.2628 18.0617L19.2628 18.0617L19.1122 17.5849ZM18.9886 17.6969L18.529 17.4999L18.9886 17.6969ZM14.7086 27.6836L15.1682 27.8806L14.7086 27.6836ZM14.3409 27.6836L13.8814 27.8806L14.3409 27.6836ZM10.0609 17.6969L10.5205 17.4999L10.0609 17.6969ZM9.93729 17.5849L9.78672 18.0617L9.78672 18.0617L9.93729 17.5849ZM1.00905 14.7655L0.858487 15.2423L0.858488 15.2423L1.00905 14.7655ZM0.983294 14.3942L1.19826 14.8456H1.19826L0.983294 14.3942ZM10.9531 9.64667L11.1681 10.0981L11.1681 10.0981L10.9531 9.64667ZM14.3724 39.7902L13.9064 39.6089L14.3724 39.7902ZM12.8346 43.7446L12.3686 43.5634H12.3686L12.8346 43.7446ZM15.6772 39.7902L16.1432 39.6089H16.1432L15.6772 39.7902ZM17.2151 43.7446L16.7491 43.9258L17.2151 43.7446ZM17.5665 44.1229L17.7815 43.6714V43.6714L17.5665 44.1229ZM22.5836 46.512L22.3686 46.9634H22.3686L22.5836 46.512ZM22.4934 47.8115L22.3428 47.3347L22.4934 47.8115ZM18.2764 49.1431L18.1258 48.6664H18.1258L18.2764 49.1431ZM17.8438 49.5349L18.3034 49.7319L17.8438 49.5349ZM15.6682 54.6113L15.2086 54.4143L15.2086 54.4143L15.6682 54.6113ZM14.3814 54.6113L13.9218 54.8082L14.3814 54.6113ZM12.2058 49.5349L11.7463 49.7319L12.2058 49.5349ZM11.7732 49.1431L11.9238 48.6664H11.9238L11.7732 49.1431ZM7.55623 47.8115L7.70679 47.3347H7.70679L7.55623 47.8115ZM7.46607 46.512L7.68103 46.9634H7.68103L7.46607 46.512ZM12.4831 44.1229L12.2682 43.6714L12.2682 43.6714L12.4831 44.1229ZM33.9735 24.0007L34.4378 24.1863V24.1863L33.9735 24.0007ZM39.0605 11.2741L38.5962 11.0885L38.5962 11.0885L39.0605 11.2741ZM33.7194 24.2688L33.9296 24.7225L33.9296 24.7225L33.7194 24.2688ZM18.2086 31.455L18.4187 31.9087H18.4187L18.2086 31.455ZM18.2719 32.3866L18.125 32.8646L18.2719 32.3866ZM32.0741 36.6272L31.9272 37.1052L31.9272 37.1052L32.0741 36.6272ZM32.3848 36.9036L31.9272 37.1052V37.1052L32.3848 36.9036ZM39.0672 52.0738L39.5248 51.8722L39.0672 52.0738ZM39.9823 52.0738L39.5248 51.8722H39.5247L39.9823 52.0738ZM46.6647 36.9036L47.1223 37.1052L47.1223 37.1052L46.6647 36.9036ZM46.9755 36.6272L47.1223 37.1052L47.1223 37.1052L46.9755 36.6272ZM60.7776 32.3866L60.9245 32.8646L60.7776 32.3866ZM60.841 31.455L61.0511 31.0013L60.841 31.455ZM45.3301 24.2688L45.1199 24.7225L45.1199 24.7225L45.3301 24.2688ZM45.076 24.0007L44.6117 24.1863L44.6117 24.1863L45.076 24.0007ZM39.989 11.2741L40.4533 11.0885V11.0885L39.989 11.2741ZM13.8724 0.910643L10.5875 9.35736L11.5195 9.71981L14.8044 1.27309L13.8724 0.910643ZM15.1772 0.910644C14.9457 0.315586 14.1038 0.3156 13.8724 0.910642L14.8044 1.27309C14.7052 1.5281 14.3443 1.52812 14.2452 1.27309L15.1772 0.910644ZM18.462 9.35736L15.1772 0.910643L14.2452 1.27309L17.53 9.71981L18.462 9.35736ZM18.3114 9.19524C18.3804 9.22811 18.4343 9.2861 18.462 9.35737L17.53 9.71981C17.5947 9.88609 17.7204 10.0214 17.8814 10.0981L18.3114 9.19524ZM28.2812 13.9428L18.3114 9.19524L17.8814 10.0981L27.8512 14.8456L28.2812 13.9428ZM28.191 15.2423C28.7971 15.0509 28.855 14.216 28.2812 13.9428L27.8512 14.8456C27.6053 14.7285 27.6302 14.3707 27.8899 14.2887L28.191 15.2423ZM19.2628 18.0617L28.191 15.2423L27.8899 14.2887L18.9617 17.1081L19.2628 18.0617ZM19.4482 17.8938C19.4138 17.9741 19.3461 18.0354 19.2628 18.0617L18.9617 17.1081C18.7673 17.1695 18.6093 17.3126 18.529 17.4999L19.4482 17.8938ZM15.1682 27.8806L19.4482 17.8938L18.529 17.4999L14.249 27.4867L15.1682 27.8806ZM13.8814 27.8806C14.1238 28.4463 14.9257 28.4463 15.1682 27.8806L14.249 27.4867C14.3529 27.2442 14.6966 27.2442 14.8005 27.4867L13.8814 27.8806ZM9.60131 17.8938L13.8814 27.8806L14.8005 27.4867L10.5205 17.4999L9.60131 17.8938ZM9.78672 18.0617C9.70342 18.0354 9.63572 17.9741 9.60131 17.8938L10.5205 17.4999C10.4402 17.3126 10.2822 17.1695 10.0878 17.1081L9.78672 18.0617ZM0.858488 15.2423L9.78672 18.0617L10.0879 17.1081L1.15962 14.2887L0.858488 15.2423ZM0.768327 13.9428C0.194512 14.216 0.25244 15.0509 0.858487 15.2423L1.15962 14.2887C1.41935 14.3707 1.44418 14.7285 1.19826 14.8456L0.768327 13.9428ZM10.7381 9.19524L0.768327 13.9428L1.19826 14.8456L11.1681 10.0981L10.7381 9.19524ZM10.5875 9.35737C10.6152 9.2861 10.6691 9.22811 10.7381 9.19524L11.1681 10.0981C11.3291 10.0214 11.4549 9.88609 11.5195 9.7198L10.5875 9.35737ZM13.9064 39.6089L12.3686 43.5634L13.3006 43.9258L14.8384 39.9714L13.9064 39.6089ZM16.1432 39.6089C15.7465 38.5889 14.3031 38.5888 13.9064 39.6089L14.8384 39.9714C14.9045 39.8014 15.1451 39.8014 15.2112 39.9714L16.1432 39.6089ZM17.6811 43.5634L16.1432 39.6089L15.2112 39.9714L16.7491 43.9258L17.6811 43.5634ZM17.7815 43.6714C17.7354 43.6495 17.6995 43.6109 17.6811 43.5634L16.7491 43.9258C16.8599 44.2109 17.0754 44.4428 17.3515 44.5743L17.7815 43.6714ZM22.7985 46.0605L17.7815 43.6714L17.3515 44.5743L22.3686 46.9634L22.7985 46.0605ZM22.644 48.2883C23.6829 47.9602 23.7822 46.5289 22.7985 46.0605L22.3686 46.9634C22.5325 47.0415 22.516 47.28 22.3428 47.3347L22.644 48.2883ZM18.427 49.6199L22.644 48.2883L22.3428 47.3347L18.1258 48.6664L18.427 49.6199ZM18.3034 49.7319C18.3263 49.6783 18.3714 49.6375 18.427 49.6199L18.1258 48.6664C17.7927 48.7716 17.5219 49.0168 17.3842 49.338L18.3034 49.7319ZM16.1278 54.8082L18.3034 49.7319L17.3842 49.3379L15.2086 54.4143L16.1278 54.8082ZM13.9218 54.8082C14.3374 55.778 15.7122 55.778 16.1278 54.8082L15.2086 54.4143C15.1394 54.5759 14.9103 54.5759 14.841 54.4143L13.9218 54.8082ZM11.7463 49.7319L13.9218 54.8082L14.841 54.4143L12.6654 49.3379L11.7463 49.7319ZM11.6227 49.6199C11.6782 49.6375 11.7233 49.6783 11.7463 49.7319L12.6654 49.338C12.5278 49.0168 12.257 48.7716 11.9238 48.6664L11.6227 49.6199ZM7.40566 48.2883L11.6227 49.6199L11.9238 48.6664L7.70679 47.3347L7.40566 48.2883ZM7.2511 46.0605C6.26742 46.5289 6.36672 47.9602 7.40566 48.2883L7.70679 47.3347C7.53364 47.28 7.51709 47.0415 7.68103 46.9634L7.2511 46.0605ZM12.2682 43.6714L7.2511 46.0605L7.68103 46.9634L12.6981 44.5743L12.2682 43.6714ZM12.3686 43.5634C12.3501 43.6109 12.3142 43.6495 12.2682 43.6714L12.6981 44.5743C12.9742 44.4428 13.1897 44.2109 13.3006 43.9258L12.3686 43.5634ZM34.4378 24.1863L39.5247 11.4597L38.5962 11.0885L33.5092 23.8152L34.4378 24.1863ZM33.9296 24.7225C34.1612 24.6152 34.3431 24.4234 34.4378 24.1863L33.5092 23.8151V23.8152L33.9296 24.7225ZM18.4187 31.9087L33.9296 24.7225L33.5092 23.8152L17.9984 31.0013L18.4187 31.9087ZM18.4187 31.9087L17.9984 31.0013C17.1664 31.3868 17.2486 32.5953 18.125 32.8646L18.4187 31.9087ZM32.2209 36.1493L18.4187 31.9087L18.125 32.8646L31.9272 37.1052L32.2209 36.1493ZM32.8424 36.7021C32.7253 36.4363 32.4985 36.2346 32.2209 36.1493L31.9272 37.1052L31.9272 37.1052L32.8424 36.7021ZM39.5248 51.8722L32.8424 36.7021L31.9272 37.1052L38.6096 52.2753L39.5248 51.8722ZM39.5247 51.8722L39.5248 51.8722L38.6096 52.2753C38.9602 53.0712 40.0893 53.0712 40.4399 52.2753L39.5247 51.8722ZM46.2072 36.7021L39.5248 51.8722L40.4399 52.2753L47.1223 37.1052L46.2072 36.7021ZM46.8286 36.1493C46.551 36.2346 46.3242 36.4363 46.2071 36.7021L47.1223 37.1052L47.1223 37.1052L46.8286 36.1493ZM60.6308 31.9087L46.8286 36.1493L47.1223 37.1052L60.9245 32.8646L60.6308 31.9087ZM60.6308 31.9087L60.9245 32.8646C61.8009 32.5953 61.8831 31.3868 61.0511 31.0013L60.6308 31.9087ZM45.1199 24.7225L60.6308 31.9087L61.0511 31.0013L45.5403 23.8152L45.1199 24.7225ZM44.6117 24.1863C44.7065 24.4233 44.8883 24.6152 45.1199 24.7225L45.5403 23.8152L45.5403 23.8151L44.6117 24.1863ZM39.5248 11.4597L44.6117 24.1863L45.5403 23.8152L40.4533 11.0885L39.5248 11.4597ZM39.5247 11.4597L39.5248 11.4597L40.4533 11.0885C40.1182 10.2501 38.9313 10.2501 38.5962 11.0885L39.5247 11.4597Z"
                      fill="#0085FF"
                    />
                  </svg>
                  <p>Scanning...</p>
                </div>
                ) : (
                  <Results results={results} choice={activeLinterOption} />
                )}
              </>
            ) : activeTab === 'contentReel' ? (
              <>
                {loading ? (
                  <div className={"successContainer"}>
                  <svg
                    className="successGraphic"
                    viewBox="0 0 62 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.0535 9.53859L14.3384 1.09187C14.4045 0.921852 14.645 0.921852 14.7112 1.09187L17.996 9.53859C18.0145 9.58609 18.0504 9.62475 18.0964 9.64667L28.0662 14.3942C28.2302 14.4723 28.2136 14.7108 28.0405 14.7655L19.1122 17.5849C19.0567 17.6025 19.0116 17.6433 18.9886 17.6969L14.7086 27.6836C14.6393 27.8452 14.4102 27.8452 14.3409 27.6836L10.0609 17.6969C10.0379 17.6433 9.99282 17.6025 9.93729 17.5849L1.00905 14.7655C0.835897 14.7108 0.819347 14.4723 0.983294 14.3942L10.9531 9.64667C10.9991 9.62475 11.035 9.58609 11.0535 9.53859ZM12.8346 43.7446L14.3724 39.7902C14.6038 39.1951 15.4458 39.1951 15.6772 39.7902L17.2151 43.7446C17.2797 43.9109 17.4054 44.0462 17.5665 44.1229L22.5836 46.512C23.1574 46.7852 23.0995 47.6201 22.4934 47.8115L18.2764 49.1431C18.0821 49.2045 17.9241 49.3476 17.8438 49.5349L15.6682 54.6113C15.4258 55.177 14.6238 55.177 14.3814 54.6113L12.2058 49.5349C12.1255 49.3476 11.9676 49.2045 11.7732 49.1431L7.55623 47.8115C6.95018 47.6201 6.89225 46.7852 7.46607 46.512L12.4831 44.1229C12.6442 44.0462 12.7699 43.9109 12.8346 43.7446ZM39.0605 11.2741L33.9735 24.0007C33.9261 24.1193 33.8352 24.2152 33.7194 24.2688L18.2086 31.455C17.7926 31.6477 17.8337 32.252 18.2719 32.3866L32.0741 36.6272C32.2128 36.6699 32.3262 36.7707 32.3848 36.9036L39.0672 52.0738C39.2425 52.4717 39.807 52.4717 39.9823 52.0738L46.6647 36.9036C46.7233 36.7707 46.8367 36.6699 46.9755 36.6272L60.7776 32.3866C61.2159 32.252 61.2569 31.6477 60.841 31.455L45.3301 24.2688C45.2143 24.2152 45.1234 24.1193 45.076 24.0007L39.989 11.2741C39.8215 10.8549 39.228 10.8549 39.0605 11.2741Z"
                      fill="#0085FF"
                    />
                    <path
                      d="M14.3384 1.09187L13.8724 0.910642V0.910643L14.3384 1.09187ZM11.0535 9.53859L10.5875 9.35736L10.5875 9.35737L11.0535 9.53859ZM14.7112 1.09187L14.2452 1.27309L14.2452 1.27309L14.7112 1.09187ZM17.996 9.53859L18.462 9.35737L18.462 9.35736L17.996 9.53859ZM18.0964 9.64667L18.3114 9.19524L18.0964 9.64667ZM28.0662 14.3942L27.8512 14.8456L27.8512 14.8456L28.0662 14.3942ZM28.0405 14.7655L28.191 15.2423L28.191 15.2423L28.0405 14.7655ZM19.1122 17.5849L19.2628 18.0617L19.2628 18.0617L19.1122 17.5849ZM18.9886 17.6969L18.529 17.4999L18.9886 17.6969ZM14.7086 27.6836L15.1682 27.8806L14.7086 27.6836ZM14.3409 27.6836L13.8814 27.8806L14.3409 27.6836ZM10.0609 17.6969L10.5205 17.4999L10.0609 17.6969ZM9.93729 17.5849L9.78672 18.0617L9.78672 18.0617L9.93729 17.5849ZM1.00905 14.7655L0.858487 15.2423L0.858488 15.2423L1.00905 14.7655ZM0.983294 14.3942L1.19826 14.8456H1.19826L0.983294 14.3942ZM10.9531 9.64667L11.1681 10.0981L11.1681 10.0981L10.9531 9.64667ZM14.3724 39.7902L13.9064 39.6089L14.3724 39.7902ZM12.8346 43.7446L12.3686 43.5634H12.3686L12.8346 43.7446ZM15.6772 39.7902L16.1432 39.6089H16.1432L15.6772 39.7902ZM17.2151 43.7446L16.7491 43.9258L17.2151 43.7446ZM17.5665 44.1229L17.7815 43.6714V43.6714L17.5665 44.1229ZM22.5836 46.512L22.3686 46.9634H22.3686L22.5836 46.512ZM22.4934 47.8115L22.3428 47.3347L22.4934 47.8115ZM18.2764 49.1431L18.1258 48.6664H18.1258L18.2764 49.1431ZM17.8438 49.5349L18.3034 49.7319L17.8438 49.5349ZM15.6682 54.6113L15.2086 54.4143L15.2086 54.4143L15.6682 54.6113ZM14.3814 54.6113L13.9218 54.8082L14.3814 54.6113ZM12.2058 49.5349L11.7463 49.7319L12.2058 49.5349ZM11.7732 49.1431L11.9238 48.6664H11.9238L11.7732 49.1431ZM7.55623 47.8115L7.70679 47.3347H7.70679L7.55623 47.8115ZM7.46607 46.512L7.68103 46.9634H7.68103L7.46607 46.512ZM12.4831 44.1229L12.2682 43.6714L12.2682 43.6714L12.4831 44.1229ZM33.9735 24.0007L34.4378 24.1863V24.1863L33.9735 24.0007ZM39.0605 11.2741L38.5962 11.0885L38.5962 11.0885L39.0605 11.2741ZM33.7194 24.2688L33.9296 24.7225L33.9296 24.7225L33.7194 24.2688ZM18.2086 31.455L18.4187 31.9087H18.4187L18.2086 31.455ZM18.2719 32.3866L18.125 32.8646L18.2719 32.3866ZM32.0741 36.6272L31.9272 37.1052L31.9272 37.1052L32.0741 36.6272ZM32.3848 36.9036L31.9272 37.1052V37.1052L32.3848 36.9036ZM39.0672 52.0738L39.5248 51.8722L39.0672 52.0738ZM39.9823 52.0738L39.5248 51.8722H39.5247L39.9823 52.0738ZM46.6647 36.9036L47.1223 37.1052L47.1223 37.1052L46.6647 36.9036ZM46.9755 36.6272L47.1223 37.1052L47.1223 37.1052L46.9755 36.6272ZM60.7776 32.3866L60.9245 32.8646L60.7776 32.3866ZM60.841 31.455L61.0511 31.0013L60.841 31.455ZM45.3301 24.2688L45.1199 24.7225L45.1199 24.7225L45.3301 24.2688ZM45.076 24.0007L44.6117 24.1863L44.6117 24.1863L45.076 24.0007ZM39.989 11.2741L40.4533 11.0885V11.0885L39.989 11.2741ZM13.8724 0.910643L10.5875 9.35736L11.5195 9.71981L14.8044 1.27309L13.8724 0.910643ZM15.1772 0.910644C14.9457 0.315586 14.1038 0.3156 13.8724 0.910642L14.8044 1.27309C14.7052 1.5281 14.3443 1.52812 14.2452 1.27309L15.1772 0.910644ZM18.462 9.35736L15.1772 0.910643L14.2452 1.27309L17.53 9.71981L18.462 9.35736ZM18.3114 9.19524C18.3804 9.22811 18.4343 9.2861 18.462 9.35737L17.53 9.71981C17.5947 9.88609 17.7204 10.0214 17.8814 10.0981L18.3114 9.19524ZM28.2812 13.9428L18.3114 9.19524L17.8814 10.0981L27.8512 14.8456L28.2812 13.9428ZM28.191 15.2423C28.7971 15.0509 28.855 14.216 28.2812 13.9428L27.8512 14.8456C27.6053 14.7285 27.6302 14.3707 27.8899 14.2887L28.191 15.2423ZM19.2628 18.0617L28.191 15.2423L27.8899 14.2887L18.9617 17.1081L19.2628 18.0617ZM19.4482 17.8938C19.4138 17.9741 19.3461 18.0354 19.2628 18.0617L18.9617 17.1081C18.7673 17.1695 18.6093 17.3126 18.529 17.4999L19.4482 17.8938ZM15.1682 27.8806L19.4482 17.8938L18.529 17.4999L14.249 27.4867L15.1682 27.8806ZM13.8814 27.8806C14.1238 28.4463 14.9257 28.4463 15.1682 27.8806L14.249 27.4867C14.3529 27.2442 14.6966 27.2442 14.8005 27.4867L13.8814 27.8806ZM9.60131 17.8938L13.8814 27.8806L14.8005 27.4867L10.5205 17.4999L9.60131 17.8938ZM9.78672 18.0617C9.70342 18.0354 9.63572 17.9741 9.60131 17.8938L10.5205 17.4999C10.4402 17.3126 10.2822 17.1695 10.0878 17.1081L9.78672 18.0617ZM0.858488 15.2423L9.78672 18.0617L10.0879 17.1081L1.15962 14.2887L0.858488 15.2423ZM0.768327 13.9428C0.194512 14.216 0.25244 15.0509 0.858487 15.2423L1.15962 14.2887C1.41935 14.3707 1.44418 14.7285 1.19826 14.8456L0.768327 13.9428ZM10.7381 9.19524L0.768327 13.9428L1.19826 14.8456L11.1681 10.0981L10.7381 9.19524ZM10.5875 9.35737C10.6152 9.2861 10.6691 9.22811 10.7381 9.19524L11.1681 10.0981C11.3291 10.0214 11.4549 9.88609 11.5195 9.7198L10.5875 9.35737ZM13.9064 39.6089L12.3686 43.5634L13.3006 43.9258L14.8384 39.9714L13.9064 39.6089ZM16.1432 39.6089C15.7465 38.5889 14.3031 38.5888 13.9064 39.6089L14.8384 39.9714C14.9045 39.8014 15.1451 39.8014 15.2112 39.9714L16.1432 39.6089ZM17.6811 43.5634L16.1432 39.6089L15.2112 39.9714L16.7491 43.9258L17.6811 43.5634ZM17.7815 43.6714C17.7354 43.6495 17.6995 43.6109 17.6811 43.5634L16.7491 43.9258C16.8599 44.2109 17.0754 44.4428 17.3515 44.5743L17.7815 43.6714ZM22.7985 46.0605L17.7815 43.6714L17.3515 44.5743L22.3686 46.9634L22.7985 46.0605ZM22.644 48.2883C23.6829 47.9602 23.7822 46.5289 22.7985 46.0605L22.3686 46.9634C22.5325 47.0415 22.516 47.28 22.3428 47.3347L22.644 48.2883ZM18.427 49.6199L22.644 48.2883L22.3428 47.3347L18.1258 48.6664L18.427 49.6199ZM18.3034 49.7319C18.3263 49.6783 18.3714 49.6375 18.427 49.6199L18.1258 48.6664C17.7927 48.7716 17.5219 49.0168 17.3842 49.338L18.3034 49.7319ZM16.1278 54.8082L18.3034 49.7319L17.3842 49.3379L15.2086 54.4143L16.1278 54.8082ZM13.9218 54.8082C14.3374 55.778 15.7122 55.778 16.1278 54.8082L15.2086 54.4143C15.1394 54.5759 14.9103 54.5759 14.841 54.4143L13.9218 54.8082ZM11.7463 49.7319L13.9218 54.8082L14.841 54.4143L12.6654 49.3379L11.7463 49.7319ZM11.6227 49.6199C11.6782 49.6375 11.7233 49.6783 11.7463 49.7319L12.6654 49.338C12.5278 49.0168 12.257 48.7716 11.9238 48.6664L11.6227 49.6199ZM7.40566 48.2883L11.6227 49.6199L11.9238 48.6664L7.70679 47.3347L7.40566 48.2883ZM7.2511 46.0605C6.26742 46.5289 6.36672 47.9602 7.40566 48.2883L7.70679 47.3347C7.53364 47.28 7.51709 47.0415 7.68103 46.9634L7.2511 46.0605ZM12.2682 43.6714L7.2511 46.0605L7.68103 46.9634L12.6981 44.5743L12.2682 43.6714ZM12.3686 43.5634C12.3501 43.6109 12.3142 43.6495 12.2682 43.6714L12.6981 44.5743C12.9742 44.4428 13.1897 44.2109 13.3006 43.9258L12.3686 43.5634ZM34.4378 24.1863L39.5247 11.4597L38.5962 11.0885L33.5092 23.8152L34.4378 24.1863ZM33.9296 24.7225C34.1612 24.6152 34.3431 24.4234 34.4378 24.1863L33.5092 23.8151V23.8152L33.9296 24.7225ZM18.4187 31.9087L33.9296 24.7225L33.5092 23.8152L17.9984 31.0013L18.4187 31.9087ZM18.4187 31.9087L17.9984 31.0013C17.1664 31.3868 17.2486 32.5953 18.125 32.8646L18.4187 31.9087ZM32.2209 36.1493L18.4187 31.9087L18.125 32.8646L31.9272 37.1052L32.2209 36.1493ZM32.8424 36.7021C32.7253 36.4363 32.4985 36.2346 32.2209 36.1493L31.9272 37.1052L31.9272 37.1052L32.8424 36.7021ZM39.5248 51.8722L32.8424 36.7021L31.9272 37.1052L38.6096 52.2753L39.5248 51.8722ZM39.5247 51.8722L39.5248 51.8722L38.6096 52.2753C38.9602 53.0712 40.0893 53.0712 40.4399 52.2753L39.5247 51.8722ZM46.2072 36.7021L39.5248 51.8722L40.4399 52.2753L47.1223 37.1052L46.2072 36.7021ZM46.8286 36.1493C46.551 36.2346 46.3242 36.4363 46.2071 36.7021L47.1223 37.1052L47.1223 37.1052L46.8286 36.1493ZM60.6308 31.9087L46.8286 36.1493L47.1223 37.1052L60.9245 32.8646L60.6308 31.9087ZM60.6308 31.9087L60.9245 32.8646C61.8009 32.5953 61.8831 31.3868 61.0511 31.0013L60.6308 31.9087ZM45.1199 24.7225L60.6308 31.9087L61.0511 31.0013L45.5403 23.8152L45.1199 24.7225ZM44.6117 24.1863C44.7065 24.4233 44.8883 24.6152 45.1199 24.7225L45.5403 23.8152L45.5403 23.8151L44.6117 24.1863ZM39.5248 11.4597L44.6117 24.1863L45.5403 23.8152L40.4533 11.0885L39.5248 11.4597ZM39.5247 11.4597L39.5248 11.4597L40.4533 11.0885C40.1182 10.2501 38.9313 10.2501 38.5962 11.0885L39.5247 11.4597Z"
                      fill="#0085FF"
                    />
                  </svg>
                  <p>Scanning text and images...</p>
                </div>
                ) : (
                  <ContentReel results={results} />
                )}
              </>
            ) : activeTab === 'stickyNote' ? (
              <StickyNote />
            ) : null}
          </div>
        </>
    //   )}
    // </div>
  );
}

export default App;
