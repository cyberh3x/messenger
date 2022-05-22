import useClasses from "hooks/useClasses";

const styles = (theme) => ({
  root: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    background: theme.palette.success.main,
    borderRadius: "50%",
    border: "2px solid white",
    display: "inline-flex",
  },
});

const Online = (props) => {
  const classes = useClasses(styles);
  return <span className={classes.root} {...props}></span>;
};

export default Online;
