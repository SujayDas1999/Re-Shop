import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
import React from "react";

function Header() {
  return (
    <AppBar position="sticky" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">Re-Shop</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
