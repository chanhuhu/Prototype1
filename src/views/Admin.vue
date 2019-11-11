<template>
    <div class="container--fluid">
        <navbar/>
        <v-content>
            <v-card tile class="pt-1">
                <v-carousel>
                    <v-carousel-item
                            v-for="(image,index) in images"
                            :key="index"
                            :src="image.file_name"
                    ></v-carousel-item>
                </v-carousel>
                <v-sheet color="rgba(0, 0 , 0, 0.12)">
                    <v-row>
                        <v-col>
                            <v-card-text>
                                <div class="headline">
                                    <v-row>
                                        <v-col>
                                            รหัสใบเสร็จ: {{receiptDetails.id}}<br/>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            ชื่อกิจกรรม: {{receiptDetails.activity.activity}}
                                        </v-col>
                                        <v-col>
                                            เดือนที่ขอเบิก: {{receiptDetails.date}}
                                        </v-col>
                                    </v-row>
                                </div>
                                <v-row>
                                    <v-col>
                                        <v-simple-table>
                                            <template v-slot:default>
                                                <thead>
                                                <tr>
                                                    <th class="text-left">จำนวนเงิน</th>
                                                    <th class="text-left">หมายเหตุ</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>{{ receiptDetails.cost }}</td>
                                                    <td>{{ receiptDetails.remark }}</td>
                                                </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col
                                cols="12"
                                sm="6"
                        >
                            <v-text-field
                                    v-model="cost"
                                    label="ตรวจสอบยอดเงิน"
                            ></v-text-field>
                        </v-col>
                        <v-col
                                cols="12"
                                sm="6"
                        >
                            <v-row justify="center">
                                <v-card-actions>
                                    <v-dialog v-model="dialog" persistent max-width="290">
                                        <template v-slot:activator="{ on }">
                                            <v-btn
                                                    block
                                                    color="secondary"
                                                    @click="checkCost"
                                                    v-on="on"
                                            >ตรวจสอบยอดเงิน
                                            </v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title class="headline">{{message}}</v-card-title>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="green darken-1" text @click="dialog = false">OK</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-card-actions>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-card>
        </v-content>
        <v-footer padless height="50px" color="#EE6262">
            <div class="d-flex  row justify-space-around">
                <v-btn color="success" @click="clickToUpdateReceiptStatus(9)">อนุมัติ</v-btn>
                <v-btn color="error" @click="clickToUpdateReceiptStatus(10)">ไม่อนุมัติ</v-btn>
            </div>
        </v-footer>
    </div>
</template>

<script>
    import navbar from "../components/Navbar";
    import axios from 'axios';
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "Admin",
        components: {
            navbar,
        },
        data: () => ({
            message: '',
            cost: '',
            dialog: false,
        }),
        methods: {
            ...mapActions('receipt', ['getImages', 'updateReceipt']),
            clickToUpdateReceiptStatus: function (status_id) {
                this.updateReceipt({
                    receipt_id: this.receiptDetails.id,
                    updates: {
                        accountant_id: this.$store.state.user.user.id,
                        status_id: status_id
                    }
                });
            },
            checkCost: function () {
                try {
                    axios.post('http://localhost:8000/api/receipt/check/' + this.receiptDetails.id, {
                        cost: this.cost
                    }).then(res => {
                        console.log(res);
                        this.message = res.data.data
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        },
        computed: {
            receiptDetails: function () {
                if (this.$store.state.receipt.receipts[this.$route.params.receipt_id]) {
                    return this.$store.state.receipt.receipts[this.$route.params.receipt_id]
                }
                return {}
            },
            ...mapGetters('receipt', ['images'])
        },
        mounted() {
            this.getImages({receipt_id: this.$route.params.receipt_id});
        },
    }


</script>

<style lang="scss" scoped>
    .showImage {
        height: 60vh;
        background-color: rgb(241, 239, 239);
        border-radius: 15px;

        img {
            margin: 0;
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-height: 13vh;
        }
    }

    .button {
        width: 5rem;
    }
</style>
