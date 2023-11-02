import { render, screen } from '@testing-library/react';
import * as TicketApi from './TicketApi';

test('create and delete ticket',()=>{
  var ticket={}
  var data=TicketApi.getAllTickets()

expect(data.length).toBe(undefined) 
});