import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexDBService {
  request: any = null;
  db: any = null;
  customerObjectStore: any = null;
  
  constructor() { 
  }

  // openDB() {
  //   this.request = window.indexedDB.open("users", object.id);
  //   this.request.onerror = (event) => {
  //     console.log(event);
  //     console.error("Why didn't you allow my web app to use IndexedDB?!");
  //   };
  //   this.request.onsuccess = (event: any) => {
  //     this.db = event.target.result;
  //     this.createObject();
  //   };
  // }

  updateIndexDb = async (user) => {
    this.request = window.indexedDB.open("userDB", user.id);
    this.request.onerror = (event) => {
      console.error("Why didn't you allow my web app to use IndexedDB?!");
    }; 
    this.request.onsuccess = (event: any) => {
      console.log("dats", event.target.result)
      this.db = event.target.result;
      if(!this.db.objectStoreNames.contains('users')){
        // this.db.createObjectStore("users", { keyPath: "id" });
        
      }else{
        let test = this.db.transaction("users", "readwrite").objectStore("users");
        test.add(user);
      }
    }; 
  };

  // updateUser (user) {
  //   this.request.onsuccess = (event: any) => {
  //     console.log("dats", event.target.result)
  //     this.db = event.target.result;
  //     let test = this.db.transaction("users", "readwrite").objectStore("users");
  //     test.add(user);
  //   };
  // }

  async createObjectStore() {
    console.log(this.db)
    this.request.onupgradeneeded  = (event) => {
      console.log(this.db)
      // this.db = event.target.result;
      let objectStore = null;
      // let customerObjectStore = null;
      objectStore = this.db.createObjectStore("users", { keyPath: "id" });
      // objectStore.transaction.oncomplete = (event) => {
      //   customerObjectStore = db.transaction("users", "readwrite").objectStore("users");
      //   customerObjectStore.add(user);
      // };
    };
    
  }

  // async createObject(user) {
  //   console.log(user)
  //   this.request.onupgradeneeded  = (event) => {
  //     console.log(user)
  //     // this.db = event.target.result;
  //     let objectStore = null;
  //     let customerObjectStore = null;
  //     if(!db.objectStoreNames.contains('users')){
  //       objectStore = db.createObjectStore("users", { keyPath: "id" });
  //       objectStore.transaction.oncomplete = (event) => {
  //         customerObjectStore = db.transaction("users", "readwrite").objectStore("users");
  //         customerObjectStore.add(user);
  //       };
  //     }else{
  //         // objectStore = db.transaction.objectStore("users");
  //         // objectStore.transaction.oncomplete = (event) => {
  //           customerObjectStore = db.transaction("users", "readwrite").objectStore("users");
  //           customerObjectStore.add(user);
  //         // };
  //     }
  //   };
    
  // }

  // dbInit() {
    // Check for support.
    // if (!('indexedDB' in window)) {
    //   console.log("This browser doesn't support IndexedDB.");
    //   return;
    // }

    // this.dbPromise = idb.open('test-db4', 1, function (upgradeDb) {
    //   if (!upgradeDb.objectStoreNames.contains('people')) {
    //     const peopleOS = upgradeDb.createObjectStore('people', { keyPath: 'email' });
    //     peopleOS.createIndex('gender', 'gender', { unique: false });
    //     peopleOS.createIndex('ssn', 'ssn', { unique: true });
    //   }
    //   if (!upgradeDb.objectStoreNames.contains('notes')) {
    //     const notesOS = upgradeDb.createObjectStore('notes', { autoIncrement: true });
    //     notesOS.createIndex('title', 'title', { unique: false });
    //   }
    //   if (!upgradeDb.objectStoreNames.contains('logs')) {
    //     const logsOS = upgradeDb.createObjectStore('logs', { keyPath: 'id', autoIncrement: true });
    //   }
    // });
  // }

  // createData(request) {
    // request
    //   .then(function (db) {
    //     const tx = db.transaction('store', 'readwrite');
    //     const store = tx.objectStore('store');
        // const item = {
        //   name: 'sandwich',
        //   price: 4.99,
        //   description: 'A very tasty sandwich',
        //   created: new Date().getTime(),
        // };
        // request.add(item);
      //   return tx.complete;
      // })
      // .then(function () {
      //   console.log('Added item to the store!');
      // });
  // }
}
