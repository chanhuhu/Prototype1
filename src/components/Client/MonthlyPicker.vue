<template>
    <div>
    <v-date-picker
            v-model="picker"
            :landscape="landscape"
            :reactive="reactive"
            :full-width="fullWidth"
            :show-current="showCurrent"
            :type="month ? 'month' : 'date'"
            :multiple="multiple"
            :readonly="readonly"
            :disabled="disabled"
            :events="enableEvents ? functionEvents : null"
    ></v-date-picker>
        {{ picker }}
    </div>
</template>

<script>
    export default {
        name: "MonthlyPicker",
        data () {
            return {
                picker: new Date().toISOString().substr(0, 10),
                landscape: false,
                reactive: false,
                fullWidth: false,
                showCurrent: true,
                month: true,
                multiple: false,
                readonly: false,
                disabled: false,
                enableEvents: false,
            }
        },

        computed: {
            functionEvents () {
                return this.month ? this.monthFunctionEvents : this.dateFunctionEvents
            },
        },

        methods: {
            dateFunctionEvents (date) {
                const [,, day] = date.split('-')
                if ([12, 17, 28].includes(parseInt(day, 10))) return true
                if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
                return false
            },
            monthFunctionEvents (date) {
                const month = parseInt(date.split('-')[1], 10)
                if ([1, 3, 7].includes(month)) return true
                if ([2, 5, 12].includes(month)) return ['error', 'purple', 'rgba(0, 128, 0, 0.5)']
                return false
            },
        }
    }
</script>

<style scoped>

</style>
