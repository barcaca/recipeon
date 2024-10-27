import { api } from '../data/api'
import type { TReceita } from '../types/recipe'
import { createElement, toSlug } from '../utils/lib'

/*------ Variaveis ------*/
const BUTTONS = [
  {
    id: 'view',
    title: 'Receita',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-text z-10 bg-inherit"><path d="M12 7v14"/><path d="M16 12h2"/><path d="M16 8h2"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/><path d="M6 12h2"/><path d="M6 8h2"/></svg>`,
    variant: 'primary',
  },
  {
    id: 'edit',
    title: 'Editar',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen z-10 bg-inherit"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>`,
    variant: 'secondary',
  },
  {
    id: 'delete',
    title: 'Excluir',
    icon: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2 z-10 bg-inherit"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`,
    variant: 'destructive',
  },
]

/*------ Funções ------*/
const createCardImage = (imageSrc: string): HTMLDivElement => {
  const cardImageContainer = createElement('div', [
    'w-full',
    'h-36',
    'rounded-md',
    'overflow-hidden',
  ]) as HTMLDivElement

  const cardImage = createElement('img', ['w-full', 'h-full', 'object-cover', 'object-top'], {
    src: imageSrc,
  })

  cardImageContainer.appendChild(cardImage)

  return cardImageContainer
}

const createCardTitle = (title: string): HTMLHeadingElement => {
  const cardTitle = createElement('h2', [
    'font-sans',
    'font-medium',
    'text-sm',
    'text-card-foreground',
  ]) as HTMLHeadingElement
  cardTitle.textContent = title
  return cardTitle
}

const createButtons = (receita: TReceita, cardDivBtn: HTMLDivElement): void => {
  for (const button of BUTTONS) {
    const cardBtn = createElement(
      'button',
      ['btn', 'group', 'relative', 'items-center', 'justify-center'],
      {
        id: button.id,
        type: 'button',
        variant: button.variant,
        size: 'sm',
        'data-modal': `${button.id}-${receita.id}`,
      }
    )

    cardBtn.innerHTML = `${button.icon}
     <span class="w-0 pl-0 opacity-0 -translate-x-full group-hover:translate-x-0 invisible transition-all duration-200 group-hover:visible group-hover:w-fit group-hover:pl-2 group-hover:opacity-100 overflow-hidden">${button.title}</span>`

    cardDivBtn.appendChild(cardBtn)
  }
}

const createCardButtons = (): HTMLDivElement => {
  const cardDivBtn = createElement('div', [
    'flex',
    'gap-6',
    'w-full',
    'items-center',
  ]) as HTMLDivElement

  return cardDivBtn
}

export const renderCards = async (tabContent: HTMLDivElement, categoria: string): Promise<void> => {
  tabContent.setAttribute('data-tab', categoria)
  tabContent.setAttribute('aria-labelledby', `tab-${categoria}`)
  tabContent.innerHTML = ''

  try {
    const response = await api.getRecipes(categoria, 1)

    if (!response || response.length === 0) {
      throw new Error(
        'Nenhuma receita encontrada: a resposta é nula, indefinida ou a lista está vazia.'
      )
    }

    for (const receita of response) {
      const cardItem = createElement(
        'div',
        [
          'flex',
          'flex-col',
          'w-full',
          'max-w-64',
          'p-3',
          'gap-3',
          'bg-card',
          'rounded-lg',
          'shadow-shape',
        ],
        {
          'data-receita': `${receita.id}-${toSlug(receita.nome)}`,
        }
      ) as HTMLDivElement

      const cardImagem = createCardImage(receita.imagem)
      const cardTitle = createCardTitle(receita.nome)
      const cardButtons = createCardButtons()
      const cardDiv = createElement('div', ['flex', 'flex-col', 'gap-3', 'w-full'])

      createButtons(receita, cardButtons)

      cardDiv.appendChild(cardTitle)
      cardDiv.appendChild(cardButtons)
      cardItem.appendChild(cardImagem)
      cardItem.appendChild(cardDiv)

      tabContent.appendChild(cardItem)
    }
  } catch (error) {
    console.error('Erro ao renderizar os cards:', error)
    tabContent.textContent = 'Erro ao carregar receitas.'
  }
}

/*------ Funções de inicialização ------*/
const initCards = (categoria: string): void => {
  const tabContent = document.getElementById('tabContent') as HTMLDivElement
  renderCards(tabContent, categoria)
}

export { initCards }
