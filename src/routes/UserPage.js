
import Cookies from 'js-cookie'
import SimpleReactValidator from 'simple-react-validator';
import React from 'react';
import {useState} from 'react';
import TicketsTable from './lesser_components/TicketsTable';
import UserDataEdit from './lesser_components/UserDataEdit';
export default  UserPage=>{
    const [component, setComponent] = useState(""); 


return (<>
<div class="left-to-right">
    <div class="user-options">
    <><button onClick={()=>{setComponent(<UserDataEdit/>)}} >Zmien dane  </button> <br/>
    <button onClick={()=>{setComponent(<TicketsTable/>)}}>Kupione bilety </button></>
    </div>
    <div class="user-container-edit">
    {component }
    </div>
</div>
</>);
}
