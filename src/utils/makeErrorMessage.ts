export function makeErrorMessage(target: any, message: string) {
  if (
    target.nextElementSibling &&
    target.nextElementSibling?.classList.contains("error")
  ) {
    target.nextElementSibling.style.display = "block";
    target.nextElementSibling.innerText = message;
  }
}
