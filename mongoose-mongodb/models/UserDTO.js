class UserDTO {
	constructor({ first_name, last_name, email, password }) {
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.password = password;
		this.isAdmin = false;
	}
}

export default UserDTO;