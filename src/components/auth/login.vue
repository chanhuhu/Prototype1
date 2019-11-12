<template>
    <v-card tile color="#4F3F3F" style="max-width: 100%; height: 100%">
        <v-form @submit="login">
            <v-card-title class="white--text">ลงชื่อเข้าใช้</v-card-title>
            <v-row>
                <v-col>
                    <v-text-field
                            color="white"
                            type="email"
                            placeholder="your@example.com"
                            label="Email"
                            v-model="form.email"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                            color="white"
                            type="password"
                            placeholder="yourpassword"
                            label="Password"
                            v-model="form.password"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="pb-0">
                    <v-btn
                            tile
                            type="submit"
                            block
                            color="#30E7F2"
                    >LOGIN
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "login",
        data: () => ({
            form: {
                email: "customer@gmail.com",
                password: "123456"
            }
        }),
        methods: {
            ...mapActions('user', ['loginUser']),
            login: function () {
                this.loginUser(this.form);
            }
        },
    }
</script>

<style scoped>

</style>
