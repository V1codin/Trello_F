const isLink = (background) => {
  return /\/{1,}/g.test(background);
};

const isImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = src;

    img.onload = () => resolve(src);

    img.onerror = (e) => {
      reject({ error: true, message: "Your link has no image" });
    };
  });
};

const getDataFromClipBoard = async () => {
  try {
    const link = await navigator.clipboard.readText();
    if (!isLink(link)) return "";
    const result = await isImage(link);
    return result;
  } catch (e) {
    console.log("clipboard error", e);
    return "";
  }
};

export { isLink, getDataFromClipBoard };
