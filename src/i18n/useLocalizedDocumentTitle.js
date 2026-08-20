"use client";

import { useEffect } from "react";

export function useLocalizedDocumentTitle(title) {
  useEffect(() => {
    const applyTitle = () => {
      if (document.title !== title) document.title = title;
    };

    const observer = new MutationObserver(applyTitle);
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    applyTitle();

    return () => observer.disconnect();
  }, [title]);
}
