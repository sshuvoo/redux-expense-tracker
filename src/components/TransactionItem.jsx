/* eslint-disable react/prop-types */
import editIcon from './../assets/images/edit.svg';
import deleteIcon from './../assets/images/delete.svg';
import { useDispatch } from 'react-redux';
import {
   deleteTransactionAsync,
   updateTransaction,
} from './../redux/features/transaction/transactionSlice';

export default function TransactionItem({ transaction }) {
   const dispatch = useDispatch();

   return (
      <li className={`transaction ${transaction.type}`}>
         <p>{transaction.name}</p>
         <div className="right">
            <p>৳ {transaction.amount}</p>
            <button
               className="link"
               onClick={() => dispatch(updateTransaction(transaction))}
            >
               <img className="icon" src={editIcon} />
            </button>
            <button
               onClick={() => dispatch(deleteTransactionAsync(transaction.id))}
               className="link"
            >
               <img className="icon" src={deleteIcon} />
            </button>
         </div>
      </li>
   );
}
