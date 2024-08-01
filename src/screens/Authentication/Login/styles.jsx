const styles = theme => ({
  root: {
    margin: 0,
    direction: 'rtl',
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(0.5),
    top: theme.spacing(0.25),
    color: theme.palette.grey[500],
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    justifyContent: 'center',
    direction: 'rtl',
  },
  form: {
    padding: theme.spacing(4, 0)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
  shopping: {
    width: '100%'
  }
});

export default styles;