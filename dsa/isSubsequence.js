const isSubsequence = (subseq, seq) => {
  if(subseq.length === 0) return true
  let lo_sub = 0
  let lo_seq = 0
  let hi_sub = subseq.length - 1
  let hi_seq = seq.length - 1
  while(hi_seq >= lo_seq){
    if(subseq[lo_sub] === seq[lo_seq])
      lo_sub++
    if(subseq[hi_sub] === seq[hi_seq])
      hi_sub--
    hi_seq--
    lo_seq++
  }
  return lo_sub > hi_sub
}

console.log(isSubsequence("hel", "heddu"))
console.log(isSubsequence("hel", "heddl"))
console.log(isSubsequence("sing", "stingsadfaf"))
console.log(isSubsequence("abc", "acb"))
