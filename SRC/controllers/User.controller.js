const UserModel = require("../models/User.model");

const DTO_UserDetails = require("../DTOs/UserDetails.DTO");
const DTO_UserList = require("../DTOs/UserList.DTO");
const DTO_UserCadastro = require("../DTOs/UserCadastro.DTO");
const DTO_UserLogin = require("../DTOs/UserLogin.DTO");

exports.ACTIONS = {
  create: async (user_dto) => {
    user_dto.check_fields();

    user_with_same_email = await UserModel.findOne({
      where: { email: user_dto.email },
    });
    if (user_with_same_email) {
      throw new Error("Email already in use");
    } else {
      const user = await UserModel.createByCadastroDTO(user_dto);
      return user;
    }
  },

  login: async (login_dto) => {
    login_dto.check_fields();

    const user = await UserModel.findOne({
      where: { email: login_dto.email, password: login_dto.password },
    });

    if (!user) {
      throw new Error("Invalid login");
    } else {
      return user;
    }
  },

  list: async (per_page, page) => {
    const offset = (page - 1) * per_page;

    const users = await UserModel.findAll({
      offset: offset,
      limit: per_page,
    });
    return users;
  },

  get_detail: async (id) => {
    const user = await UserModel.findByPk(id);
    return user;
  },
};

exports.create = async (req, res) => {
  const JSON = req.body;
  const user_dto = new DTO_UserCadastro(JSON);
  try {
    const user = await this.ACTIONS.create(user_dto);
    const user_info = new DTO_UserDetails(user);
    res.status(201).json(user_info);
  } catch (error) {
    res.json({ error: 400, message: error.message });
  }
};

exports.login = async (req, res) => {
  const JSON = req.body;
  const login_dto = new DTO_UserLogin(JSON);
  try {
    const user = await this.ACTIONS.login(login_dto);
    const user_info = new DTO_UserDetails(user);
    res.status(200).json(user_info);
  } catch (error) {
    res.json({ error: 400, message: error.message });
  }
};

exports.list = async (req, res) => {
  const per_page = req.query.per_page ? parseInt(req.query.per_page) : 10;
  const page = req.query.offset ? parseInt(req.query.page) : 1;
  try {
    const users = await this.ACTIONS.list(per_page, page);
    const users_info = users.map((user) => new DTO_UserList(user));
    res.status(200).json(users_info);
  } catch (error) {
    res.json({ error: 400, message: error.message });
  }
};

exports.get_detail = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new Error("id is required");
    }
    const user = await this.ACTIONS.get_detail(id);
    if(!user){
        res.status(404).json({message: 'User not founded'})
    }
    else{
        const user_info = new DTO_UserDetails(user);
        res.status(200).json(user_info);
    }
  } catch (error) {
    res.json({ error: 400, message: error.message });
  }
};
