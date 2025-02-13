import { useEffect } from 'react';

const ScrollToTop = (depend?: any) => {
  useEffect(() => {
    // Прокрутка страницы наверх при рендере
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Плавная прокрутка
    });
  }, [depend]); // Пустой массив зависимостей, чтобы сработало только при монтировании

  return null; // Компонент не выводит ничего в UI
};

export default ScrollToTop;
