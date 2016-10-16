/**
 * Created by oguzhancolak on 12.10.2016.
 */

app.service("SyncSrvc",
  function($rootScope, $q, SERVER) {
    var database;
    var changeListener;

    this.setDatabase = function() {
      database = new PouchDB("syncDatabase_79.db", {
        adapter: 'websql',
        auto_compaction: true,
        iosDatabaseLocation: 'Library',
        androidDatabaseImplementation: 2,
        androidLockWorkaround: 1});
    };

    this.startListening = function() {
      changeListener = database.changes({
        live: true,
        include_docs: true
      }).on("change", function(change) {
        if(!change.deleted) {
          $rootScope.$broadcast("$pouchDB:change", change);
        } else {
          $rootScope.$broadcast("$pouchDB:delete", change);
        }
        getDbInfo().then(function(response) {
          $rootScope.dbInfo = response;
        });
      }).on('error', function (err) {
        alert("Görevlerin Senkronizasyonu Esnasında Hata Oluştu");
      });
    };

    var getDbInfo = function() {
      var deferred = $q.defer();
      database.info().then(function(info) {
        deferred.resolve(info);
      }).catch(function(error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    this.sync = function() {
      database.sync(SERVER.CouchIPDev + '79', {
        live: true,
        retry: true})
        .on('error', function (err) {
          alert(JSON.stringify(err));
        });
    };

    this.save = function(jsonDocument) {
      var deferred = $q.defer();
      if(!jsonDocument._id) {
        database.post(jsonDocument).then(function(response) {
          deferred.resolve(response);
        }).catch(function(error) {
          deferred.reject(error);
        });
      } else {
        database.put(jsonDocument).then(function(response) {
          deferred.resolve(response);
        }).catch(function(error) {
          deferred.reject(error);
        });
      }
      return deferred.promise;
    };

    this.delete = function(documentId, documentRevision) {
      return database.remove(documentId, documentRevision);
    };

    this.get = function(documentId) {
      return database.get(documentId, {attachments: true});
    };

    this.destroy = function() {
      database.destroy();
    };

  });
