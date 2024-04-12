export default class UserDTO {
	constructor(user) {
		this.first_name = user.first_name;
		this.last_name = user.last_name;
		this.email = user.email;
		this.role = user.role;
	}
}

export function createUserDTO(reqUser) {
	if (!reqUser || !reqUser.first_name || !reqUser.email) {
		return null;
	}
	const userDTO = new UserDTO(reqUser);
	return userDTO;
}
