export function success(res, data, status = 200) {
  return res.status(status).json(data);
}

export function failure(res, error, status = 500) {
  return res.status(status).json(error);
}
