import React from 'react';
import schema from './schema';
import uiSchema from './uiSchema';
import { MuiFormBuilder } from 'components';
import { Button } from '@mui/material';

const Form = ({ formData = {}, loading, onSubmit, handleType }) => {
  return (
    <MuiFormBuilder
      submit="ورود"
      loading={loading}
      formData={formData}
      onSubmit={onSubmit}
      schema={schema()}
      uiSchema={uiSchema()}
    >
      <Button size="small" onClick={() => handleType(3)}>
        فراموشی رمز عبور
      </Button>
    </MuiFormBuilder>
  );
};

export default Form;
