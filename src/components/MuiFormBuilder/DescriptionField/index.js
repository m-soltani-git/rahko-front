import Typography from "@mui/material/Typography";

/** The `DescriptionField` is the template to use to render the description of a field
 *
 * @param props - The `DescriptionFieldProps` for this component
 */
export default function DescriptionField(props) {
  const { id, description } = props;
  if (description) {
    return (
      <Typography id={id} variant="subtitle2" style={{ marginTop: "5px" }}>
        {description}
      </Typography>
    );
  }

  return null;
}
