
export const checkDatabaseForFirstTime = (db) =>{
    db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS notifications (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, desc TEXT)"
        );
      });
}

export const addToDatabase = (db,notiTitle, notiDesc) => {
    db.transaction((tx) => {
      tx.executeSql("insert into notifications (title, desc) values (?, ?)", [
        notiTitle,
        notiDesc,
      ]);
    }, null);
  };

  
  export const retrieveNotification = (db) => {
      var data = [];
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM notifications', null,
        (txObj, { rows: { _array } }) => console.log(_array),
        (txObj, error) => console.log('Error ', error)
        ) 
    })
    console.log(data)
    return data
  }