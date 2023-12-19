const client = require('@sendgrid/mail');

client.setApiKey("");

const sendMessage = async (message) => {
  let response = null;

  try {
    response = await client.send(message)
  } catch (error) {
    if (error.response) {
      console.error(error.response.body)
      response = error.response.body;
    }
  }

  return response
}

module.exports = {
  sendMessage
}
