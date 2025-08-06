import { useContext } from 'react';
import PreviewContext from '@/contexts/PreviewContext';

export const usePreviewContext = () => {
  return useContext(PreviewContext);
};
