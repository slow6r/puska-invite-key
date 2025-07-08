import React, { useMemo } from "react";
import styles from "./NeonParticles.module.scss";

const NeonParticles: React.FC = () => {
  const particles = useMemo(() => {
    return [...Array(20)].map((_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
    }));
  }, []);

  return (
    <div className={styles.particlesContainer}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={styles.particle}
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration,
          }}
        />
      ))}
    </div>
  );
};

export default NeonParticles;
