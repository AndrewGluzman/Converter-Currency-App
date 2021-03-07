import React,{useEffect, useState} from 'react';
import _ from "lodash"
import TaskInput from './taskInput';
import Tasklist from './taskList';

function AppToDo(props){
  let [task_ar, setTasks] = useState([
    { name: "learn wordpress", date: "2021-04-02", id: 1 },
    { name: "learn PHP", date: "2021-04-05", id: 2 }
  ]);

  useEffect(() => {
    if(localStorage["tasks"]){
      setTasks(JSON.parse(localStorage["tasks"]));
    }
  },[])

  const delAllTask = () => {
    setTaskAndSaveLocal([]);
  }

  const delSingleTask = (_id) => {
    // alert(_id);
    // תמיד בשביל למחוק משהו יחידי נעבוד מול מערך זמני
    // ובעזרת פקודת פילטר נמחוק את את התא 
    let temp_ar = task_ar.filter(item => {
      return item.id != _id;
    })
    setTaskAndSaveLocal(temp_ar);
  }

  const addTask = (_taskObj) => {
      // ... spread opreators מעתיק מהמערך המקורי את התאים
    // לתוך המערך החדש במיקום ששמנו אותם
    setTaskAndSaveLocal([...task_ar, _taskObj]);
  }

  const setTaskAndSaveLocal = (_ar) => {
    _ar = _.sortBy(_ar,"date");
    setTasks(_ar);
    localStorage.setItem("tasks",JSON.stringify(_ar));
  }

  return(
    <React.Fragment>
      <TaskInput addTask={addTask} />
      <Tasklist task_ar={task_ar} delSingleTask={delSingleTask} delAllTask={delAllTask}  />
    </React.Fragment>
  )
}

export default AppToDo