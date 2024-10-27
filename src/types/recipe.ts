export type TIngrediente = {
  quantidade: string
  unidade: string
  nome: string
}

export type TReceita = {
  id: number
  nome: string
  imagem: string
  serve: number
  tempo: string
  categoria: string[]
  descricao: string
  ingredientes: TIngrediente[]
  passos: string[]
}
