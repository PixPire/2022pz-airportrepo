import './table.css'

const RenderTable = ({ data, column , onClick1 = doNothing, onClick2 = doNothing}) => {
  return (
    <table>
      <thead>
        <tr>
          {column.map((item) => <TableHeadItem key = {item.id} item={item} />)}
          <th>Edytuj</th>
          <th>Usuń</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => <TableRow item={item} column={column} onClick1={onClick1} onClick2={onClick2}/>)}
      </tbody>
    </table>
  )
}

const TableHeadItem = ({ item }) => <th>{item.heading}</th>
const TableRow = ({ item, column, onClick1, onClick2 }) => (
  <tr>
    {column.map((columnItem) => {
      

      return <td>{item[columnItem.value]}</td>
    })}
      <td><button onClick={() => {onClick1(item)}}>Edytuj</button></td>
      <td><button onClick={() => {onClick2(item)}}>Usuń</button></td>
  </tr>
)
function doNothing() {
  }
export default RenderTable