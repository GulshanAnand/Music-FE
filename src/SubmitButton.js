import React from 'react';

const SubmitButton = ({ onSearch }) => {
  return (
    <button
      onClick={onSearch}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
      }}
    >
      Search
    </button>
  );
};

export default SubmitButton;
