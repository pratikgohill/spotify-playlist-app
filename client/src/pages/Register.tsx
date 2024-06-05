import React, { useState } from "react";
import { TextField, Button, Link, Snackbar, IconButton } from "@mui/material";
import { register } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password);
      navigate("/login");
    } catch (error: any) {
      setOpen(true);
      setErrorMessage(error.response.data.message);
      console.error(error);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
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
        Register
      </Button>
      <br />
      <Link
        component="button"
        variant="body2"
        onClick={() => navigate("/login")}
      >
        Login
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

export default Register;
