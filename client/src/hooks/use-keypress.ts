import { useEffect, useState } from 'react'

function isSameKey(key: string, event: KeyboardEvent) {
  return key === event.key || key === event.code
}

export default function useKeyPress(
  key: string,
  callback: (e: KeyboardEvent) => void,
): void {
  const [isKeyPressed, setIsKeyPressed] = useState(false)

  function handleKeyUp(event: KeyboardEvent) {
    if (isSameKey(key, event) && isKeyPressed) {
      setIsKeyPressed(false)
      callback(event)
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (isSameKey(key, event) && !isKeyPressed) {
      setIsKeyPressed(true)
      callback(event)
    }
  }

  useEffect(
    function init() {
      window.document.addEventListener('keyup', handleKeyUp)
      window.document.addEventListener('keydown', handleKeyDown)

      return function close() {
        window.document.removeEventListener('keyup', handleKeyUp)
        window.document.removeEventListener('keydown', handleKeyDown)
      }
    },
    [key, callback],
  )
}
