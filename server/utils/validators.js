module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Не должно быть пустым!";
  }
  if (email.trim() === "") {
    errors.username = "Не должно быть пустым!";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (!email.match(regEx)) {
      errors.email = "Невалидная почта!";
    }
  }
  if (password.trim() === "") {
    errors.password = "Не должно быть пустым!";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Пароли не совпадают!";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Не должно быть пустым!";
  }
  if (password.trim() === "") {
    errors.password = "Не должно быть пустым!";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
