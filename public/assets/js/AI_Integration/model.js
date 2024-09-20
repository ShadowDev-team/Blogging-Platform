const { BedrockRuntimeClient, InvokeModelCommand} = require("@aws-sdk/client-bedrock-runtime");
  
  // Create a Bedrock Runtime client in the AWS Region of your choice.
//   const client = new BedrockRuntimeClient();
  
  // Uncomment these lines if you are not using a .env file
  const client = new BedrockRuntimeClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
      secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
    },
  });
  
  // Set the model ID, e.g., Llama 3 8B Instruct.
  const modelId = "meta.llama3-70b-instruct-v1:0";
  
  const userContext = ``;
  
  const userString = (msg) => `user${msg}`;
  const assistantString = (msg) => `assistant${msg}`;
  
  const generateMsgs = (messages) => {
    return messages.map((msg) => {
      if (msg.role == "user") {
        return userString(msg.content);
      }
      if (msg.role == "assistant") {
        return assistantString(msg.content);
      }
    });
  };
  
  const generateSystemPrompt = (prompt) => {
    return `
          system
          ${prompt}
    `;
  };
  
  const systemPromptText = `
  You are an AI assistant specialized in something
  ----------
  [User Context]
  ${userContext}
  `;
  
  const systemPrompt = generateSystemPrompt(systemPromptText);
  
  module.exports = async (rawMessages = [], userId = null) => {
    const msgs = rawMessages.slice(Math.max(rawMessages.length - 5, 0));
    const messagesArray = generateMsgs(msgs);
    const messages = messagesArray.join('\n');
    try {
      const prompt = `
        ${systemPrompt}
        ${messages}
        assistant
      `;
  
      // Format the request payload using the model's native structure.
      const request = {
        prompt,
        max_gen_len: 512,
        temperature: 0.2,
        top_p: 0.9,
      };
  
      // Encode and send the request.
      const response = await client.send(
        new InvokeModelCommand({
          contentType: "application/json",
          body: JSON.stringify(request),
          modelId,
        })
      );
  
      // Decode the native response body.
      const nativeResponse = JSON.parse(new TextDecoder().decode(response.body));
  
      // Extract and print the generated text.
      const responseText = nativeResponse.generation;
      return responseText;
    } catch (err) {
      return err;
    }
  };