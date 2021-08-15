import { React, useState } from "react";
import "./styles.css";
import { InputTodo } from "./Components/inputTodoo";
import { IncompleteTodos } from "./Components/incompleteTodos";
import { CompleteTodos } from "./Components/completeTodos";

export const App = () => {
  //入力した値をState化する
  const [todoText, setTodoText] = useState("");

  //1.未完了のTODOを格納する配列を作る
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  //ステートの変数名とステートを更新するための関数名
  const [completeTodos, setCompleteTodos] = useState([]);
  //onChangeの関数 input変更の検知
  //  useState("");　ここに渡したいから　　setTodoText（）；で囲う
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  //追加ボタン
  const onClickAdd = () => {
    if (todoText === "") return;
    //入力した値を未完了リストに追加する配列
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    // alert(todoText);
    setTodoText("");
  };
  //削除ボタン
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    //配列の０番目の要素からいくつ削除するか
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  //完了ボタン
  const onClickcomplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    //配列の０番目の要素からいくつ削除するか
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };
  //戻すボタン
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    //未完了TODOに戻す配列
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>※登録できるtodo5個まで</p>
      )}

      <IncompleteTodos
        todos={incompleteTodos}
        onClickcomplete={onClickcomplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
