import { HttpInterceptorFn } from '@angular/common/http';

const API_PREFIX = '/api';

export const apiInterceptor: HttpInterceptorFn = (req, next) => 
{
  if (/^https?:\/\//i.test(req.url)) {
    return next(req);
  }

  const apiReq = req.clone({
    url: `${API_PREFIX}${req.url}`
  });
  return next(apiReq);
};
