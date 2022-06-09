import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import useClasses from "hooks/useClasses";
import Box from ".";

const styles = () => ({
  image: {
    objectFit: "contain",
    width: "50%",
  },
});

const ImageBox = ({ image, imageProps = {} }) => {
  const classes = useClasses(styles);
  return (
    <Grid item xs={12} textAlign="center">
      <Box>
        <img src={image} className={classes.image} {...imageProps} />
      </Box>
    </Grid>
  );
};

ImageBox.propTypes = {
  image: PropTypes.string.isRequired,
  imageProps: PropTypes.object,
};

export default ImageBox;
