export type TTabKey = 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack' | 'drink'
export type TTabValue = 'Café da Manhã' | 'Almoço' | 'Jantar' | 'Sobremesa' | 'Lanche' | 'Bebida'

export interface ITab {
  id: string
  title: string
}

export type TTabList = ITab[]

export interface ITabHeader {
  [key: string]: ITab
}

export const tabHeaders: ITabHeader = {
  breakfast: {
    id: 'Café da Manhã',
    title: 'Receitas matinais',
  },
  lunch: {
    id: 'Almoço',
    title: 'Pratos para o almoço',
  },
  dinner: {
    id: 'Jantar',
    title: 'Ideias para o jantar',
  },

  dessert: {
    id: 'Sobremesa',
    title: 'Doces para saborear',
  },

  snack: {
    id: 'Lanche',
    title: 'Snacks rápidos',
  },
  drink: {
    id: 'Bebida',
    title: 'Bebidas variadas',
  },
}
