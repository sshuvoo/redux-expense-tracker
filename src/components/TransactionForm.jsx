import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   postTransactionAsync,
   putTransactionAsync,
   resetUpdateTransaction,
} from './../redux/features/transaction/transactionSlice';

export default function TransactionForm() {
   const [name, setName] = useState('');
   const [type, setType] = useState('');
   const [amount, setAmount] = useState('');
   const dispatch = useDispatch();
   const { isLoading, isError, error, isEditMode, editTransaction } =
      useSelector((state) => state.transaction);

   const formReset = () => {
      setName('');
      setType('');
      setAmount('');
   };

   const submitHandler = (event) => {
      event.preventDefault();
      if (isEditMode) {
         dispatch(
            putTransactionAsync({
               id: editTransaction.id,
               name,
               type,
               amount: Number(amount),
            })
         );
         editCancelHandler();
      } else
         dispatch(postTransactionAsync({ name, type, amount: Number(amount) }));
      formReset();
   };

   const editCancelHandler = () => {
      formReset();
      dispatch(resetUpdateTransaction());
   };

   useEffect(() => {
      if (isEditMode) {
         const { name, type, amount } = editTransaction;
         setName(name);
         setType(type);
         setAmount(amount);
      }
   }, [isEditMode, editTransaction]);

   return (
      <div className="form">
         <h3 style={{ padding: '6px 0px' }}>
            {isEditMode ? 'Update transaction' : 'Add new transaction'}
         </h3>
         <form onSubmit={submitHandler}>
            <div className="form-group">
               <label htmlFor="transaction_name">Name</label>
               <input
                  type="text"
                  id="transaction_name"
                  placeholder="Enter Title"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
            </div>

            <div className="form-group radio">
               <label>Type</label>
               <div className="radio_group">
                  <input
                     type="radio"
                     value="income"
                     id="type_income"
                     name="type"
                     required
                     checked={type === 'income'}
                     onChange={() => setType('income')}
                  />
                  <label htmlFor="type_income">Income</label>
               </div>
               <div className="radio_group">
                  <input
                     type="radio"
                     value="expense"
                     name="type"
                     id="type_expense"
                     checked={type === 'expense'}
                     onChange={() => setType('expense')}
                  />
                  <label htmlFor="type_expense">Expense</label>
               </div>
            </div>

            <div className="form-group">
               <label htmlFor="transaction_amount">Amount</label>
               <input
                  type="number"
                  placeholder="Enter amount in BDT"
                  id="transaction_amount"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
               />
            </div>

            <button disabled={isLoading} className="btn" type="submit">
               {isEditMode ? 'Update Transaction' : 'Add Transaction'}
            </button>
            {!isLoading && isError && (
               <p style={{ color: 'red', padding: '4px 0px' }}>{error}</p>
            )}
         </form>
         {isEditMode && (
            <button onClick={editCancelHandler} className="btn cancel_edit">
               Cancel Edit
            </button>
         )}
      </div>
   );
}
