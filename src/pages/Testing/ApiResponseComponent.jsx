import React, { useState, useEffect } from 'react';

const ApiResponseComponent = () => {
  const [apiResponseString, setApiResponseString] = useState('');

  useEffect(() => {
    // Simulate fetching API response
    const fetchedApiResponse = "CheckInTime-Begin:12:30PM|CheckInTime-End:midnight|CheckOutTime:12:00PM|CheckInInstructions:<ul><li>Extra-personchargesmayapplyandvarydependingonpropertypolicy</li><li>Government-issuedphotoidentificationandacreditcard,debitcard,orcashdepositmayberequiredatcheck-inforincidentalcharges</li><li>Specialrequestsaresubjecttoavailabilityuponcheck-inandmayincuradditionalcharges;specialrequestscannotbeguaranteed</li><li>Thispropertyacceptscreditcards,debitcards,andcash</li><li>Safetyfeaturesatthispropertyincludeafireextinguisher,asmokedetector,andafirstaidkit</li>";

    // Split the string using the pipe (|) as a delimiter
    const parts = fetchedApiResponse.split('|');

    // Create an HTML string by mapping each part
    const htmlString = parts.map(part => {
      const [key, value] = part.split(':');
      if (key === 'CheckInInstructions') {
        // For the CheckInInstructions key, parse the existing HTML content
        return (
          <div key={key}>
            <p>
              <strong>{key}:</strong>
            </p>
            <div dangerouslySetInnerHTML={{ __html: value }} />
          </div>
        );
      } else {
        // For other keys, create simple key-value pairs
        return (
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        );
      }
    });

    // Set the HTML string to state
    setApiResponseString(htmlString);
  }, []);  

  return (
    <div>
      <h1>API Response Display</h1>
      {apiResponseString}
    </div>
  );
};

export default ApiResponseComponent;
