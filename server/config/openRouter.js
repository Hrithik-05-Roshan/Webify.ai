const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";
const openRouterApiKey = process.env.OPENROUTER_API;

const model = "deepseek/deepseek-chat";

const generateResponse = async (prompt) => {
  const res = await fetch(openRouterUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openRouterApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: "system", content: "You must return ONLY valid Raw Json" },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    }),
  });

  if(!res.ok){
    const err = await res.text()
    throw new Error("openRouter err"+err)
  }

  const data = await res.json()

  return data
};
