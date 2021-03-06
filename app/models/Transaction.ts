import { v4 as uuidV4 } from 'uuid';
import moment from 'moment';
import { parseISO } from 'date-fns';

export default class Transaction {
  id: string;

  title: string;

  type: string;

  value: number;

  createdAt: Date;

  updatedAt?: Date;

  constructor({
    title,
    type,
    value,
    updatedAt,
  }: Omit<Transaction, 'id' | 'createdAt'>) {
    const dateString: string = moment().utc().format('YYYY-DD-MM HH:mm:ss');
    const parsedDate: Date = parseISO(dateString);

    this.id = uuidV4();
    this.title = title;
    this.type = type;
    this.value = value * 100;
    this.createdAt = parsedDate;
    this.updatedAt = updatedAt || parsedDate;
  }
}
