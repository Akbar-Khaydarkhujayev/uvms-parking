import { useRef, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface ISocketData {
  IP: string;
  palte_image: string;
  car_image: string;
  Direction: number;
  Barier_ID: number;
  Plate_Text: string;
}

const useWebSocket = (token: string) => {
  const [data, setData] = useState<
    [ISocketData | null, ISocketData | null, ISocketData | null, ISocketData | null]
  >(JSON.parse(localStorage.getItem('socket-data') ?? '[null,null,null,null]'));

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    let ws: WebSocket | null = null;
    let pingInterval: NodeJS.Timeout | null = null;

    const connectWebSocket = () => {
      ws = new WebSocket(`ws://apiparking.uvmsoft.uz/ws/connect?token=${token}`);

      ws.onopen = () => {
        console.log('WebSocket connected');
        ws?.send(JSON.stringify({ type: 'greet', payload: 'ping' }));

        pingInterval = setInterval(() => {
          if (ws?.readyState === WebSocket.OPEN) {
            ws.send('ping');
          }
        }, 5000);
      };

      ws.onmessage = (event) => {
        if (event.data === 'device') queryClient.invalidateQueries({ queryKey: ['device'] });
        else if (event.data === 'company') queryClient.invalidateQueries({ queryKey: ['company'] });
        else if (event.data === 'table') queryClient.invalidateQueries({ queryKey: ['records'] });
        else if (event.data === 'count')
          queryClient.invalidateQueries({ queryKey: ['monitoring-stats'] });
        else if (event.data === 'pong') {
          console.log('WebSocket pong');
        } else {
          setData((prev) => {
            const newItem = JSON.parse(event.data);

            if (newItem.Barier_ID === 1 && newItem.Direction === 1) {
              prev[0] = newItem;
            } else if (newItem.Barier_ID === 1 && newItem.Direction === 2) {
              prev[1] = newItem;
            } else if (newItem.Barier_ID === 2 && newItem.Direction === 1) {
              prev[2] = newItem;
            } else if (newItem.Barier_ID === 2 && newItem.Direction === 2) {
              prev[3] = newItem;
            }

            localStorage.setItem('socket-data', JSON.stringify(prev));

            return prev;
          });
        }
      };

      ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event.code, event.reason);
        cleanup();
        reconnect();
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        cleanup();
        reconnect();
      };

      setSocket(ws);
    };

    const cleanup = () => {
      if (pingInterval) {
        clearInterval(pingInterval);
        pingInterval = null;
      }
      ws?.close();
      ws = null;
    };

    const reconnect = () => {
      if (reconnectTimeout.current) return;
      reconnectTimeout.current = setTimeout(() => {
        console.log('Reconnecting WebSocket...');
        connectWebSocket();
        reconnectTimeout.current = null;
      }, 3000);
    };

    connectWebSocket();

    return () => {
      cleanup();
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
        reconnectTimeout.current = null;
      }
    };
  }, [token, queryClient]);

  return { data, socket };
};

export default useWebSocket;
