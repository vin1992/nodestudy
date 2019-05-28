function dedupe(tar, handler) {
  handler = handler || JSON.stringify;

  const clone = [];
  const lookup = {};

  for (let i = 0; i < tar.length; i++) {
    let el = tar[i];
    let handled = handler(el);

    if (!lookup[handled]) {
      clone.push(el);
      lookup[handled] = true;
    }
  }

  return clone;
}

module.exports = dedupe;
