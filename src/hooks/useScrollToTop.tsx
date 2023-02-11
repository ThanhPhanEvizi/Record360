import {useEffect} from 'react';

const scrollToTop = () =>
  setTimeout(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, 200);

export function useScrollToTop() {
  useEffect(() => {
    scrollToTop();
  }, []);
}
