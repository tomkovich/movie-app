import React from "react";

import styles from "../styles/Home.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <span>Created by </span>
        <a
          href="https://www.youtube.com/c/Tomkovich"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tomkovich
        </a>
      </div>
    </footer>
  );
};

export default Footer;
