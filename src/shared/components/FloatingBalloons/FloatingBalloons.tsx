import React, { useRef } from "react";
import styles from "./FloatingBalloons.module.scss";

const BALLOON_COUNT = 8;
const COLORS = [
  "#00fff7",
  "#ff00e6",
  "#ffe600",
  "#00ff85",
  "#ff0055",
  "#00aaff",
];

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

interface FloatingBalloonsProps {
  paused?: boolean;
}

// Тип для параметров одного шара
interface BalloonParams {
  side: "left" | "right";
  color: string;
  left: number;
  size: number;
  duration: number;
  stringLength: number;
  svgWidth: number;
  svgHeight: number;
  c1x: number;
  c1y: number;
  c2x: number;
  c2y: number;
  endX: number;
  endY: number;
}

const FloatingBalloons: React.FC<FloatingBalloonsProps> = ({ paused }) => {
  // Генерируем параметры только один раз
  const balloonsRef = useRef<BalloonParams[]>(
    Array.from({ length: BALLOON_COUNT }).map((_, i) => {
      const side = i % 2 === 0 ? "left" : "right";
      const color = COLORS[i % COLORS.length];
      const left = side === "left" ? random(0, 20) : random(80, 100);
      const size = random(32, 60);
      const duration = random(10, 20);
      const stringLength = size * 1.8;
      const svgWidth = 12;
      const svgHeight = stringLength + 10;
      const c1x = svgWidth / 2 + random(-4, 4);
      const c1y = svgHeight * 0.3 + random(-10, 10);
      const c2x = svgWidth / 2 + random(-4, 4);
      const c2y = svgHeight * 0.6 + random(-10, 10);
      const endX = svgWidth / 2 + random(-6, 6);
      const endY = svgHeight;
      return {
        side,
        color,
        left,
        size,
        duration,
        stringLength,
        svgWidth,
        svgHeight,
        c1x,
        c1y,
        c2x,
        c2y,
        endX,
        endY,
      };
    })
  );
  const balloons = balloonsRef.current;

  if (paused)
    return (
      <div className={styles.balloons} style={{ pointerEvents: "none" }} />
    );
  return (
    <div className={styles.balloons}>
      {balloons.map((params, i) => (
        <div
          key={i}
          className={styles.balloon}
          style={{
            left: `${params.left}%`,
            width: `${params.size}px`,
            height: `${params.size * 1.3}px`,
            background: params.color,
            filter: `drop-shadow(0 0 16px ${params.color}) drop-shadow(0 0 32px ${params.color})`,
            opacity: 0.7,
            animationDuration: `${params.duration}s`,
          }}
          data-side={params.side}
        >
          <svg
            className={styles.string}
            width={params.svgWidth}
            height={params.svgHeight}
            style={{
              position: "absolute",
              left: "50%",
              top: "100%",
              transform: "translateX(-50%)",
              pointerEvents: "none",
              zIndex: 2,
            }}
            viewBox={`0 0 ${params.svgWidth} ${params.svgHeight}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={`M${params.svgWidth / 2},0 C${params.c1x},${params.c1y} ${
                params.c2x
              },${params.c2y} ${params.endX},${params.endY}`}
              stroke="#fff"
              strokeWidth="2"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingBalloons;
