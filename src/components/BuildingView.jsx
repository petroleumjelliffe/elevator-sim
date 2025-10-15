import React from "react";
export  function BuildingView({
    floors,
    visibleFloor,
    floorCalls,
    handleCall,
}) {
    return (
      <div className="building-view">
        {[...Array(floors)].map((_, i) => {
          const floorNum = floors - 1 - i;
          return (
            <div className="floor" key={floorNum}>
              <div className="floor-label">{floorNum == 0 ? "Lobby" : `${floorNum} Floor` }</div>
              <div className="current-floor">{visibleFloor} </div>
              <button
                className={`call-btn ${
                  floorCalls[floorNum] ? "active" : ""
                }`}
                onClick={() => handleCall(floorNum)}
              >
                Call
              </button>
            </div>);
        })}
      </div>
    )};
