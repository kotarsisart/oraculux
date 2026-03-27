import { useRef } from "react";

/**
 * Manages portal-like rotation animation with multiple phases:
 * idle → acceleration → constant spin → reverse stop
 */
export function usePortalAnimation() {
  // Persistent rotation state (avoids re-renders)
  const rotation = useRef(0);

  // Separate RAF ids for precise control over animation phases
  const idleFrame = useRef<number | null>(null);
  const forwardFrame = useRef<number | null>(null);
  const reverseFrame = useRef<number | null>(null);

  /**
   * Starts slow continuous rotation (idle state)
   */
  const startIdleRotation = (img: HTMLImageElement) => {
    function animate() {
      rotation.current += 0.3;
      img.style.transform = `rotate(${rotation.current}deg)`;
      idleFrame.current = requestAnimationFrame(animate);
    }
    idleFrame.current = requestAnimationFrame(animate);
  };

  /**
   * Starts slow continuous rotation (idle state)
   */
  const accelerate = (
    img: HTMLImageElement,
    maxSpeed: number,
    duration: number,
    cb?: () => void
  ) => {
    // Stop idle animation before accelerating
    if (idleFrame.current !== null) cancelAnimationFrame(idleFrame.current);

    let start: number | null = null;
    const idleSpeed = 0.3;
    let currentSpeed = idleSpeed;

    function anim(ts: number) {
      if (start === null) start = ts;

      // Normalized progress (0 → 1)
      const progress = Math.min((ts - start) / duration, 1);

      // Linear interpolation between idle and max speed
      currentSpeed = idleSpeed + (maxSpeed - idleSpeed) * progress;
      rotation.current += currentSpeed;
      img.style.transform = `rotate(${rotation.current}deg)`;

      if (progress < 1) {
        forwardFrame.current = requestAnimationFrame(anim);
      } else {
        //  Switch to constant spin phase
        keepSpinning(img, maxSpeed);
        cb?.();
      }
    }

    forwardFrame.current = requestAnimationFrame(anim);
  };

  /**
   * Maintains constant rotation speed
   */
  const keepSpinning = (img: HTMLImageElement, speed: number) => {
    function anim() {
      rotation.current += speed;
      img.style.transform = `rotate(${rotation.current}deg)`;
      forwardFrame.current = requestAnimationFrame(anim);
    }
    forwardFrame.current = requestAnimationFrame(anim);
  };

  /**
   * Gradually reverses and slows down rotation to stop
   */
  const reverseAndStop = (img: HTMLImageElement, duration = 2000) => {
    // Stop forward spinning before reversing
    if (forwardFrame.current !== null) cancelAnimationFrame(forwardFrame.current);

    let start: number | null = null;
    const startSpeed = 5;

    function anim(ts: number) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);

      // Stop forward spinning before reversing
      const speed = startSpeed * (1 - progress);

      rotation.current -= speed;
      img.style.transform = `rotate(${rotation.current}deg)`;

      if (progress < 1) {
        reverseFrame.current = requestAnimationFrame(anim);
      }
    }

    reverseFrame.current = requestAnimationFrame(anim);
  };

  return {
    startIdleRotation,
    accelerate,
    reverseAndStop,
  };
}
