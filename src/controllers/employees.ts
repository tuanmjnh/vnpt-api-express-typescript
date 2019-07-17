import { Request, Response, NextFunction } from "express";
import employees from "../db_apis/employees";
// const employees = require('../db_apis/employees');

const getEmployeeFromRec = function (req: any) {
  return {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    hire_date: req.body.hire_date,
    job_id: req.body.job_id,
    salary: req.body.salary,
    commission_pct: req.body.commission_pct,
    manager_id: req.body.manager_id,
    department_id: req.body.department_id
  };
};

export default {
  get: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const context = {} as any;

      context.id = parseInt(req.params.id, 10);

      const rows = await employees.find(context);

      if (req.params.id) {
        if (rows.length === 1) {
          res.status(200).json(rows[0]);
        } else {
          res.status(404).end();
        }
      } else {
        res.status(200).json(rows);
      }
    } catch (err) {
      next(err);
    }
  },
  post: async function (req: Request, res: Response, next: NextFunction) {
    try {
      let employee = getEmployeeFromRec(req);

      employee = await employees.create(employee);

      res.status(201).json(employee);
    } catch (err) {
      next(err);
    }
  },
  put: async function (req: Request, res: Response, next: NextFunction) {
    try {
      let employee = getEmployeeFromRec(req) as any;

      employee.employee_id = parseInt(req.params.id, 10);

      employee = await employees.update(employee);

      if (employee !== null) {
        res.status(200).json(employee);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  },
  delete: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);

      const success = await employees.delete(id);

      if (success) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  }
};
