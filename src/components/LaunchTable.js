import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { formatDate, getStatusStyle } from "../helpers/helpers";
import loader from "../assets/Images/circle-loading.gif";
import ModalComponent from "./ModalComponent";

const LaunchTable = ({
  loading,
  error,
  launches,
  currentpageItem,
  classes,
}) => {
  const [open, setOpen] = useState(false);
  const [launch, setLaunch] = useState("");

  return (
    <React.Fragment>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table stickyHeader>
          <TableHead className={classes.tableHead}>
            <TableRow className={classes.tableRow}>
              <TableCell className={classes.tableCell}>No.</TableCell>
              <TableCell className={classes.tableCell}>Launch Date</TableCell>
              <TableCell className={classes.tableCell}>Location</TableCell>
              <TableCell className={classes.tableCell}>Mission Name</TableCell>
              <TableCell className={classes.tableCell}>Orbit</TableCell>
              <TableCell className={classes.tableCell}>Launch Status</TableCell>
              <TableCell className={classes.tableCell}>Rocket</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  className={classes.tableCell}
                  colSpan={12}
                  align="center"
                >
                  <Box marginTop="120px">
                    <img src={loader} alt="loader" height="60px" />
                  </Box>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  className={classes.tableCell}
                  colSpan={12}
                  align="center"
                >
                  <Box marginTop="120px">No Results Found</Box>
                </TableCell>
              </TableRow>
            ) : (
              launches.map((item, index) => (
                <TableRow
                  key={item.mission_name}
                  onClick={() => {
                    setOpen(true);
                    setLaunch(item);
                  }}
                  className={classes.tableRow}
                >
                  <TableCell className={classes.tableCell}>
                    {currentpageItem + index + 1}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {formatDate(item.launch_date_utc)}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {item?.launch_site.site_name}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {item?.mission_name}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {item?.rocket?.second_stage?.payloads[0]?.orbit}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Button
                      variant="contained"
                      disabled
                      style={getStatusStyle(item)}
                    >
                      {item.launch_success
                        ? "Success"
                        : item.upcoming
                        ? "Upcoming"
                        : "Failed"}
                    </Button>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {item?.rocket?.rocket_name}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalComponent open={open} setOpen={setOpen} launch={launch} />
    </React.Fragment>
  );
};

export default LaunchTable;
