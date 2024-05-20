import React from "react";
import "./Sidebar.css";

const Sidebar = ({
  onAddNote,
  notes,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {
  // 配列をソートしてくれるJSの標準メソッド。
  const sortedNotes = notes.sort((a, b) => b.modDate - a.modDate);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>ノート</h1>
        <button onClick={onAddNote}>追加</button>
      </div>
      <div className="app-sidebar-notes">
        {/* ノートは増えていくので配列として表現 */}
        {sortedNotes.map((note) => (
          // 繰り返しなどでリストにする場合、繰り返す要素の識別子keyを一意になるように割り振る。
          <div
            // もし、note.idとactiveNoteが同じなら、activeクラスを追加
            className={`app-sidebar-note ${note.id === activeNote && "active"}`}
            key={note.id}
            onClick={() => {
              // activeNote(false)にnote.idを代入。
              // !超重要! これで押した要素のidを取得可能。バニラJSにおける、addEventListnerのe.targetのようなことが、これだけでできる。
              setActiveNote(note.id);
            }}
          >
            <div className="sidebar-note-title">
              <strong>{note.title}</strong>
              <button
                onClick={() => {
                  // !超重要! これで押した要素のidを取得可能。バニラJSにおける、addEventListnerのe.targetのようなことが、これだけでできる。
                  onDeleteNote(note.id);
                }}
              >
                削除
              </button>
            </div>
            <p>{note.content}</p>
            <small>
              {/* 追加した日時 */}
              {new Date(note.modDate).toLocaleDateString("ja-JP", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
