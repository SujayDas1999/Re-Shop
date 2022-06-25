import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../app/api/agent";

function AboutPage() {
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
