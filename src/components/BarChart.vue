<template>
    <v-container fluid>
        <v-card class="ma-auto" color="teal darken-3">
            <v-card-text>
                <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-sparkline
                            class="pt-1"
                            :value="costs"
                            color="rgba(255, 255, 255, .7)"
                            :labels="months"
                            auto-line-width
                            smooth="false"
                            type="bar"
                            show-labels

                    >
                    </v-sparkline>
                </v-sheet>
            </v-card-text>
            <v-card-text>
                <v-row>
                    <v-col>
                        <div class="display-1 font-weight-thin text-center white--text">ยอดใช้ยอดเบิกในแต่ละเดือน</div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="headline text-center white--text">รวม: {{yearlyCost}} บาท</div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        data: () => ({
            months: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
        }),
        methods: {
            ...mapActions('receipt', ['getLastCost']),
        },
        mounted() {
            this.getLastCost();
        },
        computed: {
            costs: function () {
                if (this.$store.state.receipt.receipt) {
                    return Object.values(this.$store.state.receipt.receipt)
                }
                return []
            },
            yearlyCost: function () {
                if (this.$store.state.receipt.receipt) {
                    let totalYearCost = 0;
                    for (let i = 0; i < this.$store.state.receipt.receipt.length; i++) {
                        totalYearCost += this.$store.state.receipt.receipt[i]
                    }
                    return totalYearCost
                }
                return {}
            }
        }
    }
</script>
