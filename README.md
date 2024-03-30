# itch.io API

Esta é uma API simples para obter informações sobre jogos do site [itch.io](https://itch.io/). A API permite buscar os jogos mais recentes, os mais populares e os mais vendidos, além de permitir pesquisas por palavra-chave.

## Rotas Disponíveis

- `/newest/:type`: Retorna os jogos mais recentes de acordo com o tipo especificado.
- `/new-and-popular/:type`: Retorna os jogos mais recentes e populares de acordo com o tipo especificado.
- `/top-sellers/:type`: Retorna os jogos mais vendidos de acordo com o tipo especificado.
- `/top-rated/:type`: Retorna os jogos mais bem avaliados de acordo com o tipo especificado.
- `/search?q=<query>`: Retorna os jogos correspondentes à consulta fornecida.

## Parâmetros

- `:type`: O tipo de jogo desejado. Os tipos disponíveis são: horror, 3d, short, atmospheric, first-person, singleplayer, creepy, psychological-horror, psx, survival-horror e retro.
- `<query>`: Consulta de pesquisa para pesquisar jogos por palavra-chave.

## Instalação e Uso

1. Clone o repositório:

```
git clone https://github.com/euandrelucas/itch.io-api.git
```

2. Instale as dependências:

```
cd itch.io-api
npm install
```

3. Inicie o servidor:

```
npm start
```

4. A API estará disponível em `http://localhost:3000`.

## Exemplos de Uso

### Obtendo os jogos mais recentes de terror:

```
curl http://localhost:3000/newest/horror
```

### Pesquisando jogos com a palavra-chave "zombie":

```
curl http://localhost:3000/search?q=zombie
```

## Tecnologias Utilizadas

- [Fastify](https://www.fastify.io/): Framework web para Node.js.
- [Axios](https://axios-http.com/): Cliente HTTP para fazer solicitações.
- [Cheerio](https://cheerio.js.org/): Implementação do core do jQuery para Node.js.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
