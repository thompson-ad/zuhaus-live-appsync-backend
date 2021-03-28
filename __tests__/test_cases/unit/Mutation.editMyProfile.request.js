const given = require("../../steps/given");
const when = require("../../steps/when");
const chance = require("chance").Chance();
const path = require("path");

describe("Mutation.editMyProfile.request template", () => {
  it("Should use 'newProfile' fields in expression values", () => {
    const templatePath = path.resolve(
      __dirname,
      "../../../mapping-templates/Mutation.editMyProfile.request.vtl"
    );

    const username = chance.guid();
    const newProfile = {
      name: "Yan",
      imageUrl: null,
      location: null,
    };
    const context = given.an_appsync_context({ username }, { newProfile });
    const result = when.we_invoke_an_appsync_template(templatePath, context);

    expect(result).toEqual({
      version: "2018-05-29",
      operation: "UpdateItem",
      key: {
        id: {
          S: username,
        },
      },
      update: {
        expression:
          "set #name = :name, imageUrl = :imageUrl, #location = :location",
        expressionNames: {
          "#name": "name",
          "#location": "location",
        },
        expressionValues: {
          ":name": {
            S: "Yan",
          },
          ":imageUrl": {
            NULL: true,
          },
          ":location": {
            NULL: true,
          },
        },
      },
      condition: {
        expression: "attribute_exists(id)",
      },
    });
  });
});
