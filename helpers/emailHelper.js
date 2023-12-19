const createEmailRequestBody = (content) => {
  const emailRequestBody = {
    from: "ryangriego@gmail.com",
    personalizations: [
      {
        to: ["ryangriego@gmail.com"],
        subject: "Hello there!"
      }
    ],
    reply_to: "ryangriego@gmail.com",
    content
  }

  return emailRequestBody
}

module.exports = {
  createEmailRequestBody
}
