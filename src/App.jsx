import CurrentBalance from './components/CurrentBalance';
import Footer from './components/Footer';
import Header from './components/Header';
import TransactionContainer from './components/TransactionContainer';
import TransactionForm from './components/TransactionForm';

export default function App() {
   return (
      <div className="App">
         <Header />
         <div className="main">
            <div className="container">
               <div>
                  <CurrentBalance />
                  <TransactionForm />
               </div>
               <TransactionContainer />
            </div>
         </div>
         <Footer />
      </div>
   );
}
