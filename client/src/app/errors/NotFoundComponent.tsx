import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./notfound.css";

function NotFoundComponent() {
  return (
    <div id="error-page">
      <div className="content">
        <h2 className="header" data-text="404">
          404
        </h2>
        <h4 data-text="Opps! Page not found">Opps! Page not found</h4>
        <p>
          Sorry, the page you're looking for doesn't exist. If you think
          something is broken, report a problem.
        </p>
        <Button component={Link} to={"/catalog"}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}

export default NotFoundComponent;
