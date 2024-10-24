/*------- Types -------*/
type Theme = 'dark' | 'light' | 'system'
type Scheme = Exclude<Theme, 'system'>

const initTheme = (): void => {
  /*------- Element -------*/
  const themeButton = document.getElementById('theme-toggle') as HTMLButtonElement

  /*------ Function ------*/
  const getTheme = (): Theme => (localStorage.getItem('theme') as Theme) || 'system'

  const getIsPrefersDarkScheme = (): boolean =>
    window.matchMedia('(prefers-color-scheme: dark)').matches

  const getScheme = (): Scheme => {
    const theme = getTheme()
    const prefersDark = getIsPrefersDarkScheme()

    return theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme
  }

  const setTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme)

    const root = document.documentElement
    const scheme = theme === 'system' ? getScheme() : theme

    root.setAttribute('data-theme', scheme)
    root.classList.remove('light', 'dark')
    root.classList.add(scheme)
    root.style.colorScheme = scheme

    themeButton?.setAttribute('data-theme', scheme)
  }

  const toggleTheme = () => {
    const currentTheme = getTheme()
    const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  /*------ Event Listener ------*/
  themeButton?.addEventListener('click', toggleTheme)

  /*---------- Init ----------*/
  setTheme(getTheme())
}

export { initTheme }

