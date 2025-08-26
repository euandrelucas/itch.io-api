# itch.io API v2

Esta é a **versão 2** da API para obter informações sobre jogos do site [itch.io](https://itch.io/).
Agora construída com **NestJS**, usando **Fastify** para alta performance e **Swagger** para documentação interativa.

## 🌐 Rotas Disponíveis

Acesse a documentação Swagger em:

```
http://localhost:3000/docs
```

Principais endpoints:

| Rota                     | Descrição                           |
| ------------------------ | ----------------------------------- |
| `/newest/:type`          | Jogos mais recentes por tipo        |
| `/new-and-popular/:type` | Jogos novos e populares por tipo    |
| `/top-sellers/:type`     | Jogos mais vendidos por tipo        |
| `/top-rated/:type`       | Jogos mais bem avaliados por tipo   |
| `/search?q=<query>`      | Pesquisa de jogos por palavra-chave |

## 📝 Parâmetros

* `:type` – Tipo de jogo desejado. Tipos disponíveis:
  `horror, 3d, short, atmospheric, first-person, singleplayer, creepy, psychological-horror, psx, survival-horror, retro`
* `q` – Consulta de pesquisa para buscar jogos por palavra-chave.

## ⚡ Instalação e Uso

1. Clone o repositório:

```bash
git clone https://github.com/euandrelucas/itch.io-api.git
```

2. Instale as dependências:

```bash
cd itch.io-api
npm install
```

3. Inicie o servidor em modo desenvolvimento:

```bash
npm run start:dev
```

4. Acesse a API em:

```
http://localhost:3000
```

E a documentação Swagger em:

```
http://localhost:3000/docs
```

## 💡 Exemplos de Uso

### Jogos mais recentes de terror

```bash
curl http://localhost:3000/newest/horror
```

### Pesquisar jogos com a palavra-chave "zombie"

```bash
curl http://localhost:3000/search?q=zombie
```

## 🛠 Tecnologias Utilizadas

* [NestJS](https://nestjs.com/) – Framework backend moderno para Node.js
* [Fastify](https://www.fastify.io/) – Framework web de alta performance
* [Axios](https://axios-http.com/) – Cliente HTTP para requisições
* [Cheerio](https://cheerio.js.org/) – Parsing de HTML (scraping)
* [Swagger](https://swagger.io/) – Documentação interativa da API

## 🤝 Contribuindo

Contribuições são bem-vindas! Abra uma issue ou envie um pull request.

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

[![Stargazers repo roster for @euandrelucas/itch.io-api](https://reporoster.com/stars/dark/euandrelucas/itch.io-api)](https://github.com/euandrelucas/itch.io-api/stargazers)
[![Forkers repo roster for @euandrelucas/itch.io-api](https://reporoster.com/forks/dark/euandrelucas/itch.io-api)](https://github.com/euandrelucas/itch.io-api/network/members)