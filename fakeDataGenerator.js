// var faker  = require('faker');
const faker = require('faker'); // using const for scope management

// function FakeDataGenerator(accountType) {
// 	if (accountType !== undefined) {
// 		this.accountType = accountType;
// 	}
// }

// using arrow function from ES6 //
const FakeDataGenerator = () => {
	if (accountType !== undefined) {
		this.accountType = this.accountType;
	}
};

FakeDataGenerator.prototype.generateFakeUser = function () {
	var number = Math.floor(Math.random() * 100) + 1;

	faker.locale = 'de';

	var result;
	while (!result || /[ äöüÄÖÜß]/.test(result.email)) {
		var firstname = faker.name.firstName();
		var lastname = faker.name.lastName();

		var delimiter = ['_', '.', '-', ''][
			faker.random.number(['_', '.', '-', ''].length - 1)
		];

		// Generating random user email address..?

		var email =
			firstname +
			delimiter +
			lastname +
			faker.random.number(100) +
			'@' +
			faker.internet.domainName();

		result = {
			firstname: firstname,
			lastname: lastname,
			email: email,
			contactName: firstname + ' ' + lastname,
		};
	}

	return {
		email: result.email,
		contactName: result.contactName,
		password: 'password',
		accountType: this.accountType,
		firstName: result.firstname,
		lastName: result.lastname,
		phoneNumber: faker.phone.phoneNumber(),
		brandingStreet: faker.address.streetName() + ' ' + number,
	};
};

FakeDataGenerator.prototype.accountType = 'default';

FakeDataGenerator.createIntervalBasedFakeUserGenerator = function (cbFn, time) {
	this.timer = setInterval(function () {
		cbFn(new FakeDataGenerator().generateFakeUser());
	}, time);
};

module.exports = FakeDataGenerator;
