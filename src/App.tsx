import UserFetch from "./components/UserFetch";


const App = () => {
  
  return (
   
    <div className='max-w-4xl flex flex-col mx-auto items-center border border-gray-200 p-16'>
      <h1 className='text3xl font-bold mt-12'>Github Finder</h1>
      <UserFetch />
    </div>
  );
};

export default App;
