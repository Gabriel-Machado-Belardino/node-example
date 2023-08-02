class UserList {
  constructor(Model) {
    this.id = Model.id;
    this.full_name =  `${Model.firstName} ${Model.lastName}`
  }
}

module.exports = UserList;
