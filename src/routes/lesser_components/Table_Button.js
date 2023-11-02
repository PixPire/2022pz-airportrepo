import './styles.css'
const Table_Button=(props)=>{
  let data=props.data
  let columns=props.columns 
  let number=props.number
  console.log(data)
  console.log(columns)

  return(
    <table >
    <thead>
      <tr>
     {number&&<th>No.</th>}
    
{columns.map((el) =><> 
<th>{el}</th></>)}
      </tr>
    </thead>
    <tbody>
    
      {
   data.map((element,index)=><><tr>
{number&& <td>{index+1}</td>}
   {Object.keys(element).map(function(key) {
    return (<td>{element[key]}</td>);
})}
{<button onclick="props">props.editbutton</button>}



  </tr></>)}
      
   
        </tbody>
  </table>);
}