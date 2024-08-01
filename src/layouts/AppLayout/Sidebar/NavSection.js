import { useState } from "react";
import PropTypes from "prop-types";
import { NavLink, matchPath, useLocation } from "react-router-dom";

import { styled } from "@mui/material/styles";
import {
  Box,
  List,
  Avatar,
  Collapse,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

import { useSelector } from "react-redux";
import { navConfig } from "routes/SuperAdminRoutes";

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  transition: "all 0.5s ease",
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius * 2,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transition: "all 0.5s ease",
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ExpandMore = styled(({ expand, ...other }) => (
  <IconButton disableRipple {...other} />
))(({ theme, expand }) => ({
  transform: !expand ? "rotate(90deg)" : "rotate(0deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({ item, active, hasRequiredRole }) {
  const isActiveRoot = active(item.url);
  const [open, setOpen] = useState(isActiveRoot);
  const { userInfo } = useSelector((state) => state.auth);
  const { title, url, icon, children = [] } = item;

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const defultRootStyle = {
    fontWeight: "bold",
  };

  const activeRootStyle = {
    fontWeight: "bold",
    color: "primary.main",
    bgcolor: "action.selected",
  };

  const activeSubStyle = {
    color: "primary.main",
    bgcolor: "info.lighter",
  };

  if (children.length > 0) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && !open ? activeRootStyle : defultRootStyle),
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              bgcolor: "transparent",
              color: isActiveRoot && !open ? "primary.main" : "inherit",
            }}
          >
            {icon}
          </Avatar>
          <ListItemText disableTypography sx={{ mb: 0 }} primary={title} />
          <ExpandMore expand={open}>
            <ExpandMoreIcon
              color={isActiveRoot && !open ? "primary" : "inherit"}
            />
          </ExpandMore>
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item, index) => {
              const { title, url, inSidebar = false, roles } = item;
              const isActiveSub = active(url);

              if (inSidebar && hasRequiredRole(roles, userInfo?.roles)) {
                return (
                  <ListItemStyle
                    to={url}
                    key={index}
                    component={NavLink}
                    sx={{ my: 0.2, ...(isActiveSub && activeSubStyle) }}
                  >
                    <ListItemIconStyle sx={{ mx: 1 }}>
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          display: "flex",
                          borderRadius: "50%",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "text.disabled",
                          transition: (theme) =>
                            theme.transitions.create("transform"),
                          ...(isActiveSub && {
                            transform: "scale(2)",
                            bgcolor: "primary.main",
                          }),
                        }}
                      />
                    </ListItemIconStyle>
                    <ListItemText
                      primary={title}
                      disableTypography
                      sx={{ color: isActiveSub && "primary.main" }}
                    />
                    <Box sx={{ width: 16, height: 16, mr: 2, ml: 2 }} />
                  </ListItemStyle>
                );
              }
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      to={url}
      component={NavLink}
      sx={{ ...(isActiveRoot && activeRootStyle) }}
    >
      <ListItemIconStyle>
        <CheckCircleOutlineRoundedIcon />
      </ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      <Box sx={{ width: 16, height: 16, mr: 2, ml: 2 }} />
    </ListItemStyle>
  );
}

export default function NavSection() {
  const { pathname } = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const hasRequiredRole = (routeRoles = [], userRoles = []) => {
    if (routeRoles.length > 0) {
      return userRoles.filter((el) => routeRoles.includes(el.name)).length > 0;
    }
    return true;
  };
  const match = (path) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;
  return (
    <List sx={{ px: 1, display: "flex", flexDirection: "column", rowGap: 0.5 }}>
      {navConfig.map(
        (item, index) =>
          item?.inSidebar &&
          hasRequiredRole(item.roles, userInfo?.roles) && (
            <NavItem
              key={index}
              item={item}
              active={match}
              hasRequiredRole={hasRequiredRole}
            />
          )
      )}
    </List>
  );
}
