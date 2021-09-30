import React from "react";
import classes from './index.module.css';
export default header => {
    return(
        <nav className={classes.navbar}>
          <div className={classes.navbarHeader}>
            <a className={classes.navbarBrand} href="#">WebSiteName</a>
          </div>
      </nav>
    );
}
