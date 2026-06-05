const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const NotFoundException = require("../exceptions/NotFoundException");
const BadRequestException = require("../exceptions/BadRequestException");

class UserService {
  constructor() {
    this.users = new Map();
  }

  async getUser(id) {
    if (!this.users.has(id)) {
      throw new NotFoundException("User doesn't exist");
    }
    const user = this.users.get(id);
    return user;
  }

  async createUser(body) {
    const { name, age, email, password } = body;
    if (this.isUserExist(email)) {
      throw new BadRequestException("User already exist");
    }
    const id = uuidv4();

    const hashedPassword = await bcrypt.hash(password, 10);
    this.users.set(id, { name, age, email, password: hashedPassword });
    return { message: "User created successfully", id };
  }

  async login(body) {
    const { id, email, password } = body;
    if (!this.isUserExist(email)) {
      throw new NotFoundException("User doesn't exist");
    }
    const user = this.users.get(id);
    const isUserValid = await this.isValidUser(user, password);
    if (!isUserValid) {
      throw new BadRequestException("Invalid creds");
    }

    const token = jwt.sign({ id, email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    return token;
  }

  isUserExist(email) {
    for (const { email: userEmail } of this.users.values()) {
      if (email === userEmail) {
        return true;
      }
    }
    return false;
  }

  isValidUser(user, password) {
    return bcrypt.compare(password, user.password);
  }
}

module.exports = UserService;
