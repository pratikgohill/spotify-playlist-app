import React, { useState } from "react";
import { login } from "../services/authServices";
import { Button, IconButton, Link, Snackbar, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      //   navigate("/", { replace: true });
      window.location.href = "/";
    } catch (error: any) {
      setOpen(true);
      setErrorMessage(error.response.data.message);
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        {errorMessage}
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="username"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
      <br />
      <Link
        component="button"
        variant="body2"
        onClick={() => navigate("/register")}
      >
        Create An Account
      </Link>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Error"
        action={action}
      />
    </form>
  );
};

export default Login;
