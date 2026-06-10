// import "dotenv/config";

// const getOpenRouterAPIResponse = async(message) => {
//     const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
//     },
//     body: JSON.stringify({
//       model: "openrouter/free",
//       messages: [
//       {
//       role: "user",
//       content: message
//       }
//     ]
//     })

//   };

//   try {
//     const response = await fetch(
//       "https://openrouter.ai/api/v1/chat/completions",
//       options
//     );
//     const data = await response.json();
//     // console.log(data.choices[0].message.content);
//     return data.choices[0].message.content; //reply
//   }  catch (err) {
//     console.error(err);

//     res.status(500).json({
//       error: err.message
//     });
//   }
// };

// export default getOpenRouterAPIResponse;




// -------------------

import "dotenv/config";

const FREE_MODELS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "qwen/qwen3-coder:free",
  "google/gemma-3-27b-it:free",
  "mistralai/mistral-7b-instruct:free",
  "nousresearch/hermes-3-llama-3.1-8b:free",
];

const getOpenRouterAPIResponse = async (message) => {
  let lastError = null;

  for (const model of FREE_MODELS) {
    try {
      console.log(`Trying model: ${model}`);

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: message }]
        })
      });

      const data = await response.json();

      if (data.error) {
        console.log(`Model ${model} failed: ${data.error.message}`);
        lastError = data.error.message;
        continue; // try next model
      }

      if (!data.choices || !data.choices[0]) {
        console.log(`Model ${model} returned no choices`);
        lastError = "No choices returned";
        continue;
      }

      console.log(`Success with model: ${model}`);
      return data.choices[0].message.content;

    } catch (err) {
      console.log(`Model ${model} threw error: ${err.message}`);
      lastError = err.message;
      continue;
    }
  }

  throw new Error(`All models failed. Last error: ${lastError}`);
};

export default getOpenRouterAPIResponse;