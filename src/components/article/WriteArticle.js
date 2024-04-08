import { ArticleProvider } from "./ArticleContext";
import NewArticle from "./NewArticle";
function WriteArticle() {
  return (
    <ArticleProvider>
      <NewArticle />
    </ArticleProvider>
  );
}

export default WriteArticle;
