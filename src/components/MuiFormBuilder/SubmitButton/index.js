import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { getSubmitButtonOptions } from "@rjsf/utils";

/** The `SubmitButton` renders a button that represent the `Submit` action on a form
 */
export default function SubmitButton({ uiSchema }) {
  const {
    submitText,
    norender,
    props: submitButtonProps = {},
  } = getSubmitButtonOptions(uiSchema);
  if (norender) {
    return null;
  }
  return (
    <Box marginTop={3}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        {...submitButtonProps}
      >
        {submitText}
      </Button>
    </Box>
  );
}
