import Calc from './calc.jsx';

function App() {
  let counter = 1;
  const sayHello = () => {
    console.log(`hello ${counter}`)
    counter++
  };
  return (
    <>
      <Calc />
    </>
  );
}

export default App;