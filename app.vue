<template>
    <v-container>
      <v-row align="center"
        justify="center">
        <v-col
          class="mb-5"
          cols="12"
        >
    <v-data-table
      :headers="headers"
      :items="patients"
      :sort-by="[{ key: 'name', order: 'asc' }]"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Patient Admin</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn color="primary" dark class="mb-2" v-bind="props">
                New Patient
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Patient name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.calories"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fat"
                        label="Medication"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.carbs"
                        label="Gender"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.condition"
                        label="Condition"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this patient?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
        <v-icon size="small" @click="SendEmail(item)"> mdi-mail </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>

     </v-col>
    </v-row>
  </v-container>

 </template>

<script>


  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          title: 'Name',
          align: 'start',
          sortable: false,
          key: 'name',
        },
        { title: 'Email', key: 'email' },
        { title: 'Medication', key: 'medication' },
        { title: 'Gender', key: 'gender' },
        { title: 'Condition', key: 'condition' },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      patients: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        medication: '',
        gender: '',
        condition: 'Diabetes',
      },
      defaultItem: {
        name: '',
        email: '',
        medication: '',
        gender: '',
        condition: 'Diabetes',
      },
       msg: {
      "personalizations": [
        {
          to: [
            {
              email: "test@test.com",
      name: "Name"
            }
          ]
        }
      ],
      "from": {
        email: "app@myappdomain.xyz",
        name: "Ryan Griego - Web Developer"
      },
      "subject": "Test message!",
      "content": [
        {
          type: "text/plain",
          value: "Test message"
        },
        {
          type: "text/html",
          value: "<h1>Test message!</h1>"
        }
      ]
    },

    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
      dialogDelete(val) {
        val || this.closeDelete()
      },
    },

    created() {
      this.initialize()
    },

    methods: {
      initialize() {
        this.patients = [
          {
            name: 'Johnny',
            email: 'ryangriego@gmail.com',
            medication: 'Ozempic',
            gender: 'male',
            condition: 'Diabetes',
          },
          {
            name: 'Lisa',
            email: 'ryangriego@gmail.com',
            medication: 'Ozempic',
            gender: 'female',
            condition: 'Diabetes',
          },
          {
            name: 'Mark',
            email: 'ryangriego@gmail.com',
            medication: 'Ozempic',
            gender: 'male',
            condition: 'Diabetes',
          },
        ]
      },



      editItem(item) {
        this.editedIndex = this.patients.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        this.editedIndex = this.patients.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

    async SendEmail(item) {
      let html = ""

      let name =  item.name;
      let medication = item.medication;
      let gender = item.gender;
      let condition = item.condition;
      heroImage = `src="https://res.cloudinary.com/dm7y3yvjp/image/upload/v1703726366/LMD_${gender}.jpg"`;

      let msg = {
        "personalizations": [
          {
            to: [
              {
                email: "ryangriego@gmail.com",
      name: "Name"
              }
            ]
          }
        ],
        "from": {
          email: "ryangriego@gmail.com",
          name: "Ryan Griego / Web Developer"
        },
        "subject": `Recently applicant for ${medication} at ${gender} - a few resources to get to know me`,
        "content": [
          {
            type: "text/plain",
            value: `Recently applicant for ${medication} at ${gender} - a few resources to get to know me`
          },
          {
            type: "text/html",
            value: `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title>
  </title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if mso]>
        <noscript>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        </noscript>
        <![endif]-->
  <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-40 {
        width: 40% !important;
        max-width: 40%;
      }

      .mj-column-per-60 {
        width: 60% !important;
        max-width: 60%;
      }

      .mj-column-px-200 {
        width: 200px !important;
        max-width: 200px;
      }

      .mj-column-px-400 {
        width: 400px !important;
        max-width: 400px;
      }

      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }

      .mj-column-per-33-333333333333336 {
        width: 33.333333333333336% !important;
        max-width: 33.333333333333336%;
      }

      .mj-column-per-50 {
        width: 50% !important;
        max-width: 50%;
      }
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width: 480px) {
      .emailImage {
        height: auto !important;
        max-width: 600px !important;
        width: 100% !important;
      }
    }
         @media only screen and (min-width: 480px){
        .social-icons-footer{
            text-align:right !important;

        }
    }
  </style>
  <style media="screen and (min-width:480px)">
    .moz-text-html .mj-column-per-40 {
      width: 40% !important;
      max-width: 40%;
    }

    .moz-text-html .mj-column-per-60 {
      width: 60% !important;
      max-width: 60%;
    }

    .moz-text-html .mj-column-px-200 {
      width: 200px !important;
      max-width: 200px;
    }

    .moz-text-html .mj-column-px-400 {
      width: 400px !important;
      max-width: 400px;
    }

    .moz-text-html .mj-column-per-100 {
      width: 100% !important;
      max-width: 100%;
    }

    .moz-text-html .mj-column-per-33-333333333333336 {
      width: 33.333333333333336% !important;
      max-width: 33.333333333333336%;
    }

    .moz-text-html .mj-column-per-50 {
      width: 50% !important;
      max-width: 50%;
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }

      td.mj-full-width-mobile {
        width: auto !important;
      }
    }

    noinput.mj-menu-checkbox {
      display: block !important;
      max-height: none !important;
      visibility: visible !important;
    }

    @media only screen and (max-width:480px) {
      .mj-menu-checkbox[type="checkbox"]~.mj-inline-links {
        display: none !important;
      }

      .mj-menu-checkbox[type="checkbox"]:checked~.mj-inline-links,
      .mj-menu-checkbox[type="checkbox"]~.mj-menu-trigger {
        display: block !important;
        max-width: none !important;
        max-height: none !important;
        font-size: inherit !important;
      }

      .mj-menu-checkbox[type="checkbox"]~.mj-inline-links>a {
        display: block !important;
      }

      .mj-menu-checkbox[type="checkbox"]:checked~.mj-menu-trigger .mj-menu-icon-close {
        display: block !important;
      }

      .mj-menu-checkbox[type="checkbox"]:checked~.mj-menu-trigger .mj-menu-icon-open {
        display: none !important;
      }
    }
  </style>
</head>

<body style="word-spacing:normal;background-color:#d6dde5;">
  <div style="background-color:#d6dde5;">
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="background:#ffffff;background-color:#ffffff;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:240px;" ><![endif]-->
              <div class="mj-column-per-40 mj-outlook-group-fix"
                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                  width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                          style="border-collapse:collapse;border-spacing:0px;">
                          <tbody>
                            <tr>
                            <td>
                              <a href="https://www.ryangriego.com/" target="_blank">
                                <img alt="Ryan Griego logo" height="auto" class="emailImage"
                                  src="https://res.cloudinary.com/dm7y3yvjp/image/upload/v1703108432/lifemd-logo_ecac59.png"
                                  style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" />
                              </a>
                            </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:360px;" ><![endif]-->
              <div class="mj-column-per-60 mj-outlook-group-fix"
                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                  width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding-top:5px;word-break:break-word;">
                        <!--[if !mso><!-->
                        <input type="checkbox" id="c77f46b2b2fd0f30" class="mj-menu-checkbox"
                          style="display:none !important; max-height:0; visibility:hidden;" />
                        <!--<![endif]-->
                        <div class="mj-menu-trigger"
                          style="display:none;max-height:0px;max-width:0px;font-size:0px;overflow:hidden;">
                          <label for="c77f46b2b2fd0f30" class="mj-menu-label"
                            style="display:block;cursor:pointer;mso-hide:all;-moz-user-select:none;user-select:none;color:#303030;font-size:30px;font-family:Ubuntu, Helvetica, Arial, sans-serif;text-transform:uppercase;text-decoration:none;line-height:30px;padding:10px;"
                            align="center">
                            <span class="mj-menu-icon-open" style="mso-hide:all;"> &#9776; </span>
                            <span class="mj-menu-icon-close" style="display:none;mso-hide:all;"> &#8855; </span>
                          </label>
                        </div>
                        <div class="mj-inline-links" style="">
                          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center"><tr><td style="padding:15px 10px;" class="" ><![endif]-->
                          <a class="mj-link" href="https://members.lifemd.com/"
                            target="_blank"
                            style="display:inline-block;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:22px;text-decoration:none;text-transform:uppercase;padding:15px 10px;">
                            <span style="letter-spacing:.2px">Member Portal</span>
                          </a>
                          <!--[if mso | IE]></td><td style="padding:15px 10px;" class="" ><![endif]-->
                          <a class="mj-link"
                            href="https://lifemd.com/learn"
                            target="_blank"
                            style="display:inline-block;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:22px;text-decoration:none;text-transform:uppercase;padding:15px 10px;">
                            <span style="letter-spacing:.2px">Blog</span>
                          </a>
                          <!--[if mso | IE]></td><td style="padding:15px 10px;" class="" ><![endif]-->

                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#1a9ba2" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#1a9ba2;background-color:#1a9ba2;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="background:#1a9ba2;background-color:#1a9ba2;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:200px;" ><![endif]-->
              <div class="mj-column-px-200 mj-outlook-group-fix"
                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                  width="100%">
                  <tbody>
                    <tr>
                      <td align="left"
                        style="font-size:0px;padding:10px 25px;padding-top:40px;padding-right:25px;padding-bottom:10px;padding-left:25px;word-break:break-word;">
                        <div
                          style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:40px;line-height:1;text-align:left;color:#ffffff;">
                          <p style="font-size: 22px;line-height: 1.8rem">Dear ${name},</p>
                          <p style="font-size: 13px;line-height: 1.2rem;">
Your commitment to ${condition} is commendable and showcases your inner strength and resilience. Each healthy choice in addition to ${medication} is a step toward a brighter, more vibrant future.
Wishing you continued success and good health,<br /></p>
                          <!-- <p>Try Me</p>
          <p>FREE</p> -->
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" vertical-align="middle"
                        style="font-size:0px;padding:15px 30px;padding-right:25px;padding-bottom:10px;padding-left:25px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                          style="border-collapse:separate;line-height:100%;">
                          <tr>
                            <td align="center" bgcolor="#ffffff" role="presentation"
                              style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#ffffff;"
                              valign="middle">
                              <a href="https://www.ryangriego.com/"
                                style="display:inline-block;background:#ffffff;color:#1a9ba2;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;"
                                target="_blank"> View Profile </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:400px;" ><![endif]-->
              <div class="mj-column-px-400 mj-outlook-group-fix"
                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                  width="100%">
                  <tbody>
                    <tr>
                      <td align="center"
                        style="font-size:0px;padding:10px 25px;padding-top:0;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                          style="border-collapse:collapse;border-spacing:0px;">
                          <tbody>
                            <tr>
                              <td style="width:400px;">
                                <img alt="Doctors" height="auto"
                                  ${heroImage}
                                  style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                  width="400" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#2f323b" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->

    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#eeeee" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#eeeee;background-color:#eeeee;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="background:#eeeee;background-color:#eeeee;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:10px;padding-top:0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:200px;" ><![endif]-->
              <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix"
                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                  width="100%">
                  <tbody>
                    <tr>
                      <td align="left"
                        style="font-size:0px;padding:10px 25px;padding-top:20px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                          style="border-collapse:collapse;border-spacing:0px;">
                          <tbody>
                            <tr>
                              <td style="width:180px;">
                                <a href="https://www.ryangriego.com/assets/ryan_griego_resume.pdf" target="_blank">
                                  <img alt="Ryan Griego logo" height="auto"
                                    src="https://www.ryangriego.com/images/portfolio-ryan-logo.png"
                                    style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:75%;font-size:13px;"
                                    width="100" />
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:200px;" ><![endif]-->
              <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix"
                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                  width="100%">
                  <tbody>
                    <!-- <mj-text align="center" color="black" font-size="13px" padding-left="25px" padding-right="25px" padding-bottom="0px" padding-top="25px" href="tel:+19493108534">
Call me maybe?
        </mj-text> -->
                    <tr>
                      <td align="center" vertical-align="middle"
                        style="font-size:0px;padding:15px 30px;padding-right:5px;padding-bottom:10px;padding-left:5px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                          style="border-collapse:separate;line-height:100%;">
                          <tr>
                            <td align="center" bgcolor="#1a9ba2" role="presentation"
                              style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#1a9ba2;"
                              valign="middle">
                              <a href="tel:+19493108534"
                                style="display:inline-block;background:#1a9ba2;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;"
                                target="_blank"> Call (949) 310 - 8534 </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:200px;" ><![endif]-->
              <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix social-icons-footer"
                style="font-size:0px;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td style="font-size:0px;padding:10px 25px;padding-top:20px;word-break:break-word;">
                        <!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]-->
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                          style="float:none;display:inline-table;">
                          <tr>
                            <td style="padding:4px;vertical-align:middle;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                style="background:#0077b5;border-radius:3px;width:20px;">
                                <tr>
                                  <td style="font-size:0;height:20px;vertical-align:middle;width:20px;">
                                    <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://www.linkedin.com/in/ryan-griego-2134a340/&title=&summary=&source="
                                      target="_blank">
                                      <img height="20" src="https://www.mailjet.com/images/theme/v1/icons/ico-social/linkedin.png"
                                        style="border-radius:3px;display:block;" width="20" />
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <!--[if mso | IE]></td><td><![endif]-->
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                          style="float:none;display:inline-table;">
                          <tr>
                            <td style="padding:4px;vertical-align:middle;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                style="background:#000000;border-radius:3px;width:20px;">
                                <tr>
                                  <td style="font-size:0;height:20px;vertical-align:middle;width:20px;">
                                    <a href="https://github.com/ryan-griego/" target="_blank">
                                      <img height="20" src="https://www.mailjet.com/images/theme/v1/icons/ico-social/github.png"
                                        style="border-radius:3px;display:block;" width="20" />
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td
              style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
  </div>

</body>
</html>

`
          }
        ]
      }
      const { data } = await useFetch("/api/sendgrid", {
        method: "POST",
        body: msg
      });
    },



      deleteItemConfirm() {
        this.patients.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete() {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.patients[this.editedIndex], this.editedItem)
        } else {
          this.patients.push(this.editedItem)
        }
        this.close()
      },




    },
  }




</script>




<!--
<template>
  <div id="app">
    <button @click="sendMail">Test</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      emailTemplateString: "<p>Hello world!</p>",
    };
  },
  methods: {
    async sendMail() {
      const result = await fetch("http://localhost:3000/sendmail", {
        body: JSON.stringify(this.createEmailBody()),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (result.status === 200) {
        alert("Mail sent successfully!");
      }
    },
    createEmailBody() {
      return {
        content: [
          {
            type: "text/html",
            value: this.emailTemplateString,
          },
        ],
      };
    },
  },
};
</script> -->
