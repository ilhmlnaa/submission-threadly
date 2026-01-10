import React from 'react';
import LoadingBar from '@dimasmds/react-redux-loading-bar';

function Loading() {
  return (
    <div className="loading">
      <LoadingBar style={{ backgroundColor: '#3b82f6', height: '3px' }} />
    </div>
  );
}

export default Loading;
