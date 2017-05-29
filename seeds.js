use codeclan_bar;
db.dropDatabase();

db.player_inventory.insert([
  {
    name: "Amstel",
    value: 4
  },
  {
    name: "Peroni",
    value: 6
  },
  {
    name: "Guinness",
    value: 3
  },
  {
    name: "Cocktail",
    value: 9
  },
]);

db.bar_inventory.insert([
  {
    name: "Amstel",
    value: 4
  },
  {
    name: "Amstel",
    value: 4
  },
  {
    name: "Amstel",
    value: 4
  },
  {
    name: "Peroni",
    value: 6
  },
  {
    name: "apple juice",
    value: 2
  },
  {
    name: "Cocktail",
    value: 9
  },
  {
    name: "Guinness",
    value: 3
  },
  {
    name: "Amstel",
    value: 4
  },
]);