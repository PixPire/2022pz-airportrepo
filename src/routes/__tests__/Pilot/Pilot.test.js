import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Pilot from '../../Worker/Pilot.js';
import * as PilotApi from '../../../api/PilotApi';
import * as HarmonogramApi from '../../../api/HarmonogramApi';
import * as UserApi from '../../../api/UserApi';

// Mock the Pilot API functions
jest.mock('../../../api/PilotApi', () => ({
  addAwaria: jest.fn(),
  addOpoznienie: jest.fn(),
}));

// Mock the Harmonogram API functions
jest.mock('../../../api/HarmonogramApi', () => ({
  getHarmonogramId: jest.fn(),
}));

// Mock the User API functions
jest.mock('../../../api/UserApi', () => ({
  getUserById: jest.fn(),
}));

describe('Pilot component', () => {
  it('should add awaria correctly', async () => {
    PilotApi.addAwaria.mockResolvedValue({ status: 201 });

    render(<Pilot/>);

    const stopienAwariiInput = screen.getByText('Wybierz stopień awarii');
    const rodzajAwariiInput = screen.getByLabelText('Rodzaj awarii');
    const opisAwariiInput = screen.getByLabelText('Opis awarii');
    const submitButton = screen.getByText('Dodaj awarie');

    fireEvent.change(stopienAwariiInput, { target: { value: 'niski' } });
    fireEvent.change(rodzajAwariiInput, { target: { value: 'awaria silnika' } });
    fireEvent.change(opisAwariiInput, { target: { value: 'silnik przestal dzialac' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(PilotApi.addAwaria).toHaveBeenCalled());
  });
});