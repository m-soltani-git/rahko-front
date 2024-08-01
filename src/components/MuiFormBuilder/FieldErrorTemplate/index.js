import ListItem from "@mui/material/ListItem";
import FormHelperText from "@mui/material/FormHelperText";
import List from "@mui/material/List";
import { errorId } from "@rjsf/utils";

/** The `FieldErrorTemplate` component renders the errors local to the particular field
 *
 * @param props - The `FieldErrorProps` for the errors being rendered
 */
export default function FieldErrorTemplate(props) {
  const { errors = [], idSchema } = props;
  if (errors.length === 0) {
    return null;
  }
  const id = errorId(idSchema);

  return (
    <List id={id} dense={true} disablePadding={true}>
      {errors.map((error, i) => {
        return (
          <ListItem key={i} disableGutters={true}>
            <FormHelperText component="div" id={`${id}-${i}`}>
              {error}
            </FormHelperText>
          </ListItem>
        );
      })}
    </List>
  );
}
