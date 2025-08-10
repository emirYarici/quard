export function giveDateShortFormat(dateString: string) {
  const date = new Date(dateString);

  // Use Turkish locale and short month
  const formatter = new Intl.DateTimeFormat('tr-TR', {
    month: 'short',
    day: 'numeric',
  });

  const parts = formatter.formatToParts(date);

  const month = parts.find(p => p.type === 'month').value;
  const day = parts.find(p => p.type === 'day').value;
  const formatted = `${month.charAt(0).toUpperCase() + month.slice(1)}, ${day}`;
  return formatted;
}
