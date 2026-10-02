let cache = {};

function get(key) {
  return cache[key];
}

function set(key, data) {
  cache[key] = data;

  setTimeout(() => {
    delete cache[key];
  }, 60000);
}

function clear() {
  cache = {};
}

module.exports = {
  get,
  set,
  clear
};
