"use strict";

function is_number(num) {
  if (typeof num === "number") {
    return num - num === 0;
  }

  if (typeof num === "string" && num.trim() !== "") {
    return Number.isFinite(+num) ? Number.isFinite(+num) : isFinite(+num);
  }
}

module.exports = is_number;
