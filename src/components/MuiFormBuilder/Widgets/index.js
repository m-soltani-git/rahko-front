import CheckboxWidget from '../CheckboxWidget';
import CheckboxesWidget from '../CheckboxesWidget';
import RadioWidget from '../RadioWidget';
import RangeWidget from '../RangeWidget';
import SelectWidget from '../SelectWidget';
import TextareaWidget from '../TextareaWidget';

import DateWidget from "../DateWidget";
import DateTimeWidget from "../DateTimeWidget";
import SwitchWidget from "../SwitchWidget";

export function generateWidgets() {
  return {
    CheckboxWidget,
    CheckboxesWidget,
    RadioWidget,
    RangeWidget,
    SelectWidget,
    TextareaWidget,

    // CheckboxWidget: SwitchWidget,
    // DateWidget: DateWidget,
    // DateTimeWidget: DateTimeWidget,
  };
}

export default generateWidgets();
