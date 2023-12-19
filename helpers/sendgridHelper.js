const client = require('@sendgrid/mail');

client.setApiKey("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");

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
