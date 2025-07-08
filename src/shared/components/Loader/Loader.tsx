import React from "react";
import styles from "./Loader.module.scss";

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill}></div>
      </div>
      <div className={styles.loaderText}>Создаём приглашение...</div>
  </div>
);
};

export default Loader;
