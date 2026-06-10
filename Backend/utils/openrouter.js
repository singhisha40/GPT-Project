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

const getOpenRouterAPIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
    },
    body: JSON.stringify({
      model: "qwen/qwen3-coder:free",
      messages: [{ role: "user", content: message }]
    })
  };

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", options);
  const data = await response.json();
  
  console.log("OpenRouter response:", JSON.stringify(data)); 

  if (!data.choices || !data.choices[0]) {
    throw new Error(data.error?.message || "No response from OpenRouter");
  }

  return data.choices[0].message.content;
};

export default getOpenRouterAPIResponse;