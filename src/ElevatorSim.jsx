import React, { useState, useRef, useEffect } from "react";
import "./ElevatorSim.css";
// import BuildingView from "./components/BuildingView";
import { BuildingView } from "./components/BuildingView.jsx";
import {ShaftView} from "./components/ShaftView.jsx";
import { CarView } from "./components/CarView.jsx";


const FLOORS = 5;
const FLOOR_HEIGHT = 120; // px per floor
const MOVE_SPEED = 0.4; // px per frame (~24fps → ~48px/sec)
const DOOR_TIME = 1200; // ms door open duration

export default function ElevatorSim() {
  const [currentFloor, setCurrentFloor] = useState(0);
  const [targetFloor, setTargetFloor] = useState(0);
  const [doorOpen, setDoorOpen] = useState(false);
  const [queue, setQueue] = useState([]);
  const [floorCalls, setFloorCalls] = useState(Array(FLOORS).fill(false));
  const [visibleFloor, setVisibleFloor] = useState(0);


  const carRef = useRef(null);
  const doorLeftRef = useRef(null);
  const doorRightRef = useRef(null);
  const posRef = useRef(currentFloor * FLOOR_HEIGHT+23);
  const animRef = useRef(null);

  // 🎮 Handle floor call
  const handleCall = (floor) => {
    if (!queue.includes(floor) && floor !== currentFloor) {
      setQueue((q) => [...q, floor]);
      setFloorCalls((calls) => {
        const updated = [...calls];
        updated[floor] = true;
        return updated;
      });
    }
  };

  // 🧠 Movement loop
  useEffect(() => {
    const animate = () => {
      const car = carRef.current;
      if (!car) return;

      const targetPos = targetFloor * FLOOR_HEIGHT;
      const currentPos = posRef.current;

      const diff = targetPos - currentPos;
      const currentFloorIndex = Math.floor((posRef.current + 1) / FLOOR_HEIGHT);
      setVisibleFloor(currentFloorIndex); // state for indicator

      if (Math.abs(diff) < 1) {
        // Arrived
        posRef.current = targetPos;
        car.style.transform = `translateY(-${targetPos + 23}px)`;
        cancelAnimationFrame(animRef.current);

        // Handle arrival
        setCurrentFloor(targetFloor);
        setFloorCalls((calls) => {
          const updated = [...calls];
          updated[targetFloor] = false;
          return updated;
        });

        // Open doors briefly
        openDoors();
        return;
      }

      // Step towards target
      const step = Math.sign(diff) * MOVE_SPEED;
      posRef.current += step;
      car.style.transform = `translateY(-${posRef.current+ 23}px)`;

      animRef.current = requestAnimationFrame(animate);
    };

    if (!doorOpen && targetFloor !== currentFloor) {
      cancelAnimationFrame(animRef.current);
      animRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animRef.current);
  }, [targetFloor, doorOpen, currentFloor]);

  // 🚪 Door control
  const openDoors = () => {
    const left = doorLeftRef.current;
    const right = doorRightRef.current;
    if (!left || !right) return;

    setDoorOpen(true);
    left.style.transform = "translateX(-100%)";
    right.style.transform = "translateX(100%)";

    setTimeout(() => {
      left.style.transform = "translateX(0)";
      right.style.transform = "translateX(0)";
      setDoorOpen(false);

      // Move to next queued floor
      setQueue((q) => {
        const next = q.slice(1);
        if (next[0] != null) setTargetFloor(next[0]);
        return next;
      });
    }, DOOR_TIME);
  };

  // When queue updates and we’re idle, pick next target
  useEffect(() => {
    if (queue.length && targetFloor === currentFloor && !doorOpen) {
      setTargetFloor(queue[0]);
    }
  }, [queue, currentFloor, targetFloor, doorOpen]);

  return (
    <div className="sim-root">

      < BuildingView floors={FLOORS} visibleFloor={visibleFloor} floorCalls={floorCalls} handleCall={handleCall} />
      
      < ShaftView carRef={carRef} doorLeftRef={doorLeftRef} doorRightRef={doorRightRef} />

      < CarView floors={FLOORS} visibleFloor={visibleFloor} floorCalls={floorCalls} handleCall={handleCall} doorLeftRef={doorLeftRef} doorRightRef={doorRightRef} queue={queue} />
    </div>
  );
}
