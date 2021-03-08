import "./App.css";
import ToysApp from "./comps/toysComps/toysApp";
import AppToDo from "./comps_hw_todo/appTodo";
import AppForm from "./formComps/appForm";
import SignUp from "./formComps/signup";

function App() {
  return (
    <div className="App">
      {/* <SignUp /> */}
      {/* <AppForm /> */}
      {/* <AppToDo /> */}
      <ToysApp />
    </div>
  );
}

export default App;
