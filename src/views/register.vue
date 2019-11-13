<template>
    <div class="container--fluid">
        <navbar/>
        <v-container class="bg">
            <div class="register register--min-height">
                <v-card class="register__card--min-width">
                    <form @submit.prevent="register">
                        <v-card-title class="headline">ลงทะเบียนสมัคร</v-card-title>
                        <v-row>
                            <v-col>
                                <VTextField
                                        v-model="form.first"
                                        label="ชื่อ"
                                        dense
                                ></VTextField>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <VTextField
                                        v-model="form.last"
                                        label="นามสกุล"
                                        dense
                                ></VTextField>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <VTextField
                                        v-model="form.email"
                                        label="อีเมล"
                                        dense
                                ></VTextField>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <VTextField
                                        v-model="form.password"
                                        type="password"
                                        label="รหัสผ่าน"
                                        dense
                                ></VTextField>
                            </v-col>

                        </v-row>
                        <v-row>
                            <v-col>
                                <v-select
                                        @change="selectedRole"
                                        :items="roles"
                                        item-value="id"
                                        item-text="name"
                                        label="ตำแหน่ง"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn
                                        class="pb-0"
                                        color="#30E7F2"
                                        type="submit"
                                        block
                                >เพิ่มสมัครชิก
                                </v-btn>
                            </v-col>
                        </v-row>
                    </form>
                </v-card>
            </div>
        </v-container>
    </div>
</template>

<style>
    .bg {
        background-color: #EE6262;
        background-size: cover;
    }
</style>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex';

    import navbar from "../components/Navbar";

    export default {
        data: () => ({
            form: {
                email: 'test@gmail.com',
                password: '123456',
                first: 'Eing',
                last: 'Yim',
                role_id: ''
            },
        }),
        methods: {
            ...mapActions('user', ['registerUser', 'getRole']),
            register: function () {
                this.registerUser(this.form);
            },
            selectedRole: function (e) {
                this.form.role_id = e;
            }
        },
        mounted() {
            this.getRole()
        },
        computed: {
            ...mapGetters('user', ['roles'])
        },
        components: {
            navbar
        }
    }
</script>

<style scoped>
    .register {
        display: flex;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .register--min-height {
        min-height: 90vh;
    }

    .register__card--min-width {
        max-width: 100vw;
        width: 50em;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
    }
</style>
