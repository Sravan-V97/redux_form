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
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

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

const validationSchema = yup.object({
  userName: yup.string("Enter a name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNumber: yup
    .number("Enter your phone number")
    .min(10, "Phone Number should be of minimum 10 numbers")
    .required("Phone number is required"),
  address: yup.string("Enter your address").required("Address is required"),
});

function Form() {
  const classes = useStyles();
  const [values, setValues] = React.useState({});

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      address: "",
    },
    validationSchema: validationSchema,
  });

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (Object.keys(values).length === 0) {
      return;
    } else {
      dispatch({ type: "inputChange", payload: values });
      console.log(values);
    }
  }, [values]);

  const updatedValues = useSelector((state) => state.formValues);
  console.log(updatedValues);

  const submitForm = (e) => {
    // e.preventDefault();
    formik.handleSubmit();
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
                      value={(values.uname, formik.values.userName)}
                      onInput={handleInputChange}
                      onChange={formik.handleChange}
                      autoFocus
                      error={
                        formik.touched.userName &&
                        Boolean(formik.errors.userName)
                      }
                      helperText={
                        formik.touched.userName && formik.errors.userName
                      }
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
                      value={(values.uname, formik.values.email)}
                      onInput={handleInputChange}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
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
                      value={(values.uname, formik.values.phoneNumber)}
                      onInput={handleInputChange}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.phoneNumber &&
                        Boolean(formik.errors.phoneNumber)
                      }
                      helperText={
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                      }
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
                      value={(values.uname, formik.values.address)}
                      onInput={handleInputChange}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.address && Boolean(formik.errors.address)
                      }
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
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
                    // onClick={formik.handleSubmit}
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
                  <TableCell align="right">{updatedValues?.userName}</TableCell>
                </StyledTableRow>
                <TableRow>
                  <TableCell>Email Id</TableCell>
                  <TableCell align="right">{updatedValues?.email}</TableCell>
                </TableRow>
                <StyledTableRow>
                  <TableCell>Phone Number</TableCell>
                  <TableCell align="right">
                    {updatedValues?.phoneNumber}
                  </TableCell>
                </StyledTableRow>
                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell align="right">{updatedValues?.address}</TableCell>
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
