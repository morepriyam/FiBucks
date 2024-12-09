import { expect } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';

// console.log('chai before registering chai-http:', chai);
chai.use(chaiHttp);
// console.log('chai after registering chai-http:', chai);

const { request } = chai;
console.log('chai.request:', request); 
describe('Example Test', () => {
  it('should pass this test', () => {
    expect(1 + 1).to.equal(2);
  });
});
