import IconButton from "@mui/material/IconButton";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CopyIcon from "@mui/icons-material/ContentCopy";
import RemoveIcon from "@mui/icons-material/Remove";
import { TranslatableString } from "@rjsf/utils";

export default function MuiIconButton(props) {
  const { icon, color, uiSchema, registry, ...otherProps } = props;
  return (
    <IconButton {...otherProps} size="small" color={color}>
      {icon}
    </IconButton>
  );
}

export function CopyButton(props) {
  const {
    registry: { translateString },
  } = props;
  return (
    <MuiIconButton
      title={translateString(TranslatableString.CopyButton)}
      {...props}
      icon={<CopyIcon fontSize="small" />}
    />
  );
}

export function MoveDownButton(props) {
  const {
    registry: { translateString },
  } = props;
  return (
    <MuiIconButton
      title={translateString(TranslatableString.MoveDownButton)}
      {...props}
      icon={<ArrowDownwardIcon fontSize="small" />}
    />
  );
}

export function MoveUpButton(props) {
  const {
    registry: { translateString },
  } = props;
  return (
    <MuiIconButton
      title={translateString(TranslatableString.MoveUpButton)}
      {...props}
      icon={<ArrowUpwardIcon fontSize="small" />}
    />
  );
}

export function RemoveButton(props) {
  const { iconType, ...otherProps } = props;
  const {
    registry: { translateString },
  } = otherProps;
  return (
    <MuiIconButton
      title={translateString(TranslatableString.RemoveButton)}
      {...otherProps}
      color="error"
      icon={
        <RemoveIcon fontSize={iconType === "default" ? undefined : "small"} />
      }
    />
  );
}
