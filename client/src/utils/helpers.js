const isLink = (background) => {
  return /\/{1,}/g.test(background);
};

const getDataFromClipBoard = async () => {
  try {
    const link = await navigator.clipboard.readText();
    if (!isLink(link)) return "";
    return link;
  } catch (e) {
    console.log("clipboard error", e);
    return "";
  }
};

export { isLink, getDataFromClipBoard };
