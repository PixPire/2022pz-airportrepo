export const menuItems = {
  //////////////////////////////////////Jeśli coś zmieniacie to zmieńcie też indeksy na dole/////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  contents: [
    {
      title: 'Pasażer',
      url: '/client',
      submenu: [
        {
          title: 'Bar Pokładowy',
          url: 'assortment',
        },
        {
          title: 'Loty',
          url: 'flights',
        },
        {
          title: 'Rezerwacja biletów',
          url: 'reserveTickets',
        },
      ],
    },
    {
      title: 'Pracownik',
      url: '/worker',
      submenu: [
        {
          title: null,
          url: null
        },
        {
          title: null,
          url: null,
        },
      ],
    },
    
    
    {
      title: 'Zaloguj',
      url: '/login',
    },    
    {
      title: 'Rejestracja',
      url: '/registry',
    },
    {
      title: null,
      url: null,
    },
    {
      title: 'Asortyment baru',
      url: '/assortment',
      submenu: [
        {
          title: 'Dodaj asortyment',
          url: 'assortmentAdd',
        },
      ],
    },
  ],
indexes: {
  //HomeId: 0,
  PasażerId: 0,
  PracownikId: 1,
  //InformacjaId: 2,
  ZalogujId: 2,
  RejestracjaId: 3,
  EdytorId: 4,
  AsortymentId: 5
}};
  