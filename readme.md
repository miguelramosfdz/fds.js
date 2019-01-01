```
__/\\\\\\\\\\\\\\\__/\\\\\\\\\\\\________/\\\\\\\\\\\___        
 _\/\\\///////////__\/\\\////////\\\____/\\\/////////\\\_       
  _\/\\\_____________\/\\\______\//\\\__\//\\\______\///__      
   _\/\\\\\\\\\\\_____\/\\\_______\/\\\___\////\\\_________     
    _\/\\\///////______\/\\\_______\/\\\______\////\\\______    
     _\/\\\_____________\/\\\_______\/\\\_________\////\\\___   
      _\/\\\_____________\/\\\_______/\\\___/\\\______\//\\\__  
       _\/\\\_____________\/\\\\\\\\\\\\/___\///\\\\\\\\\\\/___ 
        _\///______________\////////////_______\///////////_____
         _________FAIR___________DATA______________SOCIETY_______
```
# FDS.js Framework
## App Toolkit for the Web3 Generation

FDS.js provides a very simple framework to create apps utilising the Ethereum and Swarm networks.

It provides simple encrypted file storage, key value storage and message sending with baked in authentication for javascript web applications.

Coming soon:

  - Threads/Groups
  - Send ETH/Tokens
  - Upload Unencrypted
  - Upload hosted website
  - Public Post Feed
  - Markdown to Blog Post Publishing Platform

It requires an Ethereum and Swarm public gateway. 

All data is fully encrypted before it leaves the browser and all transactions are signed within the browser.

Wallets are stored in a password protected format in your browser.

You may deploy your own subdomain for ENS resolution, or use fdsociety defaults.

# Example Usage

