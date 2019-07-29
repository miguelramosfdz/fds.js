let enabled = false;

class FDSTrace {
	log(a){
		if(enabled === true){
			console.log(a);
		}
	}

	time(a){
		if(enabled === true){
			console.time(a);
		}
	}

	timeEnd(a){
		if(enabled === true){
			console.timeEnd(a);
		}
	}		
}

module.exports = new FDSTrace;