export function checkSystemPreference() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
export function updateDarkClass(value:boolean) {
  if (value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}