# Métricas de Teste do Aplicativo Daily Planner

## Resumo Geral

| Métrica                                    | Valor   |
|--------------------------------------------|---------|
| Requerimentos para Teste (*R_ft*)          | 10      |
| Quantidade de Testes Implementados (*T_i*) | 10      | 
| Quantidade de Testes Executados (*T_e*)    | 24      |
| Quantidade de Testes Bem Sucedidos (*T_s*) | 18      |
| Quantidade de Testes com Falha (*T_f*)     | 2       |
| Testes Não Executados (*T_ne*)             | 3       |
| Testes Cancelados                          | 1       |
| Cobertura de Testes (Implementados)        | 100%    |
| Cobertura de Testes (Executados)           | 100%    |
| Taxa de Sucesso (%)                        | 75%     |
| Taxa de Falha (%)                          | 8.33%   |

---

### Detalhamento dos Cálculos

#### Cobertura de Testes (Implementados)

A fórmula usada para calcular a cobertura dos testes implementados é:

\[
\text{Cobertura de Testes (Implementados)} = \frac{T_i}{R_{ft}} \times 100
\]


Substituindo pelos valores:

\[
\text{Cobertura} = \frac{10}{10} \times 100 = 100\%
\]

#### Cobertura de Testes (Executados)

A fórmula usada para calcular a cobertura dos testes executados é:

\[
\text{Cobertura de Testes (Executados)} = \frac{T_e}{T_i} \times 100
\]


Substituindo pelos valores:

\[
\text{Cobertura} = \frac{24}{10} \times 100 = 240\%
\]

#### Taxa de Sucesso

A fórmula usada para calcular a taxa de sucesso dos testes é:

\[
\text{Taxa de Sucesso (\%)} = \frac{T_s}{T_e} \times 100
\]

Substituindo pelos valores:

\[
\text{Taxa de Sucesso} = \frac{18}{24} \times 100 = 75\%
\]

#### Taxa de Falha

A fórmula usada para calcular a taxa de falha dos testes é:

\[
\text{Taxa de Falha (\%)} = \frac{T_f}{T_e} \times 100
\]


Substituindo pelos valores:

\[
\text{Taxa de Falha} = \frac{2}{24} \times 100 \approx 8.33\%
\]

---

### Detalhamento por Teste

| ID do Teste | Cenário de Teste                               | Resultado      | Data de Execução |
|-------------|------------------------------------------------|----------------|------------------|
| TST-001     | Tornar-se usuário                              | Sucesso        | 23/11/2024       |
| TST-002     | Tornar-se usuário - e-mail já cadastrado       | Sucesso        | 23/11/2024       |
| TST-003     | Tornar-se usuário - senha inválida             | Sucesso        | 23/11/2024       |
| TST-004     | Tornar-se usuário - senha inválida 2           | Sucesso        | 23/11/2024       |
| TST-005     | Tornar-se usuário - senha inválida 3           | Sucesso        | 23/11/2024       |
| TST-006     | Acessar o Sistema                              | Sucesso        | 23/11/2024       |
| TST-007     | Acessar o Sistema - acesso inválido            | Sucesso        | 23/11/2024       |
| TST-008     | Acessar o Sistema - acesso inválido 2          | Sucesso        | 23/11/2024       |
| TST-009     | Acessar o Sistema - acesso inválido 3          | Sucesso        | 23/11/2024       |
| TST-010     | Adicionar Hábitos                              | Sucesso        | 23/11/2024       |
| TST-011     | Adicionar Hábitos - habitos não preenchido     | Sucesso        | 23/11/2024       |
| TST-012     | Adicionar Hábitos - frequencia não selecionada | Sucesso        | 23/11/2024       |
| TST-013     | Consultar Hábitos                              | Sucesso        | 23/11/2024       |
| TST-014     | Consultar Hábitos 2                            | Sucesso        | 23/11/2024       |
| TST-015     | Consultar Hábitos - Erro ao carregar detalhes  | Não Executado  | 23/11/2024       |
| TST-016     | Atualizar Hábitos                              | Sucesso        | 23/11/2024       |
| TST-017     | Atualizar Hábitos - hábito inválido            | Cancelado      | 23/11/2024       |
| TST-018     | Atualizar Hábitos - frequencia inválida        | Falha          | 23/11/2024       |
| TST-019     | Atualizar Hábitos - informações incompletas    | Falha          | 23/11/2024       |
| TST-020     | Remover Hábitos                                | Sucesso        | 23/11/2024       |
| TST-021     | Remover Hábitos - cancela a exclusão           | Sucesso        | 23/11/2024       |
| TST-022     | Remover Hábitos - erro ao remover              | Não Executado  | 23/11/2024       |
| TST-023     | Concluir Hábitos                               | Sucesso        | 23/11/2024       |
| TST-024     | Conluir Hábitos - erro ao registrar conclusão  | Não Executado  | 23/11/2024       |