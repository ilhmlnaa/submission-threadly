import i18n from './i18n';

function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 0) {
    return i18n.t('postedAt.daysAgo', { count: diffDays });
  }
  if (diffHours > 0) {
    return i18n.t('postedAt.hoursAgo', { count: diffHours });
  }
  if (diffMinutes > 0) {
    return i18n.t('postedAt.minutesAgo', { count: diffMinutes });
  }
  if (diffSeconds > 0) {
    return i18n.t('postedAt.secondsAgo', { count: diffSeconds });
  }
  return i18n.t('postedAt.justNow');
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
}

function getTheme() {
  return localStorage.getItem('theme') || 'dark';
}

function setTheme(theme) {
  localStorage.setItem('theme', theme);
}

export { postedAt, truncateText, getTheme, setTheme };
