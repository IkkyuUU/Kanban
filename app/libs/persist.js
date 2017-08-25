/*
Given it can be useful to be able to disable snapshotting temporarily, 
it can be a good idea to implement a debug flag. The idea is that if 
the flag is set, we'll skip storing the data.
*/
export default function(alt, storage, storageName) {
  try {
    alt.bootstrap(storage.get(storageName));
  }
  catch(e) {
    console.error('Failed to bootstrap data', e);
  }

  alt.FinalStore.listen(() => {
    if(!storage.get('debug')) {
      storage.set(storageName, alt.takeSnapshot());
    }
  });
}