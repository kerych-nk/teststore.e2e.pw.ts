import { request } from "@playwright/test";
import TestDataGenerator from "../testData/testDataGenerator";

const endpoints = {
  userRegistrationUrl:
    "https://teststore.automationtesting.co.uk/index.php?controller=registration",
};

export async function getNewUserStorageStateViaAPI(
  userEmail = TestDataGenerator.getNewEmail()
) {
  const requestContext = await request.newContext();

  await requestContext.post(endpoints.userRegistrationUrl, {
    form: {
      firstname: "Fname",
      lastname: "Lname",
      email: userEmail,
      password: "Qwerty123!",
      psgdpr: 1,
      submitCreate: 1,
    },
    failOnStatusCode: true,
  });
  return await requestContext.storageState();
}
