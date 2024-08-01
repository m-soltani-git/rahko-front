import { gql } from '@apollo/client';

const schema = {
  list: {
    name: 'mediaFileList',
    serviceName: 'auth',
    query: gql`
      query mediaFileList($path: String, $page: Int, $limit: Int, $from_subs: Int) {
        mediaFileList(path: $path, page: $page, limit: $limit, from_subs: $from_subs) {
          files {
            data {
              full_url
              basename
              extension
              aTime
              mTime
              cTime
              inode
              size
              perms
              type
              # writable
              # readable
              # executable
              # file
              # dir
              # link
            }
          }
          directories
          path
        }
      }
    `,
  },
  create: {
    name: 'createFolder',
    serviceName: 'shopadmin',
    query: gql`
      mutation createFolder($path: String, $name: String!) {
        createFolder(path: $path, name: $name) {
          path
        }
      }
    `,
  },
  update: {
    name: 'renameFolderFile',
    serviceName: 'shopadmin',
    query: gql`
      mutation renameFolderFile($path: String, $old_name: String!, $new_name: String!) {
        renameFolderFile(path: $path, old_name: $old_name, new_name: $new_name) {
          path
        }
      }
    `,
  },
  delete: {
    name: 'deleteFolderFile',
    serviceName: 'shopadmin',
    query: gql`
      mutation deleteFolderFile($type: String, $path: String, $items: [DeleteFolderFileInput]!) {
        deleteFolderFile(path: $path, items: $items, type: $type) {
          path
        }
      }
    `,
  },
  upload: {
    name: 'uploadFile',
    serviceName: 'auth',
    query: gql`
      mutation uploadFile($path: String, $name: String, $files: [Upload]!, $do_replace: Int) {
        uploadFile(path: $path, name: $name, files: $files, do_replace: $do_replace) {
          path
        }
      }
    `,
  },
  assign: {
    name: 'assignMedia',
    serviceName: 'auth',
    query: gql`
      mutation assignMedia(
        $id: String!
        $model_name: String!
        $media_ids: [String]
        $paths: [String]
        $collection_name: String
        $files: [Upload]!
        $do_replace: Int
        $method: String
      ) {
        assignMedia(
          id: $id
          model_name: $model_name
          files: $files
          media_ids: media_ids
          paths: $paths
          collection_name: $collection_name
          do_replace: $do_replace
          method: $method # COPY,MOVE
        ) {
          path
        }
      }
    `,
  },
};

export default schema;
