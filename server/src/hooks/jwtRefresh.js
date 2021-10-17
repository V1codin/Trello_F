module.exports = function (props) {
  if (!props) return false;

  const {
    authentication: {
      payload: { exp },
    },
  } = props;
  const now = Math.floor(Date.now() / 1000);
  const tokenLeftMin = Math.floor((exp - now) / 60);

  const isExpired = tokenLeftMin > 0 && tokenLeftMin <= 2;

  return isExpired;
};
