class UserLogin {
  constructor(JSON) {
    this.email = JSON.email;
    this.password = JSON.password;
  }

  check_fields = function check_fields() {
    let error_list = [];

    if (!this.email) {
      error_list.push("email is required");
    }
    if (!this.password) {
      error_list.push("password is required");
    }

    if (error_list.length > 0) {
      throw new Error(error_list.join(", "));
    }
  };
}

module.exports = UserLogin;
