/**
 * Formats a number as a currency string.
 * @param {number} amount - The amount to format.
 * @param {string} currency - The currency code (e.g., 'USD').
 * @param {string} locale - The locale to use for formatting (e.g., 'en-US').
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (typeof amount !== 'number') {
    return '';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Formats a date object or string into a more readable format.
 * @param {Date|string} date - The date to format.
 * @param {Object} options - Formatting options for toLocaleDateString.
 * @param {string} locale - The locale to use.
 * @returns {string} The formatted date string.
 */
export const formatDate = (
  date,
  options = { year: 'numeric', month: 'long', day: 'numeric' },
  locale = 'en-US'
) => {
  try {
    return new Date(date).toLocaleDateString(locale, options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};
