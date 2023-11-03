import { useDispatch, useSelector } from 'react-redux';
import TransactionItem from './TransactionItem';
import { useEffect } from 'react';
import { getTransactionsAsync } from '../redux/features/transaction/transactionSlice';

export default function TransactionContainer() {
   const { transactions, isLoading, isError, error } = useSelector(
      (state) => state.transaction
   );
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getTransactionsAsync());
   }, [dispatch]);

   // error handling
   let content = null;
   if (isLoading) content = <li>Loading...</li>;
   if (!isLoading && isError) content = <li>{error}</li>;
   if (!isLoading && !isError && transactions.length === 0)
      content = <li>No transaction found!</li>;
   if (!isLoading && !isError && transactions.length > 0)
      content = transactions.map((transaction) => (
         <TransactionItem key={transaction.id} transaction={transaction} />
      ));

   return (
      <div className="form">
         <p className="second_heading">Your Transactions:</p>
         <div className="conatiner_of_list_of_transactions">
            <ul>{content}</ul>
         </div>
      </div>
   );
}
