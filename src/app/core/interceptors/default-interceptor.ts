import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../authentication/token.service';
import { SettingsService } from '@core/bootstrap/settings.service';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private token: TokenService,
    private settings: SettingsService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add server host
    const url = environment.SERVER_ORIGIN + req.url;

    // Only intercept API url
    if (!url.includes('/api/')) {
      return next.handle(req);
    }

    let tokenVal = this.token.get().token;

    // All APIs need JWT authorization
    const headers = {
      'Accept': 'application/json',
      'Accept-Language': this.settings.language,
      'Access-Control-Allow-Origin':'*',
      'Authorization': tokenVal && tokenVal.trim() != '' ? tokenVal : '' //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlX2lkIjoiNWZhNGVlMGYwZDYwZTgwNzEwNTU2ODE1IiwidXNlcl90eXBlIjoiQURNSU4iLCJ1c2VyX2lkIjoiNWZhNGVlYmYwZDYwZTgwNzEwNTU2ODE2IiwiY3VzdG9tZXJfaWQiOm51bGwsInNlc3Npb25JZCI6IndkSDRqWG9iWWxlSFhra3N2T2szdkFOcGdhVlp0NVZtIiwiaWF0IjoxNjA0NjQ0NjA4fQ.nDaSHnVeFyE9EAZGcmi48JwaSVWwVOX7-ArbEkCzoQQ'//`Bearer ${this.token.get().token}`,
    };
    let requrl = req.url

    const newReq = req.clone({ url:requrl , setHeaders: headers });

    return next.handle(newReq).pipe(
      mergeMap((event: HttpEvent<any>) => this.handleOkReq(event)),
      catchError((error: HttpErrorResponse) => this.handleErrorReq(error))
    );
  }

  private goto(url: string) {
    setTimeout(() => this.router.navigateByUrl(url));
  }

  private handleOkReq(event: HttpEvent<any>): Observable<any> {
    if (event instanceof HttpResponse) {
      const body: any = event.body;
      // failure: { code: **, msg: 'failure' }
      // success: { code: 0,  msg: 'success', data: {} }
      if (body && body.code !== 0) {
        if (body.msg && body.msg !== '') {
          this.toastr.error(body.msg);
        }
        // return throwError([]);
      } else {
        return of(event);
      }
    }
    // Pass down event if everything is OK
    return of(event);
  }

  private handleErrorReq(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case 401:
        this.toastr.error(error.error.message || error.message || `${error.status} ${error.statusText}`);
        this.goto(`/auth/login`);
        break;
      case 403:
      // case 404:
      case 500:
        this.goto(`/sessions/${error.status}`);
        break;
      default:
        if (error instanceof HttpErrorResponse) {
          console.error('ERROR', error);
          this.toastr.error(error.error.message || error.message || `${error.status} ${error.statusText}`);
        }
        break;
    }
    return throwError(error);
  }
}
