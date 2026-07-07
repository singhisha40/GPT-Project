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
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    if (!data.choices || !data.choices[0]) {
      throw new Error("No choices returned from OpenRouter");
    }

    return data.choices[0].message.content;

  } catch (err) {
    console.error("OpenRouter error:", err.message);
    throw err; // let the route handler's catch block send the 500
  }
};

export default getOpenRouterAPIResponse;

