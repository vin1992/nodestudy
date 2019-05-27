module.exports = function(arr) {
  return flattern(arr, []);
};

function flattern(arr, res) {
  var i = 0,
    curr;
  var len = arr.length;

  for (; i < len; i++) {
    curr = arr[i];
    Array.isArray(curr) ? flattern(curr, res) : res.push(curr);
  }

  return res;
}
