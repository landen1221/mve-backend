"use strict";

const Story = require("./story");
const { commonBeforeAll, commonAfterAll } = require("./_testCommon");

beforeAll(commonBeforeAll);
afterAll(commonAfterAll);

describe("create stories", () => {
  let newStory1 = {
    username: "testing1",
    vaccine: "pfizer",
    satisfied: "Yes",
    age: 50,
    gender: "Male",
    story: "Testing story1",
  };

  let storyWBlanks = {
    username: "testing2",
    vaccine: "pfizer",
    satisfied: "No",
    age: undefined,
    gender: undefined,
    story: "Testing story1",
  };

  let duplicateUsername = {
    username: "testing2",
    vaccine: "pfizer",
    satisfied: "No",
    age: 84,
    gender: "Male",
    story: "Testing story1",
  };

  test("Creates valid story", async () => {
    let story = await Story.create(newStory1);
    console.log(story);
    expect(story).toEqual(`Story successfully added for ${newStory1.username}`);
  });

  test("works without the need for age & gender", async () => {
    let story = await Story.create(storyWBlanks);
    expect(story).toEqual(
      `Story successfully added for ${storyWBlanks.username}`
    );
  });

  test("Doesn't work with duplicate username", async () => {
    try {
      await Story.create(duplicateUsername);
    } catch (err) {
      expect(err).toEqual("Duplicate username submitted");
    }
  });
});

describe("search for stories", () => {
  const findByUsername = "testUser";
  const findByStory = "After week worth it";
  const emptySearch = "";
  const noResultsSearch = "#$%^&*";

  test("locates stories w/ search matching username", async () => {
    let stories = await Story.search(findByUsername);
    expect(stories.meta.query).toEqual(findByUsername);

    // all initial users will match with 'testUser'
    expect(stories.stories.length).toEqual(5);
  });

  test("locates stories w/ search matching story", async () => {
    let story = await Story.search(findByStory);
    expect(story.stories.length).toEqual(1);
    expect(story.stories[0].story).toEqual(
      "After the 2nd vaccine I was sick for a week. I never leave home so was not worth it"
    );
  });

  // empty search retrieves all stories
  test("find all stories if no search parameter provided", async () => {
    let stories = await Story.search(emptySearch);
    expect(stories.stories.length).toEqual(7);
  });

  test("returns empty array if no stories match query", async () => {
    let story = await Story.search(noResultsSearch);
    expect(story.stories.length).toEqual(0);
  });
});
