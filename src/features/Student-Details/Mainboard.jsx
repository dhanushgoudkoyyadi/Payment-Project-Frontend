import React from 'react'
import StudentPayment from './StudentPayment'
import { useGetOneQuery,  } from '../../service/Leads'
import {jwtDecode} from "jwt-decode";
import SpFailed from './SpFailed'; 

function Mainboard() {
  const token = localStorage.getItem("token"); // Assuming token is stored in local storage
    const userId = token ? jwtDecode(token).id : null;
    console.log(userId)
  const { data: user, error, isLoading } = useGetOneQuery(userId, { skip: !userId });

  if (!userId) return <p>Please log in</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data</p>;
  console.log(user);
  
  return (
    <div> 

        {user?.paymentAmount>0  ? <StudentPayment /> : <SpFailed />
        }
      
    </div>
  )
}

export default Mainboard