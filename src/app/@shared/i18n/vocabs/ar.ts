// USA
export const locale = {
  lang: 'ar',
  data: {
    TRANSLATOR: {
      SELECT: 'إختر اللغة',
    },
    GENERAL: {
      WORDS: {
        PLEASE_WAIT: 'الرجاء الإنتظار',
        PROMOTER: 'مسوق',
        ADVERTISER: 'معلن',
        ACTIONS: 'العمليات',
        NO_DATA:'لاتوجد بيانات'
      },
      BUTTONS: {
        EDIT: 'تعديل',
        DELETE: 'حذف',
        VIEW: 'عرض',
        CANCEL: 'إلغاء',
        CLOSE: 'إغلاق',
        SUBMIT: 'إرسال',
        SAVE_CHANGES: 'حفظ التغيرات',
        BACK: 'رجوع',
      },
      ALERT: {
        ERROR: {
          TITLE: 'خطاً',
          NO_ENOUGH_BALANCE: 'لا يوجد رصيد كافي',
        },
        SUCCESS:{
          LINK_COPIED:'تم نسخ الرابط بنجاج'
        },
        MESSAGE: {
          APPROVE_CONVERSION:
            'يجب أن تتأكد من عملية البيع قبل ان تقوم بالموافقة .. عند الموافقة سيتم تحويل العمولة الى المسوق ولن تتمكن من استرداد المبلغ',
        },
      },
    },
    MENU: {
      NEW: 'new',
      ACTIONS: 'Actions',
      CREATE_POST: 'Create New Post',
      PAGES: 'Pages',
      FEATURES: 'Features',
      APPS: 'Apps',
      DASHBOARD: 'Dashboard',
    },
    AUTH: {
      BUTTON: {
        CREATE_ACCOUNT: 'إنشاء حساب',
        ADD_PASSWORD:'إنشاء كلمة السر'
      },
      LOGIN: {
        TITLE: 'أهلا بك عندنا   ',
        LOGIN_BUTTON: 'تسجيل دخول',
        NO_ACCOUNT_QA: 'ليس لديك حساب ؟',
        FORGOT_PASSWORD: 'هل نسيت كلمة السر ؟',
      },
      SIGNUP: {
        TITLE: 'إنشاء حساب جديد',
        HAVE_ACCOUNT_QA: 'هل لديك حساب ؟',
        BUTTON: 'إنشاء حساب جديد',
        SIGNIN: 'قم بتسجيل الدخول',
        PRIVACY_MSG: 'بالتسجيل فأنا أوافق على',
        PRIVACY_LINK: 'سياسات منصة عندنا',
      },
      FORGOT: {
        TITLE: 'نسيت كلمة السر ؟',
        DESC: 'قم بإدخال البريد الإلكتروني لتتمكن من تغيير كلمة السر',
        SUCCESS: 'تم إرسال رابط على بريدك الإلكتروني.',
      },
      INPUT: {
        EMAIL: 'البريد الإلكتروني',
        FIRSTNAME: 'الاسم',
        LASTNAME: 'اللقب',
        PASSWORD: 'كلمة السر',
        CONFIRM_PASSWORD: 'تأكيد كلمة السر',
        USERNAME: 'اسم المستخدك',
        VERIF_CODE:'رمز التحقق'
      },
      VALIDATION: {
        INVALID: '{{name}} is not valid',
        REQUIRED: '{{name}} is required',
        MIN_LENGTH: '{{name}} minimum length is {{min}}',
        AGREEMENT_REQUIRED: 'Accepting terms & conditions are required',
        NOT_FOUND: 'The requested {{name}} is not found',
        INVALID_LOGIN: 'The login detail is incorrect',
        REQUIRED_FIELD: 'Required field',
        MIN_LENGTH_FIELD: 'Minimum field length:',
        MAX_LENGTH_FIELD: 'Maximum field length:',
        INVALID_FIELD: 'Field is not valid',
      },
    },
    ITEM: {
      FORM: {
        ADD_PRODUCT: 'إضافة منتج جديد',
        UPDATE_ITEM: 'تحديث معلومات المنتج : {{name}}',
      },
      INPUT: {
        NAME: 'اسم المنتج',
        DESCRIPTION: 'الوصف',
        CATEGORY: 'الصنف',
        TYPE: 'نوع المنتج',
        URL: 'رابط المنتج',
        SKU: ' رقم التخزين',
        QUANTITY: 'الكمية',
        STORE: 'اسم المتجر',
        PRICE: 'السعر',
      },
      VALIDATION: {
        REQUIRED: '{{name}} مطلوب',
      },
    },
    CAMPAIGN: {
      BUTTON: {
        STOP_APPLICATION: 'إيقاف الطلبات',
        START_APPLICATION: 'تشغيل الطلبات',
        STOP: 'إيقاف الحملة',
        RUN: 'تشغيل الحملة',
      },
      FORM: {
        ADD_CAMPAIGN: 'إضافة حملة جديدة ',
        UPDATE_CAMPAIGN: 'تحديث معلومات الحملة : {{name}}',
        SELECT_ITEM: 'قم بإختيار المنتج',
        CAMPAIGN_DETAILS: 'تفاصيل الحملة',
        CAMPAIGN_ITEM: 'إختيار المنتج',
        CAMPAIGN_ITEM_DESC: 'قم بإختيار المنتج الذي تريد ان يتم تسويقه',
        CAMPAIGN_TARGETS: 'أهداف الحملة',
        CAMPAIGN_TARGETS_DESC:
          ' إختيارك لأهداف الحملة بعناية يساعد المسوقين بإستهداف الفئات التي تحتاج منتجك',
        CAMPAIGN_COMMISSION: 'نظام العمولة',
        CAMPAIGN_COMMISSION_DESC:
          'عليك تحديد العمولة التي سوف يحصل عليها المسوق مقابل المبعيات التي سوف يحققها',
        SELECT_COMMISSION_TYPE: 'قم بإختيار نوع العمولة',
        SELECT_TARGET_COUNTRIES: 'قم بإختيار البلدان المستهدفة',
        SELECT_TARGET_GROUP: 'قم بإختيار الفئة السمتهدفة',
        SELECT_TARGET_AGE: 'قم بإختيار الأعمار المستهدفة',
        REVIEW_AND_SUBMIT: 'مراجعة و حفظ',
      },
      INPUT: {
        NAME: 'اسم الحملة',
        DESCRIPTION: 'الوصف',
        ITEM: 'المنتج',
        COUPON: 'كوبون',
        TARGET_COUNTRIES: 'البلدان المستهدفة',
        TARGET_CATEGORIES: 'الأصناف المستهدفة',
        TARGET_GROUP: 'الفئة المستهدفة',
        TARGET_AGE: 'الأعمار المستهدفة',
        COMMISSION_TYPE: 'نوع العمولة',
        COMMISSION_FIXED_VALUE: 'المبلغ',
        COMMISSION_PERCENTAGE_VALUE: 'النسبة المئوية',
      },
      VALIDATION: {
        REQUIRED: '{{name}} مطلوب',
      },
      TABLE:{
        WORKSPACE_CAMPAIGNS:{
          TITLE:'قائمة الحملات',
          BUTTON:{
            CREATE_CAMAPIGN:'إضافة حملة جديدة'
          },
          TH:{
            NAME:'اسم الحملة',
            STATUS:'الحالة',
            APPLICABLE:'قابل للتقديم',
            CREATED_AT	:'تم الإنشاء في',
          }
        }
      },
      ALERT:{
        SUCCESS:{
          UPDATED:'تم تعديل الحملة بنجاح',
          CREATED:'تم إنشاء الحملة بنجاح',
          DELETED:'تم حذف الحملة بنجاح'
        }
      }
    },
    CONVERSION: {
      BUTTON: {
        APPROVE: 'قبول',
        REJECT: 'رفض',
      },
      STATUS: {
        REJECTED: 'مرفوض',
        APPROVED: 'تم القبول',
        PENDDING: 'قيد الإنتظار',
      },
    },
    AFFILIATE: {
      BUTTON: {
        APPROVE: 'قبول',
        REJECT: 'رفض',
      },
      STATUS: {
        REJECTED: 'مرفوض',
        APPROVED: 'تم القبول',
        PENDDING: 'قيد الإنتظار',
      },
    },
    SETTINGS:{
      ACCOUNT:{
        TITLE:'معلومات تسجيل الدخول',
        CHANGE_EMAIL:{
          VIEW:{
            TITLE:'البريد الإلكتروني',
            BUTTON:'تحديث البريد الإلكتروني'
          },
          INPUT:{
            EMAIL:'البريد الإلكتروني',
            PASSWORD:'تأكيد كلمة السر'
          }
        },
        RESET_PASSWORD:{
          VIEW:{
            TITLE:'كلمة السر',
            BUTTON:'تغيير كلمة السر'
          },
          INPUT:{
            NEW_PASSWORD:'كلمة السر',
            CONFIRM_PASSWORD:'تأكيد كلمة السر',
            CURRENT_PASSWORD:'كلمة السر الحالية'
          }
        },
        UPDATE_PHONE:{
          VIEW:{
            TITLE:'رقم الهاتف ',
            BUTTON:'تغيير رقم الهاتف'
          },
          INPUT:{
            PHONE:' رقم الهاتف ',
          }
        },
      },
      PAYMENT:{
        TITLE:'قائمة المدفوعات',
        DESCRIPTION:'يمكنك رؤية جميع الأرباح التي قمت بسحبها ',
        BALANCE:'الرصيد',
        PROFIT:'الأرباح',
        TABLE:{
          AMOUNT:'المبلغ',
          REMAINING_AMOUNT:'المبلغ المتبقي',
          CREATED_AT:'وقت العملية',
        },
        SHOW_PAYMENT_HISTORY_BTN:'عرض المدفوعات',
        GET_PAID_BTN:'احصل على الأرباح',
        CHARGE_WALLET_BTN:'شحن رصيد',
      }
    }
  },
};
