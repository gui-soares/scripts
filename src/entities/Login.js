import { EntitySchema } from "typeorm";

const Login = new EntitySchema({
    name: "Login",
    tableName: "tb_login",
    columns: {
        id_login: {
            primary: true,
            type: "int"
        },
        password: {
            type: "varchar"
        },
        email: {
           type: "varchar"
        },
        nome: {
            type: "varchar"
        },
        ativo: {
            type: "int"
        }
    }
});

export default Login;