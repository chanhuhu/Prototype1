<template>
    <div class="container--fluid">
        <navbar/>
        <v-content>
            <v-card>
                <v-card-title>{{receiptDetails.activity.name}}</v-card-title>
                <v-carousel>
                    <v-carousel-item
                            v-for="(image,index) in images"
                            :key="index"
                            :src="image.file_name"
                    ></v-carousel-item>
                </v-carousel>
                <pre>{{receiptDetails}}</pre>
                <v-container>
                    <v-row>
                        <v-text-field
                                label="สำหรับกรอกเพื่อตรวจสอบยอดเงินในรูปว่าตรงกับยอดที่พนักงานกรอกไหม"></v-text-field>
                        <v-btn @click="clickToUpdateReceiptStatus(9)">อนุมัติ</v-btn>
                        <v-btn @click="clickToUpdateReceiptStatus(10)">ไม่อนุมัติ</v-btn>
                        <v-btn>ตรวจสอบยอดเงิน</v-btn>
                    </v-row>
                </v-container>
            </v-card>
        </v-content>
    </div>
</template>

<script>
    import navbar from "../components/Navbar";
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "Admin",
        components: {
            navbar,
        },
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
