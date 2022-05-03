import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import React from "react";
import { NavLink } from "react-router-dom";

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

function Header() {
  return (
    <AppBar position="sticky" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            component={NavLink}
            to={"/"}
            exact
            variant="h6"
            sx={navStyles}
          >
            Re-Shop
          </Typography>
        </Box>

        <List sx={{ display: "flex" }}>
          {midLinks.map((item) => (
            <ListItem
              sx={navStyles}
              component={NavLink}
              to={item.path}
              key={item.path}
            >
              {item.title?.toUpperCase()}
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton size="large" sx={navStyles}>
            <Badge badgeContent={4} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightLinks.map((item) => (
              <ListItem
                sx={navStyles}
                component={NavLink}
                to={item.path}
                key={item.path}
              >
                {item.title?.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