```
window.FDS = new FDS({
      // domain: 'resolver.eth',
      swarmGateway: 'http://localhost:8500', 
      ethGateway: 'http://localhost:8545',
      faucetAddress: 'http://localhost:3001/gimmie',
      httpTimeout: 1000,      
      ensConfig: {
        domain: 'resolver.eth',
        registryAddress: '0x4916cf0632485bab3c396c96f09ec62f2a6d4084',
        fifsRegistrarContractAddress: '0x30555534c2a94d5b73cbfa3ac8adf8151fe23fd8',
        resolverContractAddress: '0xac4b6917475a9cf86e6588a248017eb2a07b7afa'
      }
    });




let simulateCreateTwoAndSendTwo = ()=>{

  let r1 = Math.floor(Math.random() * 1010101);
  let r2 = Math.floor(Math.random() * 1010101);
  let account1, account2 = null;
  window.FDS.CreateAccount(`test${r1}`, 'test', console.log).then((account) => {
    account1 = account;
    console.log(`registered account 1 ${account1.subdomain}`);  
  }).then(() => {
    return window.FDS.CreateAccount(`test${r2}`, 'test', console.log).then((account) => {
      account2 = account;
      console.log(`registered account 2 ${account2.subdomain}`);  
    }).catch(console.error)
  }).then(()=>{
    return window.FDS.UnlockAccount(account1.subdomain, 'test').then((acc1)=>{
      let r = Math.floor(Math.random() * 10101);
      let file = new File([`hello world ${r}`], `test${r}.txt`, {type: 'text/plain'});
      return acc1.send(account2.subdomain, file, console.log, console.log, console.log).then((message)=>{
        console.log(`>>>> successfully sent ${message} to ${account2.subdomain}`);
      });
    })
  }).then(()=>{
    console.log(`window.FDS.UnlockAccount('${account2.subdomain}', 'test').then((acc2)=>{
      acc2.messages().then((messages)=>{
        console.log('m', messages.length)
        messages[0].getFile().then(console.log)
        messages[0].saveAs();
      })
    })`)
    console.log(`window.FDS.UnlockAccount('${account1.subdomain}', 'test').then((acc2)=>{
      acc2.messages('sent').then((messages)=>{
        console.log('m', messages.length)
        messages[0].getFile().then(console.log)
        messages[0].saveAs();
      })
    })`)
    //todo check from sent mailbox too
  }).then(()=>{
    return window.FDS.UnlockAccount(account1.subdomain, 'test').then((acc1)=>{
      let r = Math.floor(Math.random() * 10101);
      let file = new File([`hello world 2${r}`], `test${r}-snd.txt`, {type: 'text/plain'});
      acc1.send(account2.subdomain, file, console.log, console.log, console.log).then((message)=>{
        console.log(`>>>> successfully sent ${message} to ${account2.subdomain}`);
      });
    })
  });

}

let createAndStore = ()=>{

  let r1 = Math.floor(Math.random() * 10101);
  let r2 = Math.floor(Math.random() * 10101);
  let account1, account2 = null;
  window.FDS.CreateAccount(`test${r1}`, 'test', console.log).then((account) => {
    account1 = account;
    console.log(`registered account 1 ${account1.subdomain}`);  
  }).then(()=>{
    return window.FDS.UnlockAccount(account1.subdomain, 'test').then((acc1)=>{
      let r = Math.floor(Math.random() * 10101);
      let file = new File(['hello storage world'], `test${r}.txt`, {type: 'text/plain'});
      acc1.store(file, console.log, console.log).then((stored)=>{
        console.log(`>>>> successfully stored ${stored} for ${acc1.subdomain}`);
      });
    })
  }).then(()=>{
    console.log(`window.FDS.UnlockAccount('${account1.subdomain}', 'test').then((acc2)=>{
      acc2.stored().then((stored)=>{
        console.log('m', stored.length)
        stored[0].getFile().then(console.log)
        stored[0].saveAs();
      })
    })`)
  });

}

let createAndBackup = ()=>{

  let r1 = Math.floor(Math.random() * 10101);
  let r2 = Math.floor(Math.random() * 10101);
  let account1, account2 = null;
  window.FDS.CreateAccount(`test${r1}`, 'test', console.log).then((account) => {
    account1 = account;
    console.log(`registered account 1 ${account1.subdomain}`);  
  }).then(()=>{
    return window.FDS.BackupAccount(account1.subdomain, 'test');
  });

}

let backupJSON = null;

let createDeleteAndRestore = ()=>{

  let r1 = Math.floor(Math.random() * 10101);
  let r2 = Math.floor(Math.random() * 10101);
  let account1, account2 = null;
  window.FDS.CreateAccount(`test${r1}`, 'test', console.log).then((account) => {
    account1 = account;
    console.log(`registered account 1 ${account1.subdomain}`);  
  }).then(()=>{
    let accounts = window.FDS.GetAccounts();
    let f = accounts.filter((a)=>{return a.subdomain === account1.subdomain});
    if(f.length === 1){
      console.log(`success: account ${account1.subdomain} exists`);
      backupJSON = JSON.stringify(accounts[0].wallet);
    }else{
      throw new Error(`account ${account1.subdomain} does not exist`)
    }
    return window.FDS.DeleteAccount(account1.subdomain);
  }).then(()=>{
    let accounts = window.FDS.GetAccounts();
    let f = accounts.filter((a)=>{return a.subdomain === account1.subdomain});
    if(f.length === 0){
      console.log(`success: account ${account1.subdomain} does not exist`)
    }else{
      throw new Error(`account ${account1.subdomain} exists`)
    }
  }).then(()=>{
    let backupFile = new File([backupJSON], `fairdrop-wallet-${account1.subdomain}-backup (1).json`, {type: 'text/plain'});
    window.FDS.RestoreAccount(backupFile).then(()=>{
      let accounts = window.FDS.GetAccounts();
      let f = accounts.filter((a)=>{return a.subdomain === account1.subdomain});
      if(f.length === 1){
        console.log(`success: account ${account1.subdomain} exists`)
      }else{
        throw new Error(`account ${account1.subdomain} does not exist`)
      }    
    });
    //todo check you can send to/from and store
  }).catch(console.error);

}



let createAndStoreValue = ()=>{
  let r1 = Math.floor(Math.random() * 10101);
  let r2 = Math.floor(Math.random() * 10101);
  let account1, account2 = null;
  window.FDS.CreateAccount(`test${r1}`, 'test', console.log).then((account) => {
    account1 = account;
    console.log(`registered account 1 ${account1.subdomain}`);  
  }).then(()=>{
    return window.FDS.UnlockAccount(account1.subdomain, 'test').then((acc1)=>{
      acc1.storeValue('k1', 'hello value world').then((stored)=>{
        console.log(`>>>> successfully stored ${stored} for ${acc1.subdomain}`);
      });
    })
  }).then(()=>{
    console.log(`window.FDS.UnlockAccount('${account1.subdomain}', 'test').then((acc2)=>{
      acc2.retrieveValue('k1').then(console.log)
    })`)
  });
}

let createAndStoreEncryptedValue = ()=>{
  let r1 = Math.floor(Math.random() * 10101);
  let r2 = Math.floor(Math.random() * 10101);
  let account1, account2 = null;
  window.FDS.CreateAccount(`test${r1}`, 'test', console.log).then((account) => {
    account1 = account;
    console.log(`registered account 1 ${account1.subdomain}`);  
  }).then(()=>{
    return window.FDS.UnlockAccount(account1.subdomain, 'test').then((acc1)=>{
      acc1.storeEncryptedValue('k1', 'hello encrypted value world').then((stored)=>{
        console.log(`>>>> successfully stored ${stored} for ${acc1.subdomain}`);
      });
    })
  }).then(()=>{
    console.log(`window.FDS.UnlockAccount('${account1.subdomain}', 'test').then((acc2)=>{
      acc2.retrieveDecryptedValue('k1').then(console.log)
    })`)
  });
}

simulateCreateTwoAndSendTwo();
// createAndStore();
// createAndStoreValue();
// createAndStoreEncryptedValue();
// createAndBackup();
// createDeleteAndRestore();

```
