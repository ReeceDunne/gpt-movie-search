require("dotenv").config();
const OpenAI = require("openai");
const readline = require("readline");
const { getMovieDetails } = require("./getMovieDetails");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create an OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

// Function to get movie titles from OpenAI
const getMovieTitles = async (prompt) => {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extract titles from the response
    const rawTitle = completion.choices[0].message.content;

    // Extract movie titles and remove the year (inside parentheses), including any additional text
    const titles = [...rawTitle.matchAll(/^\d+\.\s\*\*(.*?)\*\*/gm)].map(
      (match) => {
        let titleWithYear = match[1];

        // Remove anything inside parentheses, including years or "and" text
        titleWithYear = titleWithYear.replace(/\s*\(.*\)\s*$/, "").trim();

        return titleWithYear;
      }
    );

    return titles;
  } catch (error) {
    console.error("Error fetching movie titles:", error.message);
    return [];
  }
};

// Main function to execute the code
const main = async () => {
  // Ask the user for the number of movies they want (limit of 10)
  rl.question(
    "How many movies would you like to return (max 10): ",
    async (movieCount) => {
      const count = parseInt(movieCount);

      if (isNaN(count) || count <= 0 || count > 10) {
        console.log("Invalid input. Please enter a number between 1 and 10.");
        rl.close();
        return;
      }

      // Ask the user for a prompt
      rl.question(
        "Please enter the description of the movies you want (e.g., 'feature a character walking away from an explosion'): ",
        async (userPrompt) => {
          // Create the prompt
          const prompt = `Return ${count} movies that ${userPrompt}`;

          // Get the movie titles based on the prompt
          const titles = await getMovieTitles(prompt);

          if (titles.length > 0) {
            // Return movie details once all titles have been retrieved
            const movieDetailsPromises = titles
              .slice(0, count)
              .map((title) => getMovieDetails(title));

            await Promise.all(movieDetailsPromises);
          } else {
            console.log("No movie titles found.");
          }

          // Close the readline interface
          rl.close();
        }
      );
    }
  );
};

main();
