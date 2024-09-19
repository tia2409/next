import React from 'react';
import styles from './index.module.css';

export default function Sidebar({ isOpen }) {
  return (
    <div
      className={`${styles.sidebar} w-[300px] h-[calc(100vh-72px)] px-[10px] py-[20px] bg-[#121212] ${isOpen ? styles.sidebarEnter : styles.sidebarExit}`}
    >
      test1
    </div>
  );
}
