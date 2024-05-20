import { useEffect, useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import uuid from "react-uuid";

function App() {
  // 初期値はローカルストレージからとってくることでリロードしても問題ない。ローカルストレージになにもない場合には空配列を初期値。
  // JSON.parseはJSON形式をJSのオブジェクトに変換できる。
  // const [notes, setNotes] = useState([
  //   JSON.parse(localStorage.getItem("notes")) || [],
  // ]);
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);

  // useEffect(() => {
  //   ローカルストレージにnotesというプロパティ名（自由に決めていい）にnotesという値を保存。
  //   notesはオブジェクトであり、そのまま保存しようとすると、実際の値が入らない。JSON形式に変換することで解決できる。
  //   localStorage.setItem("notes", JSON.stringify(notes));
  // }, [notes]); // 配列notesの状態が変化するたびに発火する。

  // useEffect(() => {
  //   setActiveNote(notes[0].id);
  // }, []);

  const onAddNote = () => {
    // 追加していくノートのデータ構造を定義
    const newNote = {
      // uuidライブラリによるランダムな値を生成
      id: uuid(),
      title: "新しいノート",
      content: "新しいノートの内容",
      modDate: Date.now(),
    };

    // setNotes(newNote);
    // 上のように書くのはNG。ノートが追加されるわけではなく空配列が一つのオブジェクトに更新されるだけ。
    // 下のように書くとどんどん空配列に追加されていく。
    setNotes([...notes, newNote]);
  };

  const onDeleteNote = (id) => {
    // 削除ボタンが押されたノートのidと引数に渡したidが一致しないとき条件式はtrueになる→配列として残す。
    // 逆に押されたノートのidと引数に渡したidが一致するとき条件式はfalseになる→配列から削除。
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };

  const getActiveNote = () => {
    // trueになった配列要素1つを返す。
    return notes.find((note) => note.id === activeNote);
  };

  const onUpdateNote = (updatedNote) => {
    // 修正された新しいノートの配列を返す。
    const updatedNotesArray = notes.map((note) => {
      // 編集中のノートはupdatedNoteとして返す
      if (updatedNote.id === note.id) {
        return updatedNote;
      } else {
        // それ以外はそのまま返す。
        return note;
      }
    });
    // notesにupdatedNotesArrayが代入されるため、Sidebar.jsのnotes.map(..)はupdatedNotesArray.map(..)
    // となり、 updatedNoteが表示される。
    setNotes(updatedNotesArray);
  };

  return (
    <div className="App">
      {/* one point: 各コンポーネントはメソッドの戻り値であると考えるとよい */}
      <Sidebar
        onAddNote={onAddNote}
        notes={notes}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
