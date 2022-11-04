const setLocalStorage = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};
const getLocalStorage = (key) => {
  let value = null;
  let item = localStorage.getItem(key);
  if (item) {
    value = JSON.parse(item);
  }
  return value;
};
const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};
export { setLocalStorage, getLocalStorage, removeLocalStorage };
