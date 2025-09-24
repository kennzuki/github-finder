import UserFetch from "./components/UserFetch";


const App = () => {
  
  return (
   
    <div className='max-w-4xl flex flex-col mx-auto items-center p-16'>
      <h1 className='text3xl font-bold mb-6'>Github Finder</h1>
      <UserFetch />
    </div>
  );
};

export default App;
