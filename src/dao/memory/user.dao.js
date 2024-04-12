export default class UserDao {
	constructor() {
		this.data = [];
	}

	async getAll() {
		return this.data;
	}

	async save(newElement) {
		this.data.push(newElement);
	}
}
