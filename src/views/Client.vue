<template>
    <div class="container--fluid">
        <NavBar/>
        <v-content>
            <div
                    v-if="isDashBoard"
                    class="newInvoice"
            >
                <v-row justify="center">
                    <v-col cols="12">
                        <v-card
                                tile
                        >
                            <v-form
                                    class="pt-1"
                                    @submit.prevent="clickToCreateReceipt"
                            >
                                <v-row>
                                    <v-col>
                                        <v-card-title>เพิ่มใบเสร็จ</v-card-title>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col
                                            cols="10"
                                            sm="6"
                                    >
                                        <v-overflow-btn
                                                v-model="activityName"
                                                class="my-2"
                                                @change="selectActivity"
                                                :items="this.activities"
                                                item-value="id"
                                                item-text="activity"
                                                label="กิจกรรมที่มีอยู่"
                                                editable
                                                dense
                                        ></v-overflow-btn>
                                    </v-col>
                                    <v-col
                                            style="padding-top: 21px"
                                            cols="2"
                                            sm="6"
                                    >
                                        <v-dialog v-model="dialog" max-width="500px">
                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                        icon
                                                        class="mx-auto"
                                                        color="error"
                                                        dark
                                                        v-on="on"
                                                >
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-card>
                                                <v-card-title>
                                                    <span class="headline">เพิ่มกิจกรรม</span>
                                                </v-card-title>

                                                <v-card-text>
                                                    <v-container>
                                                        <v-row>
                                                            <v-col cols="12" sm="12" md="12">
                                                                <v-text-field
                                                                        dense
                                                                        placeholder="ชื่อกิจกรรม"
                                                                        v-model="newActivity"
                                                                ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                    </v-container>
                                                </v-card-text>

                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="blue darken-1" text @click="dialog = false"
                                                    >Cancel
                                                    </v-btn>
                                                    <v-btn color="blue darken-1" text @click="clickToCreateActivity"
                                                    >
                                                        Save
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
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
                                                        dense
                                                        v-model="date"
                                                        label="เลิอกเดิอนที่ต้องการขอเบิกเงิน"
                                                        readonly
                                                        v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                    v-model="date"
                                                    type="month"
                                                    no-title
                                                    scrollable
                                            >
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
                                                dense
                                                placeholder="จำนวนเงินทั้งหมด"
                                                v-model="cost"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <label for="file-upload" class="custom-file-upload">
                                            <v-icon>mdi-upload</v-icon>
                                            Upload
                                        </label>
                                        <input
                                                id="file-upload"
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
                                                dense
                                                placeholder="หมายเหตุ"
                                                v-model="remark"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="pb-0">
                                        <v-btn
                                                tile
                                                block
                                                color="#30E7F2"
                                                type="submit"
                                        >เพิ่ม
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
            <div
                    class="Log"
                    v-else
            >
                <v-row>
                    <v-col>
                        <v-data-table
                                dense :headers="headers"
                                :items="receipt"
                                item-key="id"
                                class="elevation-1"
                        ></v-data-table>
                    </v-col>
                </v-row>
            </div>
        </v-content>
        <v-footer
                padless
                app
        >
            <v-toolbar color="#EE6262">
                <div class="d-flex row justify-space-around">
                    <v-btn
                            text
                            v-ripple
                            color="white"
                            @click="isDashBoard = false"
                    >Log History
                    </v-btn>
                    <v-btn
                            text
                            v-ripple
                            color="white"
                            @click="isDashBoard = true"
                    >New Invoice
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
            activityName: '',
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
                    sortable: true,
                    value: 'id',
                },
                {text: 'ชื่อกิจกรรม', value: 'activity'},
                {text: 'จำนวนเงิน', value: 'cost'},
                {text: 'เดือนที่ขอเบิก', value: 'date'},
                {text: 'หมายเหตุ', value: 'remark'},
                {text: 'สถานะ', value: 'name'},
            ],
            dialog: false,
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
                this.activityName = '';
                this.newActivity = '';
                this.dialog = false;
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
                this.isDashBoard = false;
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
    input[type="file"] {
        display: none;
    }

    .custom-file-upload {
        border: 1px solid #ccc;
        display: inline-block;
        padding: 6px 12px;
        cursor: pointer;
    }
</style>
