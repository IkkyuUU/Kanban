export default storage => ({
	get(k) {
		try {
			return JSON.parse(storage.getItem(k));
		}
		catch(e) {
			return null;
		}
	},
	set(k, v) {
		storage.setItem(k, JSON.stringify(v));
	}
});

/*
It's not foolproof and it will fail if we put too much data into a storage. 
To overcome these problems without having to solve them yourself, it would 
be possible to use a wrapper such as localForage to hide the complexity.
*/