import React from "react";
import Typography from "@material-ui/core/Typography";
import { Container, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%"
    },
    margin: "auto",
    width: "40%",
    "& .MuiButton-root": {
      margin: 'auto',
      display: 'block'
    },
  },
  root: {
    marginTop: "10%"
  }
}));

export default function Home(params) {
  const classes = useStyles();
  const [formState, setFormState] = React.useState({
    username: "",
    email: "",
    password: ""
  });
  const handleChange = event => {
    const { name, value } = event.target;

    setFormState(prevState => ({ ...prevState, [name]: value }));
  };
  const { email, username, password } = formState;

  return (
    <Container className={classes.root} fixed>
      <Typography variant="h3" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <div>
          <TextField
            id="filled-email"
            label="Email"
            value={email}
            onChange={handleChange}
            variant="filled"
            name="email"
          />
        </div>
        <div>
          <TextField
            id="filled-username"
            label="Username"
            value={username}
            onChange={handleChange}
            variant="filled"
            name="username"
          />
        </div>
        <div>
          <TextField
            id="filled-password"
            label="Password"
            value={password}
            onChange={handleChange}
            variant="filled"
            name="password"
          />
        </div>
        <div>
          <Button color="primary" variant="contained" size="large">
            Register
          </Button>
        </div>
      </form>
    </Container>
  );
}
