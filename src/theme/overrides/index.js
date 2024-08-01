import { merge } from 'lodash';
import Card from './Card';
import Lists from './Lists';
import Paper from './Paper';
import Input from './Input';
import Button from './Button';
import Tooltip from './Tooltip';
import Backdrop from './Backdrop';
import Typography from './Typography';
import IconButton from './IconButton';
import MuiMenuItem from './MuiMenuItem';
import MuiTableCell from './MuiTableCell';
import Autocomplete from './Autocomplete';
import MuiCssBaseline from './MuiCssBaseline';
import MuiOutlinedInput from './MuiOutlinedInput';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return merge(
    Card(theme),
    Lists(theme),
    Paper(theme),
    Input(theme),
    Button(theme),
    Tooltip(theme),
    Backdrop(theme),
    Typography(theme),
    IconButton(theme),
    MuiMenuItem(theme),
    MuiTableCell(theme),
    Autocomplete(theme),
    MuiCssBaseline(theme),
    MuiOutlinedInput(theme)
  );
}
