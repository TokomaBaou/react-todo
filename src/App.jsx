import { React, useState } from "react";
import "./styles.css";

export const App = () => {
  //入力した値をState化する
  const [todoText, setTodoText] = useState("");
  //未完了のTODOを格納する配列を作る
  const [incompleteTodos, setIncompleteTodos] = useState([
    "今日のタスク",
    "今日のタスク２"
  ]);
  //ステートの変数名とステートを更新するための関数名
  const [completeTodos, setCompleteTodos] = useState(["今日のタスク３"]);
  //onChangeの関数
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onClickAdd = () => {
    if (todoText === "") return;
    //入力した値を未完了リストに追加する配列
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    // alert(todoText);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    //配列の０番目の要素からいくつ削除するか
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
