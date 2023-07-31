document.addEventListener('DOMContentLoaded', function () {
  /* Кнопка смены темы */
  const themeToggleBtn = document.querySelector('.theme-toggle');

  /* Текущее состояние темы */
  const currentTheme = localStorage.getItem('theme');

  /* Добавляем тему, если отлична от стандартной */
  currentTheme && document.body.classList.add(currentTheme);

  /* Функция смены темы */
  const handleThemeToggle = () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
      localStorage.setItem('theme', 'light-mode');
    } else {
      localStorage.removeItem('theme');
    }
  };

  /* Обработчик смены темы */
  themeToggleBtn.addEventListener('click', handleThemeToggle);
});