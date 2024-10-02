function getMinMax(str) {
  let elems = str.split(' ').filter(elem => !isNaN(elem));

  return { min: Math.min.apply(null, elems),
    max: Math.max.apply(null, elems),
  } 
}
