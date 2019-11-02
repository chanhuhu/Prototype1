<template>
    <div class="container--fluid">
        <NavBar/>
        <v-container cols="12" sm="6" md="4">
            <v-row>
                <v-col>
                    <v-form >
                        <v-card>
                            <v-card-title>เพิ่มใบเสร็จ</v-card-title>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                            label="Remark"
                                            placeholder="หมายเหตุ"
                                            v-model="form.remark"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                            label="Cost"
                                            placeholder="จำนวนเงินทั้งหมด"
                                            v-model="form.cost"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <input
                                            type="file"
                                            ref="files"
                                            multiple
                                            @change="selectFile"
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
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
                                        <v-date-picker
                                                v-model="date"
                                                type="month"
                                                no-title
                                                scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                    text
                                                    color="primary"
                                                    @click="menu = false"
                                            >Cancel
                                            </v-btn>
                                            <v-btn
                                                    text
                                                    color="primary"
                                                    @click="$refs.menu.save(date)"
                                            >OK
                                            </v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn
                                            block
                                            color="primary"
                                            type="submit"
                                    >เพิ่ม
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import NavBar from "../components/Navbar";
    import {mapActions} from "vuex";

    export default {
        name: "Client",
        components: {
            NavBar,
        },
        data: () => ({
            form: {
                remark: '',
                cost: '',
                files: []
            },
            date: new Date().toISOString().substr(0, 7),
            menu: false,
        }),
        methods: {
            // ...mapActions('receipt', ['uploadReceipt']),
            selectFile: function () {
                const files = this.$refs.files.files;
                this.form.files = [
                    ...this.files,
                ];
                console.log(this.form.files);
            },
            // upload: function () {
            //     this.uploadReceipt(this.form)
            // }
        },
        computed: {}
    }
</script>

<style scoped>
</style>
