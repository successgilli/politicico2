

export function createResult(arrayOfObjects) {
  const resultBucket = [];
  arrayOfObjects.forEach((x) => {
    let count = 0;
    arrayOfObjects.forEach((y) => {
      if (x.candidate === y.candidate) {
        count += 1;
      }
    });
    if (typeof resultBucket[0] === 'undefined') {
      resultBucket.push({
        office: x.office,
        candidate: x.candidate,
        result: count,
      });
    } else {
      let check = 'notPresent';
      resultBucket.forEach((val) => {
        if (val.candidate === x.candidate) {
          check = 'present';
        }
      });
      if (check === 'notPresent') {
        resultBucket.push({
          office: x.office,
          candidate: x.candidate,
          result: count,
        });
      }
    }
  });
  return resultBucket;
}

export function addCandidatesWithZeroVotes(resultArray, candidatesArray) {
  candidatesArray.forEach((x) => {
    let check = 'notPresent';
    resultArray.forEach((y) => {
      if (x.id === y.candidate) {
        check = 'present';
      }
    });
    if (check === 'notPresent') {
      resultArray.push({
        office: x.officeid,
        candidate: x.id,
        result: 0,
      });
    }
  });
  return resultArray;
}

export function candidates(candidatesArray) {
  const results = [];
  candidatesArray.forEach((x) => {
    results.push({
      office: x.officeid,
      candidate: x.id,
      result: 0,
    })
  });
  return results;
}
