import { HttpInterceptorFn } from '@angular/common/http';

const BACK_END_URL = 'https://localhost:7096/api';

export const apiInterceptor: HttpInterceptorFn = (req, next) => 
{
  const apiReq = req.clone({
    url: `${BACK_END_URL}${req.url}`
  });
  return next(apiReq);
};
