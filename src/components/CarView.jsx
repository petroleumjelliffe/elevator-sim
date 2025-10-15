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
    // Create 2-column button layout: lowest floors at bottom, ascending left to right, bottom to top
    const buttonRows = [];
    for (let i = 0; i < floors; i += 2) {
      buttonRows.push([i, i + 1 < floors ? i + 1 : null]);
    }
    buttonRows.reverse(); // Bottom to top

    return (
      <div className="car-view">
        <div className="current-floor-display">{visibleFloor}</div>

        <div className="car-interior-layout">
          <div className="door-preview">
            {visibleFloor == 0 ? "Lobby" : `${visibleFloor.toOrdinal()} Floor` }
            <div className="door left" ref={doorLeftRef}></div>
            <div className="door right" ref={doorRightRef}></div>
          </div>

          <div className="panel">
            {buttonRows.map((row, rowIdx) => (
              <div key={rowIdx} className="panel-row">
                {row.map((floorNum) =>
                  floorNum !== null ? (
                    <button
                      key={floorNum}
                      className={`floor-btn ${queue.includes(floorNum) ? "active" : ""}`}
                      onClick={() => handleCall(floorNum)}
                    >
                      {(floorNum.toInitial())}
                    </button>
                  ) : (
                    <div key="empty" className="floor-btn-spacer"></div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
    }