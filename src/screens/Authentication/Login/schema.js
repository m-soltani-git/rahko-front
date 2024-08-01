export const userUpdateSchema = {
    email: {
        presence: { allowEmpty: false, message: 'is required' },
        email: true,
        length: {
            maximum: 64
        }
    },
    firstname: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
    },
    lastname: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
    }
};

export const schema = {
    cellphone: {
        presence: { allowEmpty: false, message: 'is required' },
        // email: true,
        length: {
            maximum: 64
        }
    },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
    }
};

export const signUpPhone = {
    cellphone: {
        presence: { allowEmpty: false, message: 'is required' },
        // email: true,
        length: {
            maximum: 64
        }
    },
    first_name: {
        presence: { allowEmpty: false, message: 'is required' },
        // email: true,
        length: {
            maximum: 64
        }
    },
    last_name: {
        presence: { allowEmpty: false, message: 'is required' },
        // email: true,
        length: {
            maximum: 64
        }
    },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
        
    },
    re_password: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
          maximum: 128
      },
      equality:{
        attribute: "password",
        message: "مقدار وارد شده با مقدار رمز عبور متفاوت است",
      } 
    }
};

export const otp = {
    register_code: {
        presence: { allowEmpty: false, message: 'is required' },
        // email: true,
        length: {
            maximum: 64
        }
    },

};

export default schema;