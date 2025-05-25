import { faker } from "@faker-js/faker";

function getNewEmail(): string {
  return faker.internet.email();
}

function getShippingAddress() {
  return {
    Address: faker.location.streetAddress(),
    City: faker.location.city(),
    Zip: faker.location.zipCode("#####"),
    State: "Alabama",
  };
}

const TestDataGenerator = {
  getNewEmail,
  getShippingAddress,
};

export default TestDataGenerator;
