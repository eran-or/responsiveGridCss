import React from 'react';
import './App.css';

import withGoogleApiContext from './modules/googleApi/withGoogleApiContext'
import MissionsGrid from './modules/misson/MissionsGrid'

const MissionsGridWithGoogleApi = withGoogleApiContext(MissionsGrid)

function App() {
  
  return (
    <div className="App">
      <MissionsGridWithGoogleApi />
    </div>
  );
}

export default App;
