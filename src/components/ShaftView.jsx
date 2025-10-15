import React from "react";
export  function ShaftView({
    carRef,
    doorLeftRef,
    doorRightRef,
}) {
    return (
    <div className="shaft">
                <div className="car" ref={carRef}>
                  <div className="car-interior">
                    <div className="doors">
                      <div className="door left" ref={doorLeftRef}></div>
                      <div className="door right" ref={doorRightRef}></div>
                    </div>
                  </div>
                </div>
              </div>
    )};