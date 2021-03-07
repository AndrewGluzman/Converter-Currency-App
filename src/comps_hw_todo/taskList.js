import React from 'react';
import TaskItem from './taskItem';

function Tasklist(props) {

  let task_ar = props.task_ar;
  return (
    <div className="container mt-3">
      <div className="col-lg-4 mx-auto">
        {task_ar.map(item => {
          return(
          <TaskItem delSingleTask={props.delSingleTask} key={item.id} item={item}/>
          )
        })}

        <button onClick={props.delAllTask} className="btn btn-danger mx-auto d-block mt-3">Delete all tasks</button>
      </div>
    </div>
  )
}

export default Tasklist