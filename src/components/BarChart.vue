<template>
    <v-container fluid>
        <v-card class="ma-auto">
            <v-card-text>
                <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-sparkline
                            class="pt-1"
                            :value="value"
                            color="rgba(255, 255, 255, .7)"
                            height="300"
                            :labels="[`Jan 61`, 'February', 'March', '']"
                            auto-line-width
                            smooth="false"
                            type="bar"
                    >
                    </v-sparkline>
                </v-sheet>
            </v-card-text>
            <v-card-text>
                <v-row>
                    <div class="display-1 font-weight-thin">ยอดใช้จ่าย 12เดือนหลังสุด</div>
                </v-row>
                <v-row>
                    <div>
                        รวม: 7,330,133.67 บาท
                    </div>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>

    export default {
        data: () => ({
            value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            month: ['Jan']
        }),
    }
</script>
