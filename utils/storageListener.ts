type Callback = () => void;

const listeners = new Set<Callback>();

export const emitStorageChange = () => {
  listeners.forEach((cb) => cb());
};

export const subscribeStorageChange = (callback: Callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};
