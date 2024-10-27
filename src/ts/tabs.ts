import { type TTabList, tabHeaders } from '../types/type-tab'
import { createElement } from '../utils/lib'
import { initCards } from './cards'

export const tabs: TTabList = [
  { id: 'breakfast', title: 'Café da Manhã' },
  { id: 'lunch', title: 'Almoço' },
  { id: 'dinner', title: 'Jantar' },
  { id: 'dessert', title: 'Sobremesa' },
  { id: 'snack', title: 'Lanche' },
  { id: 'drink', title: 'Bebida' },
]

const initTabs = (): void => {
  /*------- Element -------*/
  const tabList = document.getElementById('tabList') as HTMLDivElement
  const tabTitle = document.getElementById('tabTitle') as HTMLHeadingElement
  const tabSubtitle = document.getElementById('tabSubtitle') as HTMLParagraphElement

  /*------ Function ------*/
  const createTabButton = (tabId: string, isDefaultTab: boolean): HTMLButtonElement => {
    return createElement('button', ['btn', 'font-semibold'], {
      id: `tab-${tabId}`,
      'data-slot': 'tab',
      'data-value': tabId,
      'aria-selected': isDefaultTab ? 'true' : 'false',
      variant: isDefaultTab ? 'secondary' : 'ghost',
      size: 'sm',
    }) as HTMLButtonElement
  }

  const renderTabs = (): void => {
    for (const tab of tabs) {
      const isDefaultTab = tab.id === 'breakfast'
      const tabItem = createTabButton(tab.id, isDefaultTab)

      tabItem.textContent = tab.title
      tabList.append(tabItem)

      tabItem.addEventListener('click', () => {
        updateActiveTab(tabItem)
        updateHeader(tab.id)
        initCards(tab.id)
      })
    }
  }

  const updateActiveTab = (newTab: HTMLButtonElement): void => {
    const prevTab = document.querySelector('[aria-selected="true"]') as HTMLButtonElement
    prevTab.setAttribute('aria-selected', 'false')
    prevTab.setAttribute('variant', 'ghost')

    newTab.setAttribute('aria-selected', 'true')
    newTab.setAttribute('variant', 'secondary')
  }

  const updateHeader = (tabId: string): void => {
    tabTitle.textContent = tabHeaders[tabId].id
    tabSubtitle.textContent = tabHeaders[tabId].title
  }

  /*------ Init ------*/
  renderTabs()
}

export { initTabs }
