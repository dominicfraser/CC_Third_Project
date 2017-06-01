use codeclan_bar;
db.dropDatabase();

db.player_inventory.insert([
  {
    name: "Beer",
    value: 4,
    alcoholLevel: 4
  },
  {
    name: "Wine",
    value: 5,
    alcoholLevel: 6
  },
  {
    name: "Apple Juice",
    value: 2,
    alcoholLevel: -2
  }
]);

db.bar_inventory.insert([
  {
    name: "Pina Colada",
    value: 8,
    alcoholLevel: 10
  },
  {
    name: "Pina Colada",
    value: 8,
    alcoholLevel: 10
  },
  {
    name: "Pina Colada",
    value: 8,
    alcoholLevel: 10
  },
  {
    name: "Beer",
    value: 4,
    alcoholLevel: 4
  },
  {
    name: "Beer",
    value: 4,
    alcoholLevel: 4
  },
  {
    name: "Wine",
    value: 5,
    alcoholLevel: 6
  },
  {
    name: "Apple Juice",
    value: 2,
    alcoholLevel: -2
  },
  {
    name: "Coke",
    value: 3,
    alcoholLevel: -5
  },
  {
    name: "Apple Juice",
    value: 2,
    alcoholLevel: -2
  },
  {
    name: "Coke",
    value: 3,
    alcoholLevel: -5
  },
  {
    name: "Apple Juice",
    value: 2,
    alcoholLevel: -2
  },
  {
    name: "Coke",
    value: 3,
    alcoholLevel: -5
  },
  {
    name: "Apple Juice",
    value: 2,
    alcoholLevel: -2
  },
  {
    name: "Coke",
    value: 3,
    alcoholLevel: -5
  },
  {
    name: "Apple Juice",
    value: 2,
    alcoholLevel: -2
  },
  {
    name: "Coke",
    value: 3,
    alcoholLevel: -5
  },
  {
    name: "Apple Juice",
    value: 2,
    alcoholLevel: -2
  },
  {
    name: "Coke",
    value: 3,
    alcoholLevel: -5
  },
  {
    name: "Daiquiri",
    value: 10,
    alcoholLevel:25
  },
  {
    name: "Daiquiri",
    value: 10,
    alcoholLevel:25
  },
  {
    name: "Daiquiri",
    value: 10,
    alcoholLevel:25
  },
  {
    name: "Wine",
    value: 5,
    alcoholLevel: 6
  },
]);