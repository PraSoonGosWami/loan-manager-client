import { Checkbox, FormControlLabel } from "@material-ui/core";
const CustomCheckbox = ({ label, name, ...otherProps }) => {
  return (
    <FormControlLabel
      style={{ marginLeft: "0px" }}
      control={<Checkbox name={name} {...otherProps} />}
      label={label}
    />
  );
};

export default CustomCheckbox;
