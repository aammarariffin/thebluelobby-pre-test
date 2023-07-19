import { HttpMethod, initFetch } from "../utils/fetch";

const fetchCall = initFetch("http://localhost:3000");

export const createTask = (description: string) => {
  return fetchCall(HttpMethod.POST, '/tasks', {body:{ description} });
}
