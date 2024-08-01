import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import { ariaDescribedByIds, labelValue, rangeSpec } from "@rjsf/utils";

/** The `RangeWidget` component uses the `BaseInputTemplate` changing the type to `range` and wrapping the result
 * in a div, with the value along side it.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function RangeWidget(props) {
  const {
    value,
    readonly,
    disabled,
    onBlur,
    onFocus,
    options,
    schema,
    onChange,
    required,
    label,
    hideLabel,
    id,
  } = props;
  const sliderProps = {
    value,
    label,
    id,
    name: id,
    ...(rangeSpec(schema)),
  };

  const _onChange = (_, value) => {
    onChange(value ?? options.emptyValue);
  };
  const _onBlur = ({ target: { value } }) => onBlur(id, value);
  const _onFocus = ({ target: { value } }) => onFocus(id, value);

  return (
    <>
      {labelValue(
        <FormLabel required={required} htmlFor={id}>
          {label || undefined}
        </FormLabel>,
        hideLabel
      )}
      <Slider
        disabled={disabled || readonly}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        valueLabelDisplay="auto"
        {...sliderProps}
        aria-describedby={ariaDescribedByIds(id)}
      />
    </>
  );
}
