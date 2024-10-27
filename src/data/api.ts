import type { TReceita } from '../types/recipe'

export const BASE_URL = {
  REST: 'https://recipeon-backend.vercel.app/api/receitas',
} as const

async function fetchRecipes(name: string, page: number, limit = 8): Promise<TReceita[]> {
  const response = await fetch(
    `${BASE_URL.REST}?categoria_like=${name}&_page=${page}&_limit=${limit}`
  )
  const data: TReceita[] = await response.json()
  return data
}

const getRecipes = fetchRecipes

export const api = { getRecipes }
