<template>
    <div class="container--fluid">
        <NavBar/>
        <v-content>
            <v-card
                    v-if="isDashBoard"
                    class="rounded-card"
            >
                <v-row>
                    <v-card-title>เพิ่มกิจกรรม</v-card-title>
                </v-row>
                <v-form
                        class="pt-1"
                        @submit.prevent="clickToCreateReceipt"
                >
                    <v-row class="pa-0">
                        <v-col xs6 md3 cols="12">
                            <v-text-field
                                    placeholder="ชื่อกิจกรรม"
                                    v-model="newActivity"
                            ></v-text-field>
                        </v-col>
                        <v-col xs6 md3 cols="12">
                            <v-btn
                                    class="rounded-card"
                                    color="primary"
                                    block
                                    @click="clickToCreateActivity"
                            >สร้างกิจกรรม
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-divider></v-divider>
                    </v-row>
                    <v-row>
                        <v-card-title>เพิ่มใบเสร็จ</v-card-title>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-select
                                    @change="selectActivity"
                                    :items="this.activities"
                                    item-value="id"
                                    item-text="activity"
                                    placeholder="รายชื่อกิจกรรมที่มีอยู่"
                            ></v-select>
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
                                            label="เลิอกเดิอนที่ต้องการขอเบิก"
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
                            <v-text-field
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
                            <v-text-field
                                    placeholder="หมายเหตุ"
                                    v-model="remark"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="pb-0">
                            <v-btn
                                    class="rounded-card"
                                    block
                                    color="primary"
                                    type="submit"
                            >เพิ่ม
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
            <div
                    class="d-flex column col justify-center align-center"
                    v-else
            >
                <v-spacer></v-spacer>
                <v-data-table dense :headers="headers" :items="receipt" item-key="id"
                              class="elevation-1"></v-data-table>
            </div>
        </v-content>
        <v-footer
                padless
                app>
            <v-toolbar color="#EE6262">
                <div class="d-flex row justify-space-around">
                    <v-btn
                            text
                            v-ripple
                            color="white"
                            @click="isDashBoard = false"
                    >DashBoard
                    </v-btn>
                    <v-btn
                            text
                            v-ripple
                            color="white"
                            @click="isDashBoard = true"
                    >NewInvoice
                    </v-btn>
                </div>
            </v-toolbar>
        </v-footer>
    </div>
</template>

<script>
    import NavBar from "../components/Navbar";
    import {mapActions, mapState, mapGetters} from "vuex";

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
            isDashBoard: false,
            alert: true,
            headers: [
                {
                    text: 'Invoice#',
                    align: 'left',
                    sortable: false,
                    value: 'id',
                },
                {text: 'ชื่อกิจกรรม', value: 'activity'},
                {text: 'จำนวนเงิน', value: 'cost'},
                {text: 'เดือนที่ขอเบิก', value: 'date'},
                {text: 'สถานะ', value: 'name'},
            ],
        }),
        methods: {
            ...mapActions('receipt', ['createActivity', 'sendReceipt', 'getUserActivities', 'getReceipt']),
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
            clickToCreateReceipt: async function () {
                this.form = new FormData;
                this.form.append('cost', this.cost);
                this.form.append('date', this.date);
                this.form.append('activity_id', this.activity_id);
                this.form.append('remark', this.remark);

                for (let i = 0; i < this.files.length; i++) {
                    this.form.append('file_name[]', this.files[i]);
                }
                await this.sendReceipt(this.form);
                this.remark = '';
                this.cost = '';
                this.files = [];
                this.isDashBoard = false
                await this.getReceipt({
                    user_id: this.user.id
                });
            },
        },
        computed: {
            ...mapGetters('receipt', ['activities', 'receipt']),
            ...mapState('user', ['user']),
        },
        mounted() {
            this.getUserActivities({
                user_id: this.user.id
            });
            this.getReceipt({
                user_id: this.user.id
            });
        }
    }
</script>

<style scoped>
    .rounded-card {
        border-radius: 0;
    }
</style>
