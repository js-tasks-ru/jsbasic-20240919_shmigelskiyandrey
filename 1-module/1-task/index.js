function factorial(n) {
  let result = 1;

  while( n > 1 ) {
    result = result * n;
    n--;
  }

  return result
}