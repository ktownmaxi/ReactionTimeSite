import { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const UuidContext = createContext(null);

export function UuidProvider({ children }) {
  const [uuid, setUuid] = useState('');

  useEffect(() => {
    let storedUuid = sessionStorage.getItem('my-session-uuid');
    if (!storedUuid) {
      storedUuid = uuidv4();
      sessionStorage.setItem('my-session-uuid', storedUuid);
    }
    setUuid(storedUuid);
  }, []);

  return (
    <UuidContext.Provider value={uuid}>
      {children}
    </UuidContext.Provider>
  );
}

export function useUuid() {
  return useContext(UuidContext);
}
