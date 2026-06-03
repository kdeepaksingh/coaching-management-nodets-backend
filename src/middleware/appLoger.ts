import { type NextFunction, type Request, type Response } from "express";

const appLoger = (request: Request, response: Response, next: NextFunction) => {
  // url , method , time, data
  let url = request.url;
  let method = request.method;
  let date = new Date().toLocaleDateString();
  let time = new Date().toLocaleTimeString();
  let result: string = `[${url}]-[${method}]-[${date}]-[${time}]`;
  console.log(result);
  next(); // mandatory and it will be added for last line
};

export default appLoger;
