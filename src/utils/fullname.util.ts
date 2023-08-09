import { Name } from '../types';

export function splitFullName(fullName: string): Name {
  const [firstName, lastName] = fullName.split(' ');
  return { firstName, lastName };
}

export function joinFullName(name: Name): string {
  return `${name.firstName} ${name.lastName}`;
}
