import { render, screen } from '@testing-library/react';

import Table from './routes/lesser_components/Table';

/*test('renders learn react link', () => {
  render(<App />);
 
});*/
test('table with plain data and No.',()=>{
  var d=[{id:1,name:'fff',surname:'asdad'},{id:2,name:'test',surname:'asdadasda'}]
render(<Table data={d} columns={["id","name","surname"]} number={true}/>);
const count=screen.getAllByRole("columnheader")
expect(count.length).toBe(4)
});
test('table with plain data without No.',()=>{
    var d=[{id:1,name:'fff',surname:'asdad'},{id:2,name:'test',surname:'asdadasda'}]
  render(<Table data={d} columns={["id","name","surname"]} number={false}/>);
  const count=screen.getAllByRole("columnheader")
  expect(count.length).toBe(3)
  });
