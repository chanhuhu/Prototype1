<template>
    <div class="container--fluid">
        <NavBar/>
        <v-container fluid>
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title>เพิ่มใบเสร็จ</v-card-title>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    label="Title"
                                    placeholder="ชื่อใบเสร็จ"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    label="Cost"
                                    placeholder="จำนวนเงินทั้งหมด"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-file-input
                                    accept="image/*"
                                    label="File input"
                                ></v-file-input>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <InputDate></InputDate>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-btn
                                    block
                                    color="primary"
                                >เพิ่ม
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="text-center ">
                    <div>
                        1
                        <p>
                            ชื่อ : {{ username }} <br/>
                            สถานะ : อนุมัติ
                        </p>
                    </div>
                    <v-item-group>

                    </v-item-group>
                </v-col>
            </v-row>
            <MonthlyPicker></MonthlyPicker>
        </v-container>
    </div>
</template>

<script>
    import NavBar from "../components/Navbar";
    import MonthlyPicker from "../components/Client/MonthlyPicker";
    import {sync, call} from "vuex-pathify";
    import InputDate from "../components/Client/InputDate";

    export default {
        name: "Client",
        components: {
            NavBar, MonthlyPicker, InputDate
        }, data: () => ({
        }), computed: {
            username: sync('receipt/email')
        }
    }
</script>

<style scoped>
</style>
