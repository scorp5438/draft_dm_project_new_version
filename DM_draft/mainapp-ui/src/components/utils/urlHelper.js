export const createUrlWithParams = (baseUrl, params) => {
  const url = new URL(baseUrl, window.location.origin); // Используем относительный путь
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return url.pathname + url.search; // Возвращаем только путь и параметры
};