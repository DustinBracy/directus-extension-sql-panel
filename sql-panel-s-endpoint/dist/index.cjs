"use strict";

const endpointHandler = function (router, { services: directusServices, database }) {
  router.get("/:id", async function (req, res) {
    try {
      // Get the ID parameter from the request
      const panelId = req.params.id;

      // Fetch the panel options from the 'directus_panels' table using the provided ID
      const panelQueryResult = await database.raw(`SELECT [options] FROM [directus_panels] WHERE [id] = '${[panelId]}'`);
      
      // Parse the options JSON data into an object
      const parsedOptions = JSON.parse(panelQueryResult[0].options);

      // Execute the SQL query specified in the options
      const queryResult = await database.raw(parsedOptions.sql);

      // Extract the column headers from the query result
      const headers = Object.keys(queryResult[0]).map(column => ({ text: column, value: column }));

      // Respond with the formatted data as JSON
      res.json({
        headers: headers,
        items: queryResult
      });
    } catch (error) {
      // If an error occurs, log it and respond with an appropriate error message
      console.error("Error in endpoint:", error);
      res.status(500).json({ error: "An error occurred while processing the request." });
    }
  });
};

module.exports = endpointHandler;