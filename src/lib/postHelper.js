export function convertDate(date) {
  let postDate = date.toDate().toString();
  return postDate.split(" ").splice(1, 3).join(" ");
}

export function createExcerpt(content) {
  let contentPreview = content.split(" ");
  if (contentPreview.length > 35)
    contentPreview = contentPreview.slice(0, 35).join(" ");
  return contentPreview;
}
