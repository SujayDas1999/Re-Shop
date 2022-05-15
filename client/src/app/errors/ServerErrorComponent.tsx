import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

function ServerErrorComponent() {
  const history = useHistory();
  const { state } = useLocation<any>();
  return (
    <>
      <Container component={Paper}>
        {state?.error ? (
          <>
            <Typography variant="h5" gutterBottom>
              Server Error
            </Typography>
            <Divider />
            <Typography color={"red"}>
              {state.error.detail || "internal server error"}
            </Typography>
          </>
        ) : (
          <Typography variant="h5" gutterBottom>
            Server Error
          </Typography>
        )}
        <Button onClick={() => history.push("/catalog")}>
          Go back to the store
        </Button>
      </Container>
    </>
  );
}

export default ServerErrorComponent;
