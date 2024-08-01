import { getTemplate } from "@rjsf/utils";

/** The `TextareaWidget` is a widget for rendering input fields as textarea.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function TextareaWidget(props) {
  const { options, registry } = props;
  const BaseInputTemplate = getTemplate("BaseInputTemplate", registry, options);

  let rows = 5;
  if (typeof options.rows === "string" || typeof options.rows === "number") {
    rows = options.rows;
  }

  return <BaseInputTemplate {...props} multiline rows={rows} />;
}
