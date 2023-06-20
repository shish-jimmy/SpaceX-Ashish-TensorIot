import React from "react";
import { AppBar, Toolbar, makeStyles, Container } from "@material-ui/core";

//logo
import logo from "../assets/Images/logo.png";

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: 60,
    marginBottom: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "transparent",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
  },
  logoImage: {
    maxWidth: "200px",
    maxHeight: "auto",
    objectFit: "contain",
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Container>
        <Toolbar>
          <div className={classes.logo}>
            <img src={logo} alt="SpaceX Logo" className={classes.logoImage} />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
