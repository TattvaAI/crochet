'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  currencies,
  defaultCurrency,
  formatPrice,
  type CurrencyCode,
} from '@/lib/site';

type Ctx = {
  code: CurrencyCode;
  setCode: (c: CurrencyCode) => void;
  price: (inr: number) => string;
};

const CurrencyContext = createContext<Ctx | null>(null);
const STORAGE_KEY = 'mor:currency';

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [code, setCodeState] = useState<CurrencyCode>(defaultCurrency);

  // Progressive enhancement: the site is fully priced and readable
  // before JS runs. We only *remember* a choice once JS is available.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && stored in currencies) setCodeState(stored as CurrencyCode);
  }, []);

  const setCode = (c: CurrencyCode) => {
    setCodeState(c);
    window.localStorage.setItem(STORAGE_KEY, c);
  };

  return (
    <CurrencyContext.Provider
      value={{ code, setCode, price: (inr) => formatPrice(inr, code) }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}

/** Small tracked-out currency switcher in the header. */
export function CurrencySwitch() {
  const { code, setCode } = useCurrency();
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Currency">
      {(Object.keys(currencies) as CurrencyCode[]).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => setCode(c)}
          aria-pressed={code === c}
          className={`px-1.5 py-0.5 text-[10px] tracking-[0.14em] transition-colors duration-500 ${
            code === c ? 'text-ink' : 'text-ink-mute hover:text-ink'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

/** Renders an INR price in the visitor's chosen currency. */
export function Price({ inr }: { inr: number }) {
  const { price } = useCurrency();
  return <span className="tnum">{price(inr)}</span>;
}
