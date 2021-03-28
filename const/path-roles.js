module.exports = [
    {
        path : "GET:/api/users/:id",
        description:"نمایش همه کاربران",
        roles:["admin","visitor"]
    },
    {
        path : "GET:/api/users/",
        description:"نمایش اطلاعات خود کاربر",
        roles:["admin","visitor"]
    },
]
