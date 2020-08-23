# elevenMobile# Teste Dev - React Native + Node
Aplicativo Mobile do teste de React Native

    ( ) Aplicação backend consumindo APIs;
    (✔) Aplicação mobile consumindo API desenvolvida por você;
    
## Como executar
Para executar o emulador de android, Execute este comando:
```sh
$ yarn android
```
Caso o seu emulador esteja em um localhost diferente da execução da API, execute este comando:
```sh
$ adb reverse tcp:3333 tcp:3333
```

## Aplicação Mobile
Composta por cinco telas:
- Cadastro
- Login
- Perfil
- Feed (com busca dinâmica)
- Post

### Cadastro
Cadastra usuários através do endpoint **POST** `/api/v1/user`


### Login
Consulta usuários por usuário e senha no endpoint **GET** `/api/v1/user`


### Perfil
Consulta informações do usuário no endpoint **GET** `/api/v1/user/<id do usuário>`

### Feed (com busca dinâmica)
Utiliza o endpoint **GET** `/api/v1/user/<id do usuário>/posts` para consultar as publicações que o usuário tem acesso.

### Post
Utiliza o endpoint **GET** `/api/v1/user/<id do usuário>/posts/<id do post>` para buscar um post específico.
