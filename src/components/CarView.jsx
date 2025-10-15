import React from "react";
export function CarView({
    floors,
    visibleFloor,
    floorCalls,
    handleCall,
    doorLeftRef,
    doorRightRef,
    queue,
}) {
    return (

      <div className="car-view">
        <h3>Inside Car</h3>
            <div className="current-floor">{visibleFloor} </div>

        <div className="panel">
          {[...Array(floors)].map((_, i) => (
            <button
              key={i}
              className={`floor-btn ${
                queue.includes(i) ? "active" : ""
              }`}
              onClick={() => handleCall(i)}
            >
              {i}
            </button>
          ))}
        </div>
        <div className="indicator"> 
          Current Floor: {visibleFloor}</div>
        <div className="door-preview">
          <div className="door left" ref={doorLeftRef}></div>
          <div className="door right" ref={doorRightRef}></div>
        </div>
      </div>
    );
    }