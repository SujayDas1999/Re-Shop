import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import agent from "../../app/api/agent";

function AboutPage() {
  const [validationError, setValidationError] = useState<string[]>([]);

  function getValidationError() {
    agent.TestErrors.getValidationError()
      .then(() => console.log("should not see this"))
      .catch((err) => setValidationError(err));
  }

  return (
    <>
      <Container>
        <Typography gutterBottom variant="h2">
          {" "}
          Errors for testing purposes
        </Typography>
        <ButtonGroup fullWidth>
          <Button
            variant="contained"
            onClick={() =>
              agent.TestErrors.get404Error().catch((err) => console.log(err))
            }
          >
            Test 404 Error
          </Button>
          <Button
            variant="contained"
            onClick={() => agent.TestErrors.get401Error()}
          >
            Test 401 Error
          </Button>
          <Button
            variant="contained"
            onClick={() => agent.TestErrors.get400Error()}
          >
            Test 400 Error
          </Button>
          <Button
            variant="contained"
            onClick={() => agent.TestErrors.get500Error()}
          >
            Test 400 Error
          </Button>
          <Button
            variant="contained"
            onClick={() => agent.TestErrors.getValidationError()}
          >
            Test 400 Error
          </Button>
        </ButtonGroup>
      </Container>
    </>
  );
}

export default AboutPage;
