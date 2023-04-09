import { TranslationService } from '../../@shared/i18n/translation.service';
import { Injectable } from '@angular/core';
import Swal, { SweetAlertArrayOptions, SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class NoticeService {
  constructor(private translation: TranslationService) {}

  fireToast(title: string, type: SweetAlertIcon) {
    const translatedTitle = this.translation.getTranslate(title);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-start',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: type,
      title: translatedTitle,
    });
  }
  successNotice(msg: string, title?: string) {
    let swalModel: SweetAlertOptions<any, any> = {
      icon: 'success',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
    };
    if (title) {
      const messages = this.translation.getTranslateMany([title, msg]);
      swalModel.title = messages[0];
      swalModel.text = messages[1];
    } else {
      const message = this.translation.getTranslate(msg);
      swalModel.title = message;
    }

    return Swal.fire(swalModel);
  }
  private errorNotice(message: string, title: string) {
    return Swal.fire({
      title: title,
      html: message,
      icon: 'error',
    });
  }

  loadingModal(msg:string) {
    Swal.fire({
      title: msg,
      didOpen: () => {
        Swal.showLoading();
      }
    })
  }
  generalErrorNotice(error: string) {
    const msg = this.translation.getTranslateMany(['GENERAL.ALERT.ERROR.TITLE', error]);
    this.errorNotice(msg[1], msg[0]);
  }
  validationErrorNotice(erros: string[]) {
    const msg = this.translation.getTranslateMany(['GENERAL.ALERT.ERROR.TITLE', ...erros]);

    const messages = this.prepareValidationErrorMessage(msg);
    this.errorNotice(messages, msg[0]);
  }
  async askAlert(msg: string) {
    const messages = this.translation.getTranslateMany([
      'ALERT.ASK.TITLE',
      msg,
      'ALERT.ASK.CONFIRM',
    ]);

    const result = await Swal.fire({
      title: messages[0],
      text: messages[1],
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: messages[2],
      preConfirm: (x_1_1) => {
        return x_1_1;
      },
    });
    if (result.isConfirmed) {
      return true;
    }
    return false;
  }

  private prepareValidationErrorMessage(errors: string[]) {
    const messages = this.translation.getTranslateMany(errors);
    let errorMessage = '';
    messages.slice(1).forEach((msg) => {
      errorMessage += `<p>${msg}</p><br>`;
    });
    return errorMessage;
  }
}
