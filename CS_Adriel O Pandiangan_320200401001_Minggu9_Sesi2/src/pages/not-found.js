import React from "react";
import styles from './style.module.css'

// Modifikasi halaman berikut untuk menjadi halaman 404 yang menarik!
const NotFound = () => {
  return (
    <>
      <div className={styles.error}>404</div>
      <br />
      <br />
      <span className={styles.info}>File not found</span>
      <img
        src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif"
        className={styles.static}
      />
    </>
  );
};

export default NotFound;
