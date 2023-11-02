import './styles.css'
const Table=(props)=>{
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

  </tr></>)}
      
   
        </tbody>
  </table>);
}

export default Table;

/*const Table=(data,columns)=>{
    
    <table>
    <thead>
      <tr>
      <th>No.</th>
    
{columns.map((el) =><> 
<th>{el}</th></>)}
{arguments.length>2 && <th></th>}
      </tr>
    </thead>
    <tbody>
    <tr>
      {
   data.map((element,index)=><>
   <td>{index+1}</td>
   {Object.value(element).map((e)=>{<td>{e}</td>})}
   </>)}
      { arguments.length>2 && ( () => {
        for(let i=2;i<arguments.length;i+=2)
        {<button onClick={arguments[i+1]}>{arguments[i]}</button>}
        
        } )() }
        </tr>
        </tbody>
  </table>
}

export default Table;*/

