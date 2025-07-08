import React from "react";
import styles from "./NeonBorder.module.scss";

interface NeonBorderProps {
  children: React.ReactNode;
  className?: string;
}

const NeonBorder: React.FC<NeonBorderProps> = ({ children, className }) => {
  return (
    <div className={`${styles.neonBorder} ${className || ""}`}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default NeonBorder;
 