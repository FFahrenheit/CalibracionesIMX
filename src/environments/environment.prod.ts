// const url = 'http://10.52.2.34:3300';

const url = window.location.origin.includes('localhost')? 
'http://localhost:3300' : 
'http://10.52.2.34:3300' ;

console.log('Current Backend Server : ' + url);

export const environment = {
  production: true,
  base_url: url,
  maintenance: true
};
