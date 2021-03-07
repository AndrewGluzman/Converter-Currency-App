import React, { useEffect, useState } from 'react';

function TaskItem(props) {
  let [days,setDays] = useState(0);
  
  let item = props.item;

  // יעבוד פר קומפנינטה של האייטים בלולאה
  useEffect(() => {
    // מחשב זמן יוניקס
    let time = Date.parse(item.date) - Date.now();
    let daysLeft = Math.floor(time / (1000 * 60 * 60 * 24));
    setDays(daysLeft);
  },[])

  const delTask = () => {
    if (window.confirm("Are you sure?")) {
      props.delSingleTask(item.id)
    }
  }

  return (
    <div className="border p-2">
      <button onClick={delTask} className="btn float-end">X</button>
      <h4>{item.name}</h4>
      {/* <h4>{item.date}</h4> */}
      <h4>Days Left: {days}</h4>
    </div>
  )
}

export default TaskItem