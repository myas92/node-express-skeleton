module.exports = [
  {
    path: "GET:/api/users/:id",
    description: "نمایش همه کاربران",
    roles: ["sys_admin, admin", "visitor"],
  },
  {
    path: "GET:/api/users/",
    description: "نمایش اطلاعات خود کاربر",
    roles: ["sys_admin, admin", "visitor"],
  },
  {
    path: "POST:/api/country/",
    description: "ایجاد یک کشور جدید",
    roles: ["sys_admin, admin"],
  },
  {
    path: "PUT:/api/country/:id",
    description: "بروزرسانی اطلاعات یک کشور",
    roles: ["sys_admin, admin"],
  },
  {
    path: "DELETE:/api/country/:id",
    description: "حذف یک کشور",
    roles: ["sys_admin, admin"],
  },
  {
    path: "POST:/api/province/",
    description: "ایجاد یک استان جدید",
    roles: ["sys_admin, admin"],
  },
  {
    path: "PUT:/api/province/:id",
    description: "بروزرسانی اطلاعات یک استان",
    roles: ["sys_admin, admin"],
  },
  {
    path: "DELETE:/api/province/:id",
    description: "حذف یک استان",
    roles: ["sys_admin, admin"],
  },
];
