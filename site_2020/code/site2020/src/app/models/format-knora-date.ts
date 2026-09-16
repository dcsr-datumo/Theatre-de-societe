interface DateParts {
  year: number;
  month?: number;
  day?: number;
  era?: string;
}

export function formatKnoraDate(date: DateParts | { start: DateParts; end: DateParts } | null | undefined): string | null {
  if (!date) { return null; }
  const single = (value: DateParts): string | null => {
    if (!value || value.year === undefined || value.year === null) { return null; }
    const parts = [value.day, value.month, value.year].filter(part => part !== undefined && part !== null);
    return parts.join('/') + (value.era === 'BCE' ? ' av. J.-C.' : '');
  };
  if ('start' in date) {
    const start = single(date.start);
    const end = single(date.end);
    if (!start || !end) { return null; }
    return start === end ? start : `${start}–${end}`;
  }
  return single(date);
}
