const { MongoClient, ServerApiVersion } = require("mongodb");
const { seedDatabase } = require("./seedDatabase.js");
require("dotenv").config();

async function createEpisodeExercise(client) {
  const episodesCollection = client.db("databaseWeek3").collection("bob_ross_episodes");

  const episodeToAdd = {
    "EPISODE": "S09E13",
    "TITLE": "MOUNTAIN HIDE-AWAY",
    "CIRRUS": 1,
    "CLOUDS": 1,
    "CONIFER": 1,
    "DECIDUOUS": 1,
    "GRASS": 1,
    "MOUNTAIN": 1,
    "MOUNTAINS": 1,
    "RIVER": 1,
    "SNOWY_MOUNTAIN": 1,
    "TREE": 1,
    "TREES": 1
  };

  const result = await episodesCollection.insertOne(episodeToAdd);
  console.log(`Created season 9 episode 13 and the document got the id ${result.insertedId}`);
}

async function findEpisodesExercises(client) {
  const episodesCollection = client.db("databaseWeek3").collection("bob_ross_episodes");

  // Find the title of episode 2 in season 2 [Should be: WINTER SUN]
  const episode2Season2 = await episodesCollection.findOne({ "EPISODE": "S02E02" });
  if (episode2Season2) {
    console.log(`The title of episode 2 in season 2 is ${episode2Season2.TITLE}`);
  } else {
    console.log("Episode 2 in season 2 was not found.");
  }

  // Find the season and episode number of the episode called "BLACK RIVER" [Should be: S02E06]
  const blackRiverEpisode = await episodesCollection.findOne({ "TITLE": "BLACK RIVER" });
  if (blackRiverEpisode) {
    console.log(`The season and episode number of the "BLACK RIVER" episode is ${blackRiverEpisode.EPISODE}`);
  } else {
    console.log("The episode called 'BLACK RIVER' was not found.");
  }

  // Find all of the episode titles where Bob Ross painted a CLIFF [Should be: NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERfall]
  const cliffEpisodes = await episodesCollection.find({ "CLIFF": 1 }).toArray();
  if (cliffEpisodes.length > 0) {
    const cliffTitles = cliffEpisodes.map(episode => episode.TITLE);
    console.log(`The episodes that Bob Ross painted a CLIFF are ${cliffTitles.join(", ")}`);
  } else {
    console.log("No episodes with a CLIFF were found.");
  }

  // Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE [Should be: NIGHT LIGHT]
  const cliffAndLighthouseEpisodes = await episodesCollection.find({ "CLIFF": 1, "LIGHTHOUSE": 1 }).toArray();
  if (cliffAndLighthouseEpisodes.length > 0) {
    const cliffAndLighthouseTitles = cliffAndLighthouseEpisodes.map(episode => episode.TITLE);
    console.log(`The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${cliffAndLighthouseTitles.join(", ")}`);
  } else {
    console.log("No episodes with a CLIFF and a LIGHTHOUSE were found.");
  }
}

async function updateEpisodeExercises(client) {
  const episodesCollection = client.db("databaseWeek3").collection("bob_ross_episodes");

  // Episode 13 in season 30 should be called BLUE RIDGE FALLS, yet it is called BLUE RIDGE FALLERS now. Fix that
  const result = await episodesCollection.updateOne(
    { "EPISODE": "S30E13" },
    { $set: { "TITLE": "BLUE RIDGE FALLS" } }
  );
  console.log(`Ran a command to update episode 13 in season 30 and it updated ${result.modifiedCount} episodes`);

  // Unfortunately we made a mistake in the arrays and the element type called 'BUSHES' should actually be 'BUSH' as sometimes only one bush was painted.
  // Update all of the documents in the collection that have `BUSHES` in the elements array to now have `BUSH`
  // It should update 120 episodes!
  const bushUpdateResult = await episodesCollection.updateMany(
    { "BUSHES": 1 },
    { $set: { "BUSH": 1 }, $unset: { "BUSHES": "" } }
  );
  console.log(`Ran a command to update all the BUSHES to BUSH and it updated ${bushUpdateResult.modifiedCount} episodes`);
}

async function deleteEpisodeExercise(client) {
  const episodesCollection = client.db("databaseWeek3").collection("bob_ross_episodes");

  // It seems an errand episode has gotten into our data. This is episode 14 in season 31. Please remove it and verify that it has been removed!
  const result = await episodesCollection.deleteOne({ "EPISODE": "S31E14" });
  console.log(`Ran a command to delete episode and it deleted ${result.deletedCount} episodes`);
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();