import { useDesignTokensStore } from '@/store/design-tokens';
import { useGlobalDesignTokens } from './useGlobalDesignTokens';

export const useDesignTokens = () => {
  const store = useDesignTokensStore();
  const globalTokens = useGlobalDesignTokens();
  
  return {
    ...store,
    ...globalTokens,
  };
};