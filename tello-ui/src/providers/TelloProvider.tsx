import { createContext, FC, useState } from 'react'

export interface TelloContextState {
  sdk?: string;
  // battery?: number;
}

const defaults: TelloContextState = {
};

const TelloContext = createContext<TelloContextState>(defaults);

const TelloProvider: FC = ({ children }) => {
  const [sdk, setSdk] = useState<string|undefined>(defaults.sdk);

  return (
    <TelloContext.Provider
      value={{
        sdk
      }}
    >
      {children}
    </TelloContext.Provider>
  );
};

export default TelloProvider;