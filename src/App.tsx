import './App.css';

type Task = {
  contractNumber: number;
  name: string;
  status: 'done' | 'new' | 'escalated';
  ocrBirthdate: string;
  sex: 'male' | 'female' | 'non-binary' | 'undisclosed';
  address: 'string';
  escalated: boolean;
  skipped: boolean;
};

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">hello</h1>
    </>
  );
}

export default App;
