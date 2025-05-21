export type ChecksTable = {
  id: string;
  company_type: string;
  date: Date;
  number: number;
  sum: number;
  nds10: number;
  nds20: number;
  company_id: string;
  company_name: string;
  fd: number;
}

export type ChecksTableWithoutId = Omit<ChecksTable, 'id'>;

export type CompaniesTable = {
  id: string;
  name: string;
  type: string;
}


export type ProverkachekaParams = {
  fn: string;
  i: string; //fd
  fp: string;
  t: string;
  n: string;
  s: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
}
