export function convertDate(isoString) {
  // Create a new Date object from the ISO string
  const date = new Date(isoString);

  // Format components
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  // Convert to readable format using `toLocaleDateString`
  return date.toLocaleDateString("en-US", options);
}

export function createExcerpt(content) {
  // let contentPreview = content.split(" ");
  // if (contentPreview.length > 35)
  //   contentPreview = contentPreview.slice(0, 35).join(" ");
  // return contentPreview;
  return content;
}
