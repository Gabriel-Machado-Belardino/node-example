class UserCadastro {
  constructor(json) {
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.email = json.email;
    this.password = json.password;
  }

  check_fields = function check_fields() {
    let error_list = [];

    if (!this.firstName) {
      error_list.push("firstName is required");
    }
    if (!this.lastName) {
      error_list.push("lastName is required");
    }
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

module.exports = UserCadastro;
