import format from 'date-fns/format';

export const formatDate = (dateString: string) =>
  format(new Date(dateString), 'h:mm:ss bbbb, d MMM yyyy');
