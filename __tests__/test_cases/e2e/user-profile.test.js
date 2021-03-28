require("dotenv").config();
const given = require("../../steps/given");
const when = require("../../steps/when");

describe("Given an authenticated user", () => {
  let user, profile;
  beforeAll(async () => {
    user = await given.an_authenticated_user();
  });

  it("The user can fetch his profile with getMyProfile", async () => {
    profile = await when.a_user_calls_getMyProfile(user);
    expect(profile).toMatchObject({
      id: user.username,
      role: user.role,
      name: user.name,
      imageUrl: null,
      location: null,
      createdAt: expect.stringMatching(
        /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/g
      ),
    });

    const [firstName, lastName] = profile.name.split(" ");
    expect(profile.screenName).toContain(firstName);
    expect(profile.screenName).toContain(lastName);
  });
});
