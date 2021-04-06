
exports.Field_Email_Is_Duplicate = {
  statusCode: 200,
  code: 1000,
  message: {
    FA: "ایمیل تکراری است",
    EN: "Field EMAIL Is Duplicated",
  },
};
exports.Account_Is_Disabled = {
  statusCode: 200,
  code: 1001,
  message: {
    FA: "اکانت غیر فعال شده است، لطفا بعدا تلاش کنید",
    EN: "Acounnt is disabled, try again later",
  },
};
exports.Signing_Up_Faild = {
  statusCode: 500,
  code: 1002,
  message: {
    FA: "ثبت نام با خطا مواجه شده است، لطفا دوباره تلاش کنید",
    EN: "Signing Up faild, please try again later",
  },
};
exports.Joi_Errors = {
  statusCode: 422,
  code: 1003,
  message: {
    FA: "داده ورودی نا معتبر است",
    EN: "",
  },
};
exports.Invalid_Verify_Code = {
  statusCode: 422,
  code: 1004,
  message: {
    FA: "کد اعتبار سنجی اشتباه است",
    EN: "Invalid Verify Code",
  },
};

exports.Authentication_Failed = {
  statusCode: 403,
  code: 1005,
  message: {
    FA: "احراز هویت انجام نشد",
    EN: "Authentication failed!",
  },
};

exports.Invalid_Credentials = {
  statusCode: 401,
  code: 1005,
  message: {
    FA: "اطلاعات ورودی نامعتبر است",
    EN: "Invalid credentials, could not log you in!",
  },
};

exports.Check_Credentials= {
  statusCode: 401,
  code: 1006,
  message: {
    FA: "اطلاعات ورودی نامعتبر است",
    EN: "Could not log you in, please check your credentials and try again.",
  },
};
exports.Loggin_Failed= {
  statusCode: 500,
  code: 1007,
  message: {
    FA: "ورود به سیستم ناموفق بود است، لطفاً بعدا دوباره امتحان کنید.",
    EN: "Logging in failed, please try again later.",
  },
};

exports.Bad_Request = {
  statusCode: 400,
  code: 1008,
  message: {
    FA: "درخواست اشتباه است",
    EN: "Bad Request Wrong",
  },
};
exports.Something_Went_Wrong = {
  statusCode: 400,
  code: 1009,
  message: {
    FA: "خطای سمت سرور",
    EN: "something went wrong",
  },
};
exports.Expiration_Verify_Code = {
  statusCode: 200,
  code: 1010,
  message: {
    FA: "کد تایید منقضی شده است",
    EN: "expiration verify code",
  },
};

exports.Username_Is_Duplicate = {
  statusCode: 200,
  code: 1011,
  message: {
    FA: "نام کاربری تکراری است",
    EN: "Username Is Duplicated",
  },
};
exports.Invalid_Username = {
  statusCode: 200,
  code: 1012,
  message: {
    FA: "نام کاربری اشتباه است",
    EN: "Invalid Username",
  },
};
exports.Invalid_Username = {
  statusCode: 200,
  code: 1012,
  message: {
    FA: "نام کاربری در سامانه وجود ندارد",
    EN: "Invalid Username",
  },
};
exports.Login_Faild = {
  statusCode: 200,
  code: 1012,
  message: {
    FA: "ورود به سامانه با خطا مواجه شده است",
    EN: "Login Faild",
  },
};

exports.User_Undefinded = {
  statusCode: 200,
  code: 1013,
  message: {
    FA: "کاربر یافت نشد",
    EN: "User Undefinded",
  },
};
exports.Invalid_Token = {
  statusCode: 200,
  code: 1014,
  message: {
    FA: "توکن نامعتبر است",
    EN: "Invalid Token",
  },
};
exports.Reset_Forget_Password_Faild = {
  statusCode: 200,
  code: 1015,
  message: {
    FA: "فرایند بروز رسانی پسورد امکان پذیر نیست",
    EN: "Reset Forget Password Faild",
  },
};
exports.Access_Denied = {
  statusCode: 403,
  code: 1016,
  message: {
    FA: "دسترسی به این مسیر امکان پذیر نمی باشد",
    EN: "could not access to this api",
  },
};
exports.Item_Is_Not_Founded = {
  statusCode: 200,
  code: 1017,
  message: {
    FA: "مورد مورد نظر یافت نشد",
    EN: "Item Is Not Founded",
  },
};
exports.Transaction_Query_Faild = {
  statusCode: 403,
  code: 1018,
  message: {
    FA: "خطا در کوئری مورد نظر",
    EN: "Transaction Query Faild",
  },
};
exports.API_Is_Not_Implemented = {
  statusCode: 403,
  code: 1019,
  message: {
    FA: "درخواست مورد نظر پیاده سازی نشده است",
    EN: "The API has not been implemented",
  },
};