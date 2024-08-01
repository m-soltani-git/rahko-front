import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { TranslatableString } from "@rjsf/utils";

/** The `AddButton` renders a button that represent the `Add` action on a form
 */
export default function AddButton({ uiSchema, registry, ...props }) {
  const { translateString } = registry;
  return (
    <IconButton
      title={translateString(TranslatableString.AddItemButton)}
      {...props}
      color="primary"
    >
      <AddIcon />
    </IconButton>
  );
}
