# Softtek Teste Técnico
<div align="center">
  <img src="https://github.com/user-attachments/assets/6cddb5d0-5bdc-42be-92d9-8a6469d406c0" />
</div>

##

Olá, equipe de recrutamento da Softtek,

Estou muito feliz pela oportunidade de participar deste processo seletivo e por ter completado o desafio.

Para este projeto, utilizei as seguintes tecnologias:

- ASP.NET Core Web API (.NET 6+)
- System.Text.Json
- Swagger
- Vite 5
- React 18 + TypeScript 5
- Redux Toolkit 2 + RTK Query
- Sweetalert
- React-Redux
- CSS
- HTML

Segue abaixo mais algumas imagens:

<div align="center">
  <img src="https://github.com/user-attachments/assets/eb17e239-21ed-4d5a-9f76-f200a5b7f670" />
  <img src="https://github.com/user-attachments/assets/6d8345c1-754a-4dbc-a6b2-48d5533e76b3" />
  <img src="https://github.com/user-attachments/assets/a5839faa-6fba-49ef-9761-5b67ec7f3362" />
</div>

# Instruções e observações:

Os dados carregados em memória vem diretamente da API. Logo para ter uma usabilidade ideal deve-se iniciar a API primeiramente e em sequência o código.

A inicialização vai funcionar tanto executando pelo Visual Studio (VS) quanto pela linha de comando que irei deixar abaixo.

O teste legado só ocorre dentro do Swagger, com isso será necessário acessar o mesmo (https://localhost:7129/swagger) e ir na opção do legado. Já tem um arquivo dentro da pasta [Data] com os dados em json prontos para ser carregado. Logo basta executar o get pelo swagger e obter o resultado.

Fiz tratamento de erros então caso algum dos dados do json estejam com o Id com letra será informado no próprio swagger.

# Instruções para Build e Execução:

Backend:

Para inicializar a API devemos usar a seguinte linha de comando dentro da pasta que de backend:

dotnet run --project "[caminho]\projeto softtek\backend\ApiPacientes\ApiPacientes\ApiPacientes.csproj" --urls "https://localhost:7129"

Para acessar o swagger basta utilizar o link acima como informado (https://localhost:7129/swagger)

##

Frontend:

Para o front basta instalar os pacotes que e iniciarlizar o projeto seguindo os comandos abaixo:

cd frontend ## Entra na pasta de front

npm i ## Instala pacotes

npm i -D @vitejs/plugin-react ## Instala o plugin do Vite para React como dependência de desenvolvimento

npm run dev ## Roda o código
