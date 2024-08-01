import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

/** The `TitleField` is the template to use to render the title of a field
 *
 * @param props - The `TitleFieldProps` for this component
 */
export default function TitleField({ id, title }) {
  return (
    <Box id={id} mb={1} mt={1}>
      <Typography variant="h5">{title}</Typography>
      <Divider />
    </Box>
  );
}
