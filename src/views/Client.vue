<template>
    <div class="container--fluid">
        <NavBar/>
        <v-row>
            <v-col>
                <v-form @submit.prevent="clickToCreateReceipt">
                    <v-card v-if="true">
                        <v-card-title>เพิ่มใบเสร็จ</v-card-title>
                        <v-row>
                            <v-col xs6 md3 cols="12">
                                <v-text-field
                                        label="New activity"
                                        placeholder="ชื่อกิจกรรม"
                                        v-model="newActivity"
                                ></v-text-field>
                            </v-col>
                            <v-col xs6 md3 cols="12">
                                <v-btn
                                        color="primary"
                                        rounded
                                        @click="clickToCreateActivity"
                                >Create
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-select
                                        @change="selectActivity"
                                        :items="this.activities"
                                        item-value="id"
                                        item-text="name"
                                        label="Existing activities"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field
                                        label="Remark"
                                        placeholder="หมายเหตุ"
                                        v-model="remark"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field
                                        label="Cost"
                                        placeholder="จำนวนเงินทั้งหมด"
                                        v-model="cost"
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
                                        accept="image/*"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <div>
                                    <div v-for="(file, index) in files"
                                         :key="index">
                                        <v-layout>
                                            <v-flex xs10>
                                                <div v-text="file.name"></div>
                                            </v-flex>
                                            <v-flex xs2>
                                                <v-btn
                                                        icon
                                                        @click="files.splice(index, 1)">
                                                    <v-icon
                                                    >mdi-close
                                                    </v-icon>
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </div>
                                </div>
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
    </div>
</template>

<script>
    import NavBar from "../components/Navbar";
    import {mapActions, mapState, mapGetters} from "vuex";
    import _ from 'lodash';

    export default {
        name: "Client",
        components: {
            NavBar,
        },
        data: () => ({
            remark: '',
            cost: '',
            files: [],
            newActivity: '',
            date: new Date().toISOString().substr(0, 7),
            menu: false,
            activity_id: '',
            form: new FormData,
        }),
        methods: {
            ...mapActions('receipt', ['createActivity', 'sendReceipt', 'getUserActivities']),
            selectFile: function () {
                const files = this.$refs.files.files;
                this.files = [...files];
            },
            selectActivity: function (e) {
                this.activity_id = e;
            },
            clickToCreateActivity: async function () {
                await this.createActivity({
                    name: this.newActivity,
                    user_id: this.user.id
                });
                await this.getUserActivities({
                    user_id: this.user.id
                });
                this.newActivity = '';

            },
            clickToCreateReceipt: function () {
                this.form = new FormData;
                this.form.append('cost', this.cost);
                this.form.append('date', this.date);
                this.form.append('activity_id', this.activity_id);
                this.form.append('remark', this.remark);

                for (let i = 0; i < this.files.length; i++) {
                    this.form.append('file_name[]', this.files[i]);
                }
                this.sendReceipt(this.form);
            },
        },
        computed: {
            ...mapGetters('receipt', ['activities']),
            ...mapState('user', ['user']),
        },
        mounted() {
            this.getUserActivities({
                user_id: this.user.id
            })
        }
    }
</script>

<style scoped>

</style>
