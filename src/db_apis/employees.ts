import oracledb from "oracledb";
import * as db from "../services/oracle";

const baseQuery = `select employee_id "id",
    first_name "first_name",
    last_name "last_name",
    email "email",
    phone_number "phone_number",
    hire_date "hire_date",
    job_id "job_id",
    salary "salary",
    commission_pct "commission_pct",
    manager_id "manager_id",
    department_id "department_id"
  from employees`;
const createSql = `insert into employees (
    first_name,
    last_name,
    email,
    phone_number,
    hire_date,
    job_id,
    salary,
    commission_pct,
    manager_id,
    department_id
  ) values (
    :first_name,
    :last_name,
    :email,
    :phone_number,
    :hire_date,
    :job_id,
    :salary,
    :commission_pct,
    :manager_id,
    :department_id
  ) returning employee_id
  into :employee_id`;
const updateSql = `update employees
  set first_name = :first_name,
    last_name = :last_name,
    email = :email,
    phone_number = :phone_number,
    hire_date = :hire_date,
    job_id = :job_id,
    salary = :salary,
    commission_pct = :commission_pct,
    manager_id = :manager_id,
    department_id = :department_id
  where employee_id = :employee_id`;
const deleteSql = `begin
    delete from job_history
    where employee_id = :employee_id;
    delete from employees
    where employee_id = :employee_id;
    :rowcount := sql%rowcount;
  end;`;
export default {
  find: async function (context: any) {
    let query = baseQuery;
    const binds = {} as any;

    if (context.id) {
      binds.employee_id = context.id;

      query += `\nwhere employee_id = :employee_id`;
    }

    const result = await db.execute(query, binds) as any;

    return result.rows;
  },

  create: async function (emp: any) {
    const employee = Object.assign({}, emp);

    employee.employee_id = {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    };

    const result = await db.execute(createSql, employee) as any;

    employee.employee_id = result.outBinds.employee_id[0];

    return employee;
  },

  update: async function (emp: any) {
    const employee = Object.assign({}, emp);
    const result = await db.execute(updateSql, employee) as any;

    if (result.rowsAffected && result.rowsAffected === 1) {
      return employee;
    } else {
      return undefined;
    }
  },
  delete: async function (id: any) {
    const binds = {
      employee_id: id,
      rowcount: {
        dir: oracledb.BIND_OUT,
        type: oracledb.NUMBER
      }
    };
    const result = await db.execute(deleteSql, binds) as any;

    return result.outBinds.rowcount === 1;
  }
};
