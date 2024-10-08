export type ChecksTable = {
  id: string;
  type: string;
  date: Date;
  number: number;
  sum: number;
  nds10: number;
  nds20: number;
  company_id: string;
  company_name: string;
}

export type ChecksTableWithoutId = Omit<ChecksTable, 'id'>;

export type CompanyTable = {
  id: string;
  name: string;
  type: string;
}
export type Company = {
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