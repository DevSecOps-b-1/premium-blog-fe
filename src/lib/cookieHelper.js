export const getCookie = (name) =>
  document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];

export function deleteCookie(name) {
  document.cookie = name + "=; Max-Age=-1; path=/;";
}
