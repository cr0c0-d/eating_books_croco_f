import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import Form from "react-bootstrap/Form";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import { useArticle } from "./ArticleContext";

const NewArticleEditor = () => {
  const {
    articleMode,
    setArticleMode,
    articleSave,
    setArticleSave,
    articleContents,
    setArticleContents,
  } = useArticle();
  // useState로 상태관리하기 초기값은 EditorState.createEmpty()
  // EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (articleMode === "editor") {
      const blocksFromHtml = htmlToDraft(articleContents);
      if (blocksFromHtml) {
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
        setArticleContents("");
      }
    }
  }, []);

  const onEditorStateChange = (editorState) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

  const returnContents = () => {
    const contents = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    if (contents.length === 0) {
      alert("내용을 입력하세요!");
      return;
    }
    return contents;
  };
  useEffect(() => {
    if (articleSave && articleMode === "editor") {
      // articleSave가 true가 되면
      const contents = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      if (contents.length < 10) {
        alert("내용을 입력하세요!");
        return setArticleSave(false);
      }
      setArticleContents(contents);
    }
  }, [articleSave]);

  return (
    <div>
      <Editor
        // 툴바 설정
        toolbar={{
          // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
        }}
        placeholder="자유롭게 작성해보세요."
        // 한국어 설정
        localization={{
          locale: "ko",
        }}
        // 초기값 설정
        editorState={editorState}
        // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
        onEditorStateChange={onEditorStateChange}
        editorStyle={{
          height: "700px",
          width: "100%",
          border: "1px solid lightgray",
          padding: "20px",
        }}
      />
    </div>
  );
};

export default NewArticleEditor;
