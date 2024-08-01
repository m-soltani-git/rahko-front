import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import {
  ariaDescribedByIds,
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
  labelValue,
  optionId,
} from "@rjsf/utils";

/** The `RadioWidget` is a widget for rendering a radio group.
 *  It is typically used with a string property constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function RadioWidget({
  id,
  options,
  value,
  required,
  disabled,
  readonly,
  label,
  hideLabel,
  onChange,
  onBlur,
  onFocus,
}) {
  const { enumOptions, enumDisabled, emptyValue } = options;

  const _onChange = (_, value) =>
    onChange(enumOptionsValueForIndex(value, enumOptions, emptyValue));
  const _onBlur = ({ target: { value } }) =>
    onBlur(id, enumOptionsValueForIndex(value, enumOptions, emptyValue));
  const _onFocus = ({ target: { value } }) =>
    onFocus(id, enumOptionsValueForIndex(value, enumOptions, emptyValue));

  const row = options ? options.inline : false;
  const selectedIndex = enumOptionsIndexForValue(value, enumOptions) ?? null;

  return (
    <>
      {labelValue(
        <FormLabel required={required} htmlFor={id}>
          {label || undefined}
        </FormLabel>,
        hideLabel
      )}
      <RadioGroup
        id={id}
        name={id}
        value={selectedIndex}
        row={row}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        aria-describedby={ariaDescribedByIds(id)}
      >
        {Array.isArray(enumOptions) &&
          enumOptions.map((option, index) => {
            const itemDisabled =
              Array.isArray(enumDisabled) &&
              enumDisabled.indexOf(option.value) !== -1;
            const radio = (
              <FormControlLabel
                control={
                  <Radio name={id} id={optionId(id, index)} color="primary" />
                }
                label={option.label}
                value={String(index)}
                key={index}
                disabled={disabled || itemDisabled || readonly}
              />
            );

            return radio;
          })}
      </RadioGroup>
    </>
  );
}
