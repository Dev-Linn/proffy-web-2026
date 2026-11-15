# Proffy Web 2026

- **Aluno:** Lincoln Costa Silva
- **Disciplina:** Programação para Internet - Sistemas de Informação (UEMG - Campus Ituiutaba)
- **Atividade:** Trabalho 3 - Tela de Formulário do Professor

Aplicação web da plataforma Proffy, feita com React, TypeScript, Vite e Tailwind CSS. Este trabalho implementa o fluxo "Dar aulas": cadastro do professor, confirmação do cadastro e perfil do professor.

## Como rodar o projeto localmente

Pré-requisito: Node.js 20 ou mais recente.

```bash
git clone https://github.com/Dev-Linn/proffy-web-2026.git
cd proffy-web-2026
npm install
npm run dev
```

Acesse `http://localhost:5173`. Para gerar a versão de produção, use `npm run build` e, para conferir o código, `npm run lint`.

## Rotas e telas implementadas

| Rota | Tela | Descrição |
|---|---|---|
| `/give-classes` | Dar aulas | Formulário de cadastro do professor, aberto pelo botão "Dar aula" da tela inicial. |
| `/give-classes/success` | Cadastro salvo! | Confirmação do cadastro, com o botão "Acessar lista". |
| `/profile` | Meu perfil | Perfil do professor com os dados cadastrados, edição, inclusão e exclusão de horários. |

Fluxo: tela inicial → "Dar aula" → formulário → "Salvar cadastro" → "Cadastro salvo!" → "Acessar lista" → "Meu perfil".

Rotas que já existiam no projeto: `/`, `/sign-in`, `/sign-up`, `/sign-up/finally-register` e `/study`.

## Funcionalidades

- Máscara de telefone no WhatsApp: `(34) 99999-9999` ou `(34) 9999-9999`.
- Biografia limitada a 300 caracteres, com contador.
- Custo da hora/aula com prefixo `R$` e máscara de moeda (`20,00`).
- Horários disponíveis dinâmicos: "+ Novo horário" adiciona quantos horários forem necessários, e no perfil cada horário tem o link "Excluir horário".
- Validação de todos os campos obrigatórios antes do envio, com mensagem de erro abaixo de cada campo. O horário final também precisa ser depois do inicial.
- Os dados salvos aparecem no perfil (nome, matéria, biografia, custo e horários) e continuam lá após recarregar a página.

## Decisões técnicas

- **Formulários:** `react-hook-form` com `zod` (`@hookform/resolvers`), mesmo padrão das telas de login e cadastro. Os schemas ficam em `src/schemas/teacher.ts`; o schema do perfil estende o do formulário, então as regras não são duplicadas.
- **Horários:** `useFieldArray` do react-hook-form controla a lista de horários sem estado paralelo.
- **Máscaras:** funções puras em `src/utils/masks.ts`, aplicadas com `Controller` nos campos de WhatsApp e custo.
- **Estado compartilhado:** `TeacherProvider` (Context API) guarda o professor cadastrado e o persiste no `localStorage`, porque o projeto ainda não tem back-end. O acesso é feito pelo hook `useTeacher`. Se `/profile` for aberto sem cadastro, o usuário é redirecionado para o formulário.
- **Usuário logado:** como não há autenticação real, nome, e-mail e foto do usuário vêm de `src/data/current-user.ts`.
- **Componentização:**
  - componentes novos reaproveitados nas duas telas: `PageHeader`, `FormCard`, `FormSection`, `FormFooter`, `FieldErrorMessage`, e em `components/teacher` os blocos `WhatsappField`, `BioField`, `ClassSection` e `ScheduleSection`;
  - componentes existentes reaproveitados: `Button`, `Select`, `InputCustom`, `TextArea` e `Finally` (tela "Cadastro salvo!");
  - `InputCustom`, `Select` e `TextArea` passaram a exibir a mensagem de erro, e o `InputCustom` ganhou a opção de prefixo (`R$`);
  - a tela "Estudar" passou a usar o `PageHeader` e as listas de matérias e dias da semana de `src/data/options.ts`.
- **Visual:** paleta e fontes do tema já definido em `src/index.css` (roxo, verde, Archivo e Poppins), cards brancos com bordas arredondadas e sombra suave.
