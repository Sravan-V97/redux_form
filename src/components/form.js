import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import React from "react";
import store from "./store";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: { flexDirection: "row" },
  paper: {
    height: "100vh",
    backgroundColor: "#ffffff",
    padding: "0 3rem 0 3rem;",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: "#1c5be8",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  heading: { paddingTop: "0.5rem" },
  table: { marginTop: "2rem" },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#1c5be8",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 20,
  },
}))(TableCell);

function Form() {
  const classes = useStyles();
  const [values, setValues] = React.useState({});

  const [data, setData] = React.useState({
    savedValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      address: "",
    },
  });

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value }, () => {});
  };

  React.useEffect(() => {
    store.dispatch({ type: "inputChange", payload: values });

    let currentValue = store.getState();
    if (currentValue && currentValue.length) {
      setData({
        ...data,
        savedValues: currentValue[currentValue.length - 1].formValues,
      });
      console.log(data);
    }
  }, [values]);

  const submitForm = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Grid container direction="column">
              <Avatar className={classes.avatar}>
                <AccountCircle />
              </Avatar>
              <Typography variant="h5" className={classes.heading}>
                Sign up
              </Typography>

              <form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="uname"
                      name="userName"
                      variant="outlined"
                      fullWidth
                      id="userName"
                      label="User Name"
                      value={values.uname}
                      onInput={handleInputChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="email"
                      label="Email Id"
                      name="email"
                      autoComplete="email"
                      value={values.email}
                      onInput={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="phoneNumber"
                      label="Phone Number"
                      type="number"
                      id="phoneNumber"
                      autoComplete="phone-number"
                      value={values.phone}
                      onInput={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      multiline
                      name="address"
                      label="Address"
                      id="address"
                      autoComplete="address"
                      value={values.address}
                      onInput={handleInputChange}
                    />
                  </Grid>
                </Grid>
                <Link to="/data" style={{ textDecoration: "none" }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onSubmit={submitForm}
                  >
                    Sign Up
                  </Button>
                </Link>
              </form>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <StyledTableCell>User Input</StyledTableCell>
                <StyledTableCell align="right">Details Entered</StyledTableCell>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell align="right">
                    {data.savedValues.userName}
                  </TableCell>
                </StyledTableRow>
                <TableRow>
                  <TableCell>Email Id</TableCell>
                  <TableCell align="right">{data.savedValues.email}</TableCell>
                </TableRow>
                <StyledTableRow>
                  <TableCell>Phone Number</TableCell>
                  <TableCell align="right">
                    {data.savedValues.phoneNumber}
                  </TableCell>
                </StyledTableRow>
                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell align="right">
                    {data.savedValues.address}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Form;
