const { Project } = require('./project.model');

const { setupDB } = require("../setup-test");
setupDB("project-model");

describe("Project Model saves the correct values", () => {
  test("Save a model instance and then read from the db", async (done) => {
    const submittedData = {
      name: "projectTest",
      description: "An instance of a Project model",
      githubIdentifier: "VRMS",
      projectStatus: "Active", // Active, Completed, or Paused
      location: "Remote", // DTLA, Westside, South LA, or Remote (hacknight)
      createdDate: 1594023390039, // date/time project was created
      completedDate: 1594023390039, // only if Status = Completed, date/time completed
      githubUrl: "https://github.com/hackforla/VRMS", // link to main repo
      slackUrl: "hackforla.slack.com", // link to Slack channel
    };

    await Project.create(submittedData);
    const savedDataArray = await Project.find();
    const savedData = savedDataArray[0];
    expect(savedData.name === submittedData.name);
    expect(savedData.githubIdentifier === submittedData.githubIdentifier);
    expect(savedData.githubUrl === submittedData.githubUrl);
    done();
  });
});

describe('CREATE/READ', () => {
  test('Create Project with Mongoose model', async (done) => {
    const submittedData = {
      name: 'projectTest',
    };

    await Project.create(submittedData);
    const savedDataArray = await Project.find();
    const savedData = savedDataArray[0];
    expect(savedData.name === submittedData.name);
    done();
  });
});

describe('UPDATE', () => {
  test('Update Project with Mongoose model', async (done) => {
    const submittedData = {
      name: 'projectTest',
    };

    await Project.create(submittedData);
    const savedDataArray = await Project.find();
    const savedData = savedDataArray[0];
    expect(savedData.name === submittedData.name);

    const updatedData = { name: 'updatedEventName' };

    const updatedProject = await Project.findOneAndUpdate(submittedData, updatedData);
    expect(updatedProject.name === updatedData.name);
    done();
  });
});

describe('DELETE', () => {
  test('Delete Project with Mongoose model', async (done) => {
    const submittedData = {
      name: 'projectTest',
    };

    await Project.create(submittedData);
    const savedDataArray = await Project.find();
    const savedData = savedDataArray[0];
    expect(savedData.name === submittedData.name);

    const deleteData = await Project.deleteOne(submittedData);
    expect(deleteData.ok).toBe(1);
    done();
  });
});
