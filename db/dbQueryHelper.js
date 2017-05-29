var MongoClient = require('mongodb').MongoClient;
var ObjectID = require("mongodb").ObjectID;

var DbQueryHelper = function(){
  this.url = "mongodb://localhost:27017/codeclan_bar"
};

DbQueryHelper.prototype = {
  addToPlayer: function(playerItemToAdd, onQueryFinishedCallback){
    MongoClient.connect(this.url, function(err, db){
      if (db){
        var collection = db.collection('player_inventory');
        collection.insert(playerItemToAdd);
        console.log('item to add in queryHelper:', playerItemToAdd)
        collection.find().toArray(function(err, docs){
                  onQueryFinishedCallback(docs);
                })
            }
      })
  },
          
  allPlayerItems: function(onQueryFinishedCallback){
    MongoClient.connect(this.url, function(err, db){
      if (db){
        var collection = db.collection('player_inventory');
        collection.find().toArray(function(err, docs){
          onQueryFinishedCallback(docs);
        })
      }
    })
  },

  removePlayerItem: function(id, onQueryFinishedCallback){
    MongoClient.connect(this.url, function(err, db){
      var mongoIdObject = ObjectID(id);
      console.log('id in dbHelper', id)
      console.log('mongoIdObject in dbHelper', mongoIdObject)
      if (db){
        var collection = db.collection("player_inventory");
        collection.remove({_id: mongoIdObject}, {justOne: true});
        collection.find().toArray(function(err, docs){
          onQueryFinishedCallback(docs);
        })
      }
    })
  },

  addToBar: function(barItemToAdd, onQueryFinishedCallback){
    MongoClient.connect(this.url, function(err, db){
      if (db){
        var collection = db.collection('bar_inventory');
        collection.insert(barItemToAdd);
        collection.find().toArray(function(err, docs){
                  onQueryFinishedCallback(docs);
                })
              }
            })
          },

  allBarItems: function(onQueryFinishedCallback){
    MongoClient.connect(this.url, function(err, db){
      if (db){
        var collection = db.collection('bar_inventory');
        collection.find().toArray(function(err, docs){
          onQueryFinishedCallback(docs);
        })
      }
    })
  },

}


module.exports = DbQueryHelper;