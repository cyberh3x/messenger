import Button from "components/button/index";
import DialogComponent from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const Dialog = ({
  children,
  open = false,
  title = "",
  handleClose = () => {},
  handleSubmit = () => {},
  withFooter = true,
  closeButtonLabel = "Close",
  submitButtonLabel = "Confirm",
  fullWidth = true,
  dialogProps = {},
  pending = false,
}) => {
  return (
    <DialogComponent
      open={open}
      onClose={handleClose}
      fullWidth={fullWidth}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      {...dialogProps}
    >
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>{children}</DialogContent>
        {withFooter && (
          <DialogActions>
            <Button
              color="inherit"
              variant="text"
              onClick={handleClose}
              disabled={pending}
            >
              {closeButtonLabel}
            </Button>
            <Button type="submit" disabled={pending} autoFocus>
              {submitButtonLabel}
            </Button>
          </DialogActions>
        )}
      </form>
    </DialogComponent>
  );
};

export default Dialog;
