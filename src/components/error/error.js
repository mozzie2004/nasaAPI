import React from 'react';

const Error = ({ message }) => {
  return (
    <>
      <div>something went wrong</div>
      <div>Error: {message}</div>
    </>
  );
};

export default Error;
