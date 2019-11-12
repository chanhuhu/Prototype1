<template>
    <div class="container--fluid">
        <navbar/>
        <v-container class="bg">
            <div>
                <v-card class="ma-5 mb-2 pa-5">
                    <div class="text--left font-weight-black">
                    <span>
                        ลงทะเบียน
                    </span>
                    </div>
                    <v-row>
                        <v-col>
                            <VTextField label="ชื่อ" v-model="form.first"></VTextField>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <VTextField label="นามสกุล" v-model="form.last"></VTextField>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <VTextField label="อีเมล" v-model="form.email"></VTextField>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <VTextField label="รหัสผ่าน" v-model="form.password" type="password"></VTextField>
                        </v-col>

                    </v-row>
                    <v-row>
                        <v-col>
                            <v-select :items="roles" item-value="id" item-text="name" label="ตำแหน่ง"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn color="#30E7F2" type="submit" block>เพิ่มสมัครชิก</v-btn>
                        </v-col>
                    </v-row>
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
                email: 'customer2@gmail.com',
                password: '123456',
                first: 'Eing',
                last: 'Xue',
                role_id: '2'
            },
        }),
        methods: {
            ...mapActions('user', ['registerUser', 'getRole']),
            register: function () {
                this.registerUser(this.form);
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
