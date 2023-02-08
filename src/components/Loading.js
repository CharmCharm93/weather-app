import React from "react";

function Loading({ loading, errorMsg, weatherInfo }) {
  return (
    <>
      {loading ? (
        <div className="mainDisplay">Loading...</div>
      ) : (
        <>
          {errorMsg ? (
            <div className="errorMsg">{errorMsg}</div>
          ) : (
            <div className="mainDisplay">{weatherInfo}</div>
          )}
        </>
      )}
    </>
  );
}

export default Loading;
