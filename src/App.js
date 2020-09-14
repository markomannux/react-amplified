import React from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

function App() {
  const [message, setMessage] = React.useState("");
  const [apiData, setApiData] = React.useState("")

  const handleClick = async () => {
    const data = await API.get("echoapi", "/echo", {
      queryStringParameters: {
        message
      }
    });
    setApiData(data.success);
  };

  return (
    <div className="App">
      <header className="App-header">
       <p>Welcome! My favorite quote is: {apiData}</p>
        <input type="text" value={message} onChange={event => setMessage(event.target.value)} />
        <button onClick={handleClick}>Click me!</button>
        <AmplifySignOut />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
