module.exports = function (props) {
  if (!props) return false;

  const now = Math.floor(Date.now() / 1000);
  const tokenLeftMin = Math.floor((props - now) / 60);

  const isExpired = tokenLeftMin < 5;

  return isExpired;
};
