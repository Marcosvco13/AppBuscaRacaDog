# Dog Breed Finder

Este projeto permite que os usuários pesquisem por raças de cachorros e visualizem a foto da respectiva raça do cachorro. O objetivo principal é fornecer uma maneira fácil de encontrar raças de cachorros e suas fotos, usando um dropdown para seleção da raça.

## Funcionalidades

- **Pesquisa de raças de cachorro**: Utilize a barra de pesquisa para procurar por uma raça específica.
- **Exibição da imagem da raça**: Ao selecionar uma raça, clique no botão de busca que a imagem correspondente da raça será exibida.

## Tecnologias Utilizadas

- **React-Native**: Biblioteca JavaScript para construção da interface do usuário.
- **Material Community Icons**: Ícones personalizados para uma melhor experiência visual.
- **Dropdown**: Componente de dropdown para selecionar as raças de cachorro.
- **API**: Utilizei a API da Dog API para buscar as raças e as imagens das raças de cachorro ([Dog API](https://dog.ceo/dog-api/)).

## Como Rodar o Projeto

### Pré-requisitos

1. **Node.js**: Certifique-se de que o Node.js esteja instalado em seu sistema. Caso não tenha, baixe e instale a partir de [nodejs.org](https://nodejs.org/).

2. **Instalar as dependências**:
   ```bash
   npm install
   ```

### Rodando o projeto

Após instalar as dependências, para rodar o projeto, execute:

```bash
npx expo start
```

No terminal ira ser gerado um QR Code que pode ser lido com o aplicativo Expo Go, para se poder visualizar o projeto.

## Como Usar

1. **Selecione uma raça**: Utilize o dropdown para escolher a raça de cachorro desejada. 
2. **Exibição da imagem**: Após selecionar a raça, clique no botão de busca que a imagem correspondente será exibida automaticamente.

## Contribuindo

1. Faça um fork deste repositório.
2. Crie uma branch para suas modificações (`git checkout -b minha-feature`).
3. Faça as alterações e commit (`git commit -am 'Adiciona nova funcionalidade'`).
4. Envie para o repositório remoto (`git push origin minha-feature`).
5. Crie um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
