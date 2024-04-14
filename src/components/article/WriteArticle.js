import { ArticleProvider } from "./ArticleContext";
import UpdateArticle from "./UpdateArticle";
function WriteArticle() {
  return (
    <ArticleProvider>
      <UpdateArticle />
    </ArticleProvider>
  );
}

export default WriteArticle;
