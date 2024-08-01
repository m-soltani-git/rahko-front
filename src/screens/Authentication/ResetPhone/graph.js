import { gql } from '@apollo/client';

const schema = {
  login: {
    name: 'adminLogin',
    serviceName: 'grapghql',
    query: gql`
      mutation adminLogin($cellphone: String!, $password: String!) {
        adminLogin(cellphone: $cellphone, password: $password) {
          user {
            token
            roles
            username
            cellphone
            permission_names
          }
          messages
        }
      }
    `,
  },
  register: {
    name: 'updateOrder',
    serviceName: 'auth',
    query: gql`
      mutation updateOrder($ids: [String]!, $status_id: String) {
        updateOrder(ids: $ids, status_id: $status_id) {
          model {
            status {
              id
              title
            }
          }
          messages
        }
      }
    `,
  },
  forget: {
    name: 'forgetPassword',
    serviceName: 'auth',
    query: gql`
      mutation forgetPassword(
        $password: String
        $cellphone: String
        $register_code: String
        $resend_register_code: Int
      ) {
        forgetPassword(
          password: $password
          cellphone: $cellphone
          register_code: $register_code
          resend_register_code: $resend_register_code
        ) {
          messages
          opr_status
        }
      }
    `,
  },
  getUser: {
    name: 'updateOrder',
    serviceName: 'auth',
    query: gql`
      query updateOrder($ids: [String]!, $status_id: String) {
        updateOrder(ids: $ids, status_id: $status_id) {
          model {
            status {
              id
              title
            }
          }
          messages
        }
      }
    `,
  },
};

export default schema;
