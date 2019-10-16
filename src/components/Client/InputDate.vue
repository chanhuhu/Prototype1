<template>
    <v-col cols="12" sm="6" md="4">
        <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="290px"
        >
            <template v-slot:activator="{ on }">
                <v-text-field
                        v-model="date"
                        label="Picker in menu"
                        readonly
                        v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker v-model="date" type="month" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
        </v-menu>
    </v-col>
</template>

<script>
    export default {
        name: "InputDate",
        data: () => ({
            date: new Date().toISOString().substr(0, 7),
            menu: false,
        })
    }
</script>

<style scoped>
</style>
