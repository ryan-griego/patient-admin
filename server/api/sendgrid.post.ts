export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const sgRequest = await $fetch("https://api.sendgrid.com/v3/mail/send",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + config.SENDGRID_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    }).catch((error) => {
      return error;
    });
  return sgRequest;
});


// const SendEmail = async () => {
//   let msg = {
//     "personalizations": [{
//       to: [{
//         email: "ryangriego@gmail.com",
//         name: "Name"
//       }]
//     }],
//     "from": {
//       email: "ryangriego@gmail.com",
//       name: "My app"
//     },
//     "subject": "Test message!",
//     "content": [{
//       type: "text/plain",
//       value: "Test message"
//     }, {
//       type: "text/html",
//       value: "<h1>Test message!</h1>"
//     }]
//   }
//   const {
//     data
//   } = await useFetch("/api/sendgrid", {
//     method: "POST",
//     body: msg
//   });
// }
