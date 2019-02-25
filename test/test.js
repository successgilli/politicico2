import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';

const should = chai.should();
chai.use(chaiHttp);

const data = {
  name: 'gilbert',
  hqAddress: 'bearbea',
  logoUrl: 'bearrmpitdairs',
};
const badData = {
  hqAddress: 'somewhere',
  logoUrl: 'somethingLikeThat'
};
const badData2 = {
  hqAddress: 'somewhere',
  name: 'awaji-mitop'
};
const badData3 = {
  logoUrl: 'somethingLikeThat',
  name: 'awaji-mitop'
};
const badData4 = {
  name: ' ',
  hqAddress: 'somewhere',
  logoUrl: 'somethingLikeThat',
};
const badData41 = {
  name: 'ghah@e ',
  hqAddress: 'somewhere',
  logoUrl: 'somethingLikeThat',
};
const badData5 = {
  name: 'gilbert',
  hqAddress: '    ',
  logoUrl: 'somethingLikeThat',
};
const badData51 = {
  name: 'gilbert',
  hqAddress: ' rft ',
  logoUrl: 'somethingLikeThat',
};
const badData6 = {
  name: 'gilbert',
  hqAddress: 'somewhere',
  logoUrl: ' ',
};
describe('test createParty Route', () => {
  it('should respond when error message when input is incorrect', (done) => {
    chai.request(server).post('/api/v1/parties').send(badData).end((err, res) =>{
      res.statusCode.should.equal(400);
      res.body.should.equal('missing name field');
      done();
    });
  });
  it('should check validate hdAddress field', (done) =>{
    chai.request(server).post('/api/v1/parties').send(badData3).end((err, res) =>{
      res.body.should.equal('missing hqAddress field');
      res.statusCode.should.equal(400);
      done();
    })
  })
  it('should validate logoUrl field', (done) => {
    chai.request(server).post('/api/v1/parties').send(badData2).end((err, res) => {
      res.body.should.equal('missing logoUrl field');
      res.statusCode.should.equal(400);
      done();
    })
  })
  it('should ensure name field isnt empty', (done) => {
    chai.request(server).post('/api/v1/parties').send(badData4).end((err, res) => {
      res.body.should.equal('empty name field');
      res.statusCode.should.equal(400);
      done();
    })
  })
  it('should ensure name field contains proper name style', (done) => {
    chai.request(server).post('/api/v1/parties').send(badData41).end((err, res) => {
      res.body.should.equal('name field can only contain underscores, words, and digits and must not be less than 5 letters cannot also use all numbers');
      res.statusCode.should.equal(400);
      done();
    })
  })
  it('should ensure hqAddress field is not empty', (done) => {
    chai.request(server).post('/api/v1/parties').send(badData5).end((err, res) => {
      res.body.should.equal('empty hqAddress field');
      res.statusCode.should.equal(400);
      done();
    })
  })
  it('should ensure hqAddress field contains proper name style', (done) => {
    chai.request(server).post('/api/v1/parties').send(badData51).end((err, res) => {
      res.body.should.equal('hqAddress field can only contain underscores, words, and digits and must not be less than 5 letters');
      res.statusCode.should.equal(400);
      done();
    })
  })
  it('should ensure logoUrl field is not empty', (done) => {
    chai.request(server).post('/api/v1/parties').send(badData6).end((err, res) => {
      res.body.should.equal('empty logoUrl field');
      res.statusCode.should.equal(400);
      done();
    })
  })
  /* it('should return success message on success', (done) => {
    chai.request(server).post('/api/v1/parties').send(data).end((err, res) => {
      res.body.should.have.property('name');
      res.body.should.have.property('id');
      res.body.should.have.property('hqaddress');
      res.body.should.have.property('logourl');
      res.statusCode.should.equal(200);
      done();
    })
  }) */
  it('should return success message on success', (done) => {
    chai.request(server).post('/api/v1/parties').send(data).end((err, res) => {
      res.body.should.equal('party name already exists');
      res.statusCode.should.equal(400);
      done();
    })
  })
});
