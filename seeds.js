use codeclan_bar;
db.dropDatabase();

db.player_inventory.insert([
  {
    name: "Beer",
    value: 4
  },
  {
    name: "Wine",
    value: 5
  },
  {
    name: "Apple Juice",
    value: 2
  },
  {
    name: "Coke",
    value: 3
  },
]);

db.bar_inventory.insert([
  {
    name: "Cocktail",
    value: 8
  },
  {
    name: "Beer",
    value: 4
  },
  {
    name: "Beer",
    value: 4
  },
  {
    name: "Wine",
    value: 5
  },
  {
    name: "Apple Juice",
    value: 2
  },
  {
    name: "Coke",
    value: 3
  },
  {
    name: "Cocktail",
    value: 8
  },
  {
    name: "Wine",
    value: 5 
  },
]);