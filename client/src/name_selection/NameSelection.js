import React from "react";
// import PropTypes from "prop-types";
import { selectNameStyles } from "../common/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { inject, observer } from "mobx-react";
// import boat from "./boat.jpg";

// const styles = theme => ({
//   layout: {
//     width: "auto",
//     display: "block", // Fix IE11 issue.
//     marginLeft: theme.spacing.unit * 3,
//     marginRight: theme.spacing.unit * 3,
//     [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
//       width: 400,
//       marginLeft: "auto",
//       marginRight: "auto"
//     }
//   },
//   paper: {
//     marginTop: theme.spacing.unit * 8,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
//       .spacing.unit * 3}px`
//   },
//   avatar: {
//     margin: theme.spacing.unit,
//     backgroundColor: theme.palette.secondary.main
//   },
//   form: {
//     width: "100%", // Fix IE11 issue.
//     marginTop: theme.spacing.unit
//   },
//   submit: {
//     marginTop: theme.spacing.unit * 3
//   }
// });
@withStyles(selectNameStyles)
@inject("socket")
@observer
class NameSelection extends React.Component {
  componentDidMount() {
    console.log(this.props.socket);
  }
  onInputChange = e => this.props.socket.setName(e.target.value);

  onSubmit = e => e.preventDefault();
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Enter your name to start
            </Typography>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="text">Name</InputLabel>
                <Input
                  name="text"
                  autoFocus
                  onChange={e => this.onInputChange(e)}
                />
              </FormControl>
              {/* <FormControl margin="normal">
                <img src={boat} alt="boat" />
              </FormControl> */}

              {/* <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={this.props.socket.isNameEmpty}
                onClick={() => this.props.socket.sendMessage()}
              >
                Start
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

// NameSelection.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default NameSelection;
