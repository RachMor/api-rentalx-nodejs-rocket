# Cadastro de carro

  1. Requisitos funcionais

    [x] Deve ser possível cadastrar um novo carro.
    [x] Deve ser possível listar todas as categorias.

  2. Regras de negócio

    [x] Não deve ser possível cadastrar um carro com uma placa já existente.
    [x] Não deve ser possível alterar a placa de um carro já cadastrado. 
    [x] O carro deve ser cadastrado com disponibilidade por padrão.
    [x] O usuário responsável pelo cadastro, deve ser um usuário administrador.
  
# Listagem de carro

  1. Requisitos funcionais

    [x] Deve ser possível listar os carros disponíveis.
    [x] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
    [x] Deve ser possível listar todos os carros disponíveis pelo nome do carro.

  2. Regras de negócio

    [x]  O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro

  1. Requisitos funcionais

    [x] Deve ser possível cadastrar uma especificação para um carro.
    [x] Deve ser possível listar todas as especificações.

  2. Regras de negócio

    [x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
    [x] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
    [x] O usuário responsável pelo cadastro deve ser um usuário administrador.
    
# Cadastro de imagens do carro

  1. Requisitos não funcionais

    [] Utilizar o multer para upload dos arquivos.

  2. Requisitos funcionais

    [] Deve ser possível cadastrar a imagem do carro.
  
  3. Regras de negócio
 
    [] O usuário responsável pelo cadastro, deve ser um usuário administrador.
    [] O usuário deve poder cadastrar mais de uma imagem para o carro.


# Aluguel de carro

  1. Requisitos funcionais

    [] Deve ser possível cadastrar um aluguel.
  
  2. Regras de negócio

    [] O aluguel deve ter duração mínima de 24 horas.
    [] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
    [] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.