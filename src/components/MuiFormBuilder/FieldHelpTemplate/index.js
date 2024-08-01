import FormHelperText from "@mui/material/FormHelperText";
import { helpId } from "@rjsf/utils";

/** The `FieldHelpTemplate` component renders any help desired for a field
 *
 * @param props - The `FieldHelpProps` to be rendered
 */
export default function FieldHelpTemplate(props) {
  const { idSchema, help } = props;
  if (!help) {
    return null;
  }
  const id = helpId(idSchema);
  return (
    <FormHelperText component="div" id={id}>
      {help}
    </FormHelperText>
  );
}
