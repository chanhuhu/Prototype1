<template>
    <div>
        <v-form @submit="login">
            <v-card>
                <v-card-title>ลงชื่อเข้าใช้</v-card-title>
                <v-row>
                    <v-col>
                        <v-text-field
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
                                type="password"
                                placeholder="yourpassword"
                                label="Password"
                                v-model="form.password"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn
                                type="submit"
                                block
                                color="primary"
                                @click="login()"
                        >LOGIN
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        name: "login",
        data: () => ({
            form: {
                email: '',
                password: ''
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
