import { createContext, useState, useContext, useEffect } from "react";

const ArticleContext = createContext();

export const useArticle = () => useContext(ArticleContext);

export const ArticleProvider = ({ children }) => {
  const [articleMode, setArticleMode] = useState("template");
  const [articleSave, setArticleSave] = useState(false);
  const [articleContents, setArticleContents] = useState(null);

  return (
    <ArticleContext.Provider
      value={{
        articleMode,
        setArticleMode,
        articleSave,
        setArticleSave,
        articleContents,
        setArticleContents,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};
