import { createContext, ReactNode, useEffect } from 'react'

interface WsContextProps {
  connection: WebSocket
}

const WsContext = createContext<WsContextProps | null>(null)

interface WebsocketProviderProps {
  url: string
  children: ReactNode
}

export function WebsocketProvider({ url, children }: WebsocketProviderProps) {
  const connection = new WebSocket(url)

  useEffect(() => () => connection.close(), [])

  return (
    <WsContext.Provider value={{ connection }}>{children}</WsContext.Provider>
  )
}

export default WsContext
