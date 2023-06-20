import React from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  IconButton,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

//images
import rocket from "../assets/Images/spaceX.png";
import spaceX from "../assets/Images/roundLogo.png";
import youtube from "../assets/Images/youtube.png";
import Wiki from "../assets/Images/Wiki.png";

import { formatDate, getStatusStyle } from "../helpers/helpers";

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  modalContent: {
    backgroundColor: "white",
    padding: theme.spacing(1),
    width: 500,

    overflow: "auto",
    borderRadius: 8,
  },

  closeButton: {
    marginLeft: "auto",
    justifyContent: "flex-end",
    display: "flex",
    height: "4px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
  },
}));

const ModalComponent = ({ open, setOpen, launch }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className={classes.modalContainer}>
        <Box className={classes.modalContent}>
          {/* Modal Content */}

          <Box className={classes.closeButton}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box>
            {launch && (
              <Box>
                <Box display="flex" flexDirection="row">
                  <Box>
                    <img src={rocket} alt="rocket" height="60px" />
                  </Box>

                  <Box>
                    <Typography
                      variant="h6"
                      style={{ color: "#36454F", fontWeight: "600" }}
                    >
                      {launch.mission_name}
                    </Typography>
                    <Typography
                      variant="caption"
                      style={{ color: "#36454F", fontWeight: "400" }}
                    >
                      {launch.rocket.rocket_name}
                    </Typography>
                    <Box>
                      <img
                        src={spaceX}
                        height="10px"
                        alt="spaceX"
                        style={{ filter: "grayscale(100%)" }}
                      />
                      <img
                        src={youtube}
                        height="10px"
                        alt="youtube"
                        style={{ filter: "grayscale(100%)" }}
                      />
                      <img
                        src={Wiki}
                        height="10px"
                        alt="Wiki"
                        style={{ filter: "grayscale(100%)" }}
                      />
                    </Box>
                  </Box>
                  <Box display="flex" pb={1} mb={1}>
                    <Button
                      variant="contained"
                      disabled
                      style={{
                        ...getStatusStyle(launch),
                        marginLeft: "10px",
                        width: "20px",
                      }}
                    >
                      {launch.launch_success
                        ? "Success"
                        : launch.upcoming
                        ? "Upcoming"
                        : "Failed"}
                    </Button>
                  </Box>
                </Box>
                <Box mt={1}>
                  <Typography
                    style={{ paddingLeft: "15px", paddingRight: "15px" }}
                  >
                    {launch.details
                      ? launch.details
                      : "Please click on Wikipedia link to know more"}
                    <a
                      href={launch.links.wikipedia}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginLeft: "4px", textDecoration: "none" }}
                    >
                      <span style={{ color: "blue", textDecoration: "none" }}>
                        Wikipedia
                      </span>
                    </a>
                  </Typography>
                </Box>
                <Box padding="14px">
                  <Grid sx={{ p: 3 }}>
                    <Box
                      display="flex"
                      alignItems="center"
                      borderBottom="1px solid #ccc"
                      pb={1}
                      mb={1}
                    >
                      <Grid item xs={6}>
                        <Typography>Flight Number</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{launch?.flight_number}</Typography>
                      </Grid>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      borderBottom="1px solid #ccc"
                      pb={1}
                      mb={1}
                    >
                      <Grid item xs={6}>
                        <Typography>Mission Name</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{launch?.mission_name}</Typography>
                      </Grid>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      borderBottom="1px solid #ccc"
                      pb={1}
                      mb={1}
                    >
                      <Grid item xs={6}>
                        <Typography>Rocket Type</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{launch?.rocket?.rocket_type}</Typography>
                      </Grid>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      borderBottom="1px solid #ccc"
                      pb={1}
                      mb={1}
                    >
                      <Grid item xs={6}>
                        <Typography>Rocket Name</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{launch?.rocket?.rocket_name}</Typography>
                      </Grid>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      borderBottom="1px solid #ccc"
                      pb={1}
                      mb={1}
                    >
                      <Grid item xs={6}>
                        <Typography>Manufacturer</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          {
                            launch?.rocket?.second_stage?.payloads[0]
                              ?.manufacturer
                          }
                        </Typography>
                      </Grid>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      borderBottom="1px solid #ccc"
                      pb={1}
                      mb={1}
                    >
                      <Grid item xs={6}>
                        <Typography>Nationality</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          {
                            launch?.rocket?.second_stage?.payloads[0]
                              ?.nationality
                          }
                        </Typography>
                      </Grid>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      borderBottom="1px solid #ccc"
                      pb={1}
                      mb={1}
                    >
                      <Grid item xs={6}>
                        <Typography>Launch Date</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          {formatDate(launch?.launch_date_utc)}
                        </Typography>
                      </Grid>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      borderBottom="1px solid #ccc"
                      pb={1}
                      mb={1}
                    >
                      <Grid item xs={6}>
                        <Typography>Payload Type</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          {launch?.rocket?.second_stage?.payloads[1]
                            ?.payload_type
                            ? launch?.rocket?.second_stage?.payloads[1]
                                ?.payload_type
                            : "No payload Type"}
                        </Typography>
                      </Grid>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      borderBottom="1px solid #ccc"
                      pb={1}
                      mb={1}
                    >
                      <Grid item xs={6}>
                        <Typography>Orbit</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          {launch?.rocket?.second_stage?.payloads[0]?.orbit}
                        </Typography>
                      </Grid>
                    </Box>
                    <Box display="flex" alignItems="center" pb={1} mb={1}>
                      <Grid item xs={6}>
                        <Typography>Launch Site</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          {launch?.launch_site?.site_name}
                        </Typography>
                      </Grid>
                    </Box>
                  </Grid>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
