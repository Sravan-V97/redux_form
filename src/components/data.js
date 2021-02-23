import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  paper: {
    height: "100vh",
    backgroundColor: "#ffffff",
    padding: "0 3rem 0 3rem;",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
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

function DataDisplay() {
  const classes = useStyles();

  // const [data, setData] = React.useState({
  //   savedValues: {
  //     userName: "",
  //     email: "",
  //     phoneNumber: "",
  //     address: "",
  //   },
  // });

  // React.useEffect(() => {
  //   let currentValue = store.getState();
  //   if (currentValue && currentValue.length) {
  //     setData({
  //       ...data,
  //       savedValues: currentValue[currentValue.length - 1].formValues,
  //     });
  //     console.log(data);
  //   }
  // }, []);

  const updatedValues = useSelector((state) => state.formValues);

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">User</StyledTableCell>
              <StyledTableCell align="left">Details</StyledTableCell>
            </TableRow>
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
              <TableCell align="right">{updatedValues?.phoneNumber}</TableCell>
            </StyledTableRow>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell align="right">{updatedValues?.address}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
}

export default DataDisplay;
