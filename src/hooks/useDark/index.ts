import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  onChanged(dark: boolean) {
    updateHtmlDarkClass(dark)
  }
})

const toggleDark = useToggle(isDark)

export function updateHtmlDarkClass(val: boolean) {
  const htmlEl = document.getElementsByTagName('html')[0]
  if (val) {
    htmlEl.setAttribute('class', 'dark')
  } else {
    htmlEl.setAttribute('class', '')
  }
}

export default toggleDark
