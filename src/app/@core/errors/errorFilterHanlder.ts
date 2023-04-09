import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from './validationError';
import { ErrorContext } from './errorContext';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { NoticeService } from '../notification/notice.service';
import { AuthStateActions } from '@features//auth/actions/auth.action';

@Injectable({
  providedIn: 'root',
})
export class ErrorFilterHandler {
  private message: string;
  private validatorMessages: string[];
  private erroTypes: {
    type: string;
    status: number;
    action: (err: ErrorContext) => void;
  }[] = [
    {
      type: 'DOMAIN_EXCEPTION',
      status: 400,
      action: this.handleDomianError.bind(this),
    },
    {
      type: 'VALIDATION_ERROR',
      status: 400,
      action: this.handleValidationError.bind(this),
    },
    {
      type: 'NOT_FOUND_ERROR',
      status: 404,
      action: this.handleNotFoundError.bind(this),
    },
    {
      type: 'INTERNAL_SERVER_ERROR',
      status: 500,
      action: this.handleInternalServerError.bind(this),
    },
    {
      type: 'FORBIDDEN',
      status: 403,
      action: this.handleForbiddenError.bind(this),
    },
    {
      type: 'UNAUTHORIZED',
      status: 401,
      action: this.handleUnauthorizedError.bind(this),
    },
    {
      type: 'UNKOWN_ERROR',
      status: 400,
      action: this.handleUnkownError.bind(this),
    },
    {
      type: 'IDENTITY_ERROR',
      status: 400,
      action: this.handleIdentityError.bind(this),
    },
  ];

  constructor(private notify: NoticeService, private store: Store) {}

  public onExecute(error: HttpErrorResponse) {
    this.onHandle(error.error);
  }
  private onHandle(error: ErrorContext) {
    this.erroTypes.map((x) => {

      if (x.type === error.type) {
        x.action(error);
        if (x.type === 'VALIDATION_ERROR') {
          this.notify.validationErrorNotice(this.validatorMessages);
        } else {
          this.notify.generalErrorNotice(this.message);
        }
      }
    });
  }

  private handleValidationError(error: ErrorContext) {
    const validationErr = new ValidationError(error);
    this.validatorMessages = validationErr.errors;
  }

  private handleNotFoundError(error: ErrorContext) {
    this.message = `GENERAL.ALERT.ERROR.${error.title}`;
  }
  private handleDomianError(error: ErrorContext) {
    this.message = `GENERAL.ALERT.ERROR.${error.title}`;
  }

  private handleInternalServerError(error: ErrorContext) {
    this.message = `GENERAL.ALERT.ERROR.${error.title}`;
  }
  private handleIdentityError(error: ErrorContext) {
    this.message = `GENERAL.ALERT.ERROR.${error.title}`;
  }

  private handleUnkownError(error: ErrorContext) {
    this.message = `GENERAL.ALERT.ERROR.${error.title}`;
  }
  private handleForbiddenError(error: ErrorContext) {
    this.message = `GENERAL.ALERT.ERROR.${error.title}`;
    this.store.dispatch(new AuthStateActions.LogoutSuccess());
  }
  private handleUnauthorizedError(error: ErrorContext) {
    this.message = `GENERAL.ALERT.ERROR.${error.title}`;
    this.store.dispatch(new AuthStateActions.LogoutSuccess());
  }
}
