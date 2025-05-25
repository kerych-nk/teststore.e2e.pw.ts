import TestDataGenerator from "./testDataGenerator";

export const registrationScenarios = [
  {
    testTitle: "MIN",
    "I agree to": "true",
    "Receive offers": "false",
    "Sign up for our newsletter": "false",
    "Mr.": "false",
    "First name": "Marion",
    "Last name": "Braidfute",
    Email: `${TestDataGenerator.getNewEmail()}`,
    Password: "qwerty1234!",
    Birthdate: "false",
  },

  {
    testTitle: "MAX",
    "I agree to": "true",
    "Receive offers": "true",
    "Sign up for our newsletter": "true",
    "Mr.": "true",
    "First name": "William",
    "Last name": "Wales",
    Email: `${TestDataGenerator.getNewEmail()}`,
    Password: "qwerty1234!",
    Birthdate: "04/14/1988",
  },
];
