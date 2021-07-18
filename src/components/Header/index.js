import React from "react";
import styles from "./header.module.css";

const Header = (props) => {
    return (
        <div className={styles.header}>
            <p>Weather Report Application</p>
        </div>
    )

}

export default Header;