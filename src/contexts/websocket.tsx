import { createContext, ReactNode, useEffect, useState } from 'react'

interface WsContextProps {
  connection: WebSocket
  isConnected: boolean
}

const WsContext = createContext<WsContextProps | null>(null)

interface WebsocketProviderProps {
  url: string
  children: ReactNode
}

export function WebsocketProvider({ url, children }: WebsocketProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const connection = new WebSocket(url)

  useEffect(() => {
    connection.onopen = () => setIsConnected(true)
    return () => connection.close()
  }, [])

  return (
    <WsContext.Provider value={{ connection, isConnected }}>
      {children}
    </WsContext.Provider>
  )
}

export default WsContext
