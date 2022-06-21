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

    [x] Utilizar o multer para upload dos arquivos.

  2. Requisitos funcionais

    [x] Deve ser possível cadastrar a imagem do carro.
  
  3. Regras de negócio
 
    [x] O usuário responsável pelo cadastro, deve ser um usuário administrador.
    [x] O usuário deve poder cadastrar mais de uma imagem para o carro.


# Aluguel de carro

  1. Requisitos funcionais

    [x] Deve ser possível cadastrar um aluguel.
  
  2. Regras de negócio

    [x] O aluguel deve ter duração mínima de 24 horas.
    [x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
    [x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
    [x] O usuário deve estar logado na aplicação.
    [x] Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

# Devolução do carro

  1. Requisitos funcionais

    [x] Deve ser possível realizar a devolução de um carro.
  
  2. Regras de negócio

    [x] Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
    [x] Ao realizar a devolução o carro deve ser liberado para outro aluguel.
    [x] Ao realizar a devolução o usuuário deve ser liberado para outro aluguel.
    [x] Ao realizar a devolução, deverá ser calculado o valor do aluguel.
    [x] Caso o horário de devolução seja superior ao previsto para a entrega, deverá ser cobrado multa proporcional aos dias de atraso.
    [x] Caso haja multa, deverá ser somado ao total do aluguel.
    [x] O usuário deve estar logado na aplicação.

# Recuperação de senha

 1. Requisitos funcionais

    [] Deve ser possível o usuário recuperar a senha informando o email.
    [] O usuário deve receber um e-mail com o passo a passo para a recuperação da senha.
    [] O usuário deve inserir uma nova senha.
  
  2. Regras de negócio

    [] O usuário precisa informar uma nova senha.
    [] O link para recuperação deve expirar em 3 horas.




