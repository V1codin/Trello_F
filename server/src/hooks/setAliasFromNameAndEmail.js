async function setAliasFromNameAndEmail(context) {
  const { email, displayName } = context.data;
  if (!email || !displayName) return context;

  context.data.nameAlias = `${email} ${displayName}`;

  return context;
}

module.exports = { setAliasFromNameAndEmail };
