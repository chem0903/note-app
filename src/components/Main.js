import React from "react";
import "./Main.css";
import Markdown from "react-markdown";

const Main = ({ activeNote, onUpdateNote }) => {
  // activeNoteの初期値はfalseなため、activeNote.titleとactiveNote.contentが存在せず、
  // エラーとなってしまうため、flaseのときは以下の処理を行う。
  if (!activeNote) {
    // このreturnにより、Mainメソッドからは抜け、下のreturnは実行されない。
    return <div className="no-active-note">ノートが選択されていません</div>;
  }

  const onEditNote = (property, value) => {
    //
    onUpdateNote({
      // id: activeNote.id,
      // ↑だと動的プロパティ[property]=titleの時と[property]=contentのときで表示が変わってしまう。（inputを編集しているときにはtitleの値のみが、textareaを編集しているときにはcontentの値のみが表示される）
      // ↓に変更すると、一旦activeNoteオブジェクトを展開し、変更したいプロパティだけ、継承してオーバーライドすることで解決できる（JSはJavaとは違い、プロトタイプベースのオブジェクト指向言語）
      ...activeNote,
      // プロパティを変数を用いて動的に変えるときは[]をつける。
      [property]: value,
      modDate: Date.now(),
    });
  }; // activeNoteのtitle, contentが表示されている→書き換える→activeNoteが更新される→activeNoteのtitle, contentが表示されているのループ。

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          id="title"
          type="text"
          value={activeNote.title}
          // イベントメソッド（今回の場合、文字を打ち込むたびに発火する）なので引数にイベントを受け取れる。
          // e.target.valueはこの場合、input要素に書き込んでいる値。
          onChange={(e) => {
            onEditNote("title", e.target.value);
          }}
        />
        <textarea
          id="content"
          placeholder="ノート内容を記入"
          onChange={(e) => {
            onEditNote("content", e.target.value);
          }}
        >
          {activeNote.content}
        </textarea>
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        {/* react-markdownライブラリによるマークダウンの実装 */}
        <Markdown className="markdown-preview">{activeNote.content}</Markdown>
      </div>
    </div>
  );
};

export default Main;
