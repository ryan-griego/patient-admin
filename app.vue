<template>
   <div id="app">
      <button @click="sendMail"></button>
    </div>
  <v-data-table
    :headers="headers"
    :items="patients"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Patient Admin</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark class="mb-2" v-bind="props">
              New Item
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
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
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
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
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
      <v-icon size="small" @click="sendEmail(item)"> mdi-mail </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
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
        { title: 'isVip', key: 'isvip' },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      patients: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        medication: '',
        gender: '',
        isvip: true,
      },
      defaultItem: {
        name: '',
        email: '',
        medication: '',
        gender: '',
        isvip: true,
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
            name: 'Don',
            email: 'ryangriego@gmail.com',
            medication: 6.0,
            gender: 24,
            isvip: 4.0,
          },
          {
            name: 'Ice cream sandwich',
            email: 237,
            medication: 9.0,
            gender: 37,
            isvip: 4.3,
          },
          {
            name: 'Eclair',
            email: 262,
            medication: 16.0,
            gender: 23,
            isvip: 6.0,
          },
          {
            name: 'Cupcake',
            email: 305,
            medication: 3.7,
            gender: 67,
            isvip: 4.3,
          },
          {
            name: 'Gingerbread',
            email: 356,
            medication: 16.0,
            gender: 49,
            isvip: 3.9,
          },
          {
            name: 'Jelly bean',
            email: 375,
            medication: 0.0,
            gender: 94,
            isvip: 0.0,
          },
          {
            name: 'Lollipop',
            email: 392,
            medication: 0.2,
            gender: 98,
            isvip: 0,
          },
          {
            name: 'Honeycomb',
            email: 408,
            medication: 3.2,
            gender: 87,
            isvip: 6.5,
          },
          {
            name: 'Donut',
            email: 452,
            medication: 25.0,
            gender: 51,
            isvip: 4.9,
          },
          {
            name: 'KitKat',
            email: 518,
            medication: 26.0,
            gender: 65,
            isvip: 7,
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

      sendEmail(item) {
        console.log('log the item being clicked', item);
      this.editedIndex = this.patients.indexOf(item)
      this.editedItem = Object.assign({}, item)
      // this.dialogDelete = true
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
