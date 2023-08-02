class UserDetail {
  constructor(Model) {
    this.id = Model.id;
    this.firstName = Model.firstName;
    this.lastName = Model.lastName;
    this.email = Model.email;
    this.created_at = Model.createdAt;
    this.updated_at = Model.updatedAt;
  }
}

module.exports = UserDetail;
