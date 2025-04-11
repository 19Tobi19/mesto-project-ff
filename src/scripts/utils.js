export function loaderRender(isLoading, btn, loadingText = "Сохранение...") {
  if (isLoading) {
    btn.textContent = loadingText;
  } else {
    btn.textContent = btn.dataset.defaultText;
  }
}
