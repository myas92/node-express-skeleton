exports.passwordPattern = /.{6,30}$/;
exports.phonePattern = /^\d{11}$/;
exports.phoneEmailPattern = /^[0-9]+$|(^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;
exports.emailPattern = /\S+@\S+\.\S+/