# Conversor de Moedas

![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![RxJS](https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white)
![Jasmine](https://img.shields.io/badge/jasmine-%238A4182.svg?style=for-the-badge&logo=jasmine&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

Este projeto mostra a quantia equivalente de uma unidade de cada moeda abaixo em Real Brasileiro (BRL):
- Dólar Canadense (CAD)
- Peso Argentino (ARS)
- Libra Esterlina (GBP)

As informações são obtidas a partir da [AwesomeAPI](https://docs.awesomeapi.com.br/api-de-moedas) e são atualizadas automaticamente a cada três minutos.

## 🚀 Como rodar?

Para rodar a aplicação, basta acessar a pasta raiz do projeto e seguir as instruções abaixo para criar e acessar um container Docker:

1. Criar a imagem docker:<br>
`docker build -t frete-rapido/frete-rapido-challenge:latest .`

2. Iniciar um container a partir da imagem gerada anteriormente:<br> 
`docker run -d -p 8080:80 frete-rapido/frete-rapido-challenge:latest`

3. Acessar o endereço abaixo em um navegador web:<br>
`http://localhost:8080/`

## 🧑‍💻 Como desenvolver?

Para trabalhar no projeto, basta clonar o repositório em sua máquina, acessar a pasta raiz, e rodar o servidor de desenvolvimento através do comando `ng serve -o`.

## 🧪 Como rodar as testes unitários?

Na pasta raiz do projeto, execute `ng test` para rodar os testes via [Karma](https://karma-runner.github.io).

Para verificar a cobertura de testes da aplicação, rode o mesmo comando adicionando a opção `--code-coverage`, como a seguir:<br>
`ng test --code-coverage`