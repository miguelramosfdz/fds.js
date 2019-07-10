// Copyright 2019 The FairDataSociety Authors
// This file is part of the FairDataSociety library.
//
// The FairDataSociety library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The FairDataSociety library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the FairDataSociety library. If not, see <http://www.gnu.org/licenses/>.

// mailbox smart contracts

let Web3Utils = require('web3-utils');
let namehash = require('eth-ens-namehash');

let ENSRegistryContract = require('./contracts/ENSRegistry.js');
let FIFSRegistrarContract = require('./contracts/FIFSRegistrar.js');
let PublicResolverContract = require('./contracts/PublicResolver.js');

class FDSENS2 {

    constructor(account, config) {
      this.account = account;
      this.config = config;
      this.ENSRegistry = new ENSRegistryContract(this.account, config.registryAddress);
      this.FIFSRegistrar = new FIFSRegistrarContract(this.account, config.fifsRegistrarContractAddress)
      this.PublicResolver = new PublicResolverContract(this.account, config.resolverContractAddress)
    }

    registerSubdomain(subdomain){
      return this.FIFSRegistrar.registerSubdomain(Web3Utils.sha3(subdomain), this.account.wallet.address);
    }

    setResolver(subdomain){
      let node = namehash.hash(subdomain + '.' + this.config.domain);
      let addr = this.config.resolverContractAddress;      
      return this.ENSRegistry.setResolver(node, addr);      
    }

    setAddr(subdomain){
      let node = namehash.hash(subdomain + '.' + this.config.domain);
      let addr = this.config.resolverContractAddress;    
      return this.PublicResolver.setAddr(node, this.account.wallet.address);
    }

    setPubkey(subdomain){
      let node = namehash.hash(subdomain + '.' + this.config.domain);
      let publicKey = this.account.publicKey;
      let publicKeyX = publicKey.substring(0, 66);
      let publicKeyY = "0x" + publicKey.substring(66, 130);
      return this.PublicResolver.setPubkey(node, publicKeyX, publicKeyY);
    }    

}

module.exports = FDSENS2;