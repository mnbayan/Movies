import { format, parseISO } from 'date-fns';

const formatDate = (date, fmt) => (date !== null ? format(date, fmt) : null);
const parseToDate = (string) => (string !== null ? parseISO(string) : null);

export { formatDate, parseToDate };
