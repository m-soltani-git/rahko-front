import { useCallback } from 'react';
import { entity, useEntity } from 'simpler-state';

// Function to get freshest state from browser.
const getInitialState = () => ({
  permission: Notification && Notification.permission,
  loading: false,
});

// Plugin to override set behaviour.
const notificationToggle = {
  set: (set, entity) => async () => {
    if (Notification && Notification.permission !== 'granted') {
      set({ ...getInitialState(), loading: true });
      const permission = await Notification.requestPermission();
      set({ loading: false, permission });
    }
  },
};

// Entity to listen to and connect states to React.
const notificationPermissions = entity(getInitialState(), [notificationToggle]);

// Convenient hook.
const useNotificationApi = () => {
  const { permission, loading } = useEntity(notificationPermissions);
  const trigger = useCallback((title, options) => {
    if (permission === 'granted') {
      const notification = new Notification(title, options);
      console.log({ notification });
    }
  });
  return {
    permission,
    loading,
    requestPermission: notificationPermissions.set,
    trigger,
  };
};

export default useNotificationApi;